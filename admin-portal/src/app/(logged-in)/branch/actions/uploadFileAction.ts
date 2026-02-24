"use server";
import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";

export async function uplaodFileAction(file: File | null) {
  try {
    const formData = new FormData();
    formData.append("file", file as File);
    const res = await adminApi.post<{ message: string }>(
      "/admin/branch/upload-excel",
      formData
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
