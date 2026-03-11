/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { ProductList } from "../types/ProductTypes";

const useProductList = (page = 1, baseUrl: string, apiKey: string) => {
  const [data, setData] = useState<ProductList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/api/admin/products-for-filter`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      });
      if (res.status === 401) {
        window.location.reload();
        return;
      }
      const data = await res.json();
      setData(data as ProductList);
    } catch (err) {
      console.log("Error fetching product data:", (err as any)?.message || err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, baseUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products: data?.data,
    loading,
    error,
    fetchProducts,
    searchTerm,
    setSearchTerm,
  };
};

export default useProductList;
