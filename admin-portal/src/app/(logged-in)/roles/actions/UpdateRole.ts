"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";

export default async function updateRole(
  _: DefaultFormActionResult,
  formData: FormData
): Promise<DefaultFormActionResult> {
  try {
    const roleId = formData.get("id");

    if (!roleId) {
      return {
        success: false,
        message: "Role ID is required.",
        error: new Error("Role ID is required"),
      };
    }

    const payload: Record<string, string | number[]> = {};

    const name = formData.get("name");
    if (name && typeof name === 'string') {
      payload.name = name;
    }

    const permissionsRaw = formData.get("permissions")?.toString() || "[]";
    try {
      const parsedPermissions = JSON.parse(permissionsRaw);
      if (Array.isArray(parsedPermissions)) {
        payload.permissions = parsedPermissions
          .map((p: number) => Number(p))
          .filter((p: number) => !isNaN(p));
      }
    } catch {
      return {
        success: false,
        message: "Invalid permissions format.",
        error: new Error("Invalid permissions format."),
      };
    }


    const res = await adminApi.patch<{ message: string }>(
      `/admin/roles/${roleId}`,
      payload
    );

    return {
      success: true,
      message: res.message || "Role updated successfully.",
      error: null,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        code:e.code,
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
