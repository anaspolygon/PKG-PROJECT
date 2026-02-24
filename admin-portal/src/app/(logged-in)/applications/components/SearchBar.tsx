import React, { useState } from "react";
import { Input } from "antd";
import { Search, X } from "lucide-react";

type SearchBarProps = {
  searchValue: string;
  onSubmit: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (val: string) => void; // ✅ new
};

// const isValidBdMobile = (input: string) => {
//   const bdMobileRegex = /^01[3-9]\d{8}$/;
//   return bdMobileRegex.test(input);
// };

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  onSubmit,
  placeholder = "Enter mobile number",
  error,
  onChange,
}) => {
  const [value, setValue] = useState(searchValue);
  const [isLengthValid, setIsLengthValid] = useState(value.length > 0);
  const [warning, setWarning] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);
    setIsLengthValid(inputValue.length > 0);
    setWarning(""); // clear local warnings on input
    onChange?.(inputValue);

    //  if ([11, 13, 14].includes(inputValue.length)) {
    //   if (isValidBdMobile(inputValue)) {
    //     setWarning("");
    //     setIsLengthValid(true);
    //   } else {
    //     setWarning("Please enter a valid Bangladesh mobile number.");
    //     setIsLengthValid(false);
    //   }
    // } else {
    //   setWarning("");
    // }
  };

  const handleSubmit = () => {
    // if (isValidBdMobile(value)) {
    //   setWarning("");
    onSubmit(value);
    // } else {
    //   setWarning("Please enter a valid Bangladesh mobile number.");
    // }
  };

  const handleClear = () => {
    setValue("");
    setWarning("");
    setIsLengthValid(false);
    onSubmit("");
  };

  return (
    <div className="flex flex-col gap-1 min-w-[250px] sm:text-[12px] lg:text-sm">
      <div className="relative">
        <Input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="!border-gray-400 focus:!border-[#003970] hover:!border-[#003970] !text-gray-600 !rounded-md !px-3 !py-2 pr-16 sm:text-[12px] lg:text-base placeholder-text-base"
          onPressEnter={handleSubmit}
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute right-9 top-1/2 -translate-y-1/2 px-1 py-1 text-gray-500 hover:text-red-500 cursor-pointer sm:text-[12px] lg:text-sm"
            aria-label="Clear search"
            type="button"
          >
            <X size={16} />
          </button>
        )}

        <button
          onClick={handleSubmit}
          className={`absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 focus:outline-none sm:text-[12px] lg:text-sm ${
            isLengthValid
              ? "text-[#003970] hover:text-blue-700 cursor-pointer"
              : "text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Submit search"
          type="button"
          disabled={!isLengthValid}
        >
          <Search size={18} />
        </button>
      </div>
      {warning && <p className="text-red-600 text-xs mt-1">{warning}</p>}

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default SearchBar;
