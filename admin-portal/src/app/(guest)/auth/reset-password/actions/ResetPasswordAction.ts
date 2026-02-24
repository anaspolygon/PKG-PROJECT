"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { ResetPasswordFormActionResult } from "../types/Types";

export default async function resetPassword(
  _: ResetPasswordFormActionResult,
  formData: FormData
): Promise<ResetPasswordFormActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const authorizationCode = formData.get("authorizationCode") as string;

  try {
    const res = await adminApi.patch<{ message: string }>("/reset-password", {
      email,
      password,
      authorization_code: authorizationCode,
    });

    return {
      error: undefined,
      success: true,
      message: res.message || "Password changed successfully.",
      data: res,
    };
  } catch (e) {
    console.error("Reset password failed with error:", e);
    if (e instanceof HttpError) {
      return {
        success: false,
        message: e.message || "Failed to reset password.",
      };
    }

    throw e;
  }
}
