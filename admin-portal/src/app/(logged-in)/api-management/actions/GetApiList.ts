"use server";

import { adminApi } from "@/api/ApiClient";

import { HttpError } from "@/api/HttpStatusChecks";
import { APIResponse } from "../types/ApiTypes";

export interface ApiError {
  success: false;
  code: number;
  message: string;
}

export default async function getApiListAction(
  page: number = 1,
  SearchTerm: string
): Promise<APIResponse | ApiError> {
  const params = new URLSearchParams({ page: page.toString() });
  if (SearchTerm) params.append("search_value", SearchTerm);
  try {
    return await adminApi.get<APIResponse>(
      `/admin/apis?${params.toString()}`
    );
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
