/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useCallback } from 'react'
import { DefaultEcUser } from '../types/DefaultEcUserTypes'
import getDefaultEcUser from '../actions/GetDefaultEcUser'

const useGetDefaultEcUser = () => {
  const [data, setData] = useState<DefaultEcUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const fetchDefaultEcUser = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getDefaultEcUser()
      setData(response)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  },[])

  useEffect(() => {
    fetchDefaultEcUser()
  }, [fetchDefaultEcUser])



  return {
    defaultEcUser: data,
    loading,
    error,
    fetchDefaultEcUser,
  }
}

export default useGetDefaultEcUser
