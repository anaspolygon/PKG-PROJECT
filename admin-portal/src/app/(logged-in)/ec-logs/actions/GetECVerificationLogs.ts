"use server";

import { adminApi } from "@/api/ApiClient";
import { ECVerifyLogs } from "../types/ECLogTypes";
import { HttpError } from "@/api/HttpStatusChecks";

export default async function getECVerificationLogs(
  page: number,
  startDate?: string,
  endDate?: string,
  searchTerm?: string,
  searchValue?: string
): Promise<ECVerifyLogs> {
  const params = new URLSearchParams({ page: page.toString() });

  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);
  if (searchTerm && searchValue) params.append(searchTerm, searchValue);
  try {
    return await adminApi.get<ECVerifyLogs>(
      `/ec/verify/log?${params.toString()}`
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
