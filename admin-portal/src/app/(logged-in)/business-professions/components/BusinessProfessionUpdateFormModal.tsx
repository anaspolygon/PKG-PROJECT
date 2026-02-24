"use client";

import React from "react";
import Select from "react-select";
import { UpdateBusiness, UpdateFormKey } from "../types/BusinessTypes";
import useUpdateBusinessProfession from "../hooks/useUpdateBusinessProfession";

interface BusinessProfessionUpdateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: UpdateBusiness | null;
  onUpdated: () => void;
}

const BusinessProfessionUpdateFormModal: React.FC<
  BusinessProfessionUpdateFormModalProps
> = ({ isOpen, onClose, initialData, onUpdated }) => {
  const { form, isPending } = useUpdateBusinessProfession(() => {
    onClose();
    onUpdated();
  }, initialData);

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  if (!isOpen || !initialData) return null;

  const typeOptions = [
    { value: "business", label: "Business" },
    { value: "profession", label: "Profession" },
  ];

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <h2 className="text-xl font-medium mb-6">
            Update Business Profession
          </h2>

          <form action={form.action} className="space-y-4">
            <input type="hidden" name="id" value={initialData.id} />
            <div>
              <label className="block text-sm font-medium capitalize">
                Name (EN) <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                name="label_en"
                type="text"
                value={form.values.label_en}
                onChange={(e) =>
                  form.update("label_en" as UpdateFormKey, e.target.value)
                }
                onBlur={() => form.onBlur("label_en" as UpdateFormKey)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Name (EN)"
              />
              {form.shouldShowError("label_en" as UpdateFormKey) && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium capitalize">
                Name (BN) <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                name="label_bn"
                type="text"
                value={form.values.label_bn}
                onChange={(e) =>
                  form.update("label_bn" as UpdateFormKey, e.target.value)
                }
                onBlur={() => form.onBlur("label_bn" as UpdateFormKey)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Name (BN)"
              />
              {form.shouldShowError("label_bn" as UpdateFormKey) && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium capitalize">
                Occupation Nature <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                name="occupation_nature"
                type="text"
                value={form.values.occupation_nature}
                onChange={(e) =>
                  form.update(
                    "occupation_nature" as UpdateFormKey,
                    e.target.value
                  )
                }
                onBlur={() => form.onBlur("occupation_nature" as UpdateFormKey)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Occupation Nature"
              />
              {form.shouldShowError("occupation_nature" as UpdateFormKey) && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>       
            <div>
              <label className="block text-sm font-medium mb-1">
                Type <span className="text-red-500 font-bold">*</span>
              </label>

              <Select
                name="type"
                value={
                  typeOptions.find((opt) => opt.value === form.values.type) ||
                  null
                }
                onChange={(selected) =>
                  form.update("type", selected?.value || "")
                }
                onBlur={() => form.onBlur("type")}
                options={typeOptions}
                placeholder="Select type"
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

              {form.shouldShowError("type") && (
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

export default BusinessProfessionUpdateFormModal;
