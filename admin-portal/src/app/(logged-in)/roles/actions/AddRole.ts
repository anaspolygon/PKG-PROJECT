"use server";

import { HttpError } from "@/api/HttpStatusChecks";
import { adminApi } from "@/api/ApiClient";
import { AddRoleResult, RoleAddResponse } from "../types/RoleTypes";

export default async function addRole(
  _: AddRoleResult,
  formData: FormData
): Promise<AddRoleResult> {
  try {
    const permissionsJson = formData.get("permissions")?.toString() || "[]";
    let permissions: number[] = [];

    try {
      const parsed = JSON.parse(permissionsJson);
      if (Array.isArray(parsed)) {
        permissions = parsed.map((p) => Number(p)).filter((p) => !isNaN(p));
      }
    } catch {
      return { success: false, message: "Invalid permissions format." };
    }

    const name = formData.get("name");

    const res = await adminApi.post<RoleAddResponse>("/admin/roles", {
      name,
      permissions,
    });

    return {
      success: true,
      message: res.message || "Role added successfully.",
      data: res.message,
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
