'use client'
import React, { useState } from "react";
import Pagination from "@/components/layouts/Pagination";
import Loader from "@/app/components/Loader";
import { Input } from "antd";
import { useItemsStore } from "@/store/useUserstore";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";
import DepartmentTable from "./DepartmentTable";
import DepartmentAddFormModal from "./DepartmentAddFormModal";
import useGetDepartmentList from "../hooks/useGetDepartmentList";

const DepartmentSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { items } = useItemsStore();
    const info: UserLoginInfo = items.info as UserLoginInfo;
  
    const { department, searchTerm, setSearchTerm, loading, error, fetchDepartment } =
    useGetDepartmentList(currentPage);
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    return (
      <div className="flex flex-col  gap-6 bg-white shadow rounded-xl p-6 w-full sm:mt-8 md:mt-8 lg:mt-0">
        <div className="flex justify-between items-center">
          <h1 className="sm:text-lg lg:text-2xl font-medium">Department List</h1>
          <div className="flex gap-2 items-center">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Department Name"
              className="!border-gray-400 focus:!border-[#003970] hover:!border-[#003970] !text-gray-600 !rounded-md !px-3 !py-2 pr-16"
            />
            {info && info.can_create_department && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#003970] text-white font-medium sm:px-3 sm:py-2 lg:px-5 lg:py-2 cursor-pointer rounded-lg hover:bg-blue-800 min-w-fit"
              >
                + Add Department
              </button>
            )}
          </div>
        </div>
  
        <hr className="text-gray-300" />
  
        {loading && <Loader />}
  
        {error && (
          <div className="py-8 text-center">
            <p className="text-red-500 font-medium">Failed to load branches.</p>
            <p className="text-gray-500 mt-1">
              Please try again later or contact support.
            </p>
          </div>
        )}
  
        {!loading && !error && department?.data && (
          <>
            {department.data.length > 0 ? (
              <>
                <DepartmentTable
                  departments={department.data}
                  onDepartmentUpdated={fetchDepartment}
                />
                {(department?.last_page ?? 0) > 1 && (
                  <Pagination
                    currentPage={department?.current_page ?? 1}
                    lastPage={department?.last_page ?? 1}
                    links={department?.links ?? []}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No Department found matching your search.
              </div>
            )}
          </>
        )}
  
        <DepartmentAddFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDepartmentAdded={fetchDepartment}
        />
      </div>
    );
};

export default DepartmentSection;
