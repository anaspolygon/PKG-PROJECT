"use server";
import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";

export async function updateRiskgradingAction(
  payload: Record<string, Record<string, number>>
) {
  try {
    const res = await adminApi.put<{ message: string }>(
      "/admin/risk-config",
      payload
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
