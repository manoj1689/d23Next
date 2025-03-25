import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["public.readdy.ai"], // Add your external image domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
