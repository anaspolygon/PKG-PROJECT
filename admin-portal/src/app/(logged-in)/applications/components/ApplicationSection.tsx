"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckSquare, Square } from "lucide-react";
import Select from "react-select";
import Loader from "@/app/components/Loader";
import useGetApplicationList from "../hooks/useGetApplicationList";
import ApplicationTable from "./ApplicationTable";
import SearchBar from "./SearchBar";
import DateFilter from "./DateFilter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useApplicationsDownload from "../hooks/useApplicationsDownload";
import useProductList from "../hooks/useProductList";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import PaginationWrapper from "@/components/layouts/PaginationWrapper";
import { selectStyles } from "../../components/form/FormSelect";
import { toast } from "sonner";
import { downloadDocument } from "../[id]/components/CollapsibleSection";
interface Props {
  key:string
}
const ApplicationSection = ({key}:Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    error,
    status,
    gender,
    endDate,
    loading,
    allStatus,
    startDate,
    searchTerm,
    productType,
    bankingType,
    applications,
    genderOptions,
    defaultOptions,
    setGender,
    setStatus,
    clearError,
    setEndDate,
    setStartDate,
    setSearchTerm,
    setProductType,
    setBankingType,
  } = useGetApplicationList(currentPage,key);

  const {
    selectedIds,
    loadingSelected,
    toggleSelect,
    selectAllOnPage,
    clearAllSelections,
    handleBulkDownload,
  } = useApplicationsDownload({
    searchTerm,
    startDate,
    endDate,
    bankingType,
    gender,
    productType,
    status,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const info = useLocalStorage("info");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [pdfBulkLoading, setPdfBulkLoading] = useState(false);
  const router = useRouter();

  const { products } = useProductList();
  const productOptions = (products ?? []).map((item) => ({
    value: item.value,
    label: item.label,
  }));

  async function downloadDocumentsZip() {
    setBulkLoading(true);

    try {
      const query = selectedIds.join(",");
      const url = `/api/documents/bulk/download?ids=${query}`;
      const res = await fetch(url);

      if (res.status === 401) {
        router.push("/auth/login");
      }

      if (!res.ok) {
        throw new Error("Download failed");
      }

      const blob = await res.blob();
      downloadDocument(`applications_documents.zip`, blob);
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    } finally {
      setBulkLoading(false);
    }
  }

  async function downloadPDFBulk() {
    setPdfBulkLoading(true);

    try {
      const query = selectedIds.join(",");
      const url = `/api/applications/bulk-pdf-download?ids=${query}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (res.status === 401) {
        router.push("/auth/login");
      }

      if (!res.ok) {
        throw new Error("Download failed");
      }

      const blob = await res.blob();
      downloadDocument(`applications_pdf.zip`, blob);
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    } finally {
      setPdfBulkLoading(false);
    }
  }

  console.log("Applications data:", applications);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="sm:text-[16px] md:text-2xl font-medium mb-3">
          Application List
        </h1>
        <div className="flex flex-col xl:flex-row justify-between md:items-end xl:items-center pb-2 gap-2">
          <div className="flex items-center gap-3">
            {info?.permissions.can_download_applications_list && (
              <>
                {selectedIds.length > 0 && !error && (
                  <PrimaryBtn
                    variant="primary"
                    onClick={() => downloadPDFBulk()}
                    loadingAll={pdfBulkLoading}
                    icon="download"
                    content={`Download PDF (${selectedIds.length})`}
                    loadingContent="Downloading..."
                  />
                )}
                {/* {selectedIds.length > 0 && !error && ( */}
                <PrimaryBtn
                  variant="secondary"
                  onClick={handleBulkDownload}
                  loadingAll={loadingSelected}
                  icon="download"
                  content="Download Report"
                  loadingContent="Downloading..."
                />
                {/* )} */}
                {selectedIds.length > 0 && !error && (
                  <PrimaryBtn
                    variant="primary"
                    onClick={() => downloadDocumentsZip()}
                    loadingAll={bulkLoading}
                    icon="download"
                    content={`Download Documents (${selectedIds.length})`}
                    loadingContent="Downloading..."
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {!loading &&
        applications?.data &&
        info?.permissions.can_download_applications_list && (
          <div className="mb-4">
            {/* Filters Row */}
            <div className="flex items-center justify-between gap-3 mb-4">
              {/* Select All/Unselect All */}
              <div className="flex gap-2 min-w-fit">
                {!error &&
                  applications.data.length > 0 &&
                  (selectedIds.length > 0 ? (
                    <button
                      onClick={clearAllSelections}
                      className="text-blue-900 hover:text-blue-900 transition flex gap-2 items-center cursor-pointer whitespace-nowrap"
                    >
                      <CheckSquare size={20} />
                      <span className="text-sm font-medium">Unselect All</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const idsOnPage = (applications?.data ?? []).map(
                          (app) => app.id,
                        );
                        selectAllOnPage(idsOnPage);
                      }}
                      className="text-gray-900 hover:text-indigo-900 transition flex gap-2 items-center cursor-pointer whitespace-nowrap"
                    >
                      <Square size={18} />
                      <span className="text-sm font-medium">Select All</span>
                    </button>
                  ))}
              </div>

              {/* All Filters in One Line */}
              <div className="flex items-center gap-2 flex-wrap justify-end flex-1">
                <Select
                  className="min-w-40"
                  options={defaultOptions}
                  isClearable
                  isSearchable
                  menuPosition="fixed"
                  components={{ IndicatorSeparator: () => null }}
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  styles={selectStyles}
                  value={
                    defaultOptions.find((o) => o.value === bankingType) || null
                  }
                  onChange={(opt) => {
                    setBankingType(opt?.value as string);
                    clearAllSelections();
                    setCurrentPage(1);
                  }}
                  placeholder="Banking Type"
                />

                <Select
                  className="w-62.5"
                  options={productOptions}
                  isClearable
                  isSearchable
                  menuPosition="fixed"
                  components={{ IndicatorSeparator: () => null }}
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  styles={selectStyles}
                  value={
                    productOptions.find((o) => o.value === productType) || null
                  }
                  onChange={(opt) => {
                    setProductType(opt?.value as string);
                    clearAllSelections();
                    setCurrentPage(1);
                  }}
                  placeholder="Product Type"
                />

                <Select
                  className="min-w-30"
                  options={genderOptions}
                  isClearable
                  isSearchable
                  menuPosition="fixed"
                  components={{ IndicatorSeparator: () => null }}
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  styles={selectStyles}
                  value={genderOptions.find((o) => o.value === gender) || null}
                  onChange={(opt) => {
                    setGender(opt?.value as string);
                    clearAllSelections();
                    setCurrentPage(1);
                  }}
                  placeholder="Gender"
                />

                <Select
                  className="min-w-45"
                  options={allStatus}
                  isClearable
                  isSearchable
                  menuPosition="fixed"
                  components={{ IndicatorSeparator: () => null }}
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  styles={selectStyles}
                  value={allStatus.find((o) => o.value === status) || null}
                  onChange={(opt) => {
                    setStatus(opt?.value as string);
                    clearAllSelections();
                    setCurrentPage(1);
                  }}
                  placeholder="Application Status"
                />

                <div className="min-w-55">
                  <SearchBar
                    searchValue={searchTerm}
                    onSubmit={(val) => {
                      setSearchTerm(val);
                      setCurrentPage(1);
                      clearAllSelections();
                      setSearchError(null);
                      if (val === "" && error) {
                        clearError();
                      }
                    }}
                    placeholder="Branch Code | Mobile No"
                    label="Identifier"
                    error={searchError || error?.message}
                    onChange={() => {
                      setSearchError(null);
                      clearAllSelections();
                      if (error) {
                        clearError();
                      }
                    }}
                  />
                </div>

                <DateFilter
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={(date) => {
                    setStartDate(date);
                    clearAllSelections();
                    setCurrentPage(1);
                  }}
                  onEndDateChange={(date) => {
                    setEndDate(date);
                    clearAllSelections();
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>
        )}

      <hr className="text-gray-300 py-2" />

      {loading && !error && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">
            Failed to load applications.
          </p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && applications?.data && (
        <>
          {(applications?.data ?? []).length > 0 ? (
            <>
              <ApplicationTable
                canDownloadPdf={
                  info?.permissions.can_download_applications_list
                }
                data={applications.data}
                selectedIds={selectedIds}
                toggleSelect={toggleSelect}
              />
              {applications?.meta && applications.meta.last_page > 1 && (
                <PaginationWrapper
                  currentPage={applications.meta.current_page ?? 1}
                  lastPage={applications.meta.last_page ?? 1}
                  links={applications.meta.links ?? []}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No application found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ApplicationSection;
