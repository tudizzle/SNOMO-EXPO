/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/floorplan", destination: "/exhibitors", permanent: true }];
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/.git/**", "**/.next/**", "**/.pnpm-store/**", "**/node_modules/**"],
    };

    return config;
  },
};

export default nextConfig;
