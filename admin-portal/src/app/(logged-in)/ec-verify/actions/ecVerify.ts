/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";

export default async function ecVerify(
  payload: any
): Promise<DefaultFormActionResult> {
  try {
    const res = await adminApi.post<any>("/ec/verify", payload);
    return {
      success: true,
      data: res?.fieldVerificationResult,
      verified: res?.verified,
      photo: res.success ? res.success.data.photo : null,
      pin: res.success ? res.success.data.pin : null,
      nid: res.success ? res.success.data.nationalId : null,
      message: res?.verified
        ? "Verification successfully done."
        : "Verification failed.",
      error: res.error ? res.error : null,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        code:e.code,
        verified: (e as any).verified,
        fieldVerificationResult: (e as any).fieldVerificationResult,
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
