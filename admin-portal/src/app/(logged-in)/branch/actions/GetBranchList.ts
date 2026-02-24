"use server";
import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { BranchResponse } from "../types/BranchTypes";

export interface ApiError {
  success: false;
  code: number;
  message: string;
}

export default async function getBranchListAction(
  page: number = 1,
  SearchTerm: string
): Promise<BranchResponse | ApiError> {
  const params = new URLSearchParams({ page: page.toString() });
  if (SearchTerm) params.append("search_value", SearchTerm);
  try {
    return await adminApi.get<BranchResponse>(
      `/admin/branch?${params.toString()}`
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
