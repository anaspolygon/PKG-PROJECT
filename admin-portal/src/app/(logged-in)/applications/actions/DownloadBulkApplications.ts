"use server";
import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
interface FileDownloadResponse {
  file_name: string;
  file_content: string;
  message?: string;
}

export async function downloadBulkApplications(
  bankingType: string | undefined,
  productType: string | undefined,
  gender: string | undefined,
  status: string | undefined,
  searchTerm: string | undefined,
  startDate: string | undefined,
  endDate: string | undefined,
) {
  try {
    const params: Record<string, string> = {};

    if (bankingType) params.banking_type = bankingType;
    if (productType) params.product_type = productType;
    if (gender) params.gender = gender;
    if (status) params.status = status;
    if (searchTerm) params.column = searchTerm;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    const query = new URLSearchParams(params).toString();

    const url = `/admin/applications/download-selected-applications?${query}`;
    console.log("Download URL:", url); // Debug log to check the URL being called
    const res = await adminApi.post<FileDownloadResponse>(url, {});

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
