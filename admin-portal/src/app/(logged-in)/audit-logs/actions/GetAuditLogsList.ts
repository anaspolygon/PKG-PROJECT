"use server";

import { adminApi } from "@/api/ApiClient";

import { HttpError } from "@/api/HttpStatusChecks";
import { AuditLogResponse } from "../types/AuditTypes";

export interface ApiError {
  success: false;
  code: number;
  message: string;
}

export default async function getAuditLogs(
  page: number = 1,
  searchTerm: string,
  startDate?: string,
  endDate?: string,
  type?: string,
  searchValue?: string
): Promise<AuditLogResponse | ApiError> {
  const params = new URLSearchParams({ page: page.toString() });

  if (searchTerm) params.append("search_value", searchTerm);
  if (type) params.append("auditable_type", type);
  if (searchValue) params.append("auditable_id", searchValue);
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);

  try {
    return await adminApi.get<AuditLogResponse>(
      `/admin/audit-logs?${params.toString()}`
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
