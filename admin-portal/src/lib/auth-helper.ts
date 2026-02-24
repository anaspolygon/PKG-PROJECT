import config from "@/types/Config";
import { getPayloadFromJWT } from "@/utils";
import { NextResponse, type NextRequest } from "next/server";

export const redirectToLogin = (request: NextRequest): NextResponse => {
  const loginUrl = new URL("/auth/login", request.url);
  const cookieKey = "logged_id";
  const infoKey = "info";
  console.log("token expired ==========================>")
  const redirectResponse = NextResponse.redirect(loginUrl);
  redirectResponse.cookies.delete(cookieKey);
  redirectResponse.cookies.delete(infoKey);

  return redirectResponse;
};

export const redirectWithValidAccessToken = async (
  request: NextRequest,
  pathname: string,
  token: string
): Promise<NextResponse> => {
  const redirectUrl = new URL(pathname, request.url);
  const redirectResponse = NextResponse.redirect(redirectUrl);

  const cookieKey = "logged_id";

  try {
    const adminApiUrl = config.makeApiUrl("admin", "/refresh-token");
    const res = await fetch(adminApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
      body: null,
      cache: "no-store",
    });
    const data: { token: string } = await res.json();
    const { id } = getPayloadFromJWT(data.token);

    console.log("refresh token called............................................");
    redirectResponse.cookies.set(
      cookieKey,
      JSON.stringify({ id, token: data.token })
    );

    return redirectResponse;
  } catch {
    return redirectToLogin(request);
  }
};
