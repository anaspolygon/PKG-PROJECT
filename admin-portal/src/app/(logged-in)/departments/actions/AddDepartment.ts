"use server";

import { HttpError } from "@/api/HttpStatusChecks";
import { adminApi } from "@/api/ApiClient";
import { AddDepartmentResult, Department } from "../types/DepartmentTypes";

export default async function addDepartment(
  _: AddDepartmentResult,
  formData: FormData
): Promise<AddDepartmentResult> {
  try {
    const payload = {
      label_en: formData.get("label_en"),
      label_bn: formData.get("label_bn"),
    };
 

    const res = await adminApi.post<Department>("/departments", payload);

    return {
      success: true,
      message: "Department added successfully.",
      data: res,
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