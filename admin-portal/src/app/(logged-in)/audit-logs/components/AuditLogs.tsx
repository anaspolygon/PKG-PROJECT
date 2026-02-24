"use client";
import React, { useState } from "react";
// import { Input } from "antd";
import Select from "react-select";
import Loader from "@/app/components/Loader";
import useAuditLogs from "../hooks/useAuditLogs";
import AuditLogsTable from "./AuditLogsTable";
import DateFilter from "../../components/DateFilter";
import PaginationWrapper from "@/components/layouts/PaginationWrapper";
import { selectStyles } from "../../components/form/FormSelect";

const AuditLogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);

  const {
    logs,
    auditLogsLoading,
    error,
    startDate,
    endDate,
    type,
    // searchValue,
    typeOptions,
    setStartDate,
    setEndDate,
    setType,
    // setSearchValue,
  } = useAuditLogs(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  const logsData = (logs?.data || []).filter((log) => {
    if ("changes" in log && log.changes.length === 0) return false;
    return true;
  });


  if(auditLogsLoading) return <Loader/>
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="sm:text-lg lg:text-2xl font-medium">Audit Logs</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Select
              className="min-w-62.5"
              options={typeOptions}
              isClearable
              isSearchable
              menuPosition="fixed"
              components={{ IndicatorSeparator: () => null }}
              menuPortalTarget={
                typeof window !== "undefined" ? document.body : null
              }
              styles={selectStyles}
              value={typeOptions.find((o) => o.value === type) || null}
              onChange={(opt) => {
                setType(opt?.value as string);
                setCurrentPage(1);
              }}
              placeholder="Select Type"
            />
            {/* <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by Auditable ID"
              className="!border-gray-400 focus:!border-[#003970] hover:!border-[#003970] !text-gray-600 !rounded-md !px-3 !py-2 pr-16"
            /> */}
          </div>
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

      <hr className="text-gray-300 py-2" />

      {loading && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load data.</p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && logs?.data && (
        <>
          {(logsData ?? []).length > 0 ? (
            <>
              <AuditLogsTable data={logsData} />
              {(logs.meta.last_page ?? 0) > 1 && (
                <PaginationWrapper
                  currentPage={logs.meta.current_page ?? 1}
                  lastPage={logs.meta.last_page ?? 1}
                  links={logs.meta.links ?? []}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No audit logs found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AuditLogs;
