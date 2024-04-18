---
path: "/webpack"
title: "Webpack"
date: "2021-02-02"
tags:
  - Webpack
---

## Loader

定义：loader 只是一个 Javascript 模块，此函数导出为函数

```js
module.exports = function (source) {
  return source
}
```

多个 loader 串行执行，从后到前执行，类似 Compose

## webpack 打包结果分析

```js
;(function (modules) {
  // ...
})({
  "./src/hello.js": function () {
    // ...
  },
  "./src/index.js": function () {
    // ...
  },
})
```

1. 打包结果就是一个 IIFE，称之为 webpackBootstrap，参数是 modules：modules 对象的 key 是依赖路径，value 是经过简单处理后的脚本
2. 打包结果中，定义了一个重要的模块加载函数 **webpack_require**
3. 我们首先使用 **webpack_require** 加载函数去加载入口模块 ./src/index.js
4. 加载函数  **webpack_require** 使用了闭包变量 installedModules，它的作用是将已加载过的模块结果保存在内存中。

## webpack 工作的基本原理

1. 配置读取：读取 webpack.config.js 的配置、或者命令行
2. 实例化所需的 webpack 插件，在 webpack 时间流上挂载钩子，这样在合适的构建过程中，插件具备了改动产出结果的能力
3. 以入口文件为开始，进行依赖收集； 通过 loader 对依赖文件进行编译；编译好之后生成 AST 抽象语法树；分析文件依赖关系，将不同模块化语法替换为**webpack_require**,使用自己的加载器进行模块化实现
4. 产出结果，依据开发者的配置，将结果打包到目录下

webpack 和插件采用基于事件流的发布订阅模式，监听某些关键过程，在这些环节中执行插件任务。

## 执行步骤：

1. 加载 loaded
2. 封存 sealed
3. 优化 optimized
4. 分块 chunked
5. 哈希 hashed
6. 重新创建 restored

## 抽象语法树 AST

可以用 obj 表示，分析代码的依赖关系

## compiler 和 compilation

webpack 的构建过程是通过 compiler 控制流程，compilation 进行解析。在开发插件时，我们可以从 compiler 对象中拿到所有和 webpack 主环境相关的内容，包括事件钩子。

compiler 对象和 compilation 对象都继承自 tapable，tapable.js 这个库暴露了所有和事件相关的 pub/sub 的方法。

### compiler 对象

webpack 的骨架，或中枢神经。
它的实例包含了完整的 webpack 配置，全局只有一个 compiler 实例，
暴露了很多钩子 Hooks：

```js
//基本写法
compiler.hooks.someHook.tap(...)
// 读取entry配置完成后
compiler.hooks.entryOption.tap(...)
// 资源输出之前
compiler.hooks.emit.tap(...)
```

### compilation 对象

当 webpack 以开发模式运行时，每当检测到文件变化，一个新的 compilation 对象将被创建。这个对象包含了当前的模块资源、编译生成资源、变化的文件等信息。也就是说，所有构建过程中产生的构建数据都存储在该对象上，它也掌控着构建过程中的每一个环节。该对象也提供了很多事件回调供插件做扩展。
compilation 也暴露了与模块和依赖有关的粒度更小的钩子:

## Loader

```js
module.exports = function (source) {
  // 获取开发者配置的 options
  const options = loaderUtils.getOptions(this)
  // some magic...
  // return content
  this.callback(null, content)
}
```

## Plugin

我们反复提到过 webpack 事件流机制，也就是说在 webpack 构建的生命周期中，会广播许多事件。
loader 和 plugin 的差异：

1. loader 其实就是一个转换器，执行单纯的文件转换操作。
2. plugin 是一个扩展器，它丰富了 webpack 本身，在 loader 过程结束后，webpack 打包的整个过程中，weback plugin 并不直接操作文件，而是基于事件机制工作，监听 webpack 打包过程中的某些事件，见缝插针，修改打包结果。

一个自定义 webpack plugin 的骨架结构就是一个带有 apply 方法的 class：

```js
class CustomPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    // 相关钩子注册回调
    compiler.hooks.someHook.tap("CustomPlugin", () => {
      // magic here...
    })

    // 打印出此时 compiler 暴露的钩子
    for (var hook of Object.keys(compiler.hooks)) {
      console.log(hook)
    }
  }
}

module.exports = customPlugin
```

```js
class CustomPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(
      "CustomPlugin",
      function (compilation, callback) {
        compilation.hooks.someOtherHook.tap("SomePlugin", function () {
          // some magic here
        })
      }
    )
  }
}

module.exports = customPlugin
```

实现 webpack plugin 的套路：

1. 定义一个 JavaScript class 函数，或在函数原型（prototype）中定义一个以 compiler 对象为参数的 apply 方法。
2. apply 函数中通过 compiler 插入指定的事件钩子，在钩子回调中拿到 compilation 对象。
3. 使用 compilation 操纵修改 webapack 打包内容。
