"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import useAdminLogin from "../hooks/useAdminLogin";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
export default function AdminLoginForm() {
  const { form, isPending } = useAdminLogin();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <form
        action={form.action}
        className="flex flex-col space-y-4 w-full max-w-sm mx-auto p-4 bg-white rounded-lg"
        autoComplete="off"
      >
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Employee ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="employee_id"
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
              placeholder="Enter your employee ID"
              value={form.values.employee_id}
              onChange={(e) => form.update("employee_id", e.target.value)}
              onBlur={() => form.onBlur("employee_id")}
              autoComplete="nope"
              readOnly
              onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
            />
          </div>
          {form.shouldShowError("employee_id") && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
              Employee ID is required
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="password"
              required
              className={`w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400 ${
                !showPassword ? "password-hidden" : ""
              }`}
              placeholder="Enter your password"
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
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {form.shouldShowError("password") && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
              {form.values.password === ""
                ? "Password is required"
                : form.getPasswordStrengthError(form.values.password)}
            </p>
          )}
        </div>

        <PrimaryBtn
          type="submit"
          variant="primary"
          disabled={!form.canSubmit || isPending}
          content="Sign In"
          loadingContent="Signing In..."
          loadingAll={isPending}
        />
      </form>
    </>
  );
}
