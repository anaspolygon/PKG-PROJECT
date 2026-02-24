"use server";

import { adminApi } from "@/api/ApiClient";
import { BusinessProfessionList } from "../types/BusinessTypes";
import { HttpError } from "@/api/HttpStatusChecks";

export default async function getBusinessProfessionList(
  page: number = 1,
  searchTerm: string,
  type: string
): Promise<BusinessProfessionList> {
  const params = new URLSearchParams({ page: page.toString() });
  if (searchTerm) params.append("search_value", searchTerm);

  if (type) params.append("type", type);

  try {
    return await adminApi.get<BusinessProfessionList>(
      `/business-professions?${params.toString()}`
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
