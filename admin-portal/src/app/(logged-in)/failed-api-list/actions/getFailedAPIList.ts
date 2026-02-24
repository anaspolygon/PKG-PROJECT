"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { FailedAPIListResponse } from "../types/FailedAPITypes";
export interface ApiError {
  success: false;
  code: number;
  message: string;
}

export default async function getFailedAPIListAction(
  page: number = 1,
  searchTerm: string,
  startDate?: string,
  endDate?: string,
): Promise<FailedAPIListResponse | ApiError> {
  const params = new URLSearchParams({ page: page.toString() });
  if (searchTerm) params.append("application_id", searchTerm);
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);
  try {
    return await adminApi.get<FailedAPIListResponse>(
      `/admin/applications/failed-api-list?${params.toString()}`,
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
