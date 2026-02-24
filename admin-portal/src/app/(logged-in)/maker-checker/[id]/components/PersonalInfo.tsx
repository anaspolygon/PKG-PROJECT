import React from 'react'
import { ApplicationDetailsRoot } from '../types/ApplicationDetailsType';
import NIDFormTable from './NIDFormTable';
import NidImageInfo from './NidImageInfo';
import LivelinessInfo from './LivelinessInfo';
import AddressTable from './AddressTable';
import BankingInfo from './BankingInfo';

interface PersonalInfoProps {
  application: ApplicationDetailsRoot
}

const PersonalInfo = ({application}: PersonalInfoProps) => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-wrap gap-6 items-center border rounded-xl border-gray-300 p-3'>
          <NidImageInfo applicationInfo={application.application_data} />
          <LivelinessInfo applicationInfo={application.application_data}/>
        </div>
        <NIDFormTable application={application} />
        <AddressTable application={application} />
        <BankingInfo applicationInfo={application.application_data} />
      </div>
    </div>
  )
}

export default PersonalInfo