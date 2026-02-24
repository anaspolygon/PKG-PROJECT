import React from 'react'
import { AdditionalInfo } from '../types/ApplicationDetailsType'
import { Image } from 'antd';
import {EqualApproximately} from "lucide-react";
import { formatDateWithTime } from '@/utils/date';

interface AdditionalInfoProps {
  additionalInfo: AdditionalInfo
  nidNo: string;
}

const ProfileInfo = ({ additionalInfo, nidNo }: AdditionalInfoProps) => {
  if(!additionalInfo) return;
  return (
    <div className='flex gap-16 border rounded-xl p-4 border-gray-300'>
      <div className="flex flex-col gap-3 w-full border  rounded-xl border-gray-300 p-3 text-sm shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
        <div className='flex gap-20'>
          <Image
            src={additionalInfo?.user_image}
            width={300}
            height={300}
            alt="User Image"
            className="rounded min-w-48 h-48"
          />
          <div className="flex flex-col items-start gap-2 text-sm text-gray-700">
            <div className="flex items-center py-1">
              <span className="font-medium w-40">Application ID:</span>
              <span>{additionalInfo.application_display_id}</span>
            </div>
            <div className="flex items-center py-1">
              <span className="font-medium w-40">Name:</span>
              <span>{additionalInfo.name}</span>
            </div>
            <div className="flex items-center py-1">
              <span className="font-medium w-40">Mobile:</span>
              <span>{additionalInfo.mobile}</span>
            </div>
          
            <div className="flex items-center py-1">
              <span className="font-medium w-40">NID No:</span>
              <span>{nidNo || additionalInfo.nid_no || 'N/A'}</span>
            </div>
            <div className="flex items-center py-1">
              <span className="font-medium w-40">Application Status:</span>
              <span
                className="px-2 py-1 rounded text-sm"
                style={{
                  backgroundColor: additionalInfo.application_status.bg_color,
                  color: additionalInfo.application_status.font_color,
                }}
              >
                {additionalInfo.application_status.type}
              </span>
            </div>
            <div className="flex items-center py-1">
              <span className="font-medium w-40">Submitted At:</span>
              <span>{formatDateWithTime(additionalInfo.first_submitted_at)}</span>
            </div>
          </div>
        </div>
        <div className='flex gap-2 items-center text-gray-700'>
          <span className='font-medium'>Face Matched</span>
          <EqualApproximately className="w-5 h-5 text-[#003970]" />
          <span>{additionalInfo.face_match_percentage} %</span>
        </div>

     </div>


  </div>
  )
}

export default ProfileInfo
