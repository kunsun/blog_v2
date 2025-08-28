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
  useSandpackConsole,
} from "@codesandbox/sandpack-react";

import { useState, useEffect, useCallback } from "react";
import * as prettier from "prettier/standalone";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";
import { useTheme } from "next-themes";

const useIsPrettier = () => {
  const [prettier, setPrettier] = useState(false);
  const { sandpack } = useSandpack();

  useEffect(() => {
    const activeFile = sandpack.files[sandpack.activeFile];
    if (!activeFile) return;

    const fileExtension = sandpack.activeFile.split(".").pop()?.toLowerCase();
    if (!fileExtension) return;

    const prettierExtensions = [
      "js",
      "ts",
      "jsx",
      "tsx",
      "scss",
      "css",
      "html",
    ];
    const isPrettierSupported = !(
      activeFile.readOnly || !prettierExtensions.includes(fileExtension)
    );

    setPrettier(isPrettierSupported);
  }, [sandpack.files, sandpack.activeFile]);

  return { prettier };
};

// Hook to handle Prettier formatting
const usePrettier = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { sandpack } = useSandpack();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        prettifyCode();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sandpack.files, sandpack.activeFile]);

  const debouncedUpdate = useCallback(
    (code: string) => {
      sandpack.updateCurrentFile(code, false);
    },
    [sandpack.activeFile, sandpack.files]
  );

  const prettifyCode = async () => {
    const activeFile = sandpack.files[sandpack.activeFile];
    const currentCode = activeFile.code;

    try {
      const fileExtension =
        sandpack.activeFile.split(".").pop()?.toLowerCase() ?? "";
      let formattedCode = currentCode;
      // 只处理js/jsx/ts/tsx
      if (["js", "jsx", "ts", "tsx"].includes(fileExtension)) {
        console.log({ prettier });
        formattedCode = await prettier.format(currentCode, {
          parser:
            fileExtension === "ts" || fileExtension === "tsx"
              ? "babel-ts"
              : "babel",
          plugins: [prettierPluginBabel, prettierPluginEstree],
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: "es5",
          printWidth: 80,
        });
      }
      setError(false);
      setSuccess(true);
      debouncedUpdate(formattedCode);
    } catch (error) {
      setError(true);
      console.error("Prettier formatting error:", error);
    } finally {
      setTimeout(() => {
        setSuccess(false);
      }, 500);
    }
  };

  return { error, success, prettifyCode };
};

// 自定义 Header 控制组件
function PlaygroundHeader({
  onToggleLineNumbers,
  showLineNumbers,
  isDark,
}: {
  onToggleLineNumbers: () => void;
  showLineNumbers: boolean;
  isDark: boolean;
}) {
  const { prettier } = useIsPrettier();
  const { error, success, prettifyCode } = usePrettier();

  const containerCls = isDark
    ? "flex h-11 items-center justify-between px-3 sm:px-4 border-b border-zinc-800 bg-zinc-900/30 backdrop-blur"
    : "flex h-11 items-center justify-between px-3 sm:px-4 border-b border-zinc-200 bg-zinc-50/60 backdrop-blur supports-[backdrop-filter]:bg-zinc-50/40";
  const titleCls = isDark
    ? "text-[13px] font-medium text-zinc-300 ml-1"
    : "text-[13px] font-medium text-zinc-700 ml-1";
  const btnCls = isDark
    ? "p-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-700/60 transition-colors"
    : "p-1.5 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/70 transition-colors";

  // sandpack 相关操作已在外部处理，这里不再需要 sandpack props
  const handleResetClick = () => {
    window.location.reload(); // 简单重载页面实现重置
  };

  const handleFormatClick = () => {
    prettifyCode();
  };

  return (
    <div className={containerCls}>
      <div className="flex items-center gap-2">
        <span className={titleCls}>Code Playground</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={handleResetClick} className={btnCls} title="重置代码">
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <mask id="reset-icon-mask">
              <rect x="0" y="0" width="24" height="24" fill="black"></rect>
              <rect x="9" y="0" width="16" height="24" fill="white"></rect>
            </mask>
            <line
              x1="5"
              y1="19"
              x2="5"
              y2="5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></line>
            <polygon
              points="19 20 9 12 19 4 19 20"
              mask="url(#reset-icon-mask)"
              fill="currentColor"
            ></polygon>
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

        {prettier && (
          <button
            onClick={handleFormatClick}
            className={btnCls}
            title="格式化代码"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5 4.5L11 6L9.5 7.5L8 6L9.5 4.5ZM7.5 9.5L6 8L4.5 9.5L6 11L7.5 9.5ZM12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7H13V9H21ZM21 13V11H13V13H21ZM21 17V15H13V17H21Z" />
            </svg>
          </button>
        )}

        <UnstyledOpenInCodeSandboxButton
          title="在 CodeSandbox 中打开"
          style={{
            color: "inherit",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <mask id="external-icon-mask">
              <rect x="0" y="0" width="24" height="24" fill="white"></rect>
              <rect x="10" y="0" width="16" height="14" fill="black"></rect>
            </mask>
            <rect
              x="3"
              y="6"
              width="15"
              height="15"
              rx="2"
              mask="url(#external-icon-mask)"
              fill="currentColor"
            ></rect>
            <path
              d="M 10 14 L 20 4 h -6 h 6 v 6"
              stroke="currentColor"
              fill="none"
            ></path>
          </svg>
        </UnstyledOpenInCodeSandboxButton>
      </div>
    </div>
  );
}

// 自定义控制台组件
function CustomConsole({ isDark, logs }: { isDark: boolean; logs: any[] }) {
  // 只处理 console.log，过滤其他类型
  const logMessages = logs.filter((log) => log.method === "log");

  // 格式化消息内容
  const formatMessage = (data: any[]): string => {
    if (!data) return "";

    return data
      .map((item) => {
        if (typeof item === "object") {
          try {
            return JSON.stringify(item, null, 2);
          } catch {
            return String(item);
          }
        }
        return String(item);
      })
      .join(" ");
  };

  return (
    <div className="h-full flex flex-col">
      {/* 控制台内容 */}
      <div
        className={`flex-1 overflow-auto p-4 space-y-2 ${
          isDark ? "bg-zinc-900/30" : "bg-white"
        }`}
      >
        {logMessages.length === 0 ? (
          <div
            className={`text-center py-8 ${
              isDark ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            <div className="text-sm">暂无控制台输出</div>
            <div className="text-xs mt-1">使用 console.log() 输出内容</div>
          </div>
        ) : (
          logMessages.map((log, index) => (
            <div
              key={index}
              className={`flex gap-2 items-start font-mono whitespace-pre-wrap ${
                isDark ? "text-zinc-200" : "text-zinc-700"
              } ${
                index !== logMessages.length - 1
                  ? `pb-4 mb-4 border-b border-dashed ${
                      isDark ? "border-zinc-700" : "border-zinc-200"
                    }`
                  : ""
              }`}
              style={{
                animation: "fadeFromTransparent 300ms",
              }}
            >
              {/* 消息内容 */}
              <div className="flex-1 min-w-0">
                <div className="block animate-fade-in">
                  {formatMessage(log.data || [])}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 包装组件，管理 sandpack 实例
function PlaygroundWrapper({
  showLineNumbers,
  showFileExplorer = false,
  isDark,
  onToggleLineNumbers,
}: {
  showLineNumbers: boolean;
  showFileExplorer?: boolean;
  isDark: boolean;
  onToggleLineNumbers: () => void;
}) {
  const { sandpack } = useSandpack();

  return (
    <>
      <PlaygroundHeader
        onToggleLineNumbers={onToggleLineNumbers}
        showLineNumbers={showLineNumbers}
        isDark={isDark}
      />
      <PlaygroundContent
        showLineNumbers={showLineNumbers}
        showFileExplorer={showFileExplorer}
        isDark={isDark}
      />
    </>
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
  const { sandpack } = useSandpack();
  const { logs, reset } = useSandpackConsole({
    maxMessageCount: 150,
    resetOnPreviewRestart: true,
  });

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

  // 处理刷新预览
  const handleRefreshPreview = () => {
    try {
      sandpack.runSandpack();
    } catch (error) {
      console.error("刷新预览失败:", error);
    }
  };

  // 处理清空控制台
  const handleClearConsole = () => {
    try {
      reset();
    } catch (error) {
      console.error("清空控制台失败:", error);
    }
  };

  // 动态按钮样式
  const actionButtonCls = isDark
    ? "p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/60 transition-colors"
    : "p-1.5 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/70 transition-colors";

  return (
    <div className="flex flex-col h-full">
      <SandpackLayout>
        {showFileExplorer && <SandpackFileExplorer />}
        <SandpackCodeEditor
          showTabs
          showLineNumbers={showLineNumbers}
          wrapContent
          closableTabs
        />
        <div className="flex flex-col flex-1">
          {/* Tab 头部 */}
          <div
            className={`flex items-center justify-between border-b ${
              isDark
                ? "border-zinc-700 bg-zinc-900/20"
                : "border-zinc-200 bg-zinc-50/40"
            }`}
          >
            {/* 左侧 Tab 按钮 */}
            <div className="flex">
              <button
                onClick={() => setActiveTab("preview")}
                className={tabButtonCls(activeTab === "preview")}
              >
                预览
              </button>
              <button
                onClick={() => setActiveTab("console")}
                className={tabButtonCls(activeTab === "console")}
              >
                控制台
              </button>
            </div>

            {/* 右侧动态按钮 */}
            <div className="flex items-center px-2">
              {activeTab === "preview" ? (
                <button
                  onClick={handleRefreshPreview}
                  className={actionButtonCls}
                  title="刷新预览"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 21v-5h5" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleClearConsole}
                  className={actionButtonCls}
                  title="清空控制台"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Tab 内容区域 */}
          <div className="flex-1 overflow-hidden relative">
            <div
              className={`absolute inset-0 ${
                activeTab === "preview" ? "block" : "hidden"
              }`}
            >
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                style={{ height: "100%" }}
              />
            </div>
            <div
              className={`absolute inset-0 ${
                activeTab === "console" ? "block" : "hidden"
              }`}
            >
              <CustomConsole isDark={isDark} logs={logs} />
            </div>
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

  // 将站点主题映射到 Sandpack 主题
  const sandpackTheme = resolvedTheme === "dark" ? "dark" : "light";

  const handleToggleLineNumbers = () => {
    setShowLineNumbers((prev) => !prev);
  };

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
            } as any
          }
        >
          <PlaygroundHeader
            onToggleLineNumbers={handleToggleLineNumbers}
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
