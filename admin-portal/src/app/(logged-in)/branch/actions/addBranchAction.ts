"use server";
import { adminApi } from "@/api/ApiClient";
import { BranchFormData } from "../components/BranchForm";
import { HttpError } from "@/api/HttpStatusChecks";

export async function addBranchAction(payload: BranchFormData) {
  try {
    const res = await adminApi.post<{ message: string }>(
      "/admin/branch",
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
