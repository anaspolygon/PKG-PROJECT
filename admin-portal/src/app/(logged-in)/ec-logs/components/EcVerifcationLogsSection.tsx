'use client'

import Loader from '@/app/components/Loader'
import useGetECVerficationLogs from '../hooks/useGetECVerficationLogs'
import EcVerificationLogsTable from './EcVerificationLogsTable'
import Pagination from '@/components/layouts/Pagination'
import { useState } from 'react'
import DateFilter from '../../applications/components/DateFilter'
import TypeFilter from '../../applications/components/TypeFilter'
import { Input } from 'antd'

const EcVerifcationLogsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    ecVerificationLogs,
    loading,
    error,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    type,
    setType,
    typeOptions,
    searchValue,
    setSearchTerm,
    setSearchValue,
    fetchEcVerficationLogs,
  } = useGetECVerficationLogs(currentPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col  gap-6 bg-white shadow rounded-xl p-6 w-full sm:mt-8 md:mt-8 lg:mt-0">
      <div className="flex justify-between ">
        <h1 className="text-xl lg:text-2xl font-medium md:w-[264px] lg:w-full">NID Verification Log</h1>

          <div className="flex flex-col md:flex-row justify-end flex-wrap gap-4">
            <div className='flex gap-2'>
              <TypeFilter
                value={type}
                onChange={(val) => {
                  setType(val);
                  setSearchTerm(val)
                }}
                options={typeOptions}
                defaultLabel="Select Type"
              />
       
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                className="!border-gray-400 focus:!border-[#003970] hover:!border-[#003970] !text-gray-600 !rounded-md !px-3 !py-2 pr-16"
            />
            </div>

            <div>
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={(date) => {
                  setStartDate(date);
                  setCurrentPage(1);
                }}
                onEndDateChange={(date) => {
                  setEndDate(date);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
      </div>

      <hr className="text-gray-300" />

      {loading && <Loader />}

      {!loading && error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load verification logs.</p>
          <p className="text-gray-500 mt-1">Please try again later or contact support.</p>
        </div>
      )}

      {!loading && !error && ecVerificationLogs?.data && (
        <>
          {ecVerificationLogs.data.length > 0 ? (
            <>
              <EcVerificationLogsTable ecVerifyLogs={ecVerificationLogs.data} onRoleUpdated={fetchEcVerficationLogs} />
              {ecVerificationLogs.meta && ecVerificationLogs.meta.last_page > 1 && (
                <Pagination
                  currentPage={ecVerificationLogs.meta.current_page}
                  lastPage={ecVerificationLogs.meta.last_page}
                  links={ecVerificationLogs.meta.links}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No logs found matching your search.
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default EcVerifcationLogsSection
