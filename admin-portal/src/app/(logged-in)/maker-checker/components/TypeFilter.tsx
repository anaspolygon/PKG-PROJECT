'use client';

import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { ChevronDown } from 'lucide-react';

type Option = {
  key: string;
  label: string;
};

type TypeFilterProps = {
  value?: string;
  onChange: (key: string) => void;
  options?: Option[];
  defaultLabel?: string;
};



const TypeFilter: React.FC<TypeFilterProps> = ({
  value = '',
  onChange,
  options,
  defaultLabel,
}) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    onChange(e.key);
  };

  const items: MenuProps['items'] = options?.map((option) => ({
    key: option.key,
    label: (
      <span
        className={`
          block px-2
          ${option.key === '' ? 'text-gray-400' : 'text-gray-600'}
        `}
      >
        {option.label}
      </span>
    ),
    disabled: false,
  }));

  const selectedOption = options?.find(opt => opt.key === value);
  const selectedLabel = selectedOption?.label || defaultLabel;
  const isDefault = !value;

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
      <button
        className={`px-4 py-2 border border-gray-400 rounded-md bg-white transition text-sm flex items-center justify-between min-w-[200px] w-full md:w-auto cursor-pointer focus:!border-[#003970] hover:!border-[#003970] ${
          isDefault ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown width={20} height={22} size={18} className="ml-2" />
      </button>
    </Dropdown>
  );
};

export default TypeFilter;
