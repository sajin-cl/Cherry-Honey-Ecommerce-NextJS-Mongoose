/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats — browser picks smallest supported (avif > webp > original)
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 30 days at the Next.js image server
    minimumCacheTTL: 2592000,
    // Breakpoints used when generating srcsets
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
