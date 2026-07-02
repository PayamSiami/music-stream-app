// next.config.js
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/music-stream-app" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath ? basePath + "/" : "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
