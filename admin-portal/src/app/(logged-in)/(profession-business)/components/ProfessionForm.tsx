"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import {
  getAddContext,
  getUpdateContext,
  isRegularBusinessOrProfession,
  PageName,
} from "../types/ProfessionTypes";

/* ================================
   Zod Schema
================================ */

const Schema = (pageName: PageName) =>
  z
    .object({
      label: z.string().min(1, "Label is required"),
      value: z.string().optional(),
      ababil_sbs_code: z.string().min(1, "Ababil SBS code is required"),
      finacle_sbs_code: z.string().min(1, "Finacle SBS code is required"),

      risk_score: z
        .number({ invalid_type_error: "Risk score is required" })
        .min(0, "Risk score must be 0 or greater")
        .optional(),
      category_code: isRegularBusinessOrProfession(pageName)
        ? z.string().min(1, "Category code is required")
        : z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (isRegularBusinessOrProfession(pageName)) {
        if (data.risk_score === undefined || data.risk_score === null) {
          ctx.addIssue({
            code: "custom",
            path: ["risk_score"],
            message: "Risk score is required",
          });
        }
        if (!data.category_code) {
          ctx.addIssue({
            code: "custom",
            path: ["category_code"],
            message: "Category code is required",
          });
        }
      }
    });

export type FormData = z.infer<ReturnType<typeof Schema>>;

/* ================================
   Component
================================ */

interface Props {
  pageName: PageName;
  onSubmit: (data: FormData) => void;
  loading: boolean;
  defaultValues?: Partial<FormData>;
  closeModal?: () => void;
  isEdit?: boolean;
}

export default function ProfessionForm({
  pageName,
  onSubmit,
  loading,
  defaultValues,
  closeModal,
  isEdit = false,
}: Props) {
  const isBusinessOrProfession = isRegularBusinessOrProfession(pageName);

  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(Schema(pageName)),
    defaultValues: defaultValues || {
      label: "",
      value: "",
      ababil_sbs_code: "",
      finacle_sbs_code: "",
      risk_score: undefined,
      category_code: "",
    },
  });

  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-y-auto max-h-137.5 pr-3"
    >
      <div className="space-y-3">
        {/* ================= Label ================= */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Label <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter label"
            disabled={isEdit}
            {...register("label")}
            className={`w-full border rounded-lg px-4 py-2 ${
              isEdit
                ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
                : "border-gray-300"
            }`}
          />

          {errors.label && (
            <p className="text-red-600 text-sm mt-1">
              {errors.label.message}
            </p>
          )}
        </div>

        {/* ================= Ababil SBS Code ================= */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Ababil SBS Code <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter ababil SBS code"
            {...register("ababil_sbs_code")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {errors.ababil_sbs_code && (
            <p className="text-red-600 text-sm mt-1">
              {errors.ababil_sbs_code.message}
            </p>
          )}
        </div>

        {/* ================= Finacle SBS Code ================= */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Finacle SBS Code <span className="text-red-600">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter finacle SBS code"
            {...register("finacle_sbs_code")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />

          {errors.finacle_sbs_code && (
            <p className="text-red-600 text-sm mt-1">
              {errors.finacle_sbs_code.message}
            </p>
          )}
        </div>

        {/* ================= Risk Score ================= */}
        {isBusinessOrProfession && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Risk Score <span className="text-red-600">*</span>
            </label>

            <input
              type="number"
              placeholder="Enter risk score"
              min={0}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e" || e.key === "+") {
                  e.preventDefault();
                }
              }}
              {...register("risk_score", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />

            {errors.risk_score && (
              <p className="text-red-600 text-sm mt-1">
                {errors.risk_score.message}
              </p>
            )}
          </div>
        )}

        {/* ================= Category Code ================= */}
        {isBusinessOrProfession && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Code <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter category code"
              {...register("category_code")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />

            {errors.category_code && (
              <p className="text-red-600 text-sm mt-1">
                {errors.category_code.message}
              </p>
            )}
          </div>
        )}

        {/* ================= Buttons ================= */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
          <PrimaryBtn
            variant="secondary"
            type="button"
            loadingAll={false}
            content="Cancel"
            onClick={closeModal}
          />

          <PrimaryBtn
            type="submit"
            variant="primary"
            loadingAll={loading}
            content={
              isEdit
                ? getUpdateContext(pageName)
                : getAddContext(pageName)
            }
            loadingContent={
              isEdit ? "Updating..." : "Adding..."
            }
            disabled={isEdit ? !isDirty : false}
          />
        </div>
      </div>
    </form>
  );
}
