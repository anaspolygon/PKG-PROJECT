"use client";
import React, { useState } from "react";
import Select from "react-select";
import { DatePicker } from "antd";
// import dayjs from "dayjs";
import { FormKey } from "../types/UserTypes";
import useAddUser from "../hooks/useAddUser";
import useGetRoleList from "../../roles/hooks/useGetRoleList";
import useGetAllBranch from "../../branches/hooks/useGetAllBranch";
import useGetAllDepartment from "../../branches/hooks/useGetAllDepartment";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

type RoleOption = { value: number; label: string };

const UserAddFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onUserAdded,
}) => {
  const { form, isPending } = useAddUser(() => {
    onUserAdded();
    onClose();
    form.resetForm();
  });

  const [branchCode, setBranchCode] = useState<string>("");

  const { roles } = useGetRoleList();
  const { branches } = useGetAllBranch();
  const { departments } = useGetAllDepartment();


  const handleClose = () => {
    form.resetForm();
    onClose();
    setBranchCode("");
  };

  if (!isOpen) return null;

  const roleOptions: RoleOption[] =
    roles?.data.map((role) => ({
      value: role.id,
      label: role.name,
    })) || [
      { value: 0, label: "No roles available" },
    ];

  const branchOptions = (branches ?? []).map((branch) => ({
    value: branch.id,
    label: branch.branch_name,
    branch_code:branch.branch_code
  })) 


  const departmenOptions = (departments ?? []).map((department) => ({
    value: department.id,
    label: department.label_en,
  }));

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg lg:max-w-3xl p-6 relative">
          <h2 className="text-xl font-medium mb-6">Add New User</h2>

          <form action={form.action} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium capitalize">
                  Name <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.values.name}
                  onChange={(e) =>
                    form.update("name" as FormKey, e.target.value)
                  }
                  onBlur={() => form.onBlur("name" as FormKey)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
                {form.shouldShowError("name" as FormKey) && (
                  <p className="text-red-600 text-sm mt-1">
                    This field is required.
                  </p>
                )}
              </div>

              {/* Email Field with Domain Validation */}
              <div>
                <label className="block text-sm font-medium capitalize">
                  Email <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.values.email}
                  onChange={(e) =>
                    form.update("email" as FormKey, e.target.value)
                  }
                  onBlur={() => form.onBlur("email" as FormKey)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
                {form.shouldShowError("email" as FormKey) ? (
                  <p className="text-red-600 text-sm mt-1">
                    This field is required.
                  </p>
                ) : form.hasEmailError ? (
                  <p className="text-red-600 text-sm mt-1">
                    This email is not allowed
                  </p>
                ) : null}
              </div>

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
                    form.update("mobile" as FormKey, e.target.value)
                  }
                  onBlur={() => form.onBlur("mobile" as FormKey)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter mobile number"
                />
                {form.shouldShowError("mobile" as FormKey) ? (
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
                  min={1}
                  value={form.values.employee_id}
                  onChange={(e) =>
                    form.update("employee_id" as FormKey, e.target.value)
                  }
                  onBlur={() => form.onBlur("employee_id" as FormKey)}
                  // onKeyDown={(e) => {
                  //   if (e.key === "+" || e.key === "-") {
                  //     e.preventDefault();
                  //   }
                  // }}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter employee id"
                />
                {form.shouldShowError("employee_id" as FormKey) && (
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
                      (opt) => opt.value.toString() === form.values.role
                    ) || null
                  }
                  onChange={(selected) =>
                    form.update("role", selected?.value.toString() || "")
                  }
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
                  onChange={(selected) => {
                    form.update("branch_id", selected?.value.toString() || "");
                    setBranchCode(selected?.branch_code || "");
                  }}
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
                  Valid till
                </label>
                <DatePicker
                  name="valid_till"
                  format="DD/MM/YYYY"
                  // value={
                  //   form.values.valid_till
                  //     ? dayjs(form.values.valid_till, "DD/MM/YYYY")
                  //     : null
                  // }
                  onChange={(date) => {
                    form.update(
                      "valid_till" as FormKey,
                      date ? date.format("DD/MM/YYYY") : ""
                    );
                  }}
                  onBlur={() => form.onBlur("valid_till" as FormKey)}
                  placeholder="dd/mm/yyyy"
                  className="w-full mt-1"
                  style={{ height: 42, borderRadius: 8 }}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 font-medium"
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
                className="px-4 py-2 bg-[#003970] text-white rounded-lg hover:bg-blue-800 cursor-pointer disabled:opacity-50 font-medium"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAddFormModal;
