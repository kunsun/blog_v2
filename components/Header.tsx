"use client";
import { useTheme } from "next-themes";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  console.log(resolvedTheme);
  const isDarkMode = resolvedTheme === "dark";
  return (
    <div className="bg-color transition-all border-b border-neutral-200 dark:border-neutral-900 sticky h-max top-0 z-[39] ">
      <div className="relative flex justify-between items-center max-w-2xl mx-auto h-[60px]">
        <div></div>
        <div
          style={{ position: "relative", width: "35px", height: "35px" }}
          className="cursor-pointer "
          onClick={() => {
            setTheme(resolvedTheme === "light" ? "dark" : "light");
          }}
        >
          <svg
            width="35"
            height="35"
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
            width="35"
            height="35"
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
      </div>
    </div>
  );
}
