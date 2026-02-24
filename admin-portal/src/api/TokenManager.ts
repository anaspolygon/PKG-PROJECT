import { TokensWithId } from "@/types/User";
import { cookies } from "next/headers";
// import { RedirectType, redirect } from "next/navigation";
import { getPayloadFromJWT } from "@/utils";
import config from "@/types/Config";
import { redirectToLogin } from "@/utils/server-action-redirect";

export const loggedUserCookie = {
  cookieKey: "logged_id",
  info: "info",
  set: async (user: { id: string; token: string }) => {
    const cookie = await cookies();
    cookie.set(loggedUserCookie.cookieKey, JSON.stringify(user), {
      httpOnly: true,
       path: "/",  
      // secure: true,
      // sameSite: "strict",
    });
    // const data = cookie.get(loggedUserCookie.cookieKey);
  },
  get: async () => {
    const cookie = await cookies();
    const user = cookie.get(loggedUserCookie.cookieKey)?.value;
    if (!user) return undefined;
    return JSON.parse(user)?.token as string;
  },
  has: async () => {
    const cookie = await cookies();
    return cookie.has(loggedUserCookie.cookieKey);
  },
  remove: async () => {
    const cookie = await cookies();
    cookie.delete(loggedUserCookie.cookieKey);
    cookie.delete(loggedUserCookie.info);
  },
};

export class TokenManager {
  public static async get() {
    const token = await loggedUserCookie.get();
    if (!token) return undefined;
    return token;
  }

  // set user cookie and token
  public static async set(tokens: TokensWithId) {
    await loggedUserCookie.set({
      id: tokens.id.toString(),
      token: tokens.accessToken,
    });
  }
  // remove the cookie and token
  public static async remove() {
    const removeUser = await loggedUserCookie.get();
    if (!removeUser) return undefined;
    loggedUserCookie.remove();
  }
  // set the refresh token
  static async refresh(response: Promise<{ token: string }>) {
    try {
      const { token } = await response;
      const { userId } = getPayloadFromJWT(token);
      await this.set({
        id: userId,
        accessToken: token,
        refreshToken: token,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      await this.remove();

      // redirect("/auth/login", RedirectType.replace);
    }
  }
  public static async hasValid() {
    const tokens = await this.get();
    if (!tokens) return false;
    return true;
  }
  public static async hasUserId() {
    const hasCookie = await loggedUserCookie.has();
    if (!hasCookie) return false;
    return true;
  }

  private static isValidJWT(token?: string, buffer: number = 0): boolean {
    if (!token) return false;
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000) + buffer;

      // logger.log({
      //   exp: payload.exp,
      //   'time remaining': payload.exp - now,
      //   'time remaining > 0': payload.exp - now > 0,
      // });

      return payload.exp - now > 0;
    } catch {
      return false;
    }
  }

  public static async isValidAccessToken(buffer: number = 0): Promise<boolean> {
    const accessToken = await TokenManager.get();
    if (!accessToken) return false;
    return TokenManager.isValidJWT(accessToken, buffer);
  }

  public static async isValidRefreshToken(
    buffer: number = 0
  ): Promise<boolean> {
    const token = await TokenManager.get();
    if (!token) return false;
    return TokenManager.isValidJWT(token, buffer);
  }
}

export class TokenRefresher {
  public static async refreshAccessToken() {
    const token = await TokenManager.get();
    console.log("Refreshing access token...");
    if (!token) {
      throw new Error("No refresh token available");
    }
    const adminApiUrl = config.makeApiUrl("admin", "/refresh-token");
    console.log("Calling refresh token API:", adminApiUrl);
    const res = await fetch(adminApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
      body: null,
      cache: "no-store",
    });
    console.log("Refresh token response status:", res);
    if(!res.ok){
      return await redirectToLogin();
    }
    const data: { token: string } = await res.json();
    console.log("New access token received.", data.token);
    const { sub } = getPayloadFromJWT(data.token);
    console.log("User ID from token:", sub);
    await TokenManager.set({
      id:sub,
      accessToken: data.token,
      refreshToken: data.token,
    });
    console.log("Access token refreshed successfully.");
  }
}
