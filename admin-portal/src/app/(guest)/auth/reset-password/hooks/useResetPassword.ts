"use client";

import { defaultFormActionResult } from "@/types/Form";
import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import {
  ResetPasswordFormActionResult,
  ResetPasswordFormKey,
  ResetPasswordFormValues,
} from "../types/Types";
import resetPassword from "../actions/ResetPasswordAction";
import { shootOtp } from "../../login/hooks/useAdminLogin";
import { encryptPayload } from "@/lib/cryto";
import { validateNewPassword } from "../actions/ValidateNewPassword";

export const useResetPassword = () => {
  const [result, action, isPending] = useActionState<
    ResetPasswordFormActionResult,
    FormData
  >(
    async (
      prev: ResetPasswordFormActionResult,
      formData: FormData
    ): Promise<ResetPasswordFormActionResult> => {
      const expired_password =
        typeof window !== "undefined"
          ? localStorage.getItem("expired_password")
          : null;

      const mobile =
        typeof window !== "undefined" ? localStorage.getItem("mobile") : null;

      const auth_token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;

      const password = formData.get("password") as string;

      if (expired_password === "true" && mobile && auth_token && password) {
        localStorage.setItem(
          "exp_admin",
          JSON.stringify(encryptPayload({ password }))
        );
        const validateRes = await validateNewPassword({
          mobile,
          new_password: password,
        });
        if (!validateRes.status) {
          toast.error(validateRes.message || "Failed to validate new password");
          return {
            ...defaultFormActionResult,
            success: false,
            message: validateRes.message || "Failed to validate new password",
          };
        }

        await shootOtp(mobile, auth_token);
      }


      const res = await resetPassword(prev, formData);

      if (res.success) {
        toast.success(res.message || "Password reset successfully");

        if (typeof window !== "undefined") {
          localStorage.removeItem("reset_email");
          localStorage.removeItem("retry_timestamp");
          localStorage.removeItem("api_token");
          localStorage.removeItem("otp");
          localStorage.removeItem("retry_time");
          localStorage.removeItem("authorization_code");
        }

        redirect("/auth/login");
      } else {
        toast.error(res.message || "Failed to reset password");
      }

      return res;
    },
    defaultFormActionResult
  );

  const [isLoadingLocalStorage, setIsLoadingLocalStorage] = useState(true);

  useEffect(() => {
    const getLocalStorageValues = () => {
      if (typeof window !== "undefined") {
        setIsLoadingLocalStorage(false);
      }
    };

    getLocalStorageValues();
  }, []);

  const [formValues, setFormValues] = useState<ResetPasswordFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    authorizationCode: "",
  });

  const [touched, setTouched] = useState<Record<ResetPasswordFormKey, boolean>>(
    {
      email: false,
      password: false,
      confirmPassword: false,
      authorizationCode: false,
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("reset_email");
      const authorizationCode = localStorage.getItem("authorization_code");

      if (email) {
        setFormValues((prev) => ({ ...prev, email }));
      }

      if (authorizationCode) {
        setFormValues((prev) => ({ ...prev, authorizationCode }));
      }
    }
  }, []);

  const update = (key: ResetPasswordFormKey, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onBlur = (key: ResetPasswordFormKey) => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  // Password validation
  const getPasswordStrengthError = (password: string): string => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    // Add more password strength validation as needed
    // Example: require uppercase, lowercase, numbers, special characters
    // const hasUppercase = /[A-Z]/.test(password);
    // const hasLowercase = /[a-z]/.test(password);
    // const hasNumber = /\d/.test(password);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // if (!hasUppercase) return "Password must contain at least one uppercase letter";
    // if (!hasLowercase) return "Password must contain at least one lowercase letter";
    // if (!hasNumber) return "Password must contain at least one number";
    // if (!hasSpecialChar) return "Password must contain at least one special character";

    return "";
  };

  const isValidPassword =
    formValues.password !== "" &&
    getPasswordStrengthError(formValues.password) === "";

  const isValidConfirmPassword =
    formValues.confirmPassword !== "" &&
    formValues.password === formValues.confirmPassword;

  const shouldShowError = (key: ResetPasswordFormKey): boolean => {
    return touched[key];
  };

  const form = {
    values: formValues,
    update,
    onBlur,
    shouldShowError,
    getPasswordStrengthError,
    result,
    action,
    canSubmit: isValidPassword && isValidConfirmPassword,
  };

  return { form, isPending, isLoadingLocalStorage };
};
