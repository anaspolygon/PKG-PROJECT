"use server";
import { adminApi } from "@/api/ApiClient";
import { FormData } from "../components/ProfessionForm";
import { HttpError } from "@/api/HttpStatusChecks";

export async function updateAction(url: string, profession: Partial<FormData>) {
  try {

    const payload = {
      ...("label" in profession ? { label: profession.label } : {}),
      value: profession.value,
      additional_data: {
        ababil_sbs_code: profession.ababil_sbs_code,
        finacle_sbs_code: profession.finacle_sbs_code,
        ...("risk_score" in profession
          ? { risk_score: profession.risk_score }
          : {}),
        ...("category_code" in profession
          ? { category_code: profession.category_code?.toString() }
          : {}),
      },
    };
    
    const res = await adminApi.patch<{ message: string }>(url, payload);
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
