/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";

interface DocumentResponse {
  success?: boolean;
  code?: number;
  message?: string;
}

export default async function bulkDocumentDownload(ids: number[]) {
  try {
    const url = `/admin/applications/documents/download?ids=${ids}`;
    const res = await adminApi.get<DocumentResponse>(url);
    return {
      success: true,
      document: res,
    };
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
