/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller } from "react-hook-form";
import Select from "react-select";

export const selectStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: "42px",
    height: "42px",
    borderRadius: "8px",
  }),
  valueContainer: (base: any) => ({
    ...base,
    height: "42px",
    padding: "0 8px",
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: "42px",
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 999999,
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 999999,
  }),
  menuList: (base: any) => ({
    ...base,
    zIndex: 999999,
  }),
};

export interface LabelValue {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  control: any;
  name: string;
  label: string;
  options: LabelValue[];
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormSelect({
  control,
  name,
  label,
  options,
  error,
  placeholder,
  required = false,
}: FormSelectProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Select
              options={options}
              isSearchable
              menuPosition="fixed"
              components={{ IndicatorSeparator: () => null }}
              menuPortalTarget={
                typeof window !== "undefined" ? document.body : null
              }
              styles={selectStyles}
              value={options.find((o) => o.value === field.value) || null}
              onChange={(opt) => field.onChange(opt?.value || "")}
              placeholder={placeholder || `Select ${label}`}
            />
          );
        }}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
