"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import { AddUser, AddUserResult } from "../types/UserTypes";

export default async function addUser(
  _: AddUserResult,
  formData: FormData
): Promise<AddUserResult> {
  try {
    const res = await adminApi.post<AddUser>("/ec-users", {
      branch_id: formData.get("branch_id"),
      username: formData.get("username"),
      password: formData.get("password"),
    });

    return {
      success: true,
      message: "User added successfully.",
      data: res,
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        message: e.message || "Something went wrong.",
        data: undefined,
      };
    }

    throw e;
  }
}
