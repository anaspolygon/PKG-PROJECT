import React from 'react'
import { ApplicationData } from '../types/ApplicationDetailsType';
import { getBankDocuments, getMultipleFieldSlugValues, Sections } from '../helpers/ApplicationDetailsHelper';
import { Image } from 'antd';
import { useItemsStore } from '@/store/useUserstore';

interface NIDInfoProps {
  applicationInfo: ApplicationData []
}

const BankingInfo = ({applicationInfo}: NIDInfoProps) => {
  
  const headings = ['Field Name', 'Value'];
  const fieldValues = getMultipleFieldSlugValues(applicationInfo, [Sections.BANKING_TYPE, Sections.PRODUCT_TYPE, Sections.BRANCH, Sections.MONTHLY_TRANSACTION]);
  const monthlyTransaction = getBankDocuments(applicationInfo, Sections.MONTHLY_TRANSACTION);

  const { items } = useItemsStore();

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
  return (
    <div className='flex flex-col gap-3 border rounded-xl p-3 border-gray-300'>
      <span className='px-3 font-medium text-gray-700'>Banking Info</span>
          
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
                <td className="px-4 py-4 text-sm w-[80%] text-gray-700">{getAddressLabel(fieldValue.key, fieldValue.value)}</td>
              </tr>
              ))}
          </tbody>
        </table>
        {monthlyTransaction.isDocumentsVisible && 
          <div className='border rounded-xl p-3 border-gray-300 mt-3'>
            <div className='flex flex-wrap justify-between gap-6 p-3 items-center'>
                              
            {monthlyTransaction.images.map((image, index) => (
              <div key={index} className="flex flex-col gap-3  border rounded-xl border-gray-300 p-3 text-sm shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
                
                <div className='flex justify-between gap-3 items-center'>
                  {image.label}
                </div>
                {image.url &&  (
                  <Image
                    src={image.url}
                    width={400}
                    height={300}
                    alt="banking documents"
                    className="rounded min-w-96 h-64 "
                  />
                )}
              </div>       
            ))}              
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default BankingInfo