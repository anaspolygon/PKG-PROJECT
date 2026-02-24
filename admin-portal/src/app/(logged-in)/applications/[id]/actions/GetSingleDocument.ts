/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";

interface DocumentResponse {
  success?: boolean;
  code?: number;
  message?: string;
}

export default async function getSingleDocument(id: string) {
  try {
    const res = await adminApi.get<DocumentResponse>(
      `/admin/applications/${id}/documents/download`
    );
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
