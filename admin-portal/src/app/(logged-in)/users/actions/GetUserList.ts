"use server";

import { adminApi } from "@/api/ApiClient";
import { UserList } from "../types/UserTypes";
import { HttpError } from "@/api/HttpStatusChecks";

export default async function getUserListAction(
  searchValue: string,
  page: number = 1
): Promise<UserList> {
  try {
    return await adminApi.get<UserList>(
      `/admin/users?page=${page}${searchValue ? `&search=${searchValue}` : ""}`
    );
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
