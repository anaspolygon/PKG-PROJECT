"use server";

import { adminApi } from "@/api/ApiClient";
import { HttpError } from "@/api/HttpStatusChecks";
import config from "@/types/Config";
import { ValidateOTPFormActionResult } from "../types/Types";
import { decryptPayload } from "@/lib/cryto";

export default async function validateOtp(
  _: ValidateOTPFormActionResult,
  formData: FormData | string
): Promise<ValidateOTPFormActionResult> {
  // const email = formData.get('email') as string;
  // const mobile = formData.get('mobile') as string;
  // const apiToken = formData.get('apiToken') as string;
  // const otp = formData.get('otp') as string;

  const { mobile, apiToken, otp } = decryptPayload(formData as string);

  try {
    const res = await adminApi.post<{ authorization_code: string }>(
      "/validate-sms-otp",
      {
        // email,
        mobile,
        app_id: config.otpAppId,
        api_token: apiToken,
        otp,
      }
    );

    return {
      error: undefined,
      success: true,
      message: "OTP verified successfully.",
      data: res,
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
