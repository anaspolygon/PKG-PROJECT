"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";

interface ApproveActionResult {
  success: boolean;
  message: string;
  code?: number;
}

export default async function approveOrRejectAction(
  actionId: number | null,
  action: "approve" | "reject",
  payload = {}
): Promise<ApproveActionResult> {
  try {
    const url =
      action === "approve"
        ? `/admin/maker-checker/approve/${actionId}`
        : `/admin/maker-checker/reject/${actionId}`;
    const res = await adminApi.post<ApproveActionResult>(url, payload);

    return {
      success: true,
      message: res.message,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        code: e.code,
        message: e.message || "Something went wrong.",
      };
    }
    throw e;
  }
}
