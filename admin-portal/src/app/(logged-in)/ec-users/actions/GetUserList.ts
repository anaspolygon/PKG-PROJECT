"use server";

import { adminApi } from "@/api/ApiClient";
import { UserList } from "../types/UserTypes";

export default async function getUserListAction(
  page: number = 1
): Promise<UserList> {
  const response = await adminApi.get<UserList>(`/ec-users?page=${page}`);
  return response;
}
