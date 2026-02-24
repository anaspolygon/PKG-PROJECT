'use server';

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";

export default async function updateUser(
  _: DefaultFormActionResult,
  formData: FormData
): Promise<DefaultFormActionResult> {
  try {
    const userId = formData.get("id");
    
    if (!userId) {
      return {
        success: false,
        message: "User ID is required.",
        error: new Error("User ID is required")
      };
    }

    const payload: Record<string, string> = {};
    
    const username = formData.get("username");
    if (username && typeof username === 'string') payload.username = username;
    
    const branch_id = formData.get("branch_id");
    if (branch_id && typeof branch_id === 'string') payload.branch_id = branch_id;
    

    await adminApi.patch(`/ec-users/${userId}`, payload);

    return {
      success: true,
      message: "User updated successfully.",
      error: null
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
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