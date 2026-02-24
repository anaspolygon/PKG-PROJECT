/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import getCheckerMakerList from "../actions/getCheckerMakerList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MakerCheckerResponse } from "../types/CheckerMakerTypes";

const useCheckerMaker = (page: number) => {
  const [data, setData] = useState<MakerCheckerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [type, setType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIdentifier(searchTerm);
  }, [searchTerm]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchCheckerMaker = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCheckerMakerList(
        page,
        identifier,
        startDate,
        endDate,
        status,
        type,
        searchValue
      );
      if ("code" in response && response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response as MakerCheckerResponse);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, identifier, startDate, endDate, status, type, searchValue, router]);

  useEffect(() => {
    fetchCheckerMaker();
  }, [fetchCheckerMaker]);

  const setSearchTermWithErrorClear = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (term === "" && error) {
        setError(null);
      }
    },
    [error]
  );

  type Option = {
    value: string;
    label: string;
  };

  const defaultOptions: Option[] = [
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "pending", label: "Pending" },
  ];
  const defaultActionTypesOptions: Option[] = [
    { value: "create", label: "Create" },
    { value: "update", label: "Update" },
    { value: "delete", label: "Delete" },
    { value: "bulk", label: "Bulk" },
  ];

  return {
    makerCheckerList: data,
    loading,
    error,
    searchTerm,
    startDate,
    endDate,
    status,
    searchValue,
    defaultOptions,
    defaultActionTypesOptions,
    type,
    setType,
    setStatus,
    clearError,
    setEndDate,
    setStartDate,
    setSearchValue,
    fetchCheckerMaker,
    setSearchTerm: setSearchTermWithErrorClear,
  };
};

export default useCheckerMaker;
