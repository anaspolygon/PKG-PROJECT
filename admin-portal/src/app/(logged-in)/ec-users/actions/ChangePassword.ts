/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types";

interface Payload {
  old_password?: string;
  password?: string;
  new_password: string;
  new_password_confirmation: string;
  current_password?: string;
}
export default async function changePassword(
  userId: number,
  isEcUser: boolean,
  payload: Payload
): Promise<DefaultFormActionResult> {
  try {
    const endpoint = isEcUser ? `/ec/update-password` : "/profile/password";

    if (!isEcUser) {
      payload.current_password = payload.old_password;
      delete payload["old_password"];
    }

    if (isEcUser) {
      payload.password = payload.old_password;
      delete payload["old_password"];
    }

    if (!isEcUser) {
      await adminApi.patch(endpoint, payload);
    } else {
      const res = await adminApi.post<any>(endpoint, payload);
      if (["BAD_REQUEST", "ERROR"].includes(res.status)) {
        return {
          success: false,
          message: res.error.message,
          error: null,
        };
      }
    }
    return {
      success: true,
      message: "Password has been changed successfully",
      error: null,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        code:e.code,
        message: e.message || "Something went wrong.",
        error: e,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred.",
      error: e instanceof Error ? e : new Error("Unknown error"),
    };
  }
}
