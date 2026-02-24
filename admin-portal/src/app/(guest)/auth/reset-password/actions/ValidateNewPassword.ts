"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";

interface Payload {
  mobile: string;
  new_password: string;
}

export async function validateNewPassword(
  payload: Payload
): Promise<{ status: boolean; message?: string }> {
  try {
    await adminApi.post("/validate-new-password", payload);
    return { status: true };
  } catch (e) {
    console.error("Reset password failed with error:", e);
    if (e instanceof HttpError) {
      return {
        status: false,
        message: e.message || "Failed to reset password.",
      };
    }

    throw e;
  }
}
