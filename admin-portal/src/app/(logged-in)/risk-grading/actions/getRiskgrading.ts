"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { RiskgradingResponse } from "../types/RiskgradingTypes";

export interface ApiError {
  success: false;
  code: number;
  message: string;
}

export default async function getRiskgrading(): Promise<
  RiskgradingResponse | ApiError
> {
  try {
    const url = "/admin/risk-config";
    return await adminApi.get<RiskgradingResponse>(url);
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
