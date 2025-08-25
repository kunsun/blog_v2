"use client";

import React, { useEffect, useRef, useState } from "react";

export function TimelineDemo() {
  // 视频驱动：与原文提供的 mp4 同步
  const VIDEO_URL =
    "https://www.joshwcomeau.com/videos/use-deferred-value/deferred-01-single-click.mp4";
  // 同步音频：与视频同源的 ogg
  const AUDIO_URL =
    "https://www.joshwcomeau.com/videos/use-deferred-value/deferred-01-single-click.ogg";

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const trackRef = useRef(null);
  const draggingRef = useRef(false);

  const [durationSec, setDurationSec] = useState(0);
  const [currentSec, setCurrentSec] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hpMs, setHpMs] = useState(200); // 高优先级估计 200ms（可调）
  const [lpMs, setLpMs] = useState(800); // 低优先级估计 800ms（可调）
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const timelineMs = Math.max(1, Math.round(durationSec * 1000));

  // 事件绑定
  useEffect(() => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v) return;
    const onLoaded = () => setDurationSec(v.duration || 0);
    const onTime = () => setCurrentSec(v.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    // 播放/暂停时同步音频
    const handlePlay = async () => {
      onPlay();
      if (a) {
        try {
          // 校正一帧的时间偏移
          if (Math.abs((a.currentTime || 0) - (v.currentTime || 0)) > 0.06) {
            a.currentTime = v.currentTime || 0;
          }
          if (audioEnabled) await a.play();
        } catch (err) {
          // 若被策略拦截则静默失败
          // console.debug('Audio play blocked', err);
        }
      }
    };
    const handlePause = () => {
      onPause();
      if (a) a.pause();
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", handlePlay);
    v.addEventListener("pause", handlePause);
    v.addEventListener("ended", onEnded);

    // 音频元数据
    if (a) {
      const onAudioLoaded = () => setAudioReady(true);
      a.addEventListener("loadedmetadata", onAudioLoaded);
      return () => {
        v.removeEventListener("loadedmetadata", onLoaded);
        v.removeEventListener("timeupdate", onTime);
        v.removeEventListener("play", handlePlay);
        v.removeEventListener("pause", handlePause);
        v.removeEventListener("ended", onEnded);
        a.removeEventListener("loadedmetadata", onAudioLoaded);
      };
    }

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", handlePlay);
      v.removeEventListener("pause", handlePause);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  // 控制
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const replay = () => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
    v.play();
    if (a && audioEnabled) {
      a.play().catch(() => {});
    }
  };

  // 音频开关
  const toggleAudio = () => {
    const a = audioRef.current;
    const v = videoRef.current;
    if (!a) return setAudioEnabled((s) => !s);
    setAudioEnabled((enabled) => {
      const next = !enabled;
      if (!next) {
        a.pause();
      } else {
        // 开启时对齐时间，并在视频播放时尝试播放音频
        if (v) a.currentTime = v.currentTime || 0;
        if (v && !v.paused) a.play().catch(() => {});
      }
      return next;
    });
  };

  // 时间轴交互（scrub）
  const setByClientX = (clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v) return;
    v.currentTime = pct * durationSec;
    if (a) a.currentTime = v.currentTime;
  };
  const onMouseDown = (e) => {
    draggingRef.current = true;
    setByClientX(e.clientX);
  };
  const onMouseMove = (e) => {
    if (!draggingRef.current) return;
    setByClientX(e.clientX);
  };
  const onMouseUp = () => {
    draggingRef.current = false;
  };

  // 工具：将 ms -> 百分比
  const toPct = (ms) => `${(ms / timelineMs) * 100}%`;

  // 单击场景：t>=0 发生一次递增（count: 0 -> 1），deferred 在高优阶段结束前保持旧值
  const curMs = Math.round(currentSec * 1000);
  const hpEnd = Math.min(hpMs, timelineMs);
  const lpEnd = Math.min(hpMs + lpMs, timelineMs);
  const inHigh = curMs >= 0 && curMs < hpEnd;
  const count = curMs > 50 ? 1 : 0; // 播放启动后短暂缓冲再显示 1，更贴近视频节奏
  const deferredCount = inHigh ? 0 : count; // 高优阶段使用旧值
  const isStale = count !== deferredCount;

  // 刻度：10 段
  const ticks = Array.from({ length: 11 }, (_, i) =>
    Math.round((timelineMs / 10) * i)
  );

  return (
    <div className="timeline-demo border border-gray-200 dark:border-gray-700 rounded-lg p-6 my-6 bg-white dark:bg-gray-900">
      {/* 标题与控制 */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">
          useDeferredValue：视频 + 时间轴（单次点击）
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {isPlaying ? "暂停" : "播放"}
          </button>
          <button
            onClick={toggleAudio}
            className={`px-3 py-2 rounded ${
              audioEnabled
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            title={audioEnabled ? "关闭音频" : "开启音频"}
          >
            {audioEnabled ? "音频开" : "音频关"}
          </button>
          <button
            onClick={replay}
            className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            重新播放
          </button>
        </div>
      </div>

      {/* 视频区域 */}
      <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-black">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          preload="metadata"
          playsInline
          className="w-full h-auto"
        />
        {/* 隐藏 audio：用于同步音频播放 */}
        <audio
          ref={audioRef}
          src={AUDIO_URL}
          preload="auto"
          style={{ display: "none" }}
        />
      </div>

      {/* 时间轴 + 渲染块（与视频时间同步）*/}
      <div className="mt-4 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 select-none">
        <div
          ref={trackRef}
          className="relative h-24 border-b border-gray-300 dark:border-gray-600 cursor-pointer"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* 刻度 */}
          {ticks.map((ms, i) => (
            <div
              key={i}
              className="absolute bottom-0 h-full border-l border-gray-300 dark:border-gray-600"
              style={{ left: toPct(ms) }}
            >
              <span className="absolute top-1 left-1 text-[10px] text-gray-500 dark:text-gray-400">
                {ms}ms
              </span>
            </div>
          ))}

          {/* 高优先级块 */}
          <div
            className="absolute top-2 h-8 bg-green-500/85 dark:bg-green-500/75 text-white rounded-l flex items-center"
            style={{ left: toPct(0), width: toPct(hpEnd) }}
            title="High priority render"
          >
            <span className="px-2 text-[11px] font-mono">
              count 1 | dCount 0
            </span>
          </div>

          {/* 低优先级块 */}
          {lpEnd > hpEnd && (
            <div
              className="absolute top-2 h-8 bg-red-500/85 dark:bg-red-500/75 text-white rounded-r flex items-center"
              style={{ left: toPct(hpEnd), width: toPct(lpEnd - hpEnd) }}
              title="Low priority render"
            >
              <span className="px-2 text-[11px] font-mono">
                count 1 | dCount 1
              </span>
            </div>
          )}

          {/* 当前时间指示器 */}
          <div
            className="absolute top-0 h-full w-[2px] bg-yellow-400"
            style={{ left: toPct(curMs) }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full" />
          </div>
        </div>

        {/* 参数可调（贴近不同视频节奏）*/}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400">
          <label className="flex items-center gap-2">
            <span className="w-28">高优时长</span>
            <input
              type="range"
              min={50}
              max={600}
              step={10}
              value={hpMs}
              onChange={(e) => setHpMs(Number(e.target.value))}
            />
            <span className="tabular-nums">{hpMs}ms</span>
          </label>
          <label className="flex items-center gap-2">
            <span className="w-28">低优时长</span>
            <input
              type="range"
              min={200}
              max={2000}
              step={10}
              value={lpMs}
              onChange={(e) => setLpMs(Number(e.target.value))}
            />
            <span className="tabular-nums">{lpMs}ms</span>
          </label>
        </div>
      </div>

      {/* 底部状态模块（随时间变化）*/}
      <div className="mt-4 p-3 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-wrap items-center gap-4 text-sm">
        <div>
          <span className="text-gray-500 mr-2">count</span>
          <span className="font-mono">{count}</span>
        </div>
        <div>
          <span className="text-gray-500 mr-2">deferredCount</span>
          <span className="font-mono">{deferredCount}</span>
        </div>
        <div
          className={`px-2 py-0.5 rounded text-xs ${
            isStale
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
          }`}
        >
          {isStale ? "低优区域：值滞后 (stale)" : "同步：已更新"}
        </div>
        <div className="ml-auto text-xs text-gray-500 tabular-nums">
          {Math.round(currentSec * 1000)}ms / {timelineMs}ms
        </div>
      </div>
    </div>
  );
}
