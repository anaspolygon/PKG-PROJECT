/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "@/types/Config";
import { buildHttpError, HttpError, isUnauthorized } from "./HttpStatusChecks";
import logger from "@/services/Logger";
import { HttpHeaders, HttpMethod } from "./Types";
import { buildFetchOptions, getRefreshAuthHeader } from "./RequestBuilder";
import { TokenManager, TokenRefresher } from "./TokenManager";

export type ApiType = "primary" | "auth" | "otp" | "admin";
class ApiBuilder {
  apiType: ApiType;
  constructor(apiType: ApiType) {
    this.apiType = apiType;
  }
  callRefreshToken = async () => {
    // console.log("Refreshing access token...",
    //   await getRefreshAuthHeader(),);
    // const refreshRequest = adminApi.call<{ token: string }>(
    //   HttpMethod.post,
    //   "refresh-token",
    //   await getRefreshAuthHeader(),
    //   undefined,
    //   false
    // );
    // await TokenManager.refresh(refreshRequest);
    await TokenRefresher.refreshAccessToken();
    console.log("Access token refreshed successfully.");
  };

  isResponseJson = (res: Response) => {
    return res.headers.get("content-type")?.includes("application/json");
  };

  call = async <T>(
    method: HttpMethod,
    uri: string | (() => string),
    headers: HttpHeaders,
    body: object | undefined = undefined,
    shouldRefresh: boolean = true,
    acceptBlob: boolean = false
  ): Promise<T> => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const options = await buildFetchOptions(
      method,
      headers,
      this.apiType,
      body
    );

    const url = typeof uri === "string"  ? config.makeApiUrl(this.apiType, uri) : uri();
    console.log("API Call:", method, url);
    const apiCallStartLog = { url, method, headers: options.headers, body };
    logger.apiCallStart(apiCallStartLog);

    const res = await fetch(url, { ...options, cache: "no-store" });

    
    if (isUnauthorized(res.status) && shouldRefresh) {
      console.log(res,"response from", url);
    
      try {
        await this.callRefreshToken();
        return this.call(method, uri, headers, body, false);
      } catch (error) {
        console.error("Token refresh failed:", error);
        throw new HttpError(
          res.status,
          "Your session has expired. Please log in again."
        );
      }
    }

    if (acceptBlob) {
      const blob = await res.blob();

      if (!res.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = new Error("Failed blob response") as any;
        err.status = res.status;
        throw err;
      }

      // Extract filename from Content-Disposition
      const disposition = res.headers.get("Content-Disposition");
      let fileName = null;
      if (disposition && disposition.includes("filename=")) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) fileName = match[1];
      }

      // Return both blob and filename
      return { blob, fileName } as unknown as T;

      return blob as unknown as T;
    }

    let data = {};

    if (this.isResponseJson(res)) {
      try {
        data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        data = { message: res.statusText };
        logger.apiFinishedError({
          ...apiCallStartLog,
          status: res.status,
          data,
        });
        throw buildHttpError(res.status, data);
      }

      // if (isUnauthorized(res.status)) {
      //   await TokenManager.remove();
      //   redirect("/auth/login", RedirectType.replace);
      // }

      if (!res.ok) {
        logger.apiFinishedError({
          ...apiCallStartLog,
          status: res.status,
          data,
        });
        console.error("API call failed:", data);

        if (res.status === 401)
          throw new HttpError(
            res.status,
            "Your session has expired. Please log in again."
          );

        // if (res.status === 400) return data as unknown as T;
        if (
          data &&
          ((data as { status?: string }).status === "NOT_ACCEPTABLE" ||
            (data as { status?: string }).status === "ERROR" ||
            (data as { status?: string }).status === "BAD_REQUEST" ||
            data.hasOwnProperty("otp_response"))
        ) {
          return data as unknown as T;
        }

        const er = buildHttpError(res.status, data);

        throw er;
      }

      logger.apiFinishedSuccess({
        ...apiCallStartLog,
        status: res.status,
        data,
      });
      return data as T;
    } else {
      // const blob = await res.blob();
      const text = await res.text();

      return text as unknown as T;
    }
  };

  get<T>(uri: string, headers: HttpHeaders = {}): Promise<T> {
    return this.call(HttpMethod.get, uri, headers);
  }

  post<T>(uri: string, body: object, headers: HttpHeaders = {}): Promise<T> {
    return this.call(HttpMethod.post, uri, headers, body);
  }

  put<T>(uri: string, body: object, headers: HttpHeaders = {}): Promise<T> {
    return this.call(HttpMethod.put, uri, headers, body);
  }

  patch<T>(uri: string, body: object, headers: HttpHeaders = {}): Promise<T> {
    return this.call(HttpMethod.patch, uri, headers, body);
  }

  del<T>(uri: string, headers: HttpHeaders = {}): Promise<T> {
    return this.call(HttpMethod.del, uri, headers);
  }
}

export const primaryApi = new ApiBuilder("primary");
export const otpApi = new ApiBuilder("otp");
export const authApi = new ApiBuilder("auth");
export const adminApi = new ApiBuilder("admin");
