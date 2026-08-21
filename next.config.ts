import type { NextConfig } from 'next';

const isTencentBuild = process.env.TENCENT_BUILD === '1';

const nextConfig: NextConfig = isTencentBuild
  ? {
      output: 'export',
      images: { unoptimized: true },
      trailingSlash: true,
    }
  : {};

export default nextConfig;
