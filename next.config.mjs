/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "hontnagkhnhhfprznakx.supabase.co" },
      { hostname: "prs.ohousecdn.com" },
      { hostname: "image.ohousecdn.com" },
    ],
    loader: "custom",
    loaderFile: "./src/utils/supabase-image-loader.js",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
