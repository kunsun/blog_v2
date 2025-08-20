"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "./Link";
import Image from "next/image";

export default function Header() {
  const { resolvedTheme = "dark", setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);
  return (
    <div className="header-blur relative flex justify-between items-center px-4 sm:px-6 h-[60px] max-w-2xl w-full mx-auto">
      {
        <Link href="/" className="font-sans inline-block text-2xl font-black">
          <div className="mt-3 flex items-center">
            <Image src="/logo_2.png" width={28} height={28} alt="" />
            {/* <div className="text-[16px] ml-[4px] font-mono">kunsun</div> */}
          </div>
        </Link>
      }

      <div className="flex items-center space-x-4">
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
