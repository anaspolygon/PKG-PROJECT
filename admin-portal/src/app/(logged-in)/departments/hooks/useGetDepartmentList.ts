/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { DepartmentList } from "../types/DepartmentTypes";
import getDepartMentListAction from "../actions/GetDepartmentList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useGetDepartmentList = (page = 1) => {
  const [data, setData] = useState<DepartmentList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchDepartment = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDepartMentListAction(page, searchTerm);
      if (response.code) {
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
    fetchDepartment();
  }, [fetchDepartment]);

  return {
    department: data,
    loading,
    error,
    fetchDepartment,
    searchTerm,
    setSearchTerm,
  };
};

export default useGetDepartmentList;
