"use server";

import { adminApi } from "@/api/ApiClient";
import { ApplicationList } from "../types/ApplicationTypes";
import { HttpError } from "@/api/HttpStatusChecks";

export default async function getApplicationList(
  page: number,
  identifier?: string,
  startDate?: string,
  endDate?: string,
  bankingType?: string,
  status?: string,
  gender?: string,
  productType?: string,
): Promise<ApplicationList> {
  const params = new URLSearchParams({ page: page.toString() });

  if (identifier) params.append("column", identifier);
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);
  if (bankingType) params.append("banking_type", bankingType);
  if (status) params.append("status", status);
  if (gender) params.append("gender", gender);
  if (productType) params.append("product_type", productType);

  try {
    return await adminApi.get<ApplicationList>(
      `/admin/applications?${params.toString()}`,
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
