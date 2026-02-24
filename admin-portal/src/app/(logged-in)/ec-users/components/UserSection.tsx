'use client'

import React, { useState } from 'react'
import UserAddFormModal from './UserAddFormModal'
import UserTable from './UserTable';
import useGetUserList from '../hooks/useGetUserList';
import Pagination from '@/components/layouts/Pagination';
import Loader from '@/app/components/Loader';
import { BranchList } from '../types/BranchTypes';
import { useItemsStore } from '@/store/useUserstore';
import { UserLoginInfo } from '@/app/(guest)/auth/login/types/AdminLoginTypes';

interface Props{
  branchList:BranchList
}

const UserSection = ({branchList}:Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { users, loading, error, fetchUsers} = useGetUserList(currentPage)

  const { items } = useItemsStore();
  const info : UserLoginInfo = items.info as UserLoginInfo;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="bg-white shadow rounded-xl p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Ec Users List</h1>
        {info.canEcUserCreate && 
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#003970] text-white font-medium px-5 py-2 cursor-pointer rounded-lg hover:bg-blue-800"
          >
            + Add Ec User
          </button>
        }
      </div>

      <hr className='text-gray-300 py-2' />
      
      {loading && (
        <Loader />
      )}
      
      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load users.</p>
          <p className="text-gray-500 mt-1">Please try again later or contact support.</p>
        </div>
      )}

      {!loading && !error && users?.data && (
        <>
          {users.data.length > 0 ? (
            <>
              <UserTable users={users.data} onUserUpdated={fetchUsers}  branchList={branchList} />
              {users.last_page > 1 && (
                <Pagination
                  currentPage={users.current_page}
                  lastPage={users.last_page}
                  links={users.links}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No users found. Add a user to get started.
            </div>
          )}
        </>
      )}
      
      <UserAddFormModal
        isOpen={isModalOpen}
        branchList={branchList ?? []}
        onClose={() => setIsModalOpen(false)}
        onUserAdded={fetchUsers}
      />
    </div>
  )
}

export default UserSection