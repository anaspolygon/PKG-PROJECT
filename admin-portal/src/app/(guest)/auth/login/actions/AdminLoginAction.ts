"use server";
import { adminApi } from "@/api/ApiClient";
import { AdminLogin, AdminLoginResult } from "../types/AdminLoginTypes";
import { HttpError } from "@/api/HttpStatusChecks";
import { PreLoadRoot } from "@/types/PreloadTypes";
import { decryptPayload } from "@/lib/cryto";
import AuthManager from "@/services/AuthManager";

export default async function loginAdmin(
  _: AdminLoginResult,
  formData: FormData | string
): Promise<AdminLoginResult> {
  try {
    let preload: PreLoadRoot | undefined;
    let preloadDataBangla: PreLoadRoot | undefined;
    const data = decryptPayload(formData as string) as {
      employee_id: string;
      password: string;
    };

    const res = await adminApi.post<AdminLogin>("/admin/login", {
      employee_id: data.employee_id,
      password: data.password,
    });

    console.log("Login response:===================================>", res);

    if (res) {
      await AuthManager.login(res.token);
    }

    const preloadResponse = await adminApi.get<PreLoadRoot>("/preload-data");

    if(preloadResponse){
      preload = preloadResponse;
    }

    return {
      success: true,
      message: res.message,
      data: {
        mobile: res.mobile,
        auth_token: res.auth_token,
        token: res.token,
        expiredPassword: res.expired_password,
        preload,
        preloadDataBangla,
      },
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
