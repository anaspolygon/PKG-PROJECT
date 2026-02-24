import React from 'react'
import { ApplicationData } from '../types/ApplicationDetailsType';
import { getSectionSlug, Sections } from '../helpers/ApplicationDetailsHelper';
import NomineeBlock from './NomineeBlock';

interface PersonalInfoProps {
  applicationInfo: ApplicationData []
}

const NomineeInfo = ({applicationInfo}: PersonalInfoProps) => {

    const nomineeData = getSectionSlug(applicationInfo, Sections.NOMINEE);
      
    return (
      <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2 border rounded-xl  border-gray-300 p-4'>
          <span className='font-medium text-lg text-gray-700'>Nominee Info</span> 
          <NomineeBlock nominees={nomineeData?.nominees} />
        </div>
        
      </div>
    </div>
  )
}

export default NomineeInfo