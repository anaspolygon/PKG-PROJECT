"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";

export default async function updateDepartment(
  _: DefaultFormActionResult,
  formData: FormData
): Promise<DefaultFormActionResult> {
  try {
    const departmentId = formData.get("id");

    if (!departmentId) {
      return {
        success: false,
        message: "Department ID is required.",
        error: new Error("Department ID is required"),
      };
    }

    const payload: Record<string, string> = {};

    const label_en = formData.get("label_en");
    if (label_en && typeof label_en === "string") payload.label_en = label_en;

    const label_bn = formData.get("label_bn");
    if (label_bn && typeof label_bn === "string") payload.label_bn = label_bn;

    await adminApi.patch(`/departments/${departmentId}`, payload);

    return {
      success: true,
      message: "Department updated successfully.",
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