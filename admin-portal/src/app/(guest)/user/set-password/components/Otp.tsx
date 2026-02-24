"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OTPInput from "react-otp-input";
import BtnSpinner from "./ClipLoader";
import { formatTimer } from "@/utils/formattime";
import { defaultFormActionResult } from "@/types";
import { toast } from "sonner";
import validateOtp from "@/app/(guest)/auth/validate-otp/actions/ValidateOtp";
import { encryptPayload } from "@/lib/cryto";

const Otp = () => {
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const { otp_response, email, mobile, api_token } =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null
  const [timer, setTimer] = useState<number>(otp_response.can_retry_after ?? otp_response.retry_after ?? 120);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const disabled = otp.length === 6;
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const token = searchParams.get("token");
  const type = searchParams.get("type");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const verifyOtp = async () => {
    setLoading(true);
    const formData = new FormData();
    // formData.append("email", email as string);
    formData.append("mobile", mobile as string);
    formData.append("apiToken", api_token);
    formData.append("otp", otp);
    const payload = encryptPayload(Object.fromEntries(formData));
    const res = await validateOtp(defaultFormActionResult, payload);
    if (!res.success) {
      toast.error(res.message);
      setLoading(false);
    } else {
      localStorage.removeItem("set_password");
      localStorage.setItem(
        "set_password",
        JSON.stringify({
          email,
          authorization_code: res.data?.authorization_code,
        })
      );
      setLoading(false);
      router.push("/user/password");
    }
    setOtp("");
  };

  return (
    <>
      <p className="text-base font-bold text-gray-600 mb-4">
        Enter the 6-digit code sent to your mobile number
      </p>
      <OTPInput
        value={otp}
        onChange={(value) => {
          const numericValue = value.replace(/[^0-9]/g, "");
          setOtp(numericValue);
        }}
        numInputs={6}
        renderSeparator={<span className="mx-2"></span>}
        inputStyle={{
          width: "4rem",
          justifyContent: "center",
          height: "4rem",
          fontSize: "1.25rem",
          borderRadius: "0.5rem",
          border: "1px solid #d1d5db",
          backgroundColor: "#F2F5F8",
          textAlign: "center",
          color: "#7A828A",
        }}
        renderInput={(inputProps, index) => (
          <input
            {...inputProps}
            ref={(el) => {
              if (index === 0) {
                firstInputRef.current = el;
              }
              if (typeof inputProps.ref === "function") {
                inputProps.ref(el);
              } else if (inputProps.ref) {
                if (el) {
                  (
                    inputProps.ref as React.RefObject<HTMLInputElement>
                  ).current = el;
                }
              }
            }}
            className="justify-center"
          />
        )}
        containerStyle="justify-center"
      />
      <div className="flex justify-end">
        {timer > 0 ? (
          <p className="text-gray-500 text-end my-2">
            Resend code in {formatTimer(timer)}
          </p>
        ) : (
          <button
            type="button"
            onClick={() => router.push(`/user/set-password?key=${key}&token=${token}&type=${type}`)}
            className="text-blue font-medium cursor-pointer my-2"
          >
            Resend code
          </button>
        )}
      </div>
      <button
        disabled={!disabled}
        onClick={() => verifyOtp()}
        className="w-full bg-[#094E9E] text-white font-medium py-2 rounded-md hover:bg-blue-900 cursor-pointer transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <BtnSpinner text="Loading..." /> : "Verify"}
      </button>
    </>
  );
};

export default Otp;
