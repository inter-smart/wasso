/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ✅ Strapi Production Server
      {
        protocol: "https",
        hostname: "https://strapi.intersmart.in",
        // pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // optional but good
        // pathname: "/uploads/**", // ← THIS WAS MISSING
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
    // ✅ Allow localhost/private IP images
    // dangerouslyAllowLocalIP: true,

    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Compress responses
  compress: true,
  // Enable React strict mode
  reactStrictMode: true,
  // Power optimization
  poweredByHeader: false,
  // Experimental features for better performance
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
            value: "https://strap.intersmart.in",
          },
        ],
        destination: "https://strapi.intersmart.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
