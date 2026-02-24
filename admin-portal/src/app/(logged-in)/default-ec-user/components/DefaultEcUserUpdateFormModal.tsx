"use client";

import React from "react";
import useUpdateDefaultEcUser from "../hooks/useUpdateDefaultEcUser";
import { DefaultEcUser, UpdateFormKey } from "../types/DefaultEcUserTypes";

interface UserEditFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: DefaultEcUser | null;
  onUserUpdated: () => void;
}

const DefaultEcUserUpdateFormModal: React.FC<UserEditFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onUserUpdated,
}) => {
  const { form, isPending } = useUpdateDefaultEcUser(() => {
    onClose();
    form.resetForm();
    onUserUpdated();
  });

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  if (!isOpen || !initialData) return null;

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <h2 className="text-xl font-medium mb-6">Update User</h2>

          <form action={form.action} className="space-y-4">
            <div>
              <label className="block text-sm font-medium capitalize">
                User name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                name="username"
                type="text"
                value={form.values.username}
                onChange={(e) =>
                  form.update("username" as UpdateFormKey, e.target.value)
                }
                onBlur={() => form.onBlur("username" as UpdateFormKey)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
              {form.shouldShowError("username" as UpdateFormKey) && (
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
                disabled={!form.canSubmit || isPending}
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

export default DefaultEcUserUpdateFormModal;
