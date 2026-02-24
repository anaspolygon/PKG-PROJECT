"use server";

import { adminApi } from "@/api/ApiClient";
import { RoleList } from "../types/RoleTypes";

export default async function getRoleListAction(): Promise<RoleList> {
  const response = await adminApi.get<RoleList>(`/admin/roles`);
  return response;
}