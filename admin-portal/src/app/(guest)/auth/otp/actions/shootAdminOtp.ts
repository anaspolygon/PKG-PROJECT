"use server";

import config from "@/types/Config";
import { adminApi } from "@/api/ApiClient";
import { OTPFormActionResult, ShootOTPResponse } from "../types/Types";

interface Payload {
  mobile: string;
  auth_token: string;
}

export const shootAdminOtp = async (
  payload: Payload
): Promise<OTPFormActionResult> => {
  try {
    const res = await adminApi.post<ShootOTPResponse>("/shoot-otp-via-sms", {
      mobile: payload.mobile,
      app_id: config.otpAppId,
      api_token: payload.auth_token,
    });
    return {
      error: undefined,
      success: true,
      message: "OTP successfully sent.",
      data: res,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error,
      success: false,
      message: error?.message || "Something went wrong.",
    };
  }
};
