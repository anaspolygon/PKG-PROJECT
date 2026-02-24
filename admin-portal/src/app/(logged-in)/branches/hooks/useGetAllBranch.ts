/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useCallback } from 'react'
import getAllBranch from '../actions/GetAllBranch'

export interface Branch {
  id: number;
  branch_name: string;
  branch_code:string;
}

const useGetAllBranch = () => {
  const [data, setData] = useState<Branch[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchBranches = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getAllBranch()
      setData(response)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  },[])

  useEffect(() => {
    fetchBranches()
  }, [fetchBranches])



  return {
    branches: data,
    loading,
    error,
    fetchBranches,
    searchTerm,
    setSearchTerm,
  }
}

export default useGetAllBranch
