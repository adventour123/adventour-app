/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Matches any path after /api/
        destination: "https://api.fruitask.com/:path*", // Passes the dynamic part to the destination
      },
    ];
  },
};

export default nextConfig;
