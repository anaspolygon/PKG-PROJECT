"use server";

import { adminApi } from "@/api/ApiClient";
import { PercentageConfig } from "../types/Types";
import { HttpError } from "@/api/HttpStatusChecks";
import { ApiError } from "../../api-management/actions/GetApiList";

export default async function getPercentageList(): Promise<
  PercentageConfig[] | ApiError
> {
  try {
    return await adminApi.get<PercentageConfig[]>("/admin/app-configurations");
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        code: e.code,
        message: e.message || "Something went wrong.",
      };
    }

    throw e;
  }
}
