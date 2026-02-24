"use client";

import React from "react";
import useAddDepartment from "../hooks/useAddDepartment";
import { FormKey } from "../types/DepartmentTypes";

interface DepartmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepartmentAdded: () => void;
}

const DepartmentAddFormModal: React.FC<DepartmentFormModalProps> = ({
  isOpen,
  onClose,
  onDepartmentAdded,
}) => {
  const { form, isPending } = useAddDepartment(() => {
    onDepartmentAdded();
    onClose();
    form.resetForm();
  });

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <h2 className="text-xl font-medium mb-6">Add New Department</h2>

          <form action={form.action} className="space-y-4">
            <div>
              <label className="block text-sm font-medium capitalize">
                Department Name (EN) <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                name="label_en"
                type="text"
                value={form.values.label_en}
                onChange={(e) =>
                  form.update("label_en" as FormKey, e.target.value)
                }
                onBlur={() => form.onBlur("label_en" as FormKey)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Department Name (EN)"
              />
              {form.shouldShowError("label_en" as FormKey) && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium capitalize">
                Department Name (BN) <span className="text-red-500 font-bold hidden">*</span>
              </label>
              <input
                name="label_bn"
                type="text"
                value={form.values.label_bn}
                onChange={(e) =>
                  form.update("label_bn" as FormKey, e.target.value)
                }
                onBlur={() => form.onBlur("label_bn" as FormKey)}
                // required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Department Name (BN)"
              />
              {/* {form.shouldShowError("label_bn" as FormKey) && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )} */}
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
                disabled={!form.canSubmit || isPending}
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

export default DepartmentAddFormModal;