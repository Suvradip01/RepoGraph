import type { NextConfig } from "next";
import { assertEnv } from "./lib/env";

// Crashes `next dev` and `next build` immediately when a required variable is
// absent, instead of surfacing a confusing Clerk or Supabase error later.
assertEnv();

const nextConfig: NextConfig = {
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
