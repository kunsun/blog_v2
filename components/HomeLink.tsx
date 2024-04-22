"use client";

import { usePathname } from "next/navigation";
import Link from "./Link";

export default function HomeLink() {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <Link
      href="/"
      className={[
        "font-sans",
        "inline-block text-2xl font-black",
        isActive ? "" : "hover:scale-[1.02]",
      ].join(" ")}
    >
      <span
        style={{
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          transition: "--myColor1 0.2s ease-out, --myColor2 0.2s ease-in-out",
        }}
      >
        kunsun
      </span>
    </Link>
  );
}
