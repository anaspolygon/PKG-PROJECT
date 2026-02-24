"use server";

import { HttpError } from "@/api/HttpStatusChecks";
import { adminApi } from "@/api/ApiClient";
import { AddBranchResult, Branch } from "../types/BranchTypes";

export default async function addBranch(
  _: AddBranchResult,
  formData: FormData
): Promise<AddBranchResult> {
  try {
    const is_islamic = formData.get("is_islamic");
    // const is_onboarding = formData.get("is_onboarding");

    const payload = {
      label_en: formData.get("label_en"),
      label_bn: formData.get("label_bn"),
      code: formData.get("code"),
      ...(is_islamic && typeof is_islamic === "string"
        ? { is_islamic: is_islamic === "islamic" }
        : {}),
      ...(formData.get("division") &&
      typeof formData.get("division") === "string"
        ? { division: formData.get("division") }
        : {}),
      ...(formData.get("district") &&
      typeof formData.get("district") === "string"
        ? { district: formData.get("district") }
        : {}),
      // is_onboarding: is_onboarding === "true" ? true : false,
      is_onboarding: true,
    };


    const res = await adminApi.post<Branch>("/branches", payload);

    return {
      success: true,
      message: "Branch added successfully.",
      data: res,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        message: e.message || "Something went wrong.",
        data: undefined,
      };
    }

    throw e;
  }
}
