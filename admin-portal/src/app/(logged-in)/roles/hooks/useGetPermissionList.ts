/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, useCallback } from 'react'
import getPermissionListAction from '../actions/GetPermissionList'
import { PermissionList } from '../types/PermissionTypes'

const useGetPermissionList = () => {
  const [data, setData] = useState<PermissionList | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const fetchPermissions = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getPermissionListAction()
      setData(response)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  },[])

  useEffect(() => {
    fetchPermissions()
  }, [fetchPermissions])



  return {
    permissionList: data,
    loading,
    error,
    fetchPermissions,
  }
}

export default useGetPermissionList
