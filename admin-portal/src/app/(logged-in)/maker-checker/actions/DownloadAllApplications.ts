"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpMethod } from "@/api/Types";

export default async function downloadAllApplications(
  searchTerm?: string,
  startDate?: string,
  endDate?: string,
  bankingType?: string
): Promise<Blob> {
  const params = new URLSearchParams();

  if (searchTerm) params.append("identifier", searchTerm);
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);
  if (bankingType) params.append("banking_type", bankingType);
  
  return await adminApi.call<Blob>(
      HttpMethod.post,
      `/applications/pdf-download-bulk?${params.toString()}`,
      { "Content-Type": "application/json" },
      { applications: [] },
      true,   
      true   
    );
}
