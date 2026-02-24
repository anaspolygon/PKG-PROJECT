"use server";
import { adminApi } from "@/api/ApiClient";
import { UserFormData } from "../components/UserForm";
import { HttpError } from "@/api/HttpStatusChecks";

export async function addUserAction(payload: UserFormData) {
  try {
    const payloadToSend = {
      ...payload,
      role_id: [payload.role_id],
      is_active: 1,
    };
    const res = await adminApi.post<{ message: string }>(
      "/admin/users",
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
