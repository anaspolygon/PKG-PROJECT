/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getApiListAction from "../actions/GetApiList";
import { APIResponse } from "../types/ApiTypes";

const useApiList = (page = 1) => {
  const [data, setData] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchApis = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getApiListAction(page, searchTerm);

      if ("code" in response && response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response as APIResponse);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, router]);

  useEffect(() => {
    fetchApis();
  }, [fetchApis]);

  return {
    apis: data,
    apisLoading: loading,
    error,
    fetchApis,
    searchTerm,
    setSearchTerm,
  };
};

export default useApiList;
