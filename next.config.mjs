/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/.git/**", "**/.next/**", "**/.pnpm-store/**", "**/node_modules/**"],
    };

    return config;
  },
};

export default nextConfig;
