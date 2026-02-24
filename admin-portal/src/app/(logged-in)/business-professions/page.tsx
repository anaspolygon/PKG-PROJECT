import React from 'react'
import BusinessProfessionSection from './components/BusinessProfessionSection'

export default async function page() {

  return (
    <div className="flex flex-col gap-8">
      <BusinessProfessionSection />
    </div>
  )
}