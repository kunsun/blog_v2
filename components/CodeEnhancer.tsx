"use client";
import { useEffect } from "react";

export default function CodeEnhancer() {
  useEffect(() => {
    const selector = "[data-rehype-pretty-code-fragment]";
    const fragments = Array.from(
      document.querySelectorAll<HTMLElement>(selector)
    );
    fragments.forEach((f) => {
      if (f.querySelector(".code-copy-btn")) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy-btn";
      btn.setAttribute("aria-label", "复制代码");
      btn.innerText = "Copy";
      btn.addEventListener("click", () => {
        const code = f.querySelector("code");
        if (!code) return;
        const text = code.innerText;
        navigator.clipboard
          .writeText(text)
          .then(() => {
            const old = btn.innerText;
            btn.innerText = "Copied";
            btn.classList.add("copied");
            setTimeout(() => {
              btn.innerText = old;
              btn.classList.remove("copied");
            }, 1800);
          })
          .catch(() => {
            btn.innerText = "Error";
            setTimeout(() => (btn.innerText = "Copy"), 1500);
          });
      });
      f.appendChild(btn);
    });
  }, []);
  return null;
}
