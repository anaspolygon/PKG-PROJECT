"use server";
import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";

export async function deleteApkAction(id: number) {
  try {
    const url = `/admin/apk-version/${id}`;
    const res = await adminApi.del<{ message: string }>(url);
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
