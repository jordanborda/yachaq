import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-avatar',
      '@radix-ui/react-label', 
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      'lucide-react'
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  swcMinify: true,
  poweredByHeader: false,
  compress: true
};

export default nextConfig;
