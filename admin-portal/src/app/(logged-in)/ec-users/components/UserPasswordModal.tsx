"use client";
import React, { useState } from "react";
import { z } from "zod";
import changePassword from "../actions/ChangePassword";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"; // Icon import
import { useItemsStore } from "@/store/useUserstore";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";
import { useRouter } from "next/navigation";

export const passwordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    new_password: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    new_password_confirmation: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    path: ["new_password_confirmation"],
    message: "Passwords do not match",
  });

interface UserEditFormModalProps {
  userId?: number;
  isEcUser: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const UserPasswordModal: React.FC<UserEditFormModalProps> = ({
  userId,
  isEcUser,
  isOpen,
  onClose,
}) => {
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { items, addItem } = useItemsStore();
  const info: UserLoginInfo = (items.info as UserLoginInfo) ?? null;
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const result = passwordSchema.safeParse(password);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      setIsLoading(false);
    } else {
      setErrors({});
      const res = await changePassword(userId as number, isEcUser, result.data);
      if (res.success) {
        setPassword({
          old_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
        onClose();
        addItem("info", { ...info, resetPasswordMessage: null });
        toast.success(res.message);
      } else {
        toast.error(res.message);
        if (res.code === 401) {
          router.push("/auth/login");
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <h2 className="text-xl font-medium mb-6">Change Password</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            autoComplete="off"
          >
            {/* Old Password */}
            <div>
              <label className="block text-sm font-medium capitalize">
                Old password <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  name="old_password"
                  type="text"
                  value={password["old_password"]}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="other"
                  readOnly
                  onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    });
                    setErrors({ ...errors, old_password: "" });
                  }}
                  className={`w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 pr-10 focus:outline-none disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 
                    ${!showOldPassword ? "password-hidden" : ""}`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors["old_password"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["old_password"]}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium capitalize">
                New password <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  name="new_password"
                  type="text"
                  value={password["new_password"]}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="other"
                  readOnly
                  onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    });
                    setErrors({ ...errors, new_password: "" });
                  }}
                  className={`w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 pr-10 focus:outline-none disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 
                    ${!showNewPassword ? "password-hidden" : ""}`}
                  placeholder="New Password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors["new_password"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["new_password"]}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium capitalize">
                Confirm new password{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  name="new_password_confirmation"
                  type="text"
                  value={password["new_password_confirmation"]}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="other"
                  readOnly
                  onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    });
                    setErrors({ ...errors, new_password_confirmation: "" });
                  }}
                  className={`w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 pr-10 focus:outline-none disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 
                    ${!showConfirmPassword ? "password-hidden" : ""}`}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors["new_password_confirmation"] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors["new_password_confirmation"]}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#003970] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 cursor-pointer font-medium"
              >
                {isLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </form>

          <button
            onClick={() => onClose()}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPasswordModal;
