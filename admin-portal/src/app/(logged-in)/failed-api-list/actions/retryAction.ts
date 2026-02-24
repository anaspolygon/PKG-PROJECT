/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
export async function retryAction(payload: Record<string, any>) {
  try {
    const res = await adminApi.post<{ message: string }>(
      "/admin/applications/failed-api-list",
      payload,
    );
    return { success: true, message: res.message };
  } catch (error) {
    if (error instanceof HttpError) {
      return {
        success: false,
        code: error.code,
        message: error.message,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
