'use server';

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";

export default async function updateDefaultEcUser(
  _: DefaultFormActionResult,
  formData: FormData
): Promise<DefaultFormActionResult> {
  try {
    

    const payload: Record<string, string> = {};
    
    const username = formData.get("username");
    if (username && typeof username === 'string') payload.username = username;
    
    const password = formData.get("password");
    if (password && typeof password === 'string') payload.password = password;
    

    await adminApi.patch(`/ec-users/default`, payload);

    return {
      success: true,
      message: "Default Ec User updated successfully.",
      error: null
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