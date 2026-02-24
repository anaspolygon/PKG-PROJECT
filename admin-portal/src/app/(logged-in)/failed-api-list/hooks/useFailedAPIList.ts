/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FailedAPIListResponse } from "../types/FailedAPITypes";
import getFailedAPIListAction from "../actions/getFailedAPIList";
import dayjs from "dayjs";

const useFailedAPIList = (page = 1) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [data, setData] = useState<FailedAPIListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const router = useRouter();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchFaildAPIList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getFailedAPIListAction(
        page,
        searchTerm,
        startDate,
        endDate,
      );
      if ("code" in response && response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response as FailedAPIListResponse);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, startDate, endDate, router]);

  useEffect(() => {
    fetchFaildAPIList();
  }, [fetchFaildAPIList]);

  return {
    apis: data,
    apisLoading:loading,
    error,
    searchTerm,
    startDate,
    endDate,
    clearError,
    setStartDate,
    setEndDate,
    setSearchTerm,
    fetchFaildAPIList,
  };
};

export default useFailedAPIList;
