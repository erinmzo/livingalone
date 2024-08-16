/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "nqqsefrllkqytkwxfshk.supabase.co",
      },
    ],
    loader: "custom",
    loaderFile: "./src/utils/supabase-image-loader.js",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
