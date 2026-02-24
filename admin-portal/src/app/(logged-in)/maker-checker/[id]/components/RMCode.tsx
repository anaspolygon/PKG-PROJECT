import React from 'react'
import { ApplicationData } from '../types/ApplicationDetailsType';
import { getFieldLabelsAndValues, getSectionSlug } from '../helpers/ApplicationDetailsHelper';

interface NIDInfoProps {
  applicationInfo: ApplicationData []
}

const RMCode = ({applicationInfo}: NIDInfoProps) => {
  
  const headings = ['Field Name', 'Value'];
  const fatcaInfo = getSectionSlug(applicationInfo, 'rm_code')
  const fieldValues = getFieldLabelsAndValues(applicationInfo, 'rm_code');
  const isRMCodeVisible = fieldValues.some(field => field.value !== "N/A" && field.value.trim() !== "");

  
  if (!isRMCodeVisible) return null;
  return (
    <div className='flex flex-col gap-3 border rounded-xl p-3 border-gray-300'>
      <span className='px-3 font-medium'>{fatcaInfo && fatcaInfo?.label || fatcaInfo?.pages && fatcaInfo?.pages[0]?.label || 'N/A'}</span>
          
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
        <thead className="text-gray-400">
          <tr>
            {headings.map((heading, index) => (
              <th key={index} className="px-4 py-4 text-left text-sm font-semibold">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fieldValues.map((fieldValue, index) => (
            <tr key={index} className="border-b border-gray-300 border-dashed hover:bg-gray-50">
              <td className="px-4 py-4 text-sm w-[20%] text-gray-700">{fieldValue.label}</td>
              <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{fieldValue.value}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default RMCode