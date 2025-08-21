"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const scrollTop = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      const ratio = height > 0 ? scrollTop / height : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 h-[2px] w-full z-[60] bg-transparent"
    >
      <div
        className="h-full origin-left transition-[width] duration-150 opacity-40"
        style={{
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg,var(--ls-link-text-color),var(--rx-logseq-06))",
        }}
      />
    </div>
  );
}
