'use client';

import React from 'react'
import PersonalInfo from './PersonalInfo'
import useGetApplication from '../hooks/useGetApplication'
import NomineeInfo from './NomineeInfo';
import ProfileInfo from './ProfileInfo';
import { useParams } from 'next/navigation';
import Loader from '@/app/components/Loader';
import FatcaQuestions from './FatcaQuestions';
import { getNidNo } from '../helpers/ApplicationDetailsHelper';
import PEPInfo from './PEPInfo';


const ApplicationDetails = () => {
  const params = useParams();
  const id = params?.id as string;

  const { application, loading, error} = useGetApplication(id);

  const nidNo = getNidNo(application?.application_data);


  return (
    <div className="bg-white shadow rounded-xl p-6 w-full md:mt-8 lg:mt-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Application Details</h1>
      </div>

      <hr className='text-gray-300 py-2' />

      {loading && (
        <Loader />
      )}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load application.</p>
          <p className="text-gray-500 mt-1">Please try again later or contact support.</p>
        </div>
      )}

      

      {!loading && !error && application && 
        <div className='flex flex-col gap-3'>
          <ProfileInfo additionalInfo={application.additional_info} nidNo={nidNo}/>
          <PersonalInfo application={application}/>
          <FatcaQuestions applicationInfo={application.application_data}/>
          <PEPInfo applicationInfo={application.application_data}/>
          <NomineeInfo  applicationInfo={application.application_data} />
        </div>
      }

      
    </div>
  )
}

export default ApplicationDetails