/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { BranchList } from "../types/BranchTypes";
import getBranchListAction from "../actions/GetBranchList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useGetBranchList = (page = 1) => {
  const [data, setData] = useState<BranchList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBranchListAction(page, searchTerm);
      if (response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return {
    branches: data,
    loading,
    error,
    fetchBranches,
    searchTerm,
    setSearchTerm,
  };
};

export default useGetBranchList;
