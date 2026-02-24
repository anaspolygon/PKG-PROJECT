"use client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "antd";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
const ApkVersionSchema = z.object({
  version: z
    .string()
    .min(1, "Version is required")
    .regex(
      /^\d+\.\d+\.\d+(\+\d+)?$/,
      "Invalid version format (e.g. 1.0.5 or 1.0.5+10)",
    ),
  downloadUrl: z
    .string()
    .min(1, "Download URL is required")
    .url("Download URL must be a valid URL"),
  force_download: z.boolean(),
  releaseNotes: z.string().optional(),
});

export type ApkVersionFormData = z.infer<typeof ApkVersionSchema>;

interface ApkVersionFormProps {
  onSubmit: (data: ApkVersionFormData) => void;
  loading: boolean;
  defaultValues?: ApkVersionFormData;
  isEdit?: boolean;
  closeModal: () => void;
}

export default function ApkVersionForm({
  onSubmit,
  loading,
  defaultValues,
  isEdit = false,
  closeModal,
}: ApkVersionFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors,isDirty },
  } = useForm<ApkVersionFormData>({
    resolver: zodResolver(ApkVersionSchema),
    defaultValues: defaultValues || {
      version: "",
      downloadUrl: "",
      force_download: false,
      releaseNotes: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium mb-1">Version</label>
          <input
            type="text"
            {...register("version")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="1.0.0"
          />
          {errors.version && (
            <p className="text-red-600 text-sm">{errors.version.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Download URL</label>
          <input
            type="text"
            {...register("downloadUrl")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="https://example.com/app.apk"
          />
          {errors.downloadUrl && (
            <p className="text-red-600 text-sm">{errors.downloadUrl.message}</p>
          )}
        </div>
        <Controller
          control={control}
          name="force_download"
          render={({ field }) => (
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <Checkbox
                id="force_download"
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
              >
                <label
                  htmlFor="force_download"
                  className="text-sm font-medium cursor-pointer"
                >
                  Force Download
                </label>
              </Checkbox>
            </div>
          )}
        />
        <div>
          <label className="block text-sm font-medium mb-1">
            Release Notes
          </label>
          <textarea
            {...register("releaseNotes")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Bug fixes and improvements"
          />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
          {/* <button
            type="submit"
            className="px-4 py-2 bg-[#003970] text-white rounded-lg"
          >
            {loading
              ? "⏳ Saving..."
              : isEdit
              ? "Update Version"
              : "Add Version"}
          </button> */}
          <PrimaryBtn
            type="button"
            loadingAll={false}
            content="Cancel"
            onClick={closeModal}
            variant="secondary"
          />

          <PrimaryBtn
            type="submit"
            loadingAll={loading}
            content={
              loading
                ? "⏳ Saving..."
                : isEdit
                  ? "Update Version"
                  : "Add Version"
            }
            variant="primary"
            loadingContent="Saving..."
            disabled={!isDirty}
          />
        </div>
      </div>
    </form>
  );
}
