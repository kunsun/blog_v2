"use client";
import React from "react";
import { motion, MotionProps } from "framer-motion";

export type H1Props = React.PropsWithChildren<{
  id: string;
  className?: string;
  /** 是否启用初次加载入场动画 */
  animateOnce?: boolean;
}> &
  Partial<MotionProps>;

const baseCls =
  "inline-block text-[3rem] leading-[3.2rem] md:text-[4rem] md:leading-[4.2rem] lg:text-[5rem] lg:leading-[5.2rem] tracking-wide font-bold";

/**
 * 带 view-transition + framer-motion 的 H1 标题
 * - viewTransitionName: 允许跨路由过渡 (需浏览器支持 View Transitions API)
 * - framer-motion: 提供首屏淡入+上移动画
 */
export const H1: React.FC<H1Props> = ({
  id,
  children,
  className = "",
  animateOnce = true,
  ...motionProps
}) => {
  return (
    <motion.h1
      layout
      initial={animateOnce ? { opacity: 0, y: 24 } : false}
      animate={animateOnce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={baseCls + (className ? " " + className : "")}
      {...motionProps}
    >
      <span
        style={{ viewTransitionName: `hero-title-${id}` }}
        className="[view-transition-class:herotitle] inline-block will-change-transform"
      >
        {children}
      </span>
    </motion.h1>
  );
};

export const H2: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => (
  <h2
    className={
      "text-[2.2rem] max-sm:text-[2rem] tracking-wide leading-[2.4rem] max-sm:leading-[2.2rem] font-semibold" +
      (className ? " " + className : "")
    }
  >
    {children}
  </h2>
);
