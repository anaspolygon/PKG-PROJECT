import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
    optimizeCss: false,
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during builds for faster production builds
  },
  images: {
    domains: [
      "i.ibb.co.com",
      "primebank-api.dev-polygontech.xyz",
      "onboarding.local",
      "uat-admin-primeplus.primebank.com.bd",
      "uat-onboarding-primeplus.primebank.com.bd",
      "onboarding-primeplus.primebank.com.bd",
      "admin-primeplus.primebank.com.bd",
    ],
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
