"use client";
import React, { useState } from "react";
import Select from "react-select";
import Loader from "@/app/components/Loader";
import MakerCheckerTable from "./MakerCheckerTable";
import useCheckerMaker from "../hooks/useCheckerMaker";
import PaginationWrapper from "@/components/layouts/PaginationWrapper";
import { selectStyles } from "../../components/form/FormSelect";
const MakerChecker = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    makerCheckerList,
    loading,
    error,
    status,
    defaultOptions,
    defaultActionTypesOptions,
    type,
    setType,
    setStatus,
    fetchCheckerMaker,
  } = useCheckerMaker(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="sm:text-lg lg:text-2xl font-medium">Pending List</h1>
        {!loading && makerCheckerList?.data && (
          <div className="flex flex-col sm:flex-col xl:flex-row items-center justify-end   gap-4">
            <div className="flex flex-col sm:flex-row md:flex-row flex-wrap gap-2">
              <div>
                <Select
                  className="min-w-45"
                  options={defaultOptions}
                  isClearable
                  isSearchable
                  menuPosition="fixed"
                  components={{ IndicatorSeparator: () => null }}
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  styles={selectStyles}
                  value={defaultOptions.find((o) => o.value === status) || null}
                  onChange={(opt) => {
                    setStatus(opt?.value as string);
                    setCurrentPage(1);
                  }}
                  placeholder="Status"
                />
              </div>
              <div>
                <Select
                  className="min-w-45"
                  options={defaultActionTypesOptions}
                  isClearable
                  isSearchable
                  menuPosition="fixed"
                  components={{ IndicatorSeparator: () => null }}
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  styles={selectStyles}
                  value={
                    defaultActionTypesOptions.find((o) => o.value === type) ||
                    null
                  }
                  onChange={(opt) => {
                    setType(opt?.value as string);
                    setCurrentPage(1);
                  }}
                  placeholder="Action Type"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className="text-gray-300 py-2" />

      {loading && !error && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load data.</p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && makerCheckerList?.data && (
        <>
          {makerCheckerList.data.length > 0 ? (
            <>
              <MakerCheckerTable
                data={makerCheckerList.data}
                fetchCheckerMaker={fetchCheckerMaker}
              />
              {makerCheckerList &&
                makerCheckerList.meta.current_page &&
                makerCheckerList.meta.last_page &&
                makerCheckerList.meta.links &&
                makerCheckerList.meta.last_page > 1 && (
                  <PaginationWrapper
                    currentPage={makerCheckerList.meta.current_page}
                    lastPage={makerCheckerList.meta.last_page}
                    links={makerCheckerList.meta.links}
                    onPageChange={handlePageChange}
                  />
                )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">No data found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default MakerChecker;
