"use server";

import { adminApi } from "@/api/ApiClient";
import { BranchList } from "../types/BranchTypes";
import { HttpError } from "@/api/HttpStatusChecks";

export default async function getBranchListAction(
  page: number = 1,
  SearchTerm: string
): Promise<BranchList> {
  const params = new URLSearchParams({ page: page.toString() });
  if (SearchTerm) params.append("search_value", SearchTerm);
  try {
    return await adminApi.get<BranchList>(`/branches?${params.toString()}`);
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
