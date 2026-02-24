"use client";
import { z } from "zod";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "../../components/form/FormSelect";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import { RoleList } from "../../roles/types/RoleTypes";
import { Branch } from "../../branches/hooks/useGetAllBranch";
const options = {
  status: [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ],
  users: [
    { value: "citygem", label: "Citygem" },
    { value: "branch_user", label: "Branch User" },
    { value: "regular_user", label: "Regular User" },
  ],
};

const Schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    employee_id: z.string().min(1, "Employee ID is required"),
    user_type: z.string().min(1, "User Type is required"),
    branch_id: z.coerce.number().optional(),
    role_id: z.coerce.number().min(1, "Role is required"),
    is_active: z.coerce.string().optional(),
    valid_till: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      ["branch_user", "citygem"].includes(data.user_type) &&
      (!data.branch_id || data.branch_id <= 0)
    ) {
      ctx.addIssue({
        path: ["branch_id"],
        message: "Branch is required for this user type",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type UserFormData = z.infer<typeof Schema>;

interface UserFormProps {
  branches: Branch[] | null;
  roles: RoleList | null;
  onSubmit: (data: UserFormData) => void;
  loading: boolean;
  defaultValues?: Partial<UserFormData>;
  isEdit?: boolean;
  onClose?: () => void;
}

export default function UserForm({
  branches,
  roles,
  onSubmit,
  loading,
  defaultValues,
  isEdit = false,
  onClose,
}: UserFormProps) {
  const {
    control,
    formState: { errors, isDirty },
    watch,
    register,
    handleSubmit,
  } = useForm<UserFormData>({
    resolver: zodResolver(Schema),
    defaultValues: defaultValues || {
      name: "",
      employee_id: "",
      user_type: "",
      branch_id: 0,
      role_id: -1,
      is_active: "1",
      valid_till: "",
    },
  });

  const branchOptions = (branches ?? []).map((item) => ({
    label: item.branch_name,
    value: item.id,
  }));

  const roleOptions = (roles?.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const isBranchUser = ["branch_user", "citygem"].includes(watch("user_type"));

  return (
    <div className="bg-white rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter name"
              {...register("name")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Employee ID <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter employee id"
              {...register("employee_id")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.employee_id && (
              <p className="text-red-600 text-sm mt-1">
                {errors.employee_id.message}
              </p>
            )}
          </div>

          <FormSelect
            control={control}
            name="user_type"
            label="User Type"
            options={options.users}
            error={errors.user_type?.message}
            required
          />

          <FormSelect
            control={control}
            name="branch_id"
            label="Branch"
            options={branchOptions}
            error={errors.branch_id?.message}
            required={isBranchUser}
          />

          <FormSelect
            control={control}
            name="role_id"
            label="Role"
            options={roleOptions}
            error={errors.role_id?.message}
            required
          />
          {isEdit && (
            <FormSelect
              control={control}
              name="is_active"
              label="Status"
              options={options.status}
              error={errors.is_active?.message}
              required
            />
          )}
          <Controller
            control={control}
            name="valid_till"
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Valid Till
                </label>

                <DatePicker
                  {...field}
                  style={{ height: 42, borderRadius: 8 }}
                  format="YYYY-MM-DD"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  onChange={(date) =>
                    field.onChange(date ? dayjs(date).format("YYYY-MM-DD") : "")
                  }
                  value={field.value ? dayjs(field.value) : null}
                />

                {errors.valid_till && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.valid_till.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
          <PrimaryBtn
            variant="secondary"
            type="button"
            loadingAll={false}
            content="Cancel"
            onClick={onClose || (() => {})}
          />
          <PrimaryBtn
            type="submit"
            variant="primary"
            loadingAll={loading}
            content={isEdit ? "Update User" : "Create User"}
            loadingContent={isEdit ? "Updating..." : "Creating..."}
            disabled={!isDirty}
          />
        </div>
      </form>
    </div>
  );
}
