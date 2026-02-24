/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { AddUser, AddUserResult } from "../types/UserTypes";

export default async function addUser(
  _: AddUserResult,
  formData: FormData
): Promise<AddUserResult> {
  try {
    const payload: Record<string, any> = {};

    const name = formData.get("name");
    if (name && typeof name === "string") payload.name = name;

    const email = formData.get("email");
    if (email && typeof email === "string") payload.email = email;

    const mobile = formData.get("mobile");
    if (mobile && typeof mobile === "string") payload.mobile = mobile;

    const role = Number(formData.get("role"));
    if (role) payload.role_id = [role];

    const employee_id = formData.get("employee_id") as string;
    if (employee_id) payload.employee_id = employee_id;

    const branch_id = Number(formData.get("branch_id"));
    if (branch_id) payload.branch_id = branch_id;

    const department_id = Number(formData.get("department_id"));
    if (department_id) payload.department_id = department_id;

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


    const res = await adminApi.post<AddUser>("/admin/users", payload);

    return {
      success: true,
      message: res.message || "User added successfully.",
      data: res,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        code:e.code,
        message: e.message || "Something went wrong.",
        data: undefined,
      };
    }

    throw e;
  }
}
