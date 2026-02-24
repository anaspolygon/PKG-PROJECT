/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useCallback } from 'react'
import { ECVerifyLogs } from '../types/ECLogTypes'
import getECVerificationLogs from '../actions/GetECVerificationLogs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const useGetECVerficationLogs = (page =1  ) => {
  const [data, setData] = useState<ECVerifyLogs | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [type, setType] = useState('')
  const router = useRouter();

  const fetchEcVerficationLogs = useCallback(async () => {
    const isSearchValid =
      (searchTerm && searchValue) || (!searchTerm && !searchValue)

    if (!isSearchValid) return

    setLoading(true)
    try {
      const response = await getECVerificationLogs(page, startDate, endDate, searchTerm, searchValue)
      if(response.code === 401){
        toast.error(response.message);
        router.push("/auth/login");
      }
      setData(response)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  },[page, startDate, endDate, searchTerm, searchValue])

  useEffect(() => {
    fetchEcVerficationLogs()
  }, [fetchEcVerficationLogs])


  type Option = {
    key: string
    label: string
  }

  const typeOptions: Option[] = [
    { key: '', label: 'Select Type' },
    { key: 'ec_user', label: 'EC User' },
    { key: 'display_id', label: 'Display ID' },
    { key: 'nid', label: 'NID' },
    { key: 'application_id', label: 'Application ID' },
    { key: 'mobile', label: 'Mobile' },
  ]


  return {
    ecVerificationLogs: data,
    loading,
    error,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    type,
    setType,
    typeOptions,
    searchTerm,
    searchValue,
    setSearchTerm,
    setSearchValue,
    fetchEcVerficationLogs,
  }
}

export default useGetECVerficationLogs
