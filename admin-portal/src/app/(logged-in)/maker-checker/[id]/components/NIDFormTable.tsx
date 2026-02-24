import React from 'react';
import { ApplicationDetailsRoot } from '../types/ApplicationDetailsType';
import { getFieldLabelsAndValues, getSectionSlug, Sections } from '../helpers/ApplicationDetailsHelper';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface NIDInfoProps {
  application: ApplicationDetailsRoot;
}

const ecMatchIcon = (value: boolean | undefined) => {
  if (value === true) return <FaCheckCircle className="text-green-500 w-6 h-6" />;
  if (value === false) return <FaTimesCircle className="text-red-500 w-6 h-6" />;
  return <span className="text-gray-700">N/A</span>;
};

const NIDFormTable = ({ application }: NIDInfoProps) => {
  const headings = ['Field Name', 'Value', 'OCR Value', 'EC Match'];
  const personalInfo = getSectionSlug(application.application_data, Sections.PERSONAL_INFO);
  const rawFieldValues = getFieldLabelsAndValues(application.application_data, Sections.PERSONAL_INFO);

  const ocrData = application.additional_info.ocr_data || {};

  const ecData = application.additional_info.ec_data?.fieldVerificationResult || {};

  const fieldMap: Record<
    string,
    { ocrKey?: keyof typeof ocrData; ecKey?: keyof typeof ecData }
  > = {
    "Account Holder’s Name (Bangla)": { ocrKey: 'applicant_name_ben', ecKey: 'name' },
    "Account Holder’s Name (English)": { ocrKey: 'applicant_name_eng', ecKey: 'nameEn' },
    "Father’s Name (Bangla)": { ocrKey: 'father_name', ecKey: 'father' },
    "Father’s Name (English)": { },
    "Mother's Name (Bangla)": { ocrKey: 'mother_name', ecKey: 'mother' },
    "Mother's Name (English)": { },
    "Spouse's Name (Bangla)": { ocrKey: 'spouse_name' },
    "Spouse's Name (English)": { },
    "Gender": {},
    "NID Number": { ocrKey: 'nid_no' },
    "NID Issue Date": {},
    "Date Of Birth": { ocrKey: 'dob', ecKey: 'dateOfBirth' },
    "Email": {},
    "Address (Bangla)": { ocrKey: 'address', },
    "Address (English)": { },
  };

  return (
    <div className="flex flex-col gap-3 border rounded-xl p-3 border-gray-300">
      <span className="px-3 font-medium">
        {personalInfo?.label || personalInfo?.pages?.[0]?.label || 'N/A'}
      </span>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="text-gray-400">
            <tr>
              {headings.map((heading, index) => (
                <th key={index} className="px-4 py-4 text-left text-sm font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rawFieldValues.map((fieldValue, index) => {
              const fieldConfig = fieldMap[fieldValue.label] || {};
              const ocrVal = fieldConfig.ocrKey ? ocrData[fieldConfig.ocrKey] : 'N/A';
              const ecVal = fieldConfig.ecKey ? ecData[fieldConfig.ecKey] : undefined;

              return (
                <tr
                  key={index}
                  className="border-b border-gray-300 border-dashed hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-sm w-[20%] text-gray-700">{fieldValue.label}</td>
                  <td className="px-4 py-4 text-sm w-[25%] text-gray-700">{fieldValue.value}</td>
                  <td className="px-4 py-4 text-sm w-[25%] text-gray-700">{ocrVal || 'N/A'}</td>
                  <td className="px-4 py-4 text-sm w-[25%] text-gray-700">{ecMatchIcon(ecVal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NIDFormTable;
