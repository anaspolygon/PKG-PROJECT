"use client";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultFormActionResult } from "@/types/Form";
import {
  AdminLoginResult,
  FormKey,
  FormValues,
} from "../types/AdminLoginTypes";
import loginAdmin from "../actions/AdminLoginAction";
import { toast } from "sonner";
import { clearUserSession } from "@/utils/tokenUtils";
import { shootAdminOtp } from "../../otp/actions/shootAdminOtp";
import { encryptPayload } from "@/lib/cryto";
import { routes } from "@/lib/routes";

export const shootOtp = async (mobile: string, auth_token: string) => {
  const res = await shootAdminOtp({ mobile, auth_token });
  if (res.success) {
    localStorage.setItem(
      "retry_time",
      JSON.stringify(res.data?.can_retry_after ?? res.data?.retry_after),
    );
    localStorage.setItem("retry_timestamp", Date.now().toString());
    toast.success(res.message || "OTP successfully sent to your mobile");
    // do a client-side replace to avoid adding a history entry
    if (typeof window !== "undefined") window.location.replace("/auth/otp");
  } else {
    toast.error(res.message);
  }
};

function decodeJWTPayload(token: string) {
  const payload = token?.split(".")[1];
  const decoded = atob(payload?.replace(/-/g, "+")?.replace(/_/g, "/"));
  return JSON.parse(decoded);
}

const useAdminLogin = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    employee_id: "",
    password: "",
  });

  const [touched, setTouched] = useState<Record<FormKey, boolean>>({
    employee_id: false,
    password: false,
  });

  const [result, action, isPending] = useActionState<
    AdminLoginResult,
    FormData
  >(async (prev, formData) => {
    try {
      const plainData = Object.fromEntries(formData.entries());
      const res = await loginAdmin(prev, encryptPayload(plainData));

      if (!res) {
        toast.error("No response from server");
        return prev;
      }

      if (!res.success) {
        toast.error(res.message || "Something went wrong");
      }

      return res;
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Something went wrong");
      return prev;
    }
  }, defaultFormActionResult);

  const router = useRouter();

  useEffect(() => {
    if (!result.success) return;

    clearUserSession();
    if (result.success && result.data) {
      const payload = decodeJWTPayload(result?.data?.token as string);
      const info = {
        name: payload.name,
        email: payload.email,
        employee_id: payload.employee_id,
        permissions: payload.permissions,
      };

      localStorage.setItem("preload", JSON.stringify(result.data?.preload));
      localStorage.setItem("info", JSON.stringify(info));

      // pick the first route the user has permission for and navigate client-side
      const target = routes.find(
        (item) => payload.permissions[item.permission],
      );
      if (target) {
        toast.success("Successfully logged in");
        router.replace(target.path);
        return;
      }

      // no permitted route found
      router.replace("/access-denied");
    }
  }, [result, router]);

  const update = (key: FormKey, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const onBlur = (key: FormKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const shouldShowError = (key: FormKey) =>
    touched[key] && formValues[key].trim() === "";

  const getPasswordStrengthError = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Include at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Include at least one number";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      return "Include at least one special character";
    return null;
  };

  const form = {
    values: formValues,
    update,
    onBlur,
    touched,
    shouldShowError,
    result,
    action,
    getPasswordStrengthError,
    canSubmit: formValues.employee_id !== "" && formValues.password !== "",
    errors: {
      email: formValues.employee_id.trim() !== "",
      password:
        formValues.password.trim() !== "" &&
        getPasswordStrengthError(formValues.password) === null,
    },
  };

  return { form, isPending };
};

export default useAdminLogin;
