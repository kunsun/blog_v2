---
path: "/mobile-ui"
title: "移动端UI适配"
date: "2021-02-02"
tags:
  - CSS
  - Web
---

参考文章：

1. https://juejin.im/post/5d736747e51d4561ff66688c
2. https://juejin.im/post/5cddf289f265da038f77696c#heading-28
3. https://www.kancloud.cn/chandler/web_app/1477878

4. https://www.kancloud.cn/chandler/web_app/591334
5. https://github.com/jawil/blog/issues/21
6. https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio
7. http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/
8. https://zhuanlan.zhihu.com/p/31713047

## 先熟悉几个概念

### 像素

一个像素通常被视为影像的最小的完整取样。打印机的物理像素等于打印机的墨点。

### 物理像素

也称为设备像素，每个设备的像素都是固定的，如 iphone5： 640 \* 1136，一个物理像素是显示器的最小物理显示单元。 单位是 pt

### 逻辑像素

=== CSS 像素。是图像的基本采样单位
=== 设备独立像素
=== 设备无关的逻辑像素

### devicePixelRatio，简称 dpr

1. 当前显示设备的物理像素分辨率与 CSS 像素分辨率的比值：设备像素比（dpr）= 屏幕物理像素（dp）/ CSS 像素
2. 设备像素比 （dpr）=物理像素（pp） / 设备独立像素（dip）

### document.documentElement.clientWidth

大多数移动端设备都默认 980px

### 屏幕分辨率

屏幕分辨率指的是物理像素，而不是理想视口。

### dpi or ppi

### 移动端浏览器渲染在一个 viewport 的页面中的

### window.innerHeight / window.innerWidth

可视区域

screen.height 屏幕高度 >= screen.availHeight 屏幕可用高度 >= window.outerHeight 浏览器高度 >= window.innerHeight 浏览器可用高度 >= document.documentElement.clientHeight body 展示高度，去除了滚动条

还有一个概念，body.offsetHeight：页面 body 总高度

### viewport 是容纳 html 的元素

document.documentElement 是指 viewport 的

## 适配方案

需要解决的两个问题：

1. 各终端下的适配问题
2. Retina 屏的细节处理

引用 flexible：

> 由于 viewport 单位得到众多浏览器的兼容，lib-flexible 这个过渡方案已经可以放弃使用，不管是现在的版本还是以前的版本，都存有一定的问题。建议大家开始使用 viewport 来替代此方。

## 视图

viewport 基本上是当前文档的可见部分

1. 布局视口(layout viewport)
2. 视觉视口(visual viewport)
3. 理想视口 ideal viewport

```html
<meta name="viewport" content="width=" />
```

### 布局视口

移动端，布局视口宽度默认为 980px，使得 pc 端页面可以在手机中呈现，默认会缩小页面，使得在一屏幕中展示这个页面。
meta 中设置的 width 指的是布局视口的宽度，即 document.documentELement.clientWidth。
css 媒体查询的宽度也是指布局视口宽度。

### 视觉视口

用户在移动设备屏幕上能看到的那部分区域。 当前浏览器可用视图包括滚动条

### 理想视口

布局视口明显对用户是不友好的，完全忽略了手机本身的尺寸。
就是手机屏幕的大小，screen.width

【设计稿】：设计师给的 750px 宽的设计稿是根据设备像素（device pixel，物理像素）为单位制作的设计稿。
【web 页面编写】：前端工程师在编码 web 页面时所写的 CSS 像素 则需要根据 设备像素比 来进行换算。

## 如何做移动端尺寸自适应

1. 直接将 width 设置为设计稿尺寸 1080，缺点是影响媒体查询
2. 用 inital-scale 整体缩小画布，布局尺寸变大，即容纳的 css 像素变多。采用依据 dpr 动态改变，放大布局视图宽度 width == screen.width \* dpr。

设置 initial-scale 值为 0.5，那么 layout viewport 的大小就是 ideal viewport 的两倍。

页面被用户放大，视觉视口内 CSS 像素数量减少；被用户缩小，视觉视口内 CSS 像素数量增多就行了。
initial-scale=1 与 width=device-width 的效果是一样的
