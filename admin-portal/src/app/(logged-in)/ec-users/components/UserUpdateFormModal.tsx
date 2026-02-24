"use client";

import React from "react";
import Select from "react-select";
import { UpdateFormKey, UpdateUserData } from "../types/UserTypes";
import useUpdateUser from "../hooks/useUpdateUser";
import { Branch, BranchList } from "../types/BranchTypes";

interface UserEditFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  branchList: BranchList;
  initialData: UpdateUserData | null;
  onUserUpdated: () => void;
}

interface LabelAndValue {
  label: string;
  value: string | number;
}

const UserUpdateFormModal: React.FC<UserEditFormModalProps> = ({
  isOpen,
  onClose,
  branchList,
  initialData,
  onUserUpdated,
}) => {
  const { form, isPending } = useUpdateUser(() => {
    onClose();
    form.resetForm();
    onUserUpdated();
  }, initialData);

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  if (!isOpen || !initialData) return null;

  const getOptions = () => {
    return branchList.map((item: Branch) => {
      return {
        label: item.label_en,
        value: item.id,
      };
    });
  };

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <h2 className="text-xl font-semibold mb-6">Update User</h2>

          <form action={form.action} className="space-y-4">
            <input type="hidden" name="id" value={initialData.id} />

            {["username"].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium capitalize">
                  {key} *
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium  mb-1">
                Branch *
              </label>
              <div className="relative">
                <Select
                  options={getOptions()}
                  name="branch_id"
                  value={getOptions().find(
                    (item: LabelAndValue) =>
                      item.value === form.values.branch_id
                  )}
                  onChange={(option) => {
                    const { value } = option as LabelAndValue;
                    form.update("branch_id", value);
                  }}
                  onBlur={() => form.onBlur("branch_id")}
                  placeholder="Select branch"
                />
                {/* <select
                  name="branch_id"
                  value={form.values.branch_id}
                  onChange={(e) => form.update("branch_id", e.target.value)}
                  onBlur={() => form.onBlur("branch_id")}
                  required
                  className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option disabled value="">
                    Select role
                  </option>
                  {getOptions().map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select> */}

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {form.shouldShowError("branch_id") && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!form.canSubmit || isPending}
                className="px-4 py-2 bg-[#003970] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
              >
                {isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </form>

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateFormModal;
