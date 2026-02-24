/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import downloadUsers from "../actions/DownloadUsers";
import { useRouter } from "next/navigation";

const useUserDownload = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDownloadAll = async () => {
    setLoading(true);
    try {
      const res: any = await downloadUsers();

      const url = window.URL.createObjectURL(res.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = res.fileName || "users_report";
      link.click();
      window.URL.revokeObjectURL(url);
      if (!res.status && res.code === 401) {
        toast.error(res.message);
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error("Download failed");

      console.error("Download failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    handleDownloadAll,
  };
};

export default useUserDownload;
