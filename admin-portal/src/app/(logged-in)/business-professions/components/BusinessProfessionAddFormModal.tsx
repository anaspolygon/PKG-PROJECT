"use client";

import React from "react";
import Select from "react-select";
import { FormKey } from "../types/BusinessTypes";
import useAddBusinessProfession from "../hooks/useAddBusinessProfession";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
}

const BusinessProfessionAddFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onAdded,
}) => {
  const { form, isPending } = useAddBusinessProfession(() => {
    onAdded();
    onClose();
    form.resetForm();
  });

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const typeOptions = [
    { value: "business", label: "Business" },
    { value: "profession", label: "Profession" },
  ];

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <h2 className="text-xl font-semibold mb-6">
            Add New Business Profession
          </h2>

          <form action={form.action} className="space-y-4">
            <div>
              <label className="block text-sm font-medium capitalize">
                Name (EN) <span className="text-red-500 font-bold">*</span>
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
                placeholder="Enter Name (EN)"
              />
              {form.shouldShowError("label_en" as FormKey) && (
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
                  form.update("label_bn" as FormKey, e.target.value)
                }
                onBlur={() => form.onBlur("label_bn" as FormKey)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Name (BN)"
              />
              {form.shouldShowError("label_bn" as FormKey) && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium capitalize">
                Ocuupation Nature <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                name="occupation_nature"
                type="text"
                value={form.values.occupation_nature}
                onChange={(e) =>
                  form.update("occupation_nature" as FormKey, e.target.value)
                }
                onBlur={() => form.onBlur("occupation_nature" as FormKey)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Ocuupation Nature"
              />
              {form.shouldShowError("occupation_nature" as FormKey) && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>
            {/* <div>
              <label className="block text-sm font-medium mb-1">Type *</label>
              <div className="relative">
                <select
                  name="type"
                  value={form.values.type}
                  onChange={(e) => form.update("type", e.target.value)}
                  onBlur={() => form.onBlur("type")}
                  required
                  className="appearance-none cursor-pointer w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option disabled value="">
                    Select type
                  </option>
                  <option value="business">Business</option>
                  <option value="profession">Profession</option>
                </select>

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

              {form.shouldShowError("type") && (
                <p className="text-red-600 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div> */}

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
                className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!form.canSubmit || isPending}
                className="px-4 py-2 bg-[#003970] text-white rounded-lg hover:bg-blue-800 cursor-pointer disabled:opacity-50"
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

export default BusinessProfessionAddFormModal;
