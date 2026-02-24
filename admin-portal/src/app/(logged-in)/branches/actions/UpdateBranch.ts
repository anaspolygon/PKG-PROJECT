"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";

export default async function updateBranch(
  _: DefaultFormActionResult,
  formData: FormData
): Promise<DefaultFormActionResult> {
  try {
    const branchId = formData.get("id");

    if (!branchId) {
      return {
        success: false,
        message: "Branch ID is required.",
        error: new Error("Branch ID is required"),
      };
    }

    const payload: Record<string, string | boolean> = {};

    const label_en = formData.get("label_en");
    if (label_en && typeof label_en === "string") payload.label_en = label_en;

    const label_bn = formData.get("label_bn");
    if (label_bn && typeof label_bn === "string") payload.label_bn = label_bn;

    const code = formData.get("code");
    if (code && typeof code === "string") payload.code = code;

    const is_islamic = formData.get("is_islamic");
    if (is_islamic && typeof is_islamic === "string")
      payload.is_islamic = is_islamic === "islamic";

    const district = formData.get("district");
    if (district && typeof district === "string") payload.district = district;

    const division = formData.get("division");
    if (division && typeof division === "string") payload.division = division;

    // const is_onboarding = formData.get("is_onboarding");
    // if (is_onboarding && typeof is_onboarding === "string")
    //   payload.is_onboarding = is_onboarding === "true";
    // if (!is_onboarding) {
    //   payload.is_onboarding = false;
    // }

    await adminApi.patch(`/branches/${branchId}`, payload);

    return {
      success: true,
      message: "Branch updated successfully.",
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
