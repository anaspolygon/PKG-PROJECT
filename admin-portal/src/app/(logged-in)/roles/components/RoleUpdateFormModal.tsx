"use client";

import React from "react";
import { Role } from "../types/RoleTypes";
import useUpdateRole from "../hooks/useUpdateRole";
import useGetPermissionList from "../hooks/useGetPermissionList";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
interface RoleUpdateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Role | null;
  onRoleUpdated: () => void;
}

const RoleUpdateFormModal: React.FC<RoleUpdateFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onRoleUpdated,
}) => {
  const { permissionList } = useGetPermissionList();

  const { form, isPending } = useUpdateRole(() => {
    onClose();
    onRoleUpdated();
  }, initialData);

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  const togglePermission = (id: number) => {
    const selected = form.values.permissions || [];
    const updated = selected.includes(id)
      ? selected.filter((pid: number) => pid !== id)
      : [...selected, id];
    form.update("permissions", updated);
  };

  const toggleSelectAll = (ids: number[], checked: boolean) => {
    const selected = new Set(form.values.permissions || []);

    ids.forEach((id) => {
      if (checked) selected.add(id);
      else selected.delete(id);
    });

    form.update("permissions", Array.from(selected));
  };

  const isChecked = (id: number) => form.values.permissions?.includes(id);
  const areAllChecked = (ids: number[]) => ids.every((id) => isChecked(id));

  if (!isOpen || !initialData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all">
          {/* Header */}
          <div className="sticky top-0 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Update Role
                  </h2>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Modify role name and permissions
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-2xl transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
            <form action={form.action} className="space-y-6">
              <input type="hidden" name="id" value={initialData.id} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.values.name}
                  onChange={(e) => form.update("name", e.target.value)}
                  onBlur={() => form.onBlur("name")}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Branch Manager, Admin, etc."
                />
                {form.shouldShowError("name") && (
                  <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    This field is required.
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    Permissions <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {form.values.permissions?.length || 0} selected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {permissionList?.data.map((group) => {
                    const ids = group.permission.map((perm) => perm.id);
                    const allChecked = areAllChecked(ids);

                    return (
                      <div
                        key={group.module}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors"
                      >
                        {/* Module Header */}
                        <div className="px-4 py-3 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-800">
                                {group.module}
                              </span>
                              <span className="text-xs text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                                {group.permission.length} permissions
                              </span>
                            </div>
                            <label className="text-xs font-medium flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                              <input
                                type="checkbox"
                                checked={allChecked}
                                onChange={(e) =>
                                  toggleSelectAll(ids, e.target.checked)
                                }
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                              />
                              Select All
                            </label>
                          </div>
                        </div>

                        {/* Permissions List */}
                        <div className="p-2 bg-white">
                          <div className="grid grid-cols-1 gap-1">
                            {group.permission.map((perm) => (
                              <label
                                key={perm.id}
                                className="flex items-center gap-2 text-sm text-gray-700 hover:bg-blue-50 p-2 rounded-lg cursor-pointer transition-colors group"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked(perm.id)}
                                  onChange={() => togglePermission(perm.id)}
                                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="group-hover:text-blue-700 transition-colors">
                                  {perm.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <input
                type="hidden"
                name="permissions"
                value={JSON.stringify(form.values.permissions || [])}
              />
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                <PrimaryBtn
                  variant="secondary"
                  type="button"
                  loadingAll={false}
                  content={"Cancel"}
                  onClick={handleClose}
                />
                <PrimaryBtn
                  type="submit"
                  variant="primary"
                  loadingAll={isPending}
                  content={"Update"}
                  loadingContent="Updating..."
                />
              </div>
            </form>
          </div>

          {/* <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200 flex items-center justify-end gap-3">
            <PrimaryBtn 
              variant="secondary" 
              type="button" 
              loadingAll={false} 
              content={"Cancel"} 
              onClick={handleClose} 
            />
            <PrimaryBtn 
              type="submit" 
              loadingAll={isPending} 
              content={"Update"} 
              loadingContent="Updating..." 
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RoleUpdateFormModal;
