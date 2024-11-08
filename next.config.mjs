/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-tailwindcss-datepicker"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
