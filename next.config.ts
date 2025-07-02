import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Remove i18n here because App Router doesn’t support it in next.config.ts
  // Handle i18n inside your app code instead
};

export default nextConfig;
