"use server";
import { adminApi, authApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import config from "@/types/Config";
import { ValidateOTPFormActionResult } from "../types/Types";
import { ValidateOtpResponse } from "../../login/types/AdminLoginTypes";
import AuthManager from "@/services/AuthManager";
import { PreLoadRoot } from "@/types/PreloadTypes";
import { decryptPayload } from "@/lib/cryto";

export default async function validateOtp(
  _: ValidateOTPFormActionResult,
  formData: FormData | string
): Promise<ValidateOTPFormActionResult> {
  // const mobile = formData.get("mobile") as string;
  // const apiToken = formData.get("apiToken") as string;
  // const otp = formData.get("otp") as string;

  const data = decryptPayload(formData as string);


  try {
    const payload = {
      mobile: data.mobile,
      app_id: config.otpAppId,
      api_token: data.apiToken,
      otp: data.otp,
      ...(data.new_password && { new_password: data.new_password }),
    };
    let preloadDataResponse;
    let preloadDataBanglaResponse;
    const res = await adminApi.post<ValidateOtpResponse>(
      "/validate-login-otp",
      payload
    );

    if (res) {
      await AuthManager.login(res.token);
      preloadDataResponse = await authApi.get<PreLoadRoot>(
        "/application/preload-data"
      );
      preloadDataBanglaResponse = await authApi.get<PreLoadRoot>(
        "/application/preload-data-bangla"
      );
    }

    return {
      error: undefined,
      success: true,
      message: "OTP verified successfully.",
      data: {
        token: res.token,
        info: res.info,
        preloadData: preloadDataResponse,
        preloadDataBangla: preloadDataBanglaResponse,
      },
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        success: false,
        message: e.message || "Invalid OTP or verification failed.",
      };
    }

    throw e; // rethrow unknown errors
  }
}
