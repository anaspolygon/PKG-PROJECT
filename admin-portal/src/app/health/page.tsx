import { adminApi } from '@/api/ApiClient'
import React from 'react'

const page = async() => {
  await adminApi.get('/health');
  return (
    <div>Application is up and running</div>
  )
}

export default page