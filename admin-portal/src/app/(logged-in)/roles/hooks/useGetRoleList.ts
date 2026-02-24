/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useCallback } from 'react'
import { RoleList } from '../types/RoleTypes'
import getRoleListAction from '../actions/GetRoleList'

const useGetRoleList = () => {
  const [data, setData] = useState<RoleList | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const fetchRoles = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getRoleListAction()
      setData(response)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  },[])

  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])



  return {
    roles: data,
    loading,
    error,
    fetchRoles,
  }
}

export default useGetRoleList
