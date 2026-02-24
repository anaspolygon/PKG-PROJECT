/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import getProductList from "../actions/GetProductList";
import { ProductList } from "../types/ProductTypes";

const useProductList = (page = 1) => {
  const [data, setData] = useState<ProductList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProductList(page, searchTerm);

      if ("code" in response && response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        setData(response as ProductList);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, router]);

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
