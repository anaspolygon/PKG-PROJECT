/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useCallback } from "react";
import { ApplicationList } from "../types/ApplicationTypes";
import dayjs from "dayjs";

const useGetApplicationList = (
  page: number,
  apiKey: string,
  baseUrl: string,
) => {
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

  useEffect(() => {
    setIdentifier(searchTerm);
  }, [searchTerm]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString() });
    if (identifier) params.append("column", identifier);
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (bankingType) params.append("banking_type", bankingType);
    if (status) params.append("status", status);
    if (gender) params.append("gender", gender);
    if (productType) params.append("product_type", productType);
    const url = `${baseUrl}/api/admin/applications`;
    try {
      const res = await fetch(url + "?" + params.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      });
      const data = await res.json();
      if (res.status === 401) {
        window.location.reload();
        return;
      }
      setData(data);
    } catch (error) {
      console.error("Error fetching application:", error);
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
    baseUrl,
    apiKey,
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
