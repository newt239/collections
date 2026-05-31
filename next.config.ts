import type { NextConfig } from "next";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  cacheComponents: true,
  typedRoutes: true,
};

// `next dev` 実行時に Cloudflare のバインディング（D1 など）へアクセスできるようにする
initOpenNextCloudflareForDev();

export default nextConfig;
