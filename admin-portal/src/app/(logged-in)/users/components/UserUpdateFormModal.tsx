"use client";

import React, { useState } from "react";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { UpdateFormKey, UpdateUserData } from "../types/UserTypes";
import useUpdateUser from "../hooks/useUpdateUser";
import useGetRoleList from "../../roles/hooks/useGetRoleList";
import useGetAllBranch from "../../branches/hooks/useGetAllBranch";
import clsx from "clsx";
import useGetAllDepartment from "../../branches/hooks/useGetAllDepartment";

interface UserEditFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: UpdateUserData | null;
  onUserUpdated: () => void;
}

type RoleOption = { value: number; label: string };

const UserUpdateFormModal: React.FC<UserEditFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUserUpdated,
}) => {
  const { form, isPending } = useUpdateUser(() => {
    onClose();
    form.resetForm();
    onUserUpdated();
  }, initialData);

  const { roles } = useGetRoleList();
  const { branches } = useGetAllBranch();
  const { departments } = useGetAllDepartment();

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  const [date, setDate] = useState(initialData?.valid_till);

  if (!isOpen || !initialData) return null;

  const roleOptions: RoleOption[] =
    roles?.data.map((role) => ({
      value: role.id,
      label: role.name,
    })) || [];

  const branchOptions = (branches ?? []).map((branch) => ({
    value: branch.id,
    label: branch.branch_name,
    branch_code: branch.branch_code,
  }));

  const departmenOptions = (departments ?? []).map((department) => ({
    value: department.id,
    label: department.label_en,
  }));

  const branchCode = branchOptions.find(
    (opt) => opt.value.toString() === form.values.branch_id
  )?.branch_code;

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "locked", label: "Locked" },
    { value: "closed", label: "Closed" },
  ];


  return (
    <div className="overflow-y-auto max-h-scree">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg lg:max-w-3xl p-6 relative">
          <h2 className="text-xl font-medium mb-6">Update User</h2>

          <form action={form.action}>
            <div className="grid grid-cols-2 gap-4">
              <input type="hidden" name="id" value={initialData.id} />
              <input type="hidden" name="email" value={initialData.email} />
              {["name", "email"].map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium capitalize">
                    {key} <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    name={key}
                    type={key === "email" ? "email" : "text"}
                    disabled={key === "email"}
                    value={form.values[key as UpdateFormKey]}
                    onChange={(e) =>
                      form.update(key as UpdateFormKey, e.target.value)
                    }
                    onBlur={() => form.onBlur(key as UpdateFormKey)}
                    className={clsx(
                      "w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500",
                      key === "email" && "cursor-not-allowed"
                    )}
                    placeholder={
                      key === "password"
                        ? "Leave blank to keep unchanged"
                        : `Enter ${key}`
                    }
                  />
                  {form.shouldShowError(key as UpdateFormKey) && (
                    <p className="text-red-600 text-sm mt-1">
                      This field is required.
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium capitalize">
                  Mobile Number{" "}
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  name="mobile"
                  type="tel"
                  maxLength={14}
                  value={form.values.mobile}
                  onChange={(e) =>
                    form.update("mobile" as UpdateFormKey, e.target.value)
                  }
                  onBlur={() => form.onBlur("mobile" as UpdateFormKey)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none  focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter mobile number"
                />
                {form.shouldShowError("mobile" as UpdateFormKey) ? (
                  <p className="text-red-600 text-sm mt-1">
                    This field is required.
                  </p>
                ) : form.hasMobileError ? (
                  <p className="text-red-600 text-sm mt-1">
                    Invalid mobile number format.
                  </p>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium capitalize">
                  Employee ID <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  name="employee_id"
                  type="text"
                  // disabled={true}
                  value={form.values.employee_id}
                  onChange={(e) =>
                    form.update("employee_id" as UpdateFormKey, e.target.value)
                  }
                  onBlur={() => form.onBlur("employee_id" as UpdateFormKey)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none disabled:bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter employee id"
                />
                {form.shouldShowError("employee_id" as UpdateFormKey) && (
                  <p className="text-red-600 text-sm mt-1">
                    This field is required.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Role <span className="text-red-500 font-bold">*</span>
                </label>
                <Select
                  name="role"
                  value={
                    roleOptions.find(
                      (opt) => opt.value == form.values.role
                    ) || null
                  }
                  onChange={(selected) => {
                    form.update("role", selected?.value.toString() || "");
                  }}
                  onBlur={() => form.onBlur("role")}
                  options={roleOptions}
                  className="mt-1"
                  classNamePrefix="react-select"
                  placeholder="Select role"
                  isClearable
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: 42,
                      height: 42,
                      borderRadius: 8,
                    }),
                    input: (base) => ({
                      ...base,
                      margin: 0,
                      padding: 0,
                    }),
                  }}
                />
                {form.shouldShowError("role") && (
                  <p className="text-red-600 text-sm mt-1">
                    This field is required.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Branch</label>
                <Select
                  name="branch_id"
                  value={
                    branchOptions.find(
                      (opt) => opt.value.toString() === form.values.branch_id
                    ) || null
                  }
                  onChange={(selected) =>
                    form.update("branch_id", selected?.value.toString() || "")
                  }
                  onBlur={() => form.onBlur("branch_id")}
                  options={branchOptions}
                  placeholder="Select branch"
                  isClearable
                  className="mt-1"
                  classNamePrefix="react-select"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: 42,
                      height: 42,
                      borderRadius: 8,
                    }),
                    input: (base) => ({
                      ...base,
                      margin: 0,
                      padding: 0,
                    }),
                    menu: (base) => ({
                      ...base,
                      maxHeight: 150,
                      overflowY: "auto",
                    }),
                    menuList: (base) => ({
                      ...base,
                      paddingTop: 0,
                      paddingBottom: 0,
                      maxHeight: 150,
                    }),
                  }}
                />
              </div>
              {branchCode === "BD0010001" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Department <span className="text-red-500 font-bold">*</span>
                  </label>
                  <Select
                    name="department_id"
                    value={
                      departmenOptions.find(
                        (opt) =>
                          opt.value.toString() ===
                          form.values.department_id.toString()
                      ) || null
                    }
                    onChange={(selected) =>
                      form.update(
                        "department_id",
                        selected?.value.toString() || ""
                      )
                    }
                    onBlur={() => form.onBlur("department_id")}
                    options={departmenOptions}
                    className="mt-1"
                    classNamePrefix="react-select"
                    placeholder="Select department"
                    isClearable
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: 42,
                        height: 42,
                        borderRadius: 8,
                      }),
                      input: (base) => ({
                        ...base,
                        margin: 0,
                        padding: 0,
                      }),
                    }}
                  />
                  {form.shouldShowError("role") && (
                    <p className="text-red-600 text-sm mt-1">
                      This field is required.
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Status
                </label>
                <Select
                  name="status"
                  value={
                    statusOptions.find(
                      (opt) =>
                        opt.value.toLowerCase() ===
                        form.values.status.toLowerCase()
                    ) || null
                  }
                  onChange={(selected) =>
                    form.update("status", selected?.value.toString() || "")
                  }
                  options={statusOptions}
                  placeholder="Select status"
                  isClearable
                  className="mt-1"
                  classNamePrefix="react-select"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: 42,
                      height: 42,
                      borderRadius: 8,
                    }),
                    input: (base) => ({
                      ...base,
                      margin: 0,
                      padding: 0,
                    }),
                    menu: (base) => ({
                      ...base,
                      maxHeight: 150,
                      overflowY: "auto",
                    }),
                    menuList: (base) => ({
                      ...base,
                      paddingTop: 0,
                      paddingBottom: 0,
                      maxHeight: 150,
                    }),
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Valid till
                </label>
                <DatePicker
                  name="valid_till"
                  format="DD/MM/YYYY"
                  // value={
                  //   form.values.valid_till
                  //     ? dayjs(form.values.valid_till, "YYYY-MM-DD")
                  //     : null
                  // }
                  // value={dayjs(date)}
                  defaultValue={date ? dayjs(date) : null}
                  onChange={(date) => {
                    form.update(
                      "valid_till" as UpdateFormKey,
                      date ? date.format("YYYY-MM-DD") : ""
                    );
                    setDate(date.format("YYYY-MM-DD"));
                  }}
                  onBlur={() => form.onBlur("valid_till" as UpdateFormKey)}
                  placeholder="dd/mm/yyyy"
                  className="w-full mt-1"
                  style={{ height: 42, borderRadius: 8 }}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Reason <span className="text-red-500 font-bold">*</span>
              </label>
              <textarea
                rows={4}
                name="comments"
                value={form.values.comments}
                onChange={(e) =>
                  form.update("comments" as UpdateFormKey, e.target.value)
                }
                onBlur={() => form.onBlur("comments" as UpdateFormKey)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write Reason"
              />
              {form.shouldShowError("comments" as UpdateFormKey) && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  !form.canSubmit ||
                  (branchCode === "BD0010001" && !form.values.department_id) ||
                  isPending
                }
                className="px-4 py-2 bg-[#003970] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 cursor-pointer font-medium"
              >
                {isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </form>

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateFormModal;
