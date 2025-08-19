export const metadata = {
  title: "Resume | yangkun",
  description: "Personal resume of yangkun",
};

export default function ResumePage() {
  return (
    <main className="font-mono w-full min-w-0 pb-20">
      <section className="max-w-3xl mx-auto px-5">
        <header className="py-8">
          <h1 className="text-3xl font-bold">Yangkun · 前端工程师</h1>
          <p className="text-sm text-tertiary mt-2">
            专注于 Web
            前端工程化、性能优化与交互体验。热爱构建可靠、可维护的前端系统。
          </p>
          <div className="mt-3 text-sm text-subtitle flex flex-wrap gap-3">
            <a href="mailto:you@example.com" className="underline">
              you@example.com
            </a>
            <span>·</span>
            <a
              href="https://github.com/kunsun"
              target="_blank"
              className="underline"
            >
              GitHub
            </a>
            <span>·</span>
            <a href="/logo.png" target="_blank" className="underline">
              作品与资源
            </a>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">核心技能</h2>
          <ul className="list-disc pl-6 space-y-1 text-[14px]">
            <li>前端框架：React、Next.js、Zustand、Tailwind CSS</li>
            <li>工程化：Vite、Webpack、ESLint、TypeScript、CI/CD</li>
            <li>性能优化：懒加载、SSR/SSG、Split Chunks、监控与分析</li>
            <li>服务协作：Node.js、接口规范、Mock、BFF 协同</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">工作经历</h2>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">某科技公司 · 高级前端工程师</h3>
                <span className="text-xs text-tertiary">2022 - 至今</span>
              </div>
              <ul className="list-disc pl-6 mt-2 text-[14px] space-y-1">
                <li>负责某大型前端平台的架构与性能优化，TTI 降低 35%</li>
                <li>主导组件库建设与开发流程规范，显著提升团队交付效率</li>
                <li>落地灰度发布与监控方案，降低错误率并提升稳定性</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">某创新公司 · 前端工程师</h3>
                <span className="text-xs text-tertiary">2020 - 2022</span>
              </div>
              <ul className="list-disc pl-6 mt-2 text-[14px] space-y-1">
                <li>构建跨端应用解决方案，移动端适配率提升 100%</li>
                <li>负责数据可视化大屏开发，沉淀交互图表组件与规范</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">项目与作品</h2>
          <ul className="list-disc pl-6 space-y-1 text-[14px]">
            <li>个人博客系统（本项目）：Next.js + MDX + Tailwind</li>
            <li>前端工具集合：CLI、脚手架、可视化构建面板</li>
            <li>UI 组件库：基于 React 的复用组件与设计规范</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">教育与证书</h2>
          <ul className="list-disc pl-6 space-y-1 text-[14px]">
            <li>计算机相关专业本科</li>
            <li>英语 CET-6</li>
          </ul>
        </section>

        <footer className="mt-10 pb-10 text-xs text-tertiary">
          最后更新：{new Date().toLocaleDateString()} · 所有资源统一存放于
          public/ 下
        </footer>
      </section>
    </main>
  );
}
