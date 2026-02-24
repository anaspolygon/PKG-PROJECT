/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { TokenManager } from "./api/TokenManager";
import { getPayloadFromJWT } from "./utils";
import { redirectWithValidAccessToken } from "./lib/auth-helper";
import type { NextRequest } from "next/server";
import { routes } from "./lib/routes";

export function isRoleOrUserServerAction(request: NextRequest): boolean {
  const isServerAction = request.headers.get("next-action") !== null;
  if (!isServerAction) return false;
  return true;
}
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isRoleOrUserServerAction(request)) {
    return NextResponse.next();
  }
  const token = await TokenManager.get();
  // If there's no token and the request is already for the login page,
  // allow the request to continue so the login page can render.
  // Otherwise redirect to /auth/login.
  if (!token) {
    if (pathname === "/auth/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  const { exp } = getPayloadFromJWT(token as string);
  const currentTime = Math.floor(Date.now() / 1000);
  const tokenExpiryTime = exp;
  const timeDifference = tokenExpiryTime - currentTime;
  console.log(
    tokenExpiryTime,
    currentTime,
    timeDifference,
    timeDifference - 30,
  );
  if (timeDifference <= 0) {
    return redirectWithValidAccessToken(request, pathname, token as string);
  }

  let user: any;
  try {
    const payloadBase64 = token?.split(".")[1];
    if (!payloadBase64) {
      throw new Error("JWT payload is missing");
    }
    const decodedPayload = atob(payloadBase64);
    user = JSON.parse(decodedPayload);
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  // If request is for the login page, redirect immediately when user is present
  if (pathname === "/auth/login") {
    const targetRoute = routes.find((r) => user?.permissions[r.permission]);
    const dest = targetRoute?.path ?? "/";
    return NextResponse.redirect(new URL(dest, request.url));
  }
  for (const route of routes) {
    if (pathname.startsWith(route.path)) {
      if (!user?.permissions[route.permission]) {
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/activity-logs",
    "/applications",
    "/applications/:id*",
    "/audit-logs",
    "/branch",
    "/configs",
    "/maker-checker",
    "/risk-grading",
    "/roles",
    "/users",
    "/app-configs",
    "/auth/login",
  ],
};
