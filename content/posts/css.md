---
path: "/css"
title: "CSS知识点"
date: "2021-02-02"
tags:
  - CSS
---

默认 box-sizing: content-box; 计算 content
box-sizing: border-box; 计算 border+padding+content

## BFC / Block Formatting Context

一个 BFC 是一个独立容器，决定了元素如何对其内容进行定位，以及与其他元素的关系与相互作用。
相关链接：https://tech.youzan.com/css-margin-collapse/

BFC 如何定位：

1. 内部的 Box 会垂直一个接一个放置
2. Box 垂直方向的距离有 margin 决定，属于同一个 BFC 的两个相邻的（没有被 padding、border、clear 和 line box 分隔开）盒子（可能是父子元素，也可能是兄弟元素）margin 会发生重叠
3. BFC 的区域不会与 float Box 重叠
4. BFC 是页面上的独立容器，容器里面的元素不会在布局上影响到外面的元素
5. 生成 BFC 的元素不会和在流中的子元素发生空白边折叠
6. BFC 高度包含浮动元素
7. 处于同一个 BFC 中的元素相互影响，可能会发生 margin collapse
8. 浮动盒的区域不会叠加到 BFC 上

满足一个条件即可触发 BFC：

1. html 根元素
2. float 的值不为 none
3. overflow 的值不为 visible
4. display 的值为 inline-block, table-cell, table-caption
5. position 的值为 absolute 或 fixed

经典问题：

1. 高度坍塌， margin 重叠

## CSS3 新特性

1. border-image
2. linear-gradient
3. transition
4. flex

## Flexbox

flex 布局

## 一些兼容性问题

1. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

## display:none 与 visibility:hidden 的区别

display : none 隐藏对应的元素，在文档布局中不再分配空间（回流+重绘）
visibility:hidden 隐藏对应的元素，在文档布局中仍保留原来的空间（重绘）

## 浮动元素

浮动定位不属于正常的页面流

浮动带来的问题：

1. 父元素的高度无法被撑开，影响与父元素同级的元素
2. 与浮动元素同级的非浮动元素（内联元素）会跟随其后
3. 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

清除浮动的方式：

1. 父级 div 定义 height（不推荐）
2. 最后一个浮动元素后加空 div，添加样式 clear:both（不推荐）
3. 用伪元素 after 清除（推荐）
4. 包含浮动元素的父标签添加样式 overflow 不为 visible（推荐，但注意 position 带来的问题）
5. 父级 div 定义 zoom（IE8 以下）

## 上下 margin 重合问题

W3C 文章：https://www.w3.org/TR/CSS2/box.html#collapsing-margins
如何避免外边距叠加：

1. 浮动元素不会与任何元素发生叠加，也包括它的子元素
2. 创建了 BFC 的元素不会和它的子元素发生外边距叠加
3. 绝对定位元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
4. inline-block 元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
5. 普通流中的块级元素的 margin-bottom 永远和它相邻的下一个块级元素的 margin-top 叠加，除非相邻的兄弟元素 clear
6. 普通流中的块级元素（没有 border-top、没有 padding-top）的 margin-top 和它的第一个普通流中的子元素（没有 clear）发生 margin-top 叠加
7. 普通流中的块级元素（height 为 auto、min-height 为 0、没有 border-bottom、没有 padding-bottom）和它的最后一个普通流中的子元素（没有自身发生 margin 叠加或 clear）发生 margin-bottom 叠加
8. 如果一个元素的 min-height 为 0、没有 border、没有 padding、高度为 0 或者 auto、不包含子元素，那么它自身的外边距会发生叠加

## 响应式设计

```html
<meta
  name="’viewport’"
  content="”width"
  ="device-width,"
  initial-scale="1."
  maximum-scale="1,user-scalable"
  ="no”"
/>
```

## line-height

两行文字间基线的距离。
经典：多行文本垂直局中

## Chrome 支持小于 12px 的文字

chrome 中可以直接设置

```css
p {
  font-size: 10px;
  -webkit-transform: scale(0.8); //0.8是缩放比例
}
```

## 消除 inline-block 元素间的换行符空格间隙

1. 用 letter-spacing
2. font-size

## inline-block

不换行，不可以设置大小，大小又内容决定

## 3 栏布局

1. column
2. 左右 float，中间控制 margin
3. 左右 float+margin,中间 BFC，因为 BFC 区域不会与浮动元素重叠
4. 全部 float left
5. table 布局，但无法设置栏间距离
6. 绝对定位

## Flex 布局

前端客栈知乎专栏：https://zhuanlan.zhihu.com/p/25070186

1. flex-bisic: 设置子项的占用空间
1. flex-grow: flex item 的拉伸因子，用来“瓜分”父项的“剩余空间”
1. flex-shrink: 指定了 flex 元素的收缩规则

flex-grow 与 flex-shrink 正好相对
flex-grow 的计算方法
flex-shrink 的计算方法

## !DOCTYPE html 的作用

告诉解析器，应该使用什么样的文档类型解析文档

## 解决 img 图片自带边距的问题

1. 转换为 block
2. 给 img 定义 vertical-align
3. 父容器的 font-size 设为 0
4. 父容器设置与图片一样高
