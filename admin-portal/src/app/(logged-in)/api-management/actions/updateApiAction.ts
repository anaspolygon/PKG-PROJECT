"use server";

import { adminApi } from "@/api/ApiClient";
import { ApiFormData } from "../components/ApiForm";
import { HttpError } from "@/api/HttpStatusChecks";

export async function updateApiAction(payload: ApiFormData, id: number | null) {
  try {
    const res = await adminApi.put<{ message: string }>(
      `/admin/apis/update/${id}`,
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
