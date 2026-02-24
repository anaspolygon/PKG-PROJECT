"use client";

import React, { useState } from "react";
import Loader from "@/app/components/Loader";
import useGetAllBusinessProfession from "../hooks/useGetBusinessProfessionList";
import BusinessProfessionTable from "./BusinessProfessionTable";
import BusinessProfessionAddFormModal from "./BusinessProfessionAddFormModal";
import Pagination from "@/components/layouts/Pagination";
import TypeFilter from "../../applications/components/TypeFilter";
import { Input } from "antd";
import { useItemsStore } from "@/store/useUserstore";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";

const BusinessProfessionSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { items } = useItemsStore();
  const info: UserLoginInfo = (items.info as UserLoginInfo) ?? null;
  const {
    businessProfessions,
    loading,
    error,
    fetchBusinessProfessions,
    searchTerm,
    setSearchTerm,
    type,
    setType,
    typeOptions,
  } = useGetAllBusinessProfession(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className=" bg-white shadow rounded-xl p-6 w-full sm:mt-8 md:mt-8 lg:mt-0">
      <div className="flex justify-between  mb-4">
        <h1 className="sm:text-lg lg:text-2xl font-medium xl:flex-1">
          Business Profession List
        </h1>
        <div className="flex gap-2 sm:flex-col md:flex-col xl:flex-row items-center">
          <div className="flex gap-2">
            <div>
              <TypeFilter
                value={type}
                onChange={(val) => {
                  setType(val);
                  setCurrentPage(1);
                }}
                options={typeOptions}
                defaultLabel="Type"
              />
            </div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Business profession"
              className="!border-gray-400 focus:!border-[#003970] hover:!border-[#003970] !text-gray-600 !rounded-md !px-3 !py-2 pr-16"
            />
          </div>
          <div className="flex justify-end w-full xl:flex-1">
            {info && info.canBusinessProfessionsCreate && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#003970] text-white font-medium px-5 py-2 cursor-pointer rounded-lg hover:bg-blue-800 min-w-fit"
              >
                + Add Business Profession
              </button>
            )}
          </div>
        </div>
      </div>

      <hr className="text-gray-300 py-2" />

      {loading && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">
            Failed to load business professions.
          </p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && businessProfessions?.data && (
        <>
          {businessProfessions.data.length > 0 ? (
            <>
              <BusinessProfessionTable
                businessProfessions={businessProfessions.data}
                onUpdated={fetchBusinessProfessions}
              />
              {(businessProfessions.last_page ?? 0) > 1 && (
                <Pagination
                  currentPage={businessProfessions.current_page ?? 1}
                  lastPage={businessProfessions.last_page ?? 1}
                  links={businessProfessions.links ?? []}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No Business profession found.
            </div>
          )}
        </>
      )}

      <BusinessProfessionAddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdded={fetchBusinessProfessions}
      />
    </div>
  );
};

export default BusinessProfessionSection;
