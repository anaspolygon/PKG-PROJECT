"use server";

import { adminApi } from "@/api/ApiClient";
import { ApplicationDetailsRoot } from "../types/ApplicationDetailsType";
import { HttpError } from "@/api/HttpStatusChecks";

export default async function getApplication(
  id: string
): Promise<ApplicationDetailsRoot> {
  try {
    return await adminApi.get<ApplicationDetailsRoot>(`/application/${id}`);
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
