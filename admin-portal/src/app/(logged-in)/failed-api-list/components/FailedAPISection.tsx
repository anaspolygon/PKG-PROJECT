"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import FailedAPITable from "./FailedAPITable";
import useFailedAPIList from "../hooks/useFailedAPIList";
import PaginationWrapper from "@/components/layouts/PaginationWrapper";
import SearchBar from "../../components/SearchBar";
import DateFilter from "../../components/DateFilter";
import { toast } from "sonner";
import { retryAction } from "../actions/retryAction";
const FailedAPISection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [loading] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);
  const router = useRouter();

  const {
    apis,
    apisLoading,
    error,
    searchTerm,
    startDate,
    endDate,
    setSearchTerm,
    setStartDate,
    setEndDate,
    clearError,
  } = useFailedAPIList(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = async (applicationId: number, failedApiId: number) => {
    try {
      setRetryLoading(true);
      const res = await retryAction({
        application_id: applicationId,
        failed_api_id: failedApiId,
      });
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
        if (res.code === 401) {
          router.push("/auth/login");
        }
      }
    } finally {
      setRetryLoading(false);
    }
  };

  if (apisLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="sm:text-lg lg:text-2xl font-medium">City API Logs</h1>
        <div className="flex items-center gap-2">
          <SearchBar
            searchValue={searchTerm}
            onSubmit={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
              setSearchError(null);
              if (val === "" && error) {
                clearError();
              }
            }}
            placeholder="Application ID"
            label="Identifier"
            error={searchError || error?.message}
            onChange={() => {
              setSearchError(null);
              if (error) {
                clearError();
              }
            }}
            width={200}
          />
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={(date) => {
              setStartDate(date);
              setCurrentPage(1);
            }}
            onEndDateChange={(date) => {
              setEndDate(date);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <hr className="text-gray-300 my-4" />
      {loading && <Loader />}
      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load data.</p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}
      {!loading && !error && apis?.data && (
        <>
          {(apis.data ?? []).length > 0 ? (
            <>
              <FailedAPITable
                apis={apis.data}
                retryLoading={retryLoading}
                handleRetry={handleRetry}
              />
              {(apis.meta.last_page ?? 0) > 1 && (
                <PaginationWrapper
                  currentPage={apis.meta.current_page ?? 1}
                  lastPage={apis.meta.last_page ?? 1}
                  links={apis.meta.links ?? []}
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

export default FailedAPISection;
