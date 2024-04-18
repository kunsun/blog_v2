---
path: "/tree-shaking"
title: "Tree Shaking"
date: "2021-02-02"
tags:
  - Webpack
---

uglify 擦除无用代码

## 概念

去掉 dead code
DCE dead code elimination

1. 代码不会被执行
2. 代码执行的结果不会被用到
3. 代码只会影响死变量

## webpack 配置

webpack4 的 mode 设置为 production 自动开启 tree-shaking

## 原理

利用 ES6 模块化，ES6 模块的特点：

1. import 只能在顶层出现
2. import 后就不可以修改

## 注意点

代码不能有副作用，不然 tree shaking 会失效

1. 必须使用 ES6 语法

## ES 模块化为什么要设计成静态的

一个明显的优势是：通过静态分析，我们能够分析出导入的依赖。如果导入的模块没有被使用，我们便可以通过 tree shaking 等手段减少代码体积，进而提升运行性能。这就是基于 ESM 实现 tree shaking 的基础。

## ES 模块化的静态性带来了限制：

只能在文件顶部 import 依赖
export 导出的变量类型严格限制
变量不允许被重新绑定，import 的模块名只能是字符串常量，即不可以动态确定依赖

我们可以通过作用域分析，分析出代码里变量所属的作用域以及它们之间的引用关系，进而可以推导出变量和导入依赖变量的引用关系，在没有明显引用时，就可以进行去冗余。
