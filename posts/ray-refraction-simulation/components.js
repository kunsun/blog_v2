"use client";
import { RayRefractionSimulation } from "@/components/RayRefractionSimulation";
import { FunctionPlot } from "@/components/Functions";
import {
  CONVEX_CIRCLE,
  CONVEX,
  CONCAVE,
  LIP,
} from "@/components/lib/surfaceEquations";

// 为每个形状函数创建专门的图形组件
export const ConvexCirclePlot = () => <FunctionPlot fn={CONVEX_CIRCLE.fn} />;
export const ConvexSquirclePlot = () => <FunctionPlot fn={CONVEX.fn} />;
export const ConcavePlot = () => <FunctionPlot fn={CONCAVE.fn} />;
export const LipPlot = () => <FunctionPlot fn={LIP.fn} />;

export { RayRefractionSimulation };
