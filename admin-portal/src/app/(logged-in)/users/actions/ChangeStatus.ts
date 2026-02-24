"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";
// import { User } from "../types/UserTypes";

export default async function changeStatus(
  id: number,
  status: string,
  comments: string,
  // selectedUser: User
): Promise<DefaultFormActionResult> {
  try {
    const payload: Record<string, string | number> = {};
    payload.comments = comments;
    if (status === "active") {
      payload.is_active = 1;
    }
    if (status === "inactive") {
      payload.is_active = 0;
    }
    if (status === "closed") {
      payload.is_closed = 1;
    }
    if (status === "locked") {
      payload.is_locked = 1;
    }

    // payload.name = selectedUser.name;
    // payload.role = selectedUser.role.id;
    // payload.email = selectedUser.email;
    // payload.employee_id = selectedUser.employee_id;
    // payload.branch_id = selectedUser.branch?.id;
    // payload.valid_till = selectedUser.valid_till;

    const res = await adminApi.patch<{ message: string }>(
      `/users/status/${id}`,
      payload
    );

    return {
      success: true,
      message: res.message || "Status updated successfully.",
      error: null,
    };
  } catch (e) {
    if (e instanceof HttpError || e instanceof Error) {
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
