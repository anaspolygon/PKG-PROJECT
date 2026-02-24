import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

type DateFilterProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

const DateFilter: React.FC<DateFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const value: RangePickerProps['value'] =
    startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : null;

  return (
    <RangePicker
      value={value}
      onChange={(dates) => {
        onStartDateChange(dates?.[0]?.format('YYYY-MM-DD') || '');
        onEndDateChange(dates?.[1]?.format('YYYY-MM-DD') || '');
      }}
      placeholder={['Start Date', 'End Date']}
      allowClear
      className="!border !border-gray-400 focus:!border-[#003970] !text-gray-600 hover:!border-[#003970] rounded-md min-w-[300px] !px-3 !py-2"
      style={{
        boxShadow: 'none',
      }}
    />
  );
};

export default DateFilter;
