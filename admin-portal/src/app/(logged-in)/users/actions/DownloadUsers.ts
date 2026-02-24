/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { HttpMethod } from "@/api/Types";

interface DownloadResult {
  blob: Blob;
  fileName: string;
  success?: boolean;
  code?:number;
  message?:string;
  error?:any,
  status?:boolean
}

export default async function downloadUsers(): Promise<DownloadResult> {
  try {
    return await adminApi.call<{ blob: Blob; fileName: string }>(
      HttpMethod.get,
      "/users/export",
      { "Content-Type": "application/json" },
      undefined,
      true,
      true
    );
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        blob: new Blob([]),
        fileName: '',
        status:false,
        success: false,
        code: e.code,
        message: e.message || "Something went wrong.",
        error: e,
      };
    }

    throw e instanceof Error ? e : new Error("Unknown error");
  }
}
