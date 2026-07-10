import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve Wikimedia images directly without optimization proxy
    // (Wikimedia blocks bot/proxy User-Agents from the Next.js optimizer)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "microphone=(self), camera=(), geolocation=()",
        },
      ],
    },
  ],
};

export default nextConfig;
