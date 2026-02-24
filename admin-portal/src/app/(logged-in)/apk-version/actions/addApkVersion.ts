"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
export async function addApkVersionAction(formData: {
  version: string;
  downloadUrl: string;
  force_download?: boolean;
  releaseNotes?: string;
}) {
  try {
    const payload = {
      version: formData.version,
      download_url: formData.downloadUrl,
      force_download: formData.force_download,
      release_notes: formData.releaseNotes,
    };
    const res = await adminApi.post<{ message: string }>(
      "/admin/apk-version",
      payload
    );
    return { success: true, message: res.message };
  } catch (error) {
    if (error instanceof HttpError) {
      return {
        success: false,
        code: error.code,
        message: error.message,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
