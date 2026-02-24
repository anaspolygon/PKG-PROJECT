"use server";

import { adminApi } from "@/api/ApiClient";
import { Department } from "../types/DepartmentTypes";

export default async function getAllDepartment(): Promise<Department[]> {
  const response = await adminApi.get<Department[]>(`/departments/all`);
  return response;
}
