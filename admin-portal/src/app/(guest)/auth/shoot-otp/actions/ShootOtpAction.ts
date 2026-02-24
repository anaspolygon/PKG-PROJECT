"use server";

import config from "@/types/Config";
import { otpApi  } from "@/api/ApiClient";
import { OTPFormActionResult, ShootOTPResponse } from "../types/Types";

export const shootOtp = async (_:OTPFormActionResult, formData: FormData): Promise<OTPFormActionResult> => {
  try {
 
    const res = await otpApi.post<ShootOTPResponse>("/shoot-otp-via-email", {
      email: formData.get('email'),
      app_id: config.otpAppId,
      api_token: formData.get('apiToken'),
    });
    return {
      error: undefined,
      success: true,
      message: "OTP successfully sent.",
      data: res
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
