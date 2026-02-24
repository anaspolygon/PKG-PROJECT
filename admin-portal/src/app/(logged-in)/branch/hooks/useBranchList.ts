/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BranchResponse } from "../types/BranchTypes";
import getBranchListAction from "../actions/GetBranchList";

const useBranchList = (page = 1) => {
  const [data, setData] = useState<BranchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBranchListAction(page, searchTerm);

      if ("code" in response && response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response as BranchResponse);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, router]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return {
    branches: data,
    branchesLoading:loading,
    error,
    fetchBranches,
    searchTerm,
    setSearchTerm,
  };
};

export default useBranchList;
