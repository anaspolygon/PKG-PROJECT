/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import getAllDepartment from "../actions/GetAllDepartment";
import { Department } from "../types/DepartmentTypes";

const useGetAllDepartment = () => {
  const [data, setData] = useState<Department[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllDepartment();
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return {
    departments: data,
    loading,
    error,
    fetchBranches,
    searchTerm,
    setSearchTerm,
  };
};

export default useGetAllDepartment;
