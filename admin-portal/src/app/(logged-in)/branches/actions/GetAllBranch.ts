"use server";

import { adminApi } from "@/api/ApiClient";

export interface Branch {
  id: number;
  branch_name: string;
  branch_code:string
}

export default async function getAllBranch(): Promise<Branch[]> {
  const response = await adminApi.get<Branch[]>("/admin/branch/branch-list");
  return response;
}
