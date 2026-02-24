"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { UpdateConfigRequest, UpdateConfigResponse } from "../types/Types";

export default async function updatePercentageConfig(
  updateConfig: UpdateConfigRequest,
  id: number
): Promise<UpdateConfigResponse> {
  try {
    const res = await adminApi.put<{ message: string }>(
      `/admin/percentage-configs/${id}`,
      updateConfig
    );
    return {
      message: res.message,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        code: e.code,
        message: e.message || "Something went wrong.",
      };
    }

    return {
      message: "An unexpected error occurred.",
    };
  }
}
