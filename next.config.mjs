import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
  // assetPrefix: process.env.NODE_ENV === "production" ? "/" : "",
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@posts'] = path.join(process.cwd(), 'posts');

    // 返回修改后的配置
    return config;
  },
};

export default nextConfig;
