/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Strapi production images
      {
        protocol: "https",
        hostname: "strapi.intersmart.in",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],

    dangerouslyAllowLocalIP: true, // 👈 IMPORTANT

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

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "strap.intersmart.in",
          },
        ],
        destination: "https://strapi.intersmart.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
