"use server";

import { adminApi } from "@/api/ApiClient";
import { PercentageConfigList } from "../types/Types";
import { HttpError } from "@/api/HttpStatusChecks";

export default async function getPercentageList(): Promise<PercentageConfigList> {

  try {
    return await adminApi.get<PercentageConfigList>('/admin/percentage-configs');
  } catch (e) {
     if (e instanceof HttpError) {
          return {
            success: false,
            code:e.code,
            message: e.message || "Something went wrong.",
            data:[]
          };
        }
    
        throw e;
  }
}
