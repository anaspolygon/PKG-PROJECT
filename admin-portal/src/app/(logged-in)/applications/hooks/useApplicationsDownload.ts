import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { downloadFile } from "../../branch/components/BranchSection";
import { downloadBulkApplications } from "../actions/DownloadBulkApplications";
import { downloadAllApplications } from "../actions/downloadAllApplications";
interface SearchParams {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  bankingType?: string;
  gender?: string;
  productType?: string;
  status?: string;
}

const useApplicationsDownload = ({
  searchTerm,
  startDate,
  endDate,
  bankingType,
  gender,
  productType,
  status,
}: SearchParams) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingSelected, setLoadingSelected] = useState(false);
  const router = useRouter();

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isSelected = (id: number) => selectedIds.includes(id);

  const selectAllOnPage = (idsOnPage: number[]) => {
    setSelectedIds((prev) => [...new Set([...prev, ...idsOnPage])]);
  };

  const clearAllSelections = () => {
    setSelectedIds([]);
  };

  const handleDownloadAll = async () => {
    setLoadingAll(true);
    try {
      const res = await downloadAllApplications(
        searchTerm,
        startDate,
        endDate,
        bankingType
      );
      if (!res.success) {
        toast.error(res.message);
        if (res.code === 401) {
          router.push("/auth/login");
        }
        return;
      }
      if (res.file && res.fileName) {
        downloadFile(res.file, res.fileName);
      } else {
        toast.error("File not available");
      }
    } catch (error) {
      toast.error("Download all failed");
      console.error("Download failed:", error);
    } finally {
      setLoadingAll(false);
    }
  };

  const handleBulkDownload = async () => {
    setLoadingSelected(true);
    try {
      const res = await downloadBulkApplications(bankingType,productType,gender,status,searchTerm,startDate,endDate);
      if (!res.success) {
        toast.error(res.message);
          if (res.code === 401) {
          router.push("/auth/login");
        }
        return;
      }
      if (res.file && res.fileName) {
        downloadFile(res.file, res.fileName);
      } else {
        toast.error("File not available");
      }
    } catch (error) {
      toast.error("PDF download failed");
      console.error("Download failed:", error);
    } finally {
      setLoadingSelected(false);
    }
  };

 
  return {
    loadingAll,
    selectedIds,
    loadingSelected,
    isSelected,
    toggleSelect,
    selectAllOnPage,
    handleDownloadAll,
    clearAllSelections,
    handleBulkDownload,
  };
};

export default useApplicationsDownload;
