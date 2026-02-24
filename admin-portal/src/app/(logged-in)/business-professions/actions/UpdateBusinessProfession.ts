'use server';

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { DefaultFormActionResult } from "@/types/Form";

export default async function updateBusinessProfession(
  _: DefaultFormActionResult,
  formData: FormData
): Promise<DefaultFormActionResult> {
  try {
    const businessProfessionId = formData.get("id");
    
    if (!businessProfessionId) {
      return {
        success: false,
        message: "Business Profession ID is required.",
        error: new Error("Business Profession ID is required")
      };
    }

    const payload: Record<string, string | boolean> = {};
    
    const label_en = formData.get("label_en");
    if (label_en && typeof label_en === 'string') payload.label_en = label_en;

    const label_bn = formData.get("label_bn");
    if (label_bn && typeof label_bn === 'string') payload.label_bn = label_bn;

    const type = formData.get("type");
    if (type && typeof type === 'string') payload.type = type;

    const occupation_nature = formData.get("occupation_nature");
    if (occupation_nature && typeof occupation_nature === 'string') payload.occupation_nature = occupation_nature;

    await adminApi.patch(`/business-professions/${businessProfessionId}`, payload);

    return {
      success: true,
      message: "Business Profession updated successfully.",
      error: null
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        code:e.code,
        message: e.message || "Something went wrong.",
        error: e,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred.",
      error: e instanceof Error ? e : new Error("Unknown error"),
    };
  }
}