/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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
      const res = await fetch(
        "https://city-api.dev-polygontech.xyz/api/admin/products-for-filter?",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "mangeD01axB3sBDM3HwRmh2MmO4hQ5aXyXpCLOwp8QRYKymrgyCaaFwJciTgWqzz",
          },
        },
      );
      const data = await res.json();
      setData(data as ProductList);
    } catch (err) {
      console.log("Error fetching product data:", (err as any)?.message || err);
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
