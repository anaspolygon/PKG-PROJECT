/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FormSection from "./FormSection";
import { useAddress } from "../hooks/useAddress";

export interface AddressData {
  divisions?: Array<{ label: string; value: string }>;
  districts?: Array<{ label: string; value: string }>;
  thanas?: Array<{ label: string; value: string }>;
  postal_codes?: Array<{ label: string; value: string }>;
}

export interface AddressProps {
  fields: any[];
  addressData?: AddressData;
  preloadKey?: string;
}

export default function Address({ fields, addressData, preloadKey }: AddressProps) {
  const { divisions, districts, thanas, postal_codes } = useAddress(preloadKey);
  const getValue = (field: any) => {
    

    if (field.slug.includes("division")) {
     
      return (divisions?.find(
          (option: any) => option.value === field.value,
        )?.label || field.value
      );
    }
    if (field.slug.includes("district")) {
      return (districts?.find(
          (option: any) => option.value === field.value,
        )?.label || field.value
      );
    }
    if (field.slug.includes("thana")) {
      return (thanas?.find((option: any) => option.value === field.value)
          ?.label || field.value
      );
    }
    if (field.slug.includes("postal_code")) {
      return (postal_codes?.find(
          (option: any) => option.value === field.value,
        )?.label || field.value
      );
    }
    return field.value;
  };

  const permanentAddress =
    fields.find((field) => field.slug === "permanent_address")?.children || [];
  let permanentAddressFields = permanentAddress.map((item: any) => ({
    label: item.label,
    value: getValue(item),
  }));

  const presentAddress =
    fields.find((field) => field.slug === "present_address")?.children || [];

  const presentAddressFields = presentAddress.map((item: any) => ({
    label: item.label,
    value: getValue(item),
  }));

  const otherFields = fields.filter(
    (field) =>
      ![
        "permanent_address",
        "present_address",
        "same_as_present_address",
      ].includes(field.slug),
  );

  const sameAsPresentAddressField = fields.find(
    (item) => item.slug === "same_as_present_address",
  );
  const sameAsPresentAddressFieldValue = sameAsPresentAddressField?.value;
  const isSameAsPresentAddress = (
    sameAsPresentAddressFieldValue ?? []
  ).includes("true");

  if (isSameAsPresentAddress) {
    permanentAddressFields = [];
    permanentAddressFields.push({
      label: "Same as Present Address",
      value: "Yes",
    });
  } else {
    permanentAddressFields.unshift({
      label: "Same as Present Address",
      value: "No",
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Present Address</h2>
        </div>
        <FormSection fields={presentAddressFields} />
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Permanent Address</h2>
        </div>
        <FormSection fields={permanentAddressFields} />
      </div>

      {otherFields.length > 0 && !isSameAsPresentAddress && (
        <>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
              <h2 className="text-lg font-bold text-gray-900">
                Additional Information
              </h2>
            </div>
            <FormSection fields={otherFields} />
          </div>
        </>
      )}
    </div>
  );
}
