import React from 'react'
import { Image } from 'antd'
import { getSectionSlug, Sections } from '../helpers/ApplicationDetailsHelper';
import { ApplicationData } from '../types/ApplicationDetailsType';

interface LivelinessInfoProps {
  applicationInfo: ApplicationData []
}

const LivelinessInfo = ({applicationInfo}: LivelinessInfoProps) => {

  const livelinessImageData = getSectionSlug(applicationInfo, Sections.LIVELINESS_IMAGES);
    
  return (
    <div className='border rounded-xl border-gray-300 p-3'>
              <div className='flex flex-col gap-2'>
                <span className='font-medium text-lg'>{livelinessImageData?.label}</span> 
    
                <div className='flex gap-2 p-3'>
                  <div className="flex flex-col gap-3  border rounded-xl border-gray-300 p-3 text-sm shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
    
                      <div className='flex justify-between gap-3 items-center text-sm'>
                      Liveliness
                    </div>
                    <div className='flex gap-2 justify-between items-center'>
                {livelinessImageData && (
                  <div className="flex flex-wrap gap-2 justify-between items-center  ">

                    {livelinessImageData.section_slug === 'liveliness_images' && Array.isArray(livelinessImageData.field?.value) && (
                      
                      livelinessImageData.field.value.map((url, index) => (
                        url && (
                          <Image
                            key={index}
                            src={url}
                            width={400}
                            height={300}
                            alt={`Liveliness Image ${index + 1}`}
                            className="rounded min-w-96 h-64"
                          />
                    ))))}
                    
                  </div>
                )}
                </div>
                  </div>
                 
    
                </div>
              </div>
            </div>
  )
}

export default LivelinessInfo