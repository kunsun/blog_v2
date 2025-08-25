"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
  UnstyledOpenInCodeSandboxButton,
} from "@codesandbox/sandpack-react";
import { useState } from "react";

// 自定义 Header 控制组件
function PlaygroundHeader({
  onReset,
  onToggleLineNumbers,
  onFormat,
  showLineNumbers,
}: {
  onReset: () => void;
  onToggleLineNumbers: () => void;
  onFormat: () => void;
  showLineNumbers: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-600 rounded-t-lg">
      <div className="flex items-center gap-2">
        <span className="text-white text-sm font-medium ml-2">
          🎮 Code Playground
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="重置代码"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 000 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388z" />
          </svg>
        </button>

        <button
          onClick={onToggleLineNumbers}
          className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title={showLineNumbers ? "隐藏行号" : "显示行号"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4h2v2H3V4zm0 4h2v2H3V8zm0 4h2v2H3v-2zm0 4h2v2H3v-2zM7 4h14v2H7V4zm0 4h14v2H7V8zm0 4h14v2H7v-2zm0 4h14v2H7v-2z" />
          </svg>
        </button>

        <button
          onClick={onFormat}
          className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="格式化代码"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.5 4.5L11 6L9.5 7.5L8 6L9.5 4.5ZM7.5 9.5L6 8L4.5 9.5L6 11L7.5 9.5ZM12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7H13V9H21ZM21 13V11H13V13H21ZM21 17V15H13V17H21Z" />
          </svg>
        </button>

        <UnstyledOpenInCodeSandboxButton
          className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
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

// 公共的 Playground 内容组件
function CustomPlaygroundContent({
  showLineNumbers,
  showFileExplorer = false,
}: {
  showLineNumbers: boolean;
  showFileExplorer?: boolean;
}) {
  const { sandpack } = useSandpack();

  const handleReset = () => {
    sandpack.resetAllFiles();
  };

  const handleFormat = () => {
    // 这是一个简化的格式化功能
    // 在实际应用中，你可能需要使用更复杂的格式化工具
    console.log("格式化代码功能需要集成具体的格式化工具");
  };

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
        <SandpackPreview
          showOpenInCodeSandbox={false}
          showRefreshButton={false}
          actionsChildren={
            <span className="text-xs text-gray-500">实时预览</span>
          }
        />
      </SandpackLayout>
    </div>
  );
}

// 完整的自定义 Sandpack Playground 组件
interface CustomSandpackPlaygroundProps {
  template?: string;
  theme?: string;
  files: Record<string, string>;
  dependencies?: Record<string, string>;
  editorHeight?: number;
  showFileExplorer?: boolean;
}

export function CustomSandpackPlayground({
  template = "react",
  theme = "dark",
  files,
  dependencies = {},
  editorHeight = 400,
  showFileExplorer = false,
}: CustomSandpackPlaygroundProps) {
  const [showLineNumbers, setShowLineNumbers] = useState(true);

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

  return (
    <div className="my-6">
      <div className="border border-gray-600 rounded-lg overflow-hidden">
        <SandpackProvider
          template={template as any}
          theme={theme as any}
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
            onReset={handleReset}
            onToggleLineNumbers={handleToggleLineNumbers}
            onFormat={handleFormat}
            showLineNumbers={showLineNumbers}
          />
          <CustomPlaygroundContent
            showLineNumbers={showLineNumbers}
            showFileExplorer={showFileExplorer}
          />
        </SandpackProvider>
      </div>
    </div>
  );
}
