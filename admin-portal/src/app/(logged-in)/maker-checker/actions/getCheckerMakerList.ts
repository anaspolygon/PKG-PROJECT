"use server";
import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { MakerCheckerResponse } from "../types/CheckerMakerTypes";

export interface ApiError {
  success: false;
  code: number;
  message: string;
}


export default async function getCheckerMakerList(
  page: number,
  identifier?: string,
  startDate?: string,
  endDate?: string,
  status?: string,
  type?: string,
  searchValue?: string
): Promise<MakerCheckerResponse | ApiError> {
  const params = new URLSearchParams({ page: page.toString() });

  if (identifier) params.append("identifier", identifier);
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);
  if (status) params.append("status", status);
  if (type) params.append("action_type", type);
  if (searchValue) params.append("search_query", searchValue);

  try {
    const url = `/admin/maker-checker/actions?${params.toString()}`;
    return await adminApi.get<MakerCheckerResponse>(url);
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
