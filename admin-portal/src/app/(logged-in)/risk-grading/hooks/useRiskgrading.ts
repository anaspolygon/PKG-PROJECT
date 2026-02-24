/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getRiskgrading from "../actions/getRiskgrading";
import { RiskgradingResponse } from "../types/RiskgradingTypes";

const useRiskgraing = () => {
  const [data, setData] = useState<RiskgradingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchRiskgrading = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRiskgrading();
      if ("code" in response && response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response as RiskgradingResponse);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchRiskgrading();
  }, [fetchRiskgrading]);

  return {
    data,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchRiskgrading,
  };
};

export default useRiskgraing;
