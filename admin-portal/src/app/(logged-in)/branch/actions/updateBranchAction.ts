"use server";
import { adminApi } from "@/api/ApiClient";
import { BranchFormData } from "../components/BranchForm";
import { HttpError } from "@/api/HttpStatusChecks";

export async function updateBranchAction(
  payload: BranchFormData,
  id: number | null
) {
  try {
    if (payload.banking_type === "conventional") {
      payload.window_branch_code = null;
    }
    const res = await adminApi.put<{ message: string }>(
      `/admin/branch/${id}`,
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
