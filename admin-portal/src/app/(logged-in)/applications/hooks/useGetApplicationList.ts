/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useCallback } from "react";
import { ApplicationList } from "../types/ApplicationTypes";
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
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString() });
    if (identifier) params.append("column", identifier);
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (bankingType) params.append("banking_type", bankingType);
    if (status) params.append("status", status);
    if (gender) params.append("gender", gender);
    if (productType) params.append("product_type", productType);

    try {
      const res = await fetch(
        "https://city-api.dev-polygontech.xyz/api/admin/applications?" +
          params.toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "mangeD01axB3sBDM3HwRmh2MmO4hQ5aXyXpCLOwp8QRYKymrgyCaaFwJciTgWqzz",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY2l0eS1hcGkuZGV2LXBvbHlnb250ZWNoLnh5ei9hcGkvYWRtaW4vbG9naW4iLCJpYXQiOjE3NzIwMTIwMTYsImV4cCI6MTc3MjAxMzgxNiwibmJmIjoxNzcyMDEyMDE2LCJqdGkiOiJ4aHFvNlBlZjhJbDJXUG1zIiwic3ViIjoiMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJuYW1lIjoiQWwgQW5hcyIsImVtcGxveWVlX2lkIjoiRU1QLUFOQVMiLCJyb2xlIjpudWxsLCJwZXJtaXNzaW9ucyI6eyJoYXNfc3VwZXJfYWRtaW5fcGVybWlzc2lvbiI6dHJ1ZSwiY2FuX3JlYWRfcm9sZSI6dHJ1ZSwiY2FuX2NyZWF0ZV9yb2xlIjp0cnVlLCJjYW5fdXBkYXRlX3JvbGUiOnRydWUsImNhbl9yZWFkX3VzZXIiOnRydWUsImNhbl9jcmVhdGVfdXNlciI6dHJ1ZSwiY2FuX3VwZGF0ZV91c2VyIjp0cnVlLCJjYW5fcmVhZF9tYWtlcl9jaGVja2VyIjp0cnVlLCJjYW5fYXBwcm92ZV9tYWtlcl9jaGVja2VyIjp0cnVlLCJjYW5fcmVhZF9icmFuY2giOnRydWUsImNhbl9jcmVhdGVfYnJhbmNoIjp0cnVlLCJjYW5fdXBkYXRlX2JyYW5jaCI6dHJ1ZSwiY2FuX2RlbGV0ZV9icmFuY2giOnRydWUsImNhbl9kb3dubG9hZF9icmFuY2hfZXhjZWwiOnRydWUsImNhbl91cGxvYWRfYnJhbmNoX2V4Y2VsIjp0cnVlLCJjYW5fcmVhZF9hcGkiOnRydWUsImNhbl9jcmVhdGVfYXBpIjp0cnVlLCJjYW5fdXBkYXRlX2FwaSI6dHJ1ZSwiY2FuX3JlYWRfYXBrIjp0cnVlLCJjYW5fY3JlYXRlX2FwayI6dHJ1ZSwiY2FuX3VwZGF0ZV9hcGsiOnRydWUsImNhbl9kZWxldGVfYXBrIjp0cnVlLCJjYW5fcGVyY2VudGFnZV9yZWFkIjp0cnVlLCJjYW5fcGVyY2VudGFnZV91cGRhdGUiOnRydWUsImNhbl9yZWFkX2F1ZGl0X2xvZ3MiOnRydWUsImNhbl9yZWFkX3Jpc2tfY29uZmlnIjp0cnVlLCJjYW5fdXBkYXRlX3Jpc2tfY29uZmlnIjp0cnVlLCJjYW5fcmVhZF9zaW1wbGlmaWVkX3Byb2Zlc3Npb24iOnRydWUsImNhbl9jcmVhdGVfc2ltcGxpZmllZF9wcm9mZXNzaW9uIjp0cnVlLCJjYW5fdXBkYXRlX3NpbXBsaWZpZWRfcHJvZmVzc2lvbiI6dHJ1ZSwiY2FuX3JlYWRfcmVndWxhcl9wcm9mZXNzaW9uIjp0cnVlLCJjYW5fY3JlYXRlX3JlZ3VsYXJfcHJvZmVzc2lvbiI6dHJ1ZSwiY2FuX3VwZGF0ZV9yZWd1bGFyX3Byb2Zlc3Npb24iOnRydWUsImNhbl9yZWFkX2J1c2luZXNzIjp0cnVlLCJjYW5fY3JlYXRlX2J1c2luZXNzIjp0cnVlLCJjYW5fdXBkYXRlX2J1c2luZXNzIjp0cnVlLCJjYW5fcmVhZF9hcHBsaWNhdGlvbiI6dHJ1ZSwiY2FuX2Rvd25sb2FkX2FwcGxpY2F0aW9uc19saXN0Ijp0cnVlLCJjYW5fcmVhZF9hcHBfY29uZmlndXJhdGlvbiI6dHJ1ZSwiY2FuX3VwZGF0ZV9hcHBfY29uZmlndXJhdGlvbiI6dHJ1ZSwiY2FuX3JlYWRfZmFpbGVkX2FwaV9saXN0Ijp0cnVlLCJjYW5fcmV0cnlfZmFpbGVkX2FwaV9saXN0Ijp0cnVlfSwidHlwZSI6ImJyYW5jaF91c2VyIn0.Fm6GXtDxHw-YvmlEZm7llCXK41d1Bp1GZjkaxzjSPXg`,
          },
        },
      );
      const data = await res.json();
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
