import React from 'react'

const AdminFooter = () => {
  return (
    <div className="bg-[#F9F9FA]  border-t border-t-[#D3D3D6] text-center py-3 text-sm text-[#1F1F1F] w-full">
        © {new Date().getFullYear()} City Bank PLC.
    </div>
  )
}

export default AdminFooter