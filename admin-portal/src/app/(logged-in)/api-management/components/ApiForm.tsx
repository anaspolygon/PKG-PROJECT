/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API } from "../types/ApiTypes";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
const ApiSchema = z.object({
  label: z.string().min(1, "API label is required"),
  api_name: z.string().min(1, "API name is required"),
  url: z.string().min(1, "API url is required").url("Invalid URL format"),
  login_id: z.string().optional(),
  // current_password: z.string().nullable().optional(),
  password: z.string().nullable().optional(),
  additional_fields: z.record(z.any()).nullable().optional(),
});

export type ApiFormData = z.infer<typeof ApiSchema>;

interface ApiFormProps {
  onSubmit: (data: ApiFormData) => void;
  loading: boolean;
  additionalFields?: Record<string, any>;
  defaultValues?: Partial<API>;
  isEdit?: boolean;
  onClose?: () => void;
}

export default function ApiForm({
  onSubmit,
  loading,
  additionalFields,
  defaultValues,
  isEdit = false,
  onClose,
}: ApiFormProps) {
  // const schema = isEdit
  //   ? ApiSchema.superRefine((data, ctx) => {
  //       if (data.login_id && !data.password && !data.current_password) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["password"],
  //           message: "New password is required.",
  //         });
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["current_password"],
  //           message: "Current password is required.",
  //         });
  //       }
  //       if (data.current_password && !data.login_id && !data.password) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["login_id"],
  //           message: "Login ID is required.",
  //         });
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["password"],
  //           message: "New password is required.",
  //         });
  //       }
  //       if (data.password && !data.current_password && !data.login_id) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["login_id"],
  //           message: "Login ID is required.",
  //         });
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["current_password"],
  //           message: "Current password is required.",
  //         });
  //       }
  //       if (data.password && data.current_password && !data.login_id) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["login_id"],
  //           message: "Login ID is required.",
  //         });
  //       }
  //       if (data.password && data.login_id && !data.current_password) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["current_password"],
  //           message: "Current password is required.",
  //         });
  //       }
  //       if (data.current_password && data.login_id && !data.password) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["password"],
  //           message: "New password is required.",
  //         });
  //       }
  //     })
  //   : ApiSchema.superRefine((data, ctx) => {
  //       if (data.login_id && !data.password) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["password"],
  //           message: "Password is required.",
  //         });
  //       }
  //       if (data.password && !data.login_id) {
  //         ctx.addIssue({
  //           code: z.ZodIssueCode.custom,
  //           path: ["login_id"],
  //           message: "Login ID is required.",
  //         });
  //       }
  //     });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ApiFormData>({
    resolver: zodResolver(ApiSchema),
    defaultValues: defaultValues || {
      api_name: "",
      url: "",
      login_id: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  // const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // const toggleCurrentPasswordVisibility = () => {
  //   setShowCurrentPassword((prev) => !prev);
  // };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  function camelToTitle(str: string) {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 grid grid-cols-2 gap-4 max-h-125 overflow-auto p-2">
        <div>
          <label className="block text-sm font-medium mb-1">
            API Label <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter api label"
            {...register("label")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.label && (
            <p className="text-red-600 text-sm mt-1">{errors.label.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            API Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter api name"
            disabled={isEdit}
            {...register("api_name")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-100
  disabled:text-gray-400
  disabled:border-gray-200
  disabled:cursor-not-allowed"
          />
          {errors.api_name && (
            <p className="text-red-600 text-sm mt-1">
              {errors.api_name.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            API URL <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter api url"
            {...register("url")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.url && (
            <p className="text-red-600 text-sm mt-1">{errors.url.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Login ID</label>
          <input
            type="text"
            placeholder="Enter login id"
            {...register("login_id")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.login_id && (
            <p className="text-red-600 text-sm mt-1">
              {errors.login_id.message}
            </p>
          )}
        </div>
        {/* {isEdit ? (
          <div>
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("current_password")}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10  ${
                  !showCurrentPassword ? "password-hidden" : ""
                }`}
                placeholder="••••••••"
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
                onClick={toggleCurrentPasswordVisibility}
                className="absolute inset-y-0 right-3 flex hover:text-gray-900 cursor-pointer items-center text-gray-500"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.current_password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.current_password.message}
              </p>
            )}
          </div>
        ) : null} */}

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type="text"
              {...register("password")}
              className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10  ${
                !showPassword ? "password-hidden" : ""
              }`}
              placeholder="••••••••"
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
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {additionalFields &&
          Object.entries(additionalFields).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">
                {camelToTitle(key)} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                {...register(`additional_fields.${key}` as const)}
                defaultValue={value}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.additional_fields?.[key]?.message && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.additional_fields[key]?.message as string}
                </p>
              )}
            </div>
          ))}
      </div>
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
        <PrimaryBtn
          variant="secondary"
          type="button"
          loadingAll={false}
          content={"Cancel"}
          onClick={onClose || (() => {})}
        />
        <PrimaryBtn
          type="submit"
          variant="primary"
          loadingAll={loading}
          content={isEdit ? "Update API" : "Add API"}
          loadingContent={isEdit ? "Updating..." : "Adding..."}
          disabled={!isDirty}
        />
      </div>
    </form>
  );
}
