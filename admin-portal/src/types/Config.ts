import { ApiType } from "@/api/ApiClient";
import { trimChar } from "@/utils";

enum AppMode {
  development = "development",
  production = "production",
}
const getRedisPort = () => {
  const p = process.env.NEXT_PUBLIC_REDIS_PORT;
  if (p) {
    try {
      return parseInt(p);
    } catch {}
  }
  return 6379;
};
const getRedisConfig = () => {
  const config = {
    host: process.env.NEXT_PUBLIC_REDIS_HOST ?? "redis",
    password: process.env.NEXT_PUBLIC_REDIS_PASSWORD ?? "",
    port: getRedisPort(),
  };
  return config;
};
export interface Config {
  appMode: AppMode;
  publicUrl: string;
  primaryUrl: string;
  adminUrl: string;
  authUrl: string;
  otpUrl: string;
  otpAppId: string;
  hostURL: string | undefined;
  testMode: string | undefined;
  tutorialUrl: string;
  redis: {
    host: string;
    password: string;
    port: number;
  };
  sessionTime: number | string;
  isInProduction: () => boolean;
  makeApiUrl: (apiType: ApiType, path: string) => string;
}

const getAppMode = (): AppMode => {
  const mode = process.env.APP_MODE;

  if (!mode) return AppMode.production;
  if (!(mode in AppMode)) return AppMode.production;

  return mode as AppMode;
};

const publicUrl =
  process.env.NEXT_API_BASE_URL ??
  "https://electro-frontend.dev-polygontech.xyz";
const primaryUrl =
  process.env.NEXT_API_PRIMARY_BASE_URL ?? "https://rr.dev-polygontech.xyz";
const otpUrl =
  process.env.NEXT_API_OTP_BASE_URL ?? "https://rr-otp.dev-polygontech.xyz";
const authUrl =
  process.env.NEXT_API_AUTH_BASE_URL ?? "https://rr-auth.dev-polygontech.xyz";
const adminUrl =
  process.env.NEXT_API_ADMIN_BASE_URL ??
  "https://primebank-admin.dev-polygontech.xyz";
const otpAppId = process.env.NEXT_OTP_APP_ID ?? "8329815BB6D1AE6QQ";
const tutorialUrl =
  process.env.NEXT_TUTORIAL_URL ??
  "https://primecast.primebank.com.bd/NID_Verification_Tutorial.mp4";

const sessionTime = process.env.NEXT_INACTIVE_SESSION_TIME ?? 20;

const appMode = getAppMode();

const hostURL = process.env.NEXT_PUBLIC_PAHO ?? "";
const testMode = process.env.NEXT_PUBLIC_TEST_MODE ?? "";

const config: Config = {
  appMode,
  isInProduction: () => appMode === AppMode.production,
  publicUrl,
  otpUrl,
  primaryUrl,
  authUrl,
  adminUrl,
  makeApiUrl: (apiType, path: string) => {
    let uri = primaryUrl;
    if (apiType === "auth") {
      uri = authUrl;
    } else if (apiType === "otp") {
      uri = otpUrl;
    } else if (apiType === "admin") {
      uri = adminUrl;
    }
    return `${trimChar(uri, "/")}/api/${trimChar(path, "/")}`;
  },
  otpAppId,
  hostURL,
  testMode,
  sessionTime,
  redis: getRedisConfig(),
  tutorialUrl,
};
export default config;
