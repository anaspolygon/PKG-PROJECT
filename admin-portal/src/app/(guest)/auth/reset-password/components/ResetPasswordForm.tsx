"use client";

import { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useResetPassword } from "../hooks/useResetPassword";
import Loader from "@/app/components/Loader";

function PasswordExpiredDisclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-yellow-400 bg-yellow-50 py-2 px-4 text-sm text-yellow-800">
      <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-600 mt-0.5" />
      <p>
        <strong>Password Expired:</strong> Your password has expired. Please
        reset your password now to continue.
      </p>
    </div>
  );
}

export default function ResetPasswordForm() {
  const { form, isPending, isLoadingLocalStorage } = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const expired_password =
    typeof window !== "undefined"
      ? localStorage.getItem("expired_password")
      : null;

  if (isLoadingLocalStorage) {
    return <Loader />;
  }

  return (
    <form
      action={form.action}
      className="flex flex-col space-y-4 w-full max-w-sm mx-auto p-4 bg-white rounded-lg"
      autoComplete="off"
    >
      <div className="flex flex-col gap-2">
        {expired_password ? <PasswordExpiredDisclaimer /> : null}
        <h2 className="text-lg font-medium">Reset Password</h2>
        <p className="text-sm text-gray-600">Please enter your new password</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            type="text"
            name="password"
            required
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10 ${
              !showPassword ? "password-hidden" : ""
            }`}
            placeholder="New Password"
            value={form.values.password}
            onChange={(e) => form.update("password", e.target.value)}
            onBlur={() => form.onBlur("password")}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex hover:text-gray-900 cursor-pointer items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {form.shouldShowError("password") && (
          <p className="text-xs text-red-500 mt-1">
            {form.values.password === ""
              ? "Password is required"
              : form.getPasswordStrengthError(form.values.password)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type="text"
            name="confirmPassword"
            required
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10 ${
              !showConfirmPassword ? "password-hidden" : ""
            }`}
            placeholder="Confirm Password"
            value={form.values.confirmPassword}
            onChange={(e) => form.update("confirmPassword", e.target.value)}
            onBlur={() => form.onBlur("confirmPassword")}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
            readOnly
            onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-3 flex hover:text-gray-900 cursor-pointer items-center text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {form.shouldShowError("confirmPassword") && (
          <p className="text-xs text-red-500 mt-1">
            {form.values.confirmPassword === ""
              ? "Confirm password is required"
              : form.values.password !== form.values.confirmPassword
              ? "Passwords do not match"
              : ""}
          </p>
        )}
      </div>

      <input type="hidden" name="email" value={form.values.email} />
      <input
        type="hidden"
        name="authorizationCode"
        value={form.values.authorizationCode}
      />

      <button
        type="submit"
        disabled={!form.canSubmit || isPending}
        className="w-full bg-[#094E9E] text-white font-medium py-2 rounded-md hover:bg-blue-800 cursor-pointer transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isPending && (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
            ></path>
          </svg>
        )}
        {isPending ? "Resetting..." : "Reset Password"}
      </button>

      <Link
        href="/auth/login"
        className="text-sm text-blue-600 hover:underline"
      >
        Back to login
      </Link>
    </form>
  );
}
