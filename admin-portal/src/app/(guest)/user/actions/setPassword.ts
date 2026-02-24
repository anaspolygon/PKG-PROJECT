"use server";
import { adminApi } from "@/api/ApiClient";
import { ResetPasswordFormActionResult } from "../../auth/reset-password/types/Types";
import { HttpError } from "@/api/HttpStatusChecks";
import { decryptPayload } from "@/lib/cryto";

interface Payload {
  authorization_code: string;
  email: string;
  password?: string;
}

export default async function setPassword(
  payload: Payload | string
): Promise<ResetPasswordFormActionResult> {
  try {
    const decryptedPayload = decryptPayload(payload as string);
    const res = await adminApi.patch<{ message: string }>(
      "/reset-password",
      decryptedPayload
    );

    return {
      error: undefined,
      success: true,
      message: res.message || "Password set successfully.",
      data: res,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        message: e.message || "Failed to reset password.",
      };
    }

    throw e;
  }
}
