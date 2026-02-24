"use server";

import { adminApi } from "@/api/ApiClient";
import { ApkVersionResponse } from "../types/ApkVersionTypes";
import { HttpError } from "@/api/HttpStatusChecks";
export interface ApiError {
  success: false;
  code: number;
  message: string;
}

export default async function getApkVersionListAction(
  page: number = 1,
  SearchTerm: string
): Promise<ApkVersionResponse | ApiError> {
  const params = new URLSearchParams({ page: page.toString() });
  if (SearchTerm) params.append("search_value", SearchTerm);
  try {
    return await adminApi.get<ApkVersionResponse>(`/admin/apk-version?${params.toString()}`);
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
