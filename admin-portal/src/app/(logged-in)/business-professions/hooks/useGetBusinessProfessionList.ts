/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { BusinessProfessionList } from "../types/BusinessTypes";
import getBusinessProfessionList from "../actions/GetBusinessProfessionList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useGetBusinessProfessionList = (page = 1) => {
  const [data, setData] = useState<BusinessProfessionList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();

  const fetchBusinessProfessions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBusinessProfessionList(page, searchTerm, type);
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
  }, [page, searchTerm, type]);

  useEffect(() => {
    fetchBusinessProfessions();
  }, [fetchBusinessProfessions]);

  type Option = {
    key: string;
    label: string;
  };

  const typeOptions: Option[] = [
    { key: "", label: "Select Type" },
    { key: "business", label: "Business" },
    { key: "profession", label: "Profession" },
  ];

  return {
    businessProfessions: data,
    loading,
    error,
    fetchBusinessProfessions,
    searchTerm,
    setSearchTerm,
    type,
    setType,
    typeOptions,
  };
};

export default useGetBusinessProfessionList;
