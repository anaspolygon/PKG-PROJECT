"use client";

import React, { useState } from "react";
import Loader from "@/app/components/Loader";
import BranchTable from "./BranchTable";
import BranchAddFormModal from "./BranchAddFormModal";
import useGetBranchList from "../hooks/useGetBranchList";
import { Input } from "antd";
import Pagination from "@/components/layouts/Pagination";
import { useItemsStore } from "@/store/useUserstore";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";

const BranchSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { items } = useItemsStore();
  const info: UserLoginInfo = items.info as UserLoginInfo;

  const { branches, searchTerm, setSearchTerm, loading, error, fetchBranches } =
    useGetBranchList(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col  gap-6 bg-white shadow rounded-xl p-6 w-full sm:mt-8 md:mt-8 lg:mt-0">
      <div className="flex justify-between items-center">
        <h1 className="sm:text-lg lg:text-2xl font-medium">Branch List</h1>
        <div className="flex gap-2 items-center">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Branch Name or Code"
            className="!border-gray-400 focus:!border-[#003970] hover:!border-[#003970] !text-gray-600 !rounded-md !px-3 !py-2 pr-16 sm:placeholder:text-sm lg:placeholder:text-lg"
          />
          {info && info.can_create_branch && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="sm:text-sm lg:text-lg bg-[#003970] text-white font-medium sm:px-3 sm:py-2 lg:px-5 lg:py-2 cursor-pointer rounded-lg hover:bg-blue-800 min-w-fit"
            >
              + Add Branch
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

      {!loading && !error && branches?.data && (
        <>
          {(branches.data ?? []).length > 0 ? (
            <>
              <BranchTable
                branches={branches.data}
                onBranchUpdated={fetchBranches}
              />
              {(branches.last_page ?? 0) > 1 && (
                <Pagination
                  currentPage={branches.current_page ?? 1}
                  lastPage={branches.last_page ?? 1}
                  links={branches.links ?? []}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No Branches found matching your search.
            </div>
          )}
        </>
      )}

      <BranchAddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBranchAdded={fetchBranches}
      />
    </div>
  );
};

export default BranchSection;
