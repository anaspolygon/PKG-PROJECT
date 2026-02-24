/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";

export default async function updateUser(
  _: DefaultFormActionResult,
  formData: FormData
): Promise<DefaultFormActionResult> {
  try {
    const userId = formData.get("id");

    if (!userId) {
      return {
        success: false,
        message: "User ID is required.",
        error: new Error("User ID is required"),
      };
    }

    const payload: Record<string, any> = {};

    const name = formData.get("name");
    if (name && typeof name === "string") payload.name = name;

    const mobile = formData.get("mobile");
    if (mobile && typeof mobile === "string") payload.mobile = mobile;

    const email = formData.get("email");
    if (email && typeof email === "string") payload.email = email;

    const role = Number(formData.get("role"));
    if (role) payload.role_id = [role];

    const employee_id = formData.get("employee_id");
    if (employee_id) payload.employee_id = employee_id;

    const branch_id = Number(formData.get("branch_id"));
    if (branch_id) payload.branch_id = branch_id;

    const department_id = Number(formData.get("department_id"));
    if (department_id) payload.department_id = department_id;

    if (!branch_id) payload.branch_id = null;

    const valid_till = formData.get("valid_till");
    if (valid_till && typeof valid_till === "string") {
      const normalized = valid_till.replace(/\//g, "-");
      const parts = normalized.split("-");
      const [dd, mm, yyyy] = parts;
      payload.valid_till = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(
        2,
        "0"
      )}`;
    }

    if (!valid_till) payload.valid_till = null;

    const status = formData.get("status");
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

    const comments = formData.get("comments");
    if (comments && typeof comments === "string") {
      payload.comments = comments;
    }

    const obj = Object.fromEntries(formData.entries());

    for (const [key, value] of Object.entries(obj)) {
      console.log(key + ": " + value);
    }

    payload.user_type = "citygem";


    const res = await adminApi.patch<{ message: string }>(
      `/admin/users/${userId}`,
      payload
    );

    return {
      success: true,
      message: res.message || "User updated successfully.",
      error: null,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        code: e.code,
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
