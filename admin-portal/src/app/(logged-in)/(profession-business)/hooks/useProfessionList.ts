/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getProfessionList from "../actions/getProfessionList";
import { ProfessionResponse } from "../types/ProfessionTypes";

const useProfessionList = (professionListURL: string, page = 1) => {
  const [data, setData] = useState<ProfessionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchProfessions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProfessionList(
        professionListURL,
        page,
        searchTerm,
      );

      if ("code" in response && response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response as ProfessionResponse);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, professionListURL, searchTerm, router]);

  useEffect(() => {
    fetchProfessions();
  }, [fetchProfessions, professionListURL]);

  return {
    professions: data,
    professionsLoading:loading,
    error,
    fetchProfessions,
    searchTerm,
    setSearchTerm,
  };
};

export default useProfessionList;
