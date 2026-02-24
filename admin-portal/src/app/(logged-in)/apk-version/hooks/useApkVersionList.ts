/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApkVersionResponse } from "../types/ApkVersionTypes";
import getApkVersionListAction from "../actions/getApkList";

const useApkVersionList = (page = 1) => {
  const [data, setData] = useState<ApkVersionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchApkVersions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getApkVersionListAction(page, searchTerm);
      if ("code" in response && response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response as ApkVersionResponse);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, router]);

  useEffect(() => {
    fetchApkVersions();
  }, [fetchApkVersions]);

  return {
    apkVersions: data,
    apkVersionsLoading:loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchApkVersions,
  };
};

export default useApkVersionList;
