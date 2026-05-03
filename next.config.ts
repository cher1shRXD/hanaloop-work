import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['172.30.1.4'],
  devIndicators: false
};

export default nextConfig;
