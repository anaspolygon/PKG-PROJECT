import React from 'react'
import { ApplicationData, ApplicationDetailsRoot } from '../types/ApplicationDetailsType';
import { getFieldSlug, getFieldSlugValues, getSectionSlug, Sections } from '../helpers/ApplicationDetailsHelper';
import { useItemsStore } from '@/store/useUserstore';
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
interface NIDInfoProps {
  application: ApplicationDetailsRoot
}

const AddressTable = ({application}: NIDInfoProps) => {
  const { items } = useItemsStore();
  
  const headings = ['Field Name', 'Value', 'EC Match'];
const personalInfo = (application?.application_data ?? []).length > 0
  ? getSectionSlug(application.application_data as ApplicationData[] , Sections.PERSONAL_INFO)
  : undefined;

  const firstPageFields = personalInfo?.pages?.[0]?.fields ?? [];

  const permanentAddressSlug = getFieldSlug(firstPageFields, 'permanent_address');
  const permanentAddressSlugValues = getFieldSlugValues(permanentAddressSlug);
  const presentAddressSlug = getFieldSlug(firstPageFields, 'present_address');
  const samePermanentAddressSlug = getFieldSlug(firstPageFields, 'same_as_permanent_address');
  const presentAddressSlugValues = getFieldSlugValues(presentAddressSlug);
  const ecData = application.additional_info.ec_data?.fieldVerificationResult || {};

  const preload = items.preload as Record<string, { v: string; l: string }[]>;
  const getAddressLabel = (key?: string, value?: string) => {
      if (key && value) {
        const obj = preload[key];
        if (Array.isArray(obj)) {
          const foundItem = obj.find(item => item.v === value);
          return foundItem?.l;
        }
      }
      return value;
  };

  const ecMatchIcon = (value: boolean | undefined) => {
    if (value === true) return <FaCheckCircle className="text-green-500 w-6 h-6" />;
    if (value === false) return <FaTimesCircle className="text-red-500 w-6 h-6" />;
    return <span className="text-gray-700">N/A</span>;
  };

  const permanentAddressfieldMap: Record<
    string,
    { ecKey?: keyof typeof ecData }
  > = {
    "Division": {  ecKey: 'permanentAddress.division' },
    "District/City": {  ecKey: 'permanentAddress.district' },
    "Upazila/Thana": { ecKey: 'permanentAddress.upozila' },
    "Post office": {ecKey: 'permanentAddress.postOffice'  },
    "Union": { },
    "Village/Road": { },
    "House/Holding": { },
  };

    const presentAddressfieldMap: Record<
    string,
    { ecKey?: keyof typeof ecData }
  > = {
    "Division": {  ecKey: 'presentAddress.division' },
    "District/City": {  ecKey: 'presentAddress.district' },
    "Upazila/Thana": { ecKey: 'presentAddress.upozila' },
    "Post office": {ecKey: 'presentAddress.postOffice'  },
    "Union": { },
    "Village/Road": { },
    "House/Holding": { },
  };


  
  
  return (
    <div className='flex flex-col gap-8 border rounded-xl p-3 border-gray-300'>
        <div>

        <span className='px-3 font-medium'>{permanentAddressSlug && permanentAddressSlug?.label || 'N/A'}</span>
          
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
             {permanentAddressSlugValues.map((fieldValue, index) => {
              const fieldConfig = permanentAddressfieldMap[fieldValue.label] || {};
              const ecVal = fieldConfig.ecKey ? ecData[fieldConfig.ecKey] : undefined;

              return (
                <tr
                  key={index}
                  className="border-b border-gray-300 border-dashed hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-sm w-[20%] text-gray-700">{fieldValue.label}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{getAddressLabel(fieldValue.key, fieldValue.value)}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{ecMatchIcon(ecVal)}</td>
                </tr>
              );
            })}
        </tbody>
        </table>
        </div>

        </div>
    <div>

        <span className='px-3 font-medium'>{presentAddressSlug && presentAddressSlug?.label || 'N/A'}</span>
          
          {samePermanentAddressSlug?.value && samePermanentAddressSlug.value[0] === 'yes' ?
          <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
            <tbody>


          <tr className="border-b border-gray-300 border-dashed hover:bg-gray-50">
          <td className="px-4 py-4 text-sm w-[20%] text-gray-700">{samePermanentAddressSlug.label}</td>
          <td className="px-4 py-4 text-sm w-[80%] text-gray-700"><IoMdCheckboxOutline className='w-6 h-6' /></td>
        </tr>
            </tbody>
          </table>
          </div>
        :
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
          {presentAddressSlugValues.map((fieldValue, index) => {
              const fieldConfig = presentAddressfieldMap[fieldValue.label] || {};
              const ecVal = fieldConfig.ecKey ? ecData[fieldConfig.ecKey] : undefined;

              return (
                <tr
                  key={index}
                  className="border-b border-gray-300 border-dashed hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-sm w-[20%] text-gray-700">{fieldValue.label}</td>
                  <td className="px-4 py-4 text-sm  text-gray-700">{getAddressLabel(fieldValue.key, fieldValue.value)}</td>
                  <td className="px-4 py-4 text-sm  text-gray-700">{ecMatchIcon(ecVal)}</td>
                </tr>
              );
            })}
        </tbody>
        </table>
        </div>
        }
     

    </div>
    </div>
  )
}

export default AddressTable