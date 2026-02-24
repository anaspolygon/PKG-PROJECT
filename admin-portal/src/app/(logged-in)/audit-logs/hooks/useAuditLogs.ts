/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getAuditLogs from "../actions/GetAuditLogsList";
import { AuditLogResponse } from "../types/AuditTypes";

interface Option {
  value: string;
  label: string;
}

const useAuditLogs = (page = 1) => {
  const [data, setData] = useState<AuditLogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const fetchAuditLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAuditLogs(
        page,
        searchTerm,
        startDate,
        endDate,
        type,
        searchValue
      );

      if ("code" in response && response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response as AuditLogResponse);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, startDate, endDate, type, searchValue, router]);

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  const typeOptions: Option[] = [
    { value: "User", label: "User" },
    { value: "Branch", label: "Branch" },
    { value: "ApkVersion", label: "APK Version" },
    { value: "ApisManagement", label: "API Management" },
    { value: "PercentageConfig", label: "Percentage Configuration" },
    { value: "Field", label: "Risk Grading" },
    { value: "AppConfiguration", label: "App Configuration" },
    { value: "MakerChecker", label: "Pending List" },
    { value: "Role", label: "Role" },
    { value: "Permission", label: "Permission" },
  ];

  return {
    logs: data,
    auditLogsLoading:loading,
    error,
    searchTerm,
    startDate,
    endDate,
    typeOptions,
    type,
    searchValue,
    fetchAuditLogs,
    setSearchTerm,
    setStartDate,
    setEndDate,
    setType,
    setSearchValue,
  };
};

export default useAuditLogs;
