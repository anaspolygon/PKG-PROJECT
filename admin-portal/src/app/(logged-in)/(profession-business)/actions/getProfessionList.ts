"use server";
import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { ProfessionResponse } from "../types/ProfessionTypes";

export interface ApiError {
  success: false;
  code: number;
  message: string;
}

export default async function getProfessionList(
  url: string,
  page: number = 1,
  SearchTerm: string
): Promise<ProfessionResponse | ApiError> {
  const params = new URLSearchParams({ page: page.toString() });
  if (SearchTerm) params.append("search_value", SearchTerm);
  try {
    return await adminApi.get<ProfessionResponse>(
      `${url}?${params.toString()}`
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
