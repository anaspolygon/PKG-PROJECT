"use server";

import { adminApi } from "@/api/ApiClient";
import { DepartmentList } from "../types/DepartmentTypes";
import { HttpError } from "@/api/HttpStatusChecks";

export default async function getDepartMentListAction(
  page: number = 1,
  SearchTerm: string
): Promise<DepartmentList> {
  const params = new URLSearchParams({ page: page.toString() });
  if (SearchTerm) params.append("search_value", SearchTerm);
  try {
    return await adminApi.get<DepartmentList>(
      `/departments?${params.toString()}`
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
