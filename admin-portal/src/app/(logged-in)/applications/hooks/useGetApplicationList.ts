/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useCallback } from "react";
import getApplicationList from "../actions/GetApplicationList";
import { ApplicationList } from "../types/ApplicationTypes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const useGetApplicationList = (page: number, key: string) => {
  const today = dayjs().format("YYYY-MM-DD");
  const sixMonthsAgo = dayjs().subtract(6, "month").format("YYYY-MM-DD");
  const [data, setData] = useState<ApplicationList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [startDate, setStartDate] = useState(sixMonthsAgo);
  const [endDate, setEndDate] = useState(today);
  const [bankingType, setBankingType] = useState("");
  const [gender, setGender] = useState("");
  const [productType, setProductType] = useState("");
  const [onboardingType, setOnboardingType] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIdentifier(searchTerm);
  }, [searchTerm]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getApplicationList(
        page,
        identifier,
        startDate,
        endDate,
        bankingType,
        status,
        gender,
        productType,
      );
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
  }, [
    page,
    identifier,
    startDate,
    endDate,
    bankingType,
    status,
    gender,
    productType,
    router,
    key,
  ]);

  const setSearchTermWithErrorClear = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (term === "" && error) {
        setError(null);
      }
    },
    [error],
  );

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  type Option = {
    value: string;
    label: string;
  };
  const defaultOptions: Option[] = [
    { value: "islamic", label: "Islamic" },
    { value: "conventional", label: "Conventional" },
  ];
  const genderOptions: Option[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];
  const allStatus: Option[] = [
    { value: "submitted", label: "Submitted" },
    { value: "in_progress", label: "In Progress" },
  ];
  return {
    applications: data,
    loading,
    error,
    fetchApplications,
    searchTerm,
    setSearchTerm: setSearchTermWithErrorClear,
    startDate,
    endDate,
    bankingType,
    setStartDate,
    setEndDate,
    setBankingType,
    defaultOptions,
    onboardingType,
    setOnboardingType,
    clearError,
    allStatus,
    status,
    setStatus,
    genderOptions,
    gender,
    setGender,
    productType,
    setProductType,
  };
};

export default useGetApplicationList;
