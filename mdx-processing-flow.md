# MDX 处理流程图

```mermaid
graph TD
    A[原始 MDX 文本] --> B[MDX Parser]
    B --> C[Markdown AST]
    
    C --> D[remarkPlugins 处理]
    D --> E[remarkSmartpants<br/>智能标点转换]
    E --> F[remarkGfm<br/>GitHub Markdown 支持]
    F --> G[remarkMdxEvalCodeBlock<br/>自定义代码块处理]
    
    G --> H[处理后的 Markdown AST]
    H --> I[Markdown → HTML 转换]
    I --> J[HTML AST]
    
    J --> K[rehypePlugins 处理]
    K --> L[rehypePrettyCode<br/>代码语法高亮]
    
    L --> M[最终 HTML AST]
    M --> N[React 组件渲染]
    N --> O[最终页面输出]
    
    style A fill:#e1f5fe
    style C fill:#fff3e0
    style H fill:#fff3e0
    style J fill:#f3e5f5
    style M fill:#f3e5f5
    style O fill:#e8f5e8
    
    classDef remarkPhase fill:#fff8e1,stroke:#ff8f00,stroke-width:2px
    classDef rehypePhase fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    
    class E,F,G remarkPhase
    class L rehypePhase
```

## 处理阶段详解

### Remark 阶段（Markdown 处理）
```
原始文本 → Markdown AST → 处理后的 Markdown AST
```

**在你的代码中：**
```typescript
remarkPlugins: [
  remarkSmartpants,        // 智能标点：-- → —, '' → ""
  remarkGfm,              // GitHub 表格、删除线等语法
  [remarkMdxEvalCodeBlock, filename] // 自定义代码块处理
]
```

### Rehype 阶段（HTML 处理）
```
HTML AST → 处理后的 HTML AST → React 组件
```

**在你的代码中：**
```typescript
rehypePlugins: [
  [rehypePrettyCode, {
    theme,                  // 代码主题
    keepBackground: false   // 不保留背景色
  }]
]
```

## 实际效果示例

### 输入 MDX：
```markdown
## 代码示例

这是一个 JavaScript 函数：

```js
function hello() {
  console.log("Hello World!");
}
```

支持 GFM 表格：
| 名称 | 类型 |
|------|------|
| foo  | bar  |
```

### 经过处理后：
1. **remark 阶段**：解析 Markdown 语法，处理表格、代码块
2. **rehype 阶段**：为代码添加语法高亮，生成带样式的 HTML
3. **最终输出**：带有语法高亮的 React 组件

## 插件执行顺序
插件按数组顺序执行，后面的插件会处理前面插件的输出结果。
