"use server";
import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
interface FileDownloadResponse {
  sucess?:boolean;
  code?:number;
  file_name: string;
  file_content: string;
  message?: string;
}
export async function downloadAllApplications(
  searchTerm?: string,
  startDate?: string,
  endDate?: string,
  bankingType?: string
) {
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append("column", searchTerm);
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (bankingType) params.append("banking_type", bankingType);

    const res = await adminApi.get<FileDownloadResponse>(
      `/admin/applications/download-applications?${params.toString()}`
    );

    const binaryString = atob(res.file_content);
    const len = binaryString.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      buffer[i] = binaryString.charCodeAt(i);
    }
    return {
      success: true,
      file: buffer.buffer,
      fileName: res.file_name,
    };
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
