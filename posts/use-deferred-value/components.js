"use client";

import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

// 工具：模拟计算开销（阻塞主线程一点点）
function doWork(count) {
  // 用整数运算+JSON序列化制造 CPU 压力
  let x = 0;
  for (let i = 0; i < count; i++) {
    x += (i * 2654435761) % 97;
  }
  try {
    JSON.stringify({ x });
  } catch {}
  return x;
}

// 进度光标动画（CSS 无依赖，内联样式即可）
function BusyCursor({ active }) {
  return (
    <span
      aria-hidden
      className="inline-block w-2 h-2 rounded-full ml-2 align-middle"
      style={{
        background:
          "radial-gradient(circle at center, rgba(255,200,0,0.95) 0 40%, rgba(255,200,0,0.1) 60% 100%)",
        boxShadow: active
          ? "0 0 10px rgba(255,200,0,0.9), 0 0 20px rgba(255,200,0,0.6)"
          : "none",
        transform: active ? "scale(1)" : "scale(0.8)",
        transition: "transform 120ms ease-in-out, box-shadow 150ms ease-in-out",
      }}
    />
  );
}

// 演示一：输入 vs 延迟值
export function TypingLagDemo() {
  const [text, setText] = useState("");
  const [work, setWork] = useState(20000); // 计算负载
  const deferredText = useDeferredValue(text);

  const isStale = text !== deferredText;

  // 用 deferredText 驱动一个昂贵计算，模拟渲染压力
  const expensive = useMemo(() => {
    // 放大负载：按输入长度线性增加
    const w = work + deferredText.length * 3000;
    return doWork(w);
  }, [deferredText, work]);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 my-6 bg-white dark:bg-gray-900">
      <h3 className="text-base font-semibold mb-3">演示一：输入与延迟值对比</h3>
      <div className="flex flex-col gap-3">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          输入点什么：
        </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="快速输入并观察下方两个面板的差异"
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
          {/* 立即值面板 */}
          <div className="rounded-lg p-3 border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-900/20">
            <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-1">
              即时值（跟手）
            </div>
            <div className="text-lg font-mono break-words">
              {text || "(空)"}
            </div>
          </div>

          {/* 延迟值面板 */}
          <div
            className={`rounded-lg p-3 border ${
              isStale
                ? "border-amber-300 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-900/20"
                : "border-sky-200 dark:border-sky-800/60 bg-sky-50/70 dark:bg-sky-900/20"
            }`}
          >
            <div className="text-xs flex items-center text-amber-700 dark:text-amber-300 mb-1">
              延迟值（低优）
              <BusyCursor active={isStale} />
            </div>
            <div className="text-lg font-mono break-words">
              {deferredText || "(空)"}
            </div>
          </div>
        </div>

        {/* 负载调节 */}
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
          <span className="w-20">工作负载</span>
          <input
            type="range"
            min={0}
            max={100000}
            step={500}
            value={work}
            onChange={(e) => setWork(Number(e.target.value))}
          />
          <span className="tabular-nums">{work}</span>
        </div>
      </div>
    </div>
  );
}

// 简单的种子随机数生成器（确保服务端和客户端一致）
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// 生成大数据列表
function useDataset(size) {
  return useMemo(() => {
    const arr = new Array(size).fill(0).map((_, i) => {
      const id = i + 1;
      const name = `Item ${id.toString().padStart(4, "0")}`;
      // 使用基于索引的种子，确保每次生成相同的结果
      const seed = i * 12345 + 67890;
      const randomValue = seededRandom(seed);
      const note = Math.floor(randomValue * 1000000)
        .toString(36)
        .slice(0, 8);
      return { id, name, note };
    });
    return arr;
  }, [size]);
}

// 骨架条
function SkeletonRow({ delay }) {
  return (
    <div
      className="h-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

// 演示二：大列表检索
export function DeferredSearch() {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(2000);
  const [work, setWork] = useState(6000);
  const data = useDataset(size);

  // 将“昂贵过滤”绑定到延迟值
  const deferredQuery = useDeferredValue(query);
  const stale = deferredQuery !== query;

  const filtered = useMemo(() => {
    // 计算压力：按结果数量+额外工作量扩大
    const lower = deferredQuery.toLowerCase();
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (
        !deferredQuery ||
        item.name.toLowerCase().includes(lower) ||
        item.note.toLowerCase().includes(lower)
      ) {
        res.push(item);
        // 按每条记录施加一点 CPU 压力
        doWork(work / 50);
      }
    }
    return res;
  }, [data, deferredQuery, work]);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 my-6 bg-white dark:bg-gray-900">
      <h3 className="text-base font-semibold mb-3">
        演示二：大列表检索（延迟渲染）
      </h3>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键字，快速连敲观察列表区域动效"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
              stale
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
            }`}
          >
            {stale ? "滞后中" : "同步"}
            <BusyCursor active={stale} />
          </div>

          <div className="ml-auto flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
            <label className="flex items-center gap-2">
              <span className="w-14">数据量</span>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
              <span className="tabular-nums">{size}</span>
            </label>
            <label className="flex items-center gap-2">
              <span className="w-16">工作负载</span>
              <input
                type="range"
                min={0}
                max={50000}
                step={500}
                value={work}
                onChange={(e) => setWork(Number(e.target.value))}
              />
              <span className="tabular-nums">{work}</span>
            </label>
          </div>
        </div>

        {/* 列表区域 */}
        <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
          <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
            <span>匹配结果：{filtered.length} 项</span>
            {stale && <span className="italic">计算中…</span>}
          </div>

          <div className="p-3 max-h-72 overflow-auto space-y-2 bg-white dark:bg-gray-900">
            {/* 骨架占位 */}
            {stale && (
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonRow key={i} delay={i * 40} />
                ))}
              </div>
            )}

            {/* 结果列表（淡入）*/}
            {!stale && (
              <ul className="animate-in fade-in duration-200">
                {filtered.slice(0, 200).map((it) => (
                  <li
                    key={it.id}
                    className="flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                  >
                    <span className="text-gray-400 w-14 tabular-nums">
                      #{it.id}
                    </span>
                    <span className="font-mono">{it.name}</span>
                    <span className="text-gray-400">—</span>
                    <span className="text-gray-500">{it.note}</span>
                  </li>
                ))}
                {filtered.length > 200 && (
                  <li className="text-xs text-gray-500 mt-1">
                    … 仅显示前 200 条
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
