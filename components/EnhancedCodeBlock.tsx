"use client";

import { useState } from "react";

interface EnhancedCodeBlockProps {
  children: React.ReactNode;
  title?: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function EnhancedCodeBlock({
  children,
  title,
  language,
  showLineNumbers = false,
  className = "",
}: EnhancedCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCopy = async () => {
    if (typeof children === "string") {
      await navigator.clipboard.writeText(children);
    } else {
      // Extract text content from React element
      const textContent = extractTextContent(children);
      await navigator.clipboard.writeText(textContent);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`relative group ${
        isFullscreen ? "fixed inset-4 z-50 bg-black/80 p-4 overflow-auto" : ""
      }`}
    >
      {title && (
        <div className="flex items-center justify-between bg-[var(--ls-tertiary-background-color)] border border-b-0 border-[var(--ls-border-color)] px-4 py-2 rounded-t-lg text-sm font-mono text-[var(--ls-muted-text-color)]">
          <span className="flex items-center gap-2">
            {language && (
              <span className="px-2 py-1 bg-[var(--ls-quaternary-background-color)] rounded text-xs">
                {language}
              </span>
            )}
            {title}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-1 hover:bg-[var(--ls-quaternary-background-color)] rounded transition-colors"
              title={isFullscreen ? "退出全屏" : "全屏显示"}
            >
              {isFullscreen ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleCopy}
              className={`px-2 py-1 text-xs font-mono rounded transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-[var(--ls-quaternary-background-color)] hover:bg-[var(--ls-border-color)]"
              }`}
            >
              {copied ? "已复制" : "复制"}
            </button>
          </div>
        </div>
      )}
      <div className={`relative ${title ? "rounded-t-none" : ""} ${className}`}>
        {!title && (
          <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={toggleFullscreen}
              className="p-1 bg-[var(--ls-tertiary-background-color)] hover:bg-[var(--ls-quaternary-background-color)] rounded transition-colors text-[var(--ls-muted-text-color)]"
              title={isFullscreen ? "退出全屏" : "全屏显示"}
            >
              {isFullscreen ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleCopy}
              className={`px-2 py-1 text-xs font-mono rounded transition-all ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-[var(--ls-tertiary-background-color)] hover:bg-[var(--ls-quaternary-background-color)]"
              }`}
            >
              {copied ? "✓" : "复制"}
            </button>
          </div>
        )}
        <pre className="bg-[var(--ls-codeblock-bg)] border border-[var(--ls-codeblock-border)] rounded-lg p-4 overflow-x-auto text-sm font-mono">
          <code className="text-[var(--ls-primary-text-color)]">
            {typeof children === "string"
              ? children
              : extractTextContent(children)}
          </code>
        </pre>
      </div>
    </div>
  );
}

function extractTextContent(element: any): string {
  if (typeof element === "string") {
    return element;
  }
  if (typeof element === "number") {
    return element.toString();
  }
  if (element?.props?.children) {
    if (Array.isArray(element.props.children)) {
      return element.props.children.map(extractTextContent).join("");
    }
    return extractTextContent(element.props.children);
  }
  return "";
}
