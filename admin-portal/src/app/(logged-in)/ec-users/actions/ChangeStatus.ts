'use server';

import { authApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";

export default async function changeStatus(
 id: number, status: number
): Promise<DefaultFormActionResult> {
  try {
    await authApi.patch(`/users/${id}`, {is_active: status});

    return {
      success: true,
      message: "Status updated successfully.",
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