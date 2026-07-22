/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Strapi uploads (new production)
      {
        protocol: "https",
        hostname: "wasso.com",
        pathname: "/uploads/**",
      },

      // Local development
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],

    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 90],
    minimumCacheTTL: 60,
  },

  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-slot"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://wasso.com",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "strapi.intersmart.in",
          },
        ],
        destination: "https://wasso.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "wasso.intersmart.in",
          },
        ],
        destination: "https://wasso.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;