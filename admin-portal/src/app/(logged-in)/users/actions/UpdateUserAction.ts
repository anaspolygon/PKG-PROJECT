"use server";
import { adminApi } from "@/api/ApiClient";
import { UserFormData } from "../components/UserForm";
import { HttpError } from "@/api/HttpStatusChecks";

export async function updateUserAction(payload: UserFormData, userId: number) {
  try {
    const payloadToSend = { ...payload, role_id: [payload.role_id] };
    const res = await adminApi.patch<{ message: string }>(
      `/admin/users/${userId}`,
      payloadToSend
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
