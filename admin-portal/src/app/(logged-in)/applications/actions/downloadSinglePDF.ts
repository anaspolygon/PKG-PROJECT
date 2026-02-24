/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";

export async function downloadSinglePDF(id: number) {
  try {
    const url = `/admin/applications/${id}/pdf`;
    const res = await adminApi.post<any>(url, {});

    return {
      res: res.data,
      success: true,
    };
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
