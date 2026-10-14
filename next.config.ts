import type { NextConfig } from "next";

// Old URLs from the previous site keep working.
const moved: [string, string][] = [
  ["/systems", "/solutions"],
  ["/systems/:slug", "/solutions/:slug"],
  ["/company/about", "/about"],
  ["/company/contact", "/book"],
  ["/company/contact/sent", "/book"],
  ["/demo", "/book"],
  ["/signup", "/assessment"],
  ["/signin", "/"],
  ["/auth", "/"],
  ["/partners", "/about"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
