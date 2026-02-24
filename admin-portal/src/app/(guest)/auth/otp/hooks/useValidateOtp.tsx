"use client";
import { toast } from "sonner";
import { useActionState, useState, useRef, useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";
import { defaultFormActionResult } from "@/types/Form";
import validateOtp from "../actions/ValidateOtp";
import {
  FormKey,
  FormValues,
  ValidateOTPFormActionResult,
} from "../types/Types";
import { clearUserSession } from "@/utils/tokenUtils";
import { getRedirectPathFromPermissions } from "@/app/helpers/RedirectHelper";
import { useItemsStore } from "@/store/useUserstore";
import { shootAdminOtp } from "../actions/shootAdminOtp";
import { decryptPayload, encryptPayload } from "@/lib/cryto";

export const useValidateOtp = () => {
  const { addItem } = useItemsStore();
  const [result, action, isPending] = useActionState<
    ValidateOTPFormActionResult,
    FormData
  >(async (prev, formData) => {
    const plainData = Object.fromEntries(formData.entries());

    const expired_password =
      typeof window !== "undefined"
        ? localStorage.getItem("expired_password")
        : null;
    const exp_admin =
      typeof window !== "undefined" ? localStorage.getItem("exp_admin") : null;

    if (expired_password === "true" && exp_admin) {
      const decode = decryptPayload(JSON.parse(exp_admin));
      plainData["new_password"] = decode.password;
    }

    const res = await validateOtp(prev, encryptPayload(plainData));

    if (res.success && res.data) {
      clearUserSession();

      if (res.data) {
        localStorage.removeItem("expired_password");
        localStorage.removeItem("exp_admin");
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        document.cookie = `userInfo=${encodeURIComponent(
          JSON.stringify(res.data?.info)
        )}; path=/; SameSite=Lax;`;
        addItem("info", res.data.info);
        addItem("preload", res.data.preloadData);
        if (res.data?.preloadDataBangla)
          addItem("preload_bangla", res.data.preloadDataBangla);
      }

      const redirectUrl = res.data
        ? getRedirectPathFromPermissions(res.data.info)
        : null;

      if (redirectUrl) {
        toast.success("Successfully logged in");
        redirect(redirectUrl, RedirectType.replace);
      } else {
        toast.error("You do not have permission to access any section.");
        redirect("/access-denied", RedirectType.replace);
      }
    } else {
      toast.error(res.message || "OTP verification failed");
    }

    return res;
  }, defaultFormActionResult);

  const [formValues, setFormValues] = useState<FormValues>({
    email:
      typeof window !== "undefined"
        ? localStorage.getItem("resetEmail") || ""
        : "",
    apiToken:
      typeof window !== "undefined"
        ? localStorage.getItem("apiToken") || ""
        : "",
    otp: "",
  });

  const [isLoadingLocalStorage, setIsLoadingLocalStorage] = useState(true);

  useEffect(() => {
    const getLocalStorageValues = () => {
      if (typeof window !== "undefined") {
        setIsLoadingLocalStorage(false);
      }
    };

    getLocalStorageValues();
  }, []);

  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const RESEND_INTERVAL = 60;
  const [resendTimer, setResendTimer] = useState(0);
  const [isTimerInitialized, setIsTimerInitialized] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isTimerInitialized) {
      const retryTime = localStorage.getItem("retry_time");
      const retryTimestamp = localStorage.getItem("retry_timestamp");

      if (retryTime && retryTimestamp) {
        const storedTime = Number(retryTime);
        const storedTimestamp = Number(retryTimestamp);
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor(
          (currentTime - storedTimestamp) / 1000
        );
        const remainingTime = Math.max(0, storedTime - elapsedSeconds);

        setResendTimer(remainingTime);
      } else {
        setResendTimer(0);
      }

      setIsTimerInitialized(true);
    }
  }, [isTimerInitialized]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const update = (key: FormKey, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    update("otp", newOtp.join(""));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer <= 0 && !isResending) {
      setIsResending(true);

      try {
        const mobile =
          typeof window !== "undefined"
            ? localStorage.getItem("mobile") || ""
            : "";
        const auth_token =
          typeof window !== "undefined"
            ? localStorage.getItem("auth_token") || ""
            : "";

        const res = await shootAdminOtp({ mobile, auth_token });

        if (res.success) {
          setOtpDigits(Array(6).fill(""));
          update("otp", "");

          if (res.data?.can_retry_after) {
            const newRetryTime = Number(res.data.can_retry_after);
            setResendTimer(newRetryTime);
            if (typeof window !== "undefined") {
              localStorage.setItem("retry_time", res.data.can_retry_after);
              localStorage.setItem("retry_timestamp", Date.now().toString());
            }
          } else {
            setResendTimer(RESEND_INTERVAL);
            if (typeof window !== "undefined") {
              localStorage.setItem("retry_time", RESEND_INTERVAL.toString());
              localStorage.setItem("retry_timestamp", Date.now().toString());
            }
          }

          toast.success("OTP resent successfully.");
        } else {
          toast.error(res.message || "Failed to resend OTP.");
        }
      } catch (error) {
        toast.error("Failed to resend OTP. Please try again.");
        console.error("Resend OTP error:", error);
      } finally {
        setIsResending(false);
      }
    }
  };

  const form = {
    values: formValues,
    update,
    result,
    action,
    canSubmit: formValues.otp.length === 6,
    errors: {
      otp: formValues.otp.trim() === "",
      email: formValues.email.trim() === "",
      apiToken: formValues.apiToken.trim() === "",
    },
  };

  return {
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
  };
};
