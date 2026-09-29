import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/JHK",
  assetPrefix: "/JHK/",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
