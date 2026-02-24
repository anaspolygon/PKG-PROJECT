"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";

export async function updateApkVersionAction(
  formData: {
    version: string;
    downloadUrl: string;
    force_download?: boolean;
    releaseNotes?: string;
  },
  id: number | null
) {
  try {
    const payload = {
      version: formData.version,
      download_url: formData.downloadUrl,
      force_download: formData.force_download,
      release_notes: formData.releaseNotes,
    };
    const res = await adminApi.put<{ message: string }>(
      `/admin/apk-version/${id}`,
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
