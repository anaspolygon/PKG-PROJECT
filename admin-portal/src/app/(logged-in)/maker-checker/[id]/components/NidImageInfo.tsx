import React from 'react'
import { Image } from 'antd'
import { ApplicationData } from '../types/ApplicationDetailsType';
import { getSectionSlug, Sections } from '../helpers/ApplicationDetailsHelper';


interface PersonalInfoProps {
  applicationInfo: ApplicationData []
}

const NidImageInfo = ({applicationInfo}: PersonalInfoProps) => {
      const nidImageData = getSectionSlug(applicationInfo, Sections.NID);
    
  return (
            <div className='border rounded-xl border-gray-300 p-3'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium text-lg'>{nidImageData?.label}</span> 
    
                <div className='flex justify-between flex-wrap gap-6 p-3 items-center'>
                  <div className="flex flex-col gap-3  border rounded-xl border-gray-300 p-3 text-sm shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
    
                    <div className='flex justify-between gap-3 items-center'>
                      NID Front
                    </div>
                    {nidImageData?.value && typeof nidImageData.value === 'object' && 'front_image' in nidImageData.value && (
                      <Image
                        src={nidImageData.value.front_image}
                        width={400}
                        height={300}
                        alt="NID Front"
                        className="rounded min-w-96 h-64"
                      />
                    )}
                  </div>
                  <div className='flex flex-col gap-3  border rounded-xl border-gray-300 p-3 text-sm shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'>
                    <div className='flex justify-between gap-3 items-center '>
                      NID Back
                    </div>
                    {nidImageData?.value && typeof nidImageData.value === 'object' && 'front_image' in nidImageData.value && (
                      <Image
                        src={nidImageData.value.back_image}
                        width={400}
                        height={300}
                        alt="NID Back"
                        className="rounded min-w-96 h-64"
                      />
                    )}
                  </div>
               
                </div>
              </div>
            </div>
  )
}

export default NidImageInfo