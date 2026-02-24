/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

interface LabelValue {
  label: string;
  value: string;
  parent: string;
}
interface PayloadOption {
  label: string;
  value: string;
  parent: string | null;
}
interface Input {
  label: string;
  name: string;
  type: string;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  possibleValues?: LabelValue[];
  parent?: string;
}
interface Props {
  input: Input;
  error: string;
  onChange: (key: string, value: string, parent: string | null) => void;
  onBlur: () => void;
  verify: any;
  form: Record<string, any>;
  presentAddress?: Record<string, string>;
  permanentAddress?: Record<string, string>;
  setPermanentAddress?: (value: Record<string, string>) => void;
  setPresentAddress?: (value: Record<string, string>) => void;
  setForm: (value: Record<string, string>) => void;
  divisions: PayloadOption[];
  districts: PayloadOption[];
  thanas: PayloadOption[];
  postOffices: PayloadOption[];
  postalCodes: PayloadOption[];
  isChecked?: boolean;
  setIsChecked?: (value: boolean) => void;
  handleCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

import type { StylesConfig, GroupBase } from "react-select";

const customStyles: StylesConfig<PayloadOption, false, GroupBase<LabelValue>> = {
  control: (provided) => ({
    ...provided,
    minHeight: "42px",
    height: "42px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "42px",
    padding: "0 8px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "42px",
  }),
};

const Input = ({
  input,
  error,
  onChange,
  onBlur,
  verify,
  presentAddress,
  permanentAddress,
  form,
  setForm,
  setPermanentAddress,
  setPresentAddress,
  divisions,
  districts,
  thanas,
  postOffices,
  postalCodes,
  isChecked,
  setIsChecked,
  handleCheckboxChange,
}: Props) => {
  const { label, name, type, placeholder, required, possibleValues, parent = null } = input;

  const getOptions = () => {
    if (name === "division") return divisions;
    if (name === "district") {
      if (parent === "permanentAddress" && permanentAddress?.division) {
        return districts.filter((item) => item.parent === permanentAddress.division);
      }
      if (parent === "presentAddress" && presentAddress?.division) {
        return districts.filter((item) => item.parent === presentAddress.division);
      }
      return districts;
    }
    if (name === "upozila") {
      if (parent === "permanentAddress" && permanentAddress?.district) {
        return thanas.filter((item) => item.parent === permanentAddress.district);
      }
      if (parent === "presentAddress" && presentAddress?.district) {
        return thanas.filter((item) => item.parent === presentAddress.district);
      }
      return thanas;
    }
    if (name === "postOffice") {
      if (parent === "permanentAddress" && permanentAddress?.district) {
        return postOffices.filter((item) => item.parent === permanentAddress.district);
      }
      if (parent === "presentAddress" && presentAddress?.district) {
        return postOffices.filter((item) => item.parent === presentAddress.district);
      }
      return postOffices;
    }
    if (name === "postalCode") return postalCodes;
    return [];
  };

  const getOptionsValue = () => {
    if (parent === "permanentAddress") {
      if (name === "division") return divisions.find((item) => item.value === permanentAddress?.division);
      if (name === "district") return districts.find((item) => item.value === permanentAddress?.district);
      if (name === "upozila") return thanas.find((item) => item.value === permanentAddress?.upozila);
      if (name === "postOffice") return postOffices.find((item) => item.value === permanentAddress?.postOffice);
      if (name === "postalCode") return postalCodes.find((item) => item.value === permanentAddress?.postalCode);
    }
    if (parent === "presentAddress") {
      if (name === "division") return divisions.find((item) => item.value === presentAddress?.division);
      if (name === "district") return districts.find((item) => item.value === presentAddress?.district);
      if (name === "upozila") return thanas.find((item) => item.value === presentAddress?.upozila);
      if (name === "postOffice") return postOffices.find((item) => item.value === presentAddress?.postOffice);
      if (name === "postalCode") return postalCodes.find((item) => item.label === presentAddress?.postalCode);
    }
    return undefined;
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium capitalize flex items-center gap-2">
          {label} {required && <span className="text-red-500">*</span>}
          {verify === true && <FaCheckCircle color="green" size={24} />}
          {verify === false && <FaTimesCircle color="red" size={24} />}
        </label>
      )}

      {["text", "number"].includes(type) && (
        <input
          name={name}
          type={type}
          value={parent ? form[parent]?.[name] || "" : form[name] || ""}
          onChange={(e) => onChange(e.target.name, e.target.value, parent)}
          onBlur={onBlur}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"
          placeholder={placeholder}
        />
      )}

      {type === "checkbox" && (
        <div className="flex items-center">
          <input
            name={name}
            id={name}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={name} className="ml-2 text-sm font-medium capitalize">
            {placeholder}
          </label>
        </div>
      )}

      {type === "date" && (
        <DatePicker
          className="w-full border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[42px]"
          onChange={(_date, dateString) => {
            const [day, month, year] = (dateString as string)?.split("/");
            const formatted = dateString ? `${year}-${month}-${day}` : "";
            onChange(name, formatted, parent);
          }}
          value={
            form[name] && dayjs(form[name]).isValid()
              ? dayjs(form[name])
              : null
          }
          placeholder="dd/mm/yyyy"
          format="DD/MM/YYYY"
        />
      )}

      {type === "radio" && (
        <div className="pl-2">
          {possibleValues?.map((item) => (
            <div className="flex items-center gap-2" key={item.value}>
              <input
                onChange={(e) => onChange(e.target.name, e.target.value, parent)}
                onBlur={onBlur}
                id={item.value}
                name={name}
                type="radio"
                value={item.value}
              />
              <label htmlFor={item.value} className="block text-sm font-medium capitalize">
                {item.label}
              </label>
            </div>
          ))}
        </div>
      )}

      {type === "dropdown" && (
        <Select
          styles={customStyles}
          name={name}
          options={getOptions()}
          value={getOptionsValue() ?? null}
          onChange={(option) => {
            const { label, value, parent: optionParent } = (option as LabelValue) ?? {};
            if (!option) {
              if (parent === "permanentAddress") {
                setPermanentAddress?.({
                  division: "",
                  district: "",
                  postOffice: "",
                  postalCode: "",
                });
              }
              if (parent === "presentAddress") {
                setPresentAddress?.({
                  division: "",
                  district: "",
                  postOffice: "",
                  postalCode: "",
                });
              }
              onChange(name, "", parent);
              return;
            }

            if (parent === "permanentAddress" && name === "division") {
              const newAddress = {
                ...permanentAddress,
                division: value,
                district: "",
                upozila: "",
              };
              setPermanentAddress?.({ ...newAddress });
              const data = form;
              delete data.permanentAddress?.district;
              delete data.permanentAddress?.upozila;
              delete data.permanentAddress?.unionOrWard;
              delete data.permanentAddress?.villageOrRoad;
              setForm({ ...data });
            }
            if (parent === "permanentAddress" && name === "district") {
              setPermanentAddress?.({ ...permanentAddress, district: value });
            }
            if (parent === "permanentAddress" && name === "upozila") {
              setPermanentAddress?.({ ...permanentAddress, upozila: value });
            }
            if (parent === "permanentAddress" && name === "postOffice") {
              setPermanentAddress?.({ ...permanentAddress, postOffice: value });
            }
            if (parent === "permanentAddress" && name === "postalCode") {
              setPermanentAddress?.({
                ...permanentAddress,
                division: optionParent.split("_")[0],
                district: optionParent,
                postOffice: value,
                postalCode: label,
              });
            }

            if (parent === "presentAddress" && name === "division") {
              const newAddress = {
                ...presentAddress,
                division: value,
                district: "",
                upozila: "",
              };
              setPresentAddress?.({ ...newAddress });
              const data = form;
              delete data.presentAddress?.district;
              delete data.presentAddress?.upozila;
              delete data.presentAddress?.unionOrWard;
              delete data.presentAddress?.villageOrRoad;
              setForm({ ...data });
            }
            if (parent === "presentAddress" && name === "district") {
              setPresentAddress?.({ ...presentAddress, district: value });
            }
            if (parent === "presentAddress" && name === "upozila") {
              setPresentAddress?.({ ...presentAddress, upozila: value });
            }
            if (parent === "presentAddress" && name === "postOffice") {
              setPresentAddress?.({ ...presentAddress, postOffice: value });
            }
            if (parent === "presentAddress" && name === "postalCode") {
              setPresentAddress?.({
                ...presentAddress,
                division: optionParent.split("_")[0],
                district: optionParent,
                postOffice: value,
                postalCode: label,
              });
            }

            onChange(name, label as string, parent);
          }}
          placeholder={placeholder}
        />
      )}

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {verify === false && (
        <p className="text-red-600 text-sm mt-1">Couldn&#39;t verify from EC</p>
      )}
    </div>
  );
};

export default Input;
