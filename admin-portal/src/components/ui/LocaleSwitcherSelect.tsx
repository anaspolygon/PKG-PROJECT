/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Select from "react-select";
import { useTransition } from "react";
// import {CheckIcon, LanguageIcon} from '@heroicons/react/24/solid';
import { setUserLocale } from "@/services/locale";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n/request";
import Image from "next/image";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (selected: { value: string; label: string } | null) => {
    if (selected) {
      const locale = selected.value as Locale;
      startTransition(async () => {
        await setUserLocale(locale);
        window.location.reload()
      });
      router.refresh();
    }
  };

  const customStyles = {
    control: (base: any, ) => ({
      ...base,
      // padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      backgroundColor: isPending ? "#F2F2F2" : "#F2F2F2",
      borderColor: "#cbd5e0",
      boxShadow: "none",
      minWidth: "5rem",
      pointerEvents: isPending ? "none" : "auto",
      opacity: isPending ? 0.6 : 1,
      cursor: "pointer",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "#f1f5f9" : "#fff",
      color: "#1e293b",
      padding: "0.5rem 0.75rem",
      display: "flex",
      alignItems: "center",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.25rem",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 9999,
    }),
    singleValue: (base: any) => ({
      ...base,
      display: "flex",
      alignItems: "center",
    }),
  };

  const defaultOption = items.find((item) => item.value === defaultValue);

  const formatOptionLabel = (option: { value: string; label: string }) => (
    <div className="flex items-center space-x-2">
      <Image src='/globe.svg' width={16} height={16} alt="Globe" />
      <span>{option.label}</span>
    </div>
  );
  

  return (
    <div className="relative">
   
      <Select
        instanceId="locale-select"
        options={items}
        defaultValue={defaultOption}
        
        onChange={handleChange}
        isDisabled={isPending}
        aria-label={label}
        classNamePrefix="locale-select"
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
}
