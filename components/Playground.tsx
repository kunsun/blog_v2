"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
  UnstyledOpenInCodeSandboxButton,
  useActiveCode,
  SandpackConsole,
  useSandpackNavigation,
  LoadingOverlay,
  SandpackStack,
} from "@codesandbox/sandpack-react";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// 自定义 Header 控制组件
function PlaygroundHeader({
  onReset,
  onToggleLineNumbers,
  onFormat,
  showLineNumbers,
  isDark,
}: {
  onReset: () => void;
  onToggleLineNumbers: () => void;
  onFormat: () => void;
  showLineNumbers: boolean;
  isDark: boolean;
}) {
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();

  const containerCls = isDark
    ? "flex h-11 items-center justify-between px-3 sm:px-4 border-b border-zinc-800 bg-zinc-900/30 backdrop-blur"
    : "flex h-11 items-center justify-between px-3 sm:px-4 border-b border-zinc-200 bg-zinc-50/60 backdrop-blur supports-[backdrop-filter]:bg-zinc-50/40";
  const titleCls = isDark
    ? "text-[13px] font-medium text-zinc-300 ml-1"
    : "text-[13px] font-medium text-zinc-700 ml-1";
  const btnCls = isDark
    ? "p-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-700/60 transition-colors"
    : "p-1.5 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/70 transition-colors";

  const handleResetClick = () => {
    if (onReset) onReset();
    try {
      sandpack.resetAllFiles();
    } catch {}
  };

  const handleRunClick = () => {
    try {
      sandpack.runSandpack();
    } catch {}
  };

  const handleFormatClick = () => {
    if (onFormat) onFormat();
    try {
      // 简易格式化：去除行尾空白、统一换行、将 Tab 替换为两个空格
      const formatted = code
        .replace(/\r\n?/g, "\n")
        .replace(/\t/g, "  ")
        .replace(/[ \t]+$/gm, "");
      if (formatted !== code) {
        updateCode(formatted);
      }
    } catch {}
  };

  return (
    <div className={containerCls}>
      <div className="flex items-center gap-2">
        <span className={titleCls}>🎮 Code Playground</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={handleResetClick} className={btnCls} title="重置代码">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 000 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388z" />
          </svg>
        </button>

        <button
          onClick={onToggleLineNumbers}
          className={btnCls}
          title={showLineNumbers ? "隐藏行号" : "显示行号"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4h2v2H3V4zm0 4h2v2H3V8zm0 4h2v2H3v-2zm0 4h2v2H3v-2zM7 4h14v2H7V4zm0 4h14v2H7V8zm0 4h14v2H7v-2zm0 4h14v2H7v-2z" />
          </svg>
        </button>

        <button
          onClick={handleFormatClick}
          className={btnCls}
          title="格式化代码"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.5 4.5L11 6L9.5 7.5L8 6L9.5 4.5ZM7.5 9.5L6 8L4.5 9.5L6 11L7.5 9.5ZM12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7H13V9H21ZM21 13V11H13V13H21ZM21 17V15H13V17H21Z" />
          </svg>
        </button>

        <button onClick={handleRunClick} className={btnCls} title="刷新预览">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6V3l4 4-4 4V8c-2.76 0-5 2.24-5 5 0 1.01.3 1.95.82 2.74l-1.46 1.46A6.96 6.96 0 015 13c0-3.87 3.13-7 7-7zm6.18 2.26l1.46-1.46A6.96 6.96 0 0123 13c0 3.87-3.13 7-7 7v3l-4-4 4-4v3c2.76 0 5-2.24 5-5 0-1.01-.3-1.95-.82-2.74z" />
          </svg>
        </button>

        <UnstyledOpenInCodeSandboxButton
          className={btnCls}
          title="在 CodeSandbox 中打开"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM12 11L8 9V7L12 9L16 7V9L12 11ZM16 10V12L12 14L8 12V10L12 12L16 10Z" />
          </svg>
        </UnstyledOpenInCodeSandboxButton>
      </div>
    </div>
  );
}

// 自定义预览组件，带加载状态
function CustomPreview({ isDark }: { isDark: boolean }) {
  const { sandpack } = useSandpack();
  const { status } = sandpack;
  const [showLoadingDetails, setShowLoadingDetails] = useState(false);

  useEffect(() => {
    if (status === "running" && !showLoadingDetails) {
      setShowLoadingDetails(true);
      const timer = setTimeout(() => {
        setShowLoadingDetails(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, showLoadingDetails]);

  // 检查是否为加载状态
  const isLoading = status === "initializing" || status === "idle";

  if (isLoading) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-full ${
          isDark ? "bg-zinc-900 text-zinc-300" : "bg-zinc-50 text-zinc-600"
        }`}
      >
        <div className="text-center">
          <div
            className={`w-12 h-12 border-3 border-t-transparent rounded-full animate-spin mb-4 ${
              isDark ? "border-blue-400" : "border-blue-500"
            }`}
          />
          <div className="text-lg font-medium mb-2">
            📦 正在初始化代码环境...
          </div>
          {showLoadingDetails && (
            <div className="text-sm opacity-70 space-y-1">
              <div>• 加载代码模块</div>
              <div>• 安装依赖包</div>
              <div>• 准备预览环境</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (status === "timeout") {
    return (
      <div
        className={`flex flex-col items-center justify-center h-full ${
          isDark ? "bg-zinc-900 text-zinc-300" : "bg-zinc-50 text-zinc-600"
        }`}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">⏰</div>
          <div className="text-lg font-medium mb-2">加载超时</div>
          <div className="text-sm opacity-70 mb-4">
            请检查网络连接或代码是否有错误
          </div>
          <button
            onClick={() => sandpack.runSandpack()}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <SandpackPreview
      showOpenInCodeSandbox={false}
      showRefreshButton={false}
      showRestartButton={false}
      style={{ height: "100%" }}
      actionsChildren={
        <div
          className={`flex items-center gap-2 text-xs px-2 py-1 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              status === "running"
                ? "bg-green-500 animate-pulse"
                : "bg-yellow-500"
            }`}
          />
          <span>{status === "running" ? "🟢 运行中" : `🔄 ${status}`}</span>
        </div>
      }
    />
  );
}

// 自定义加载组件
function LoadingScreen({ isDark }: { isDark: boolean }) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div
        className={`flex flex-col items-center justify-center h-64 ${
          isDark ? "bg-zinc-900 text-zinc-300" : "bg-zinc-50 text-zinc-600"
        }`}
      >
        <div className="mb-4">
          <div
            className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${
              isDark ? "border-zinc-600" : "border-zinc-400"
            }`}
          />
        </div>
        <div className="text-sm">正在加载代码编辑器{dots}</div>
        <div className="text-xs mt-2 opacity-70">初始化 Sandpack bundle...</div>
      </div>
    </div>
  );
}

// 公共的 Playground 内容组件
function PlaygroundContent({
  showLineNumbers,
  showFileExplorer = false,
  isDark,
}: {
  showLineNumbers: boolean;
  showFileExplorer?: boolean;
  isDark: boolean;
}) {
  const [activeTab, setActiveTab] = useState<"preview" | "console">("preview");
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { sandpack } = useSandpack();

  // 确保组件在客户端完全挂载后再渲染，避免 SSR 不匹配
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 监听 Sandpack 的加载状态
  useEffect(() => {
    if (isMounted && sandpack) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 给一些时间让 Sandpack 完全初始化

      return () => clearTimeout(timer);
    }
  }, [isMounted, sandpack]);

  const tabButtonCls = (isActive: boolean) => {
    const baseClasses =
      "px-3 py-1.5 text-xs font-medium rounded-t border-b-2 transition-colors";
    if (isDark) {
      return `${baseClasses} ${
        isActive
          ? "text-white border-blue-400 bg-zinc-800/50"
          : "text-zinc-400 border-transparent hover:text-zinc-300 hover:bg-zinc-800/30"
      }`;
    } else {
      return `${baseClasses} ${
        isActive
          ? "text-zinc-900 border-blue-500 bg-zinc-100/50"
          : "text-zinc-600 border-transparent hover:text-zinc-800 hover:bg-zinc-100/30"
      }`;
    }
  };

  // 在客户端挂载完成前或正在加载时显示加载状态
  if (!isMounted || isLoading) {
    return <LoadingScreen isDark={isDark} />;
  }

  return (
    <div className="flex flex-col h-full">
      <SandpackLayout>
        {showFileExplorer && <SandpackFileExplorer />}
        <SandpackCodeEditor
          showTabs
          showLineNumbers={showLineNumbers}
          showInlineErrors
          wrapContent
          closableTabs
        />
        <div className="flex flex-col flex-1">
          {/* Tab 头部 */}
          <div
            className={`flex border-b ${
              isDark
                ? "border-zinc-700 bg-zinc-900/20"
                : "border-zinc-200 bg-zinc-50/40"
            }`}
          >
            <button
              onClick={() => setActiveTab("preview")}
              className={tabButtonCls(activeTab === "preview")}
            >
              🖥️ 预览
            </button>
            <button
              onClick={() => setActiveTab("console")}
              className={tabButtonCls(activeTab === "console")}
            >
              📝 控制台
            </button>
          </div>

          {/* Tab 内容区域 */}
          <div className="flex-1 overflow-hidden">
            {activeTab === "preview" ? (
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                showRestartButton={false}
                style={{ height: "100%" }}
                actionsChildren={
                  <div
                    className={`text-xs px-2 py-1 ${
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    <span>🔄 实时预览</span>
                  </div>
                }
              />
            ) : (
              <SandpackConsole
                standalone
                style={{ height: "100%" }}
                className="text-xs"
                maxMessageCount={100}
                showHeader={false}
              />
            )}
          </div>
        </div>
      </SandpackLayout>
    </div>
  );
}

// 完整的 Playground 组件
interface PlaygroundProps {
  template?: string;
  theme?: "light" | "dark" | "auto"; // auto: 跟随站点主题
  files: Record<string, string>;
  dependencies?: Record<string, string>;
  editorHeight?: number;
  showFileExplorer?: boolean;
}

export function Playground({
  template = "react",
  files,
  dependencies = {},
  editorHeight = 400,
  showFileExplorer = false,
}: PlaygroundProps) {
  const { resolvedTheme = "dark" } = useTheme();
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // 确保只在客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 将站点主题映射到 Sandpack 主题
  const sandpackTheme = resolvedTheme === "dark" ? "dark" : "light";

  const handleReset = () => {
    // 重置功能会通过 useSandpack hook 在子组件中处理
  };

  const handleToggleLineNumbers = () => {
    setShowLineNumbers((prev) => !prev);
  };

  const handleFormat = () => {
    // 格式化功能
    console.log("格式化代码");
  };

  // 如果还没有客户端渲染，显示服务端兼容的加载状态
  if (!isClient) {
    return (
      <div className="my-6 sandpack-playground-wider">
        <div className="border border-gray-600 rounded-lg overflow-hidden">
          <div className="flex items-center justify-center h-96 bg-zinc-900 text-zinc-300">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <div className="text-sm">正在初始化代码环境...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 sandpack-playground-wider">
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <SandpackProvider
          template={template as any}
          theme={sandpackTheme as any}
          files={files}
          customSetup={
            Object.keys(dependencies).length > 0 ? { dependencies } : undefined
          }
          options={
            {
              editorHeight: editorHeight,
              autorun: true, // 自动运行代码
              autoReload: true, // 代码变化时自动重新加载
              bundlerURL: undefined, // 使用默认的 bundler URL
              logLevel: "info", // 增加日志级别以便调试
            } as any
          }
        >
          <PlaygroundHeader
            onReset={handleReset}
            onToggleLineNumbers={handleToggleLineNumbers}
            onFormat={handleFormat}
            showLineNumbers={showLineNumbers}
            isDark={resolvedTheme === "dark"}
          />
          <PlaygroundContent
            showLineNumbers={showLineNumbers}
            showFileExplorer={showFileExplorer}
            isDark={resolvedTheme === "dark"}
          />
        </SandpackProvider>
      </div>
    </div>
  );
}

// 向后兼容的别名导出
export const CustomSandpackPlayground = Playground;
