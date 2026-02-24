// actions/DownloadBulkApplications.ts
"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpMethod } from "@/api/Types";


export default async function downloadBulkApplications(applications: number[]): Promise<Blob> {
  return await adminApi.call<Blob>(
    HttpMethod.post,
    "/applications/pdf-download-bulk",
    { "Content-Type": "application/json" },
    { applications },
    true,   
    true   
  );
}