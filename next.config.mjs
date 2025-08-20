import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除静态导出配置，以支持Vercel的服务端渲染
  // output: "export",  // 注释掉这行
  // trailingSlash: true,  // 注释掉这行，Vercel会自动处理
  
  // 保留图片优化配置（Vercel支持）
  images: { 
    unoptimized: true  // 或者可以移除这行让Vercel处理图片优化
  },
  
  // 添加重写规则，让/resume直接访问静态HTML
  async rewrites() {
    return [
      {
        source: '/book',
        destination: '/resume/index.html',
      },
    ];
  },
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@posts'] = path.join(process.cwd(), 'posts');
    
    // 完全禁用CSS压缩来避免与Tailwind CSS v4的兼容性问题
    if (!dev) {
      config.optimization.minimize = false;
    }
    
    return config;
  },
};

export default nextConfig;
