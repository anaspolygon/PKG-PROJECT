"use client";

import React from "react";
import { useValidateOtp } from "../hooks/useValidateOtp";
// import Link from "next/link";
import Loader from "@/app/components/Loader";

const ValidateOtpForm = () => {
  const {
    form,
    isPending,
    otpDigits,
    inputRefs,
    resendTimer,
    isResending,
    isLoadingLocalStorage,
    handleOtpChange,
    handleOtpKeyDown,
    handleResendOtp,
  } = useValidateOtp();

  const mobile =
    typeof window !== "undefined" ? localStorage.getItem("mobile") : null;
  const apiToken =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  if (isLoadingLocalStorage) {
    return <Loader />;
  }

  return (
    <div className="max-w-sm mx-auto p-4 flex flex-col gap-3 bg-white rounded">
      <div>
        <h2 className="text-lg font-medium">Verify OTP</h2>
        <p className="text-sm text-gray-600">
          Enter the 6-digit code sent to{" "}
          <strong>{mobile || "your mobile"}</strong>
        </p>
      </div>
      <form action={form.action} className="flex flex-col gap-3">
        <div className="flex justify-between space-x-2">
          {otpDigits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9]?$/.test(value)) {
                  handleOtpChange(value, idx);
                }
              }}
              onKeyDown={(e) => handleOtpKeyDown(e, idx)}
              className="w-10 h-12 text-center border rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <input type="hidden" name="mobile" value={mobile || ""} />
        <input type="hidden" name="apiToken" value={apiToken || ""} />
        <input type="hidden" name="otp" value={form.values.otp} />

        <div className="flex justify-end text-center">
          {/* <Link
            href="/auth/login"
            className="text-sm text-blue-600 hover:underline text-center"
          >
            Change Email
          </Link> */}
          <p className="text-sm text-gray-600">
            Did not get the code?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendTimer > 0 || isResending}
              className={`ml-1 text-blue-600 hover:underline cursor-pointer ${
                resendTimer > 0 || isResending
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isResending
                ? "Resending..."
                : `Resend ${resendTimer > 0 ? `(${resendTimer}s)` : ""}`}
            </button>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#003970] text-white py-2 px-4 font-medium rounded-md hover:bg-blue-900 disabled:opacity-50 cursor-pointer"
          disabled={form.values.otp.length !== 6 || isPending}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default ValidateOtpForm;
