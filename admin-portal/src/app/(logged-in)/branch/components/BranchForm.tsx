"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect, { LabelValue } from "../../components/form/FormSelect";
import { useEffect } from "react";
import useGetAllBranch from "../../branches/hooks/useGetAllBranch";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
const options = {
  bankingTypes: [
    { value: "islamic", label: "Islamic" },
    { value: "conventional", label: "Conventional" },
    { value: "both", label: "Both" },
  ],
};

const BranchSchema = z.object({
  branch_name: z.string().min(1, "Branch name is required"),
  branch_code: z.coerce
    .number({
      required_error: "Branch code is required",
      invalid_type_error: "Branch code must be a valid number",
    })
    .min(1, "Branch code must be greater than 0"),
  window_branch_code: z.coerce.number().nullable(),
  banking_type: z.string().min(1, "Banking type is required"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  thana: z.string().min(1, "Thana is required"),
  postal_code: z.string().min(1, "Postal code is required"),
});

export type BranchFormData = z.infer<typeof BranchSchema>;

interface BranchFormProps {
  onSubmit: (data: BranchFormData) => void;
  loading: boolean;
  divisions: LabelValue[];
  districts: LabelValue[];
  thanas: LabelValue[];
  postal_codes: LabelValue[];
  defaultValues?: Partial<BranchFormData>;
  isEdit?: boolean;
  onClose?: () => void;
}

export default function BranchForm({
  onSubmit,
  loading,
  divisions,
  districts,
  thanas,
  postal_codes,
  defaultValues,
  isEdit = false,
  onClose,
}: BranchFormProps) {
  const {
    control,
    formState: { errors, isDirty },
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<BranchFormData>({
    resolver: zodResolver(BranchSchema),
    mode: "onChange",
    defaultValues: defaultValues || {
      branch_name: "",
      branch_code: undefined,
      window_branch_code: null,
      banking_type: "",
      division: "",
      district: "",
      thana: "",
      postal_code: "",
    },
  });

  const { branches } = useGetAllBranch();
  const branchesOptions = (branches ?? [])
    .filter((item) => item.branch_name !== watch("branch_name").trim())
    .map((item) => ({
      label: item.branch_name,
      value: item.branch_code,
    }));

  const get_districts = () => {
    return districts.filter((item) =>
      (item.value as string).includes(watch("division")),
    );
  };

  const get_thanans = () => {
    return thanas.filter((item) =>
      (item.value as string).includes(watch("district")),
    );
  };

  const get_postal_codes = () => {
    return postal_codes.filter((item) =>
      (item.value as string).includes(watch("thana")),
    );
  };

  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");
  const selectedThana = watch("thana");

  useEffect(() => {
    if (defaultValues && selectedDivision === defaultValues.division) return;

    setValue("district", "");
    setValue("thana", "");
    setValue("postal_code", "");
  }, [selectedDivision, defaultValues, setValue]);

  useEffect(() => {
    if (defaultValues && selectedDistrict === defaultValues.district) return;

    setValue("thana", "");
    setValue("postal_code", "");
  }, [selectedDistrict, defaultValues, setValue]);

  useEffect(() => {
    if (defaultValues && selectedThana === defaultValues.thana) return;
    setValue("postal_code", "");
  }, [selectedThana, defaultValues, setValue]);

  const isIslamicOrBoth =
    watch("banking_type") === "both" || watch("banking_type") === "islamic";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Branch Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter branch name"
            {...register("branch_name")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.branch_name && (
            <p className="text-red-600 text-sm mt-1">
              {errors.branch_name.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Branch Code <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            disabled={isEdit}
            min={0}
            placeholder="Enter branch code"
            {...register("branch_code")}
            onKeyDown={(e) => {
              if (e.key === "+" || e.key === "-") {
                e.preventDefault();
              }
            }}
            // className="w-full border border-gray-300 rounded-lg px-4 py-2"
            className={`
  w-full px-4 py-2 rounded-lg border border-gray-300
  disabled:bg-gray-100
  disabled:text-gray-400
  disabled:border-gray-200
  disabled:cursor-not-allowed
`}
          />
          {errors.branch_code && (
            <p className="text-red-600 text-sm mt-1">
              {errors.branch_code.message}
            </p>
          )}
        </div>

        <FormSelect
          control={control}
          name="banking_type"
          label="Banking Type"
          options={options.bankingTypes}
          error={errors.banking_type?.message}
          required
        />
        {isIslamicOrBoth && (
          <FormSelect
            control={control}
            name="window_branch_code"
            label="Window Branch Code"
            options={branchesOptions}
            error={errors.banking_type?.message}
          />
        )}
        <FormSelect
          control={control}
          name="division"
          label="Division"
          options={divisions}
          error={errors.division?.message}
          required
        />
        <FormSelect
          control={control}
          name="district"
          label="District"
          options={get_districts()}
          error={errors.district?.message}
          required
        />
        <FormSelect
          control={control}
          name="thana"
          label="Thana"
          options={get_thanans()}
          error={errors.thana?.message}
          required
        />
        <FormSelect
          control={control}
          name="postal_code"
          label="Postal Code"
          options={get_postal_codes()}
          error={errors.postal_code?.message}
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
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
          content={isEdit ? "Update Branch" : "Add Branch"}
          loadingContent={isEdit ? "Updating..." : "Saving..."}
          disabled={loading || !isDirty}
        />
      </div>
    </form>
  );
}
