"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Header() {
  const { resolvedTheme = "dark", setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);
  return (
    <div className="bg-color transition-all border-b border-[0.5px] border-neutral-100 dark:border-neutral-900 sticky h-max top-0 z-[39] ">
      <div className="relative flex justify-between items-center max-w-2xl mx-auto px-5 md:px-3 h-[60px]">
        <div></div>
        {mounted && (
          <div
            style={{ position: "relative", width: "28px", height: "28px" }}
            className="cursor-pointer "
            onClick={() => {
              setTheme(resolvedTheme === "light" ? "dark" : "light");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 50 50"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: isDarkMode ? "scale(0)" : "scale(1)",
                transition: "transform 0.5s",
              }}
            >
              <circle cx="25" cy="25" r="10" fill="dark" />
              <g fill="dark">
                <circle cx="25" cy="5" r="2" />
                <circle cx="25" cy="45" r="2" />
                <circle cx="5" cy="25" r="2" />
                <circle cx="45" cy="25" r="2" />
                <circle cx="38" cy="38" r="2" />
                <circle cx="38" cy="12" r="2" />
                <circle cx="12" cy="38" r="2" />
                <circle cx="12" cy="12" r="2" />
              </g>
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="6 2 50 50"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: isDarkMode ? "scale(1) rotate(125deg)" : "scale(0)",
                transition: "transform 0.5s",
              }}
            >
              <path
                d="M25 10 a15 15 0 0 1 0 30 a25 25 0 0 0 0 -30"
                fill="white"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
