"use server";

import { HttpError } from "@/api/HttpStatusChecks";
import { adminApi } from "@/api/ApiClient";
import { AddBusinessResult, BusinessProfession } from "../types/BusinessTypes";


export default async function addBusinessProfession(
    _: AddBusinessResult,
    formData: FormData
  ): Promise<AddBusinessResult> {
    try {
      const res = await adminApi.post<BusinessProfession>("/business-professions", {
        label_en: formData.get("label_en"),
        label_bn: formData.get("label_bn"),
        type: formData.get("type"), 
        occupation_nature: formData.get("occupation_nature"),
      });
  
      return {
        success: true,
        message: "Business Profession added successfully.",
        data: res
      };
    } catch (e) {
      if (e instanceof HttpError) {
        return {
          success: false,
          code:e.code,
          message: e.message || "Something went wrong.",
          data: undefined,
        };
      }
  
      throw e;
    }
  }
  