/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { PercentageConfig } from "../types/Types";
import getPercentageList from "../actions/GetPercentageList";

const usePercentageList = () => {
  const [data, setData] = useState<PercentageConfig[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const percentageConfigs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPercentageList();
      setData(response as PercentageConfig[]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    percentageConfigs();
  }, [percentageConfigs]);

  return {
    percentageConfigs: data,
    loading,
    error,
  };
};

export default usePercentageList;
