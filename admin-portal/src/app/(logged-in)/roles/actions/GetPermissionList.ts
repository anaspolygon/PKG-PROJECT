"use server";

import { adminApi } from "@/api/ApiClient";
import { PermissionList } from "../types/PermissionTypes";

export default async function getPermissionListAction(): Promise<PermissionList> {
  const response = await adminApi.get<PermissionList>(`/admin/permissions`);
  return response;
}