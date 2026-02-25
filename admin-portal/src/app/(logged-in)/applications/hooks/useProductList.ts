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
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY2l0eS1hcGkuZGV2LXBvbHlnb250ZWNoLnh5ei9hcGkvYWRtaW4vbG9naW4iLCJpYXQiOjE3NzIwMDU0NDgsImV4cCI6MTc3MjAwNzI0OCwibmJmIjoxNzcyMDA1NDQ4LCJqdGkiOiJxczBWaWlvOVZIMGx0SE1mIiwic3ViIjoiMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJuYW1lIjoiQWwgQW5hcyIsImVtcGxveWVlX2lkIjoiRU1QLUFOQVMiLCJyb2xlIjpudWxsLCJwZXJtaXNzaW9ucyI6eyJoYXNfc3VwZXJfYWRtaW5fcGVybWlzc2lvbiI6dHJ1ZSwiY2FuX3JlYWRfcm9sZSI6dHJ1ZSwiY2FuX2NyZWF0ZV9yb2xlIjp0cnVlLCJjYW5fdXBkYXRlX3JvbGUiOnRydWUsImNhbl9yZWFkX3VzZXIiOnRydWUsImNhbl9jcmVhdGVfdXNlciI6dHJ1ZSwiY2FuX3VwZGF0ZV91c2VyIjp0cnVlLCJjYW5fcmVhZF9tYWtlcl9jaGVja2VyIjp0cnVlLCJjYW5fYXBwcm92ZV9tYWtlcl9jaGVja2VyIjp0cnVlLCJjYW5fcmVhZF9icmFuY2giOnRydWUsImNhbl9jcmVhdGVfYnJhbmNoIjp0cnVlLCJjYW5fdXBkYXRlX2JyYW5jaCI6dHJ1ZSwiY2FuX2RlbGV0ZV9icmFuY2giOnRydWUsImNhbl9kb3dubG9hZF9icmFuY2hfZXhjZWwiOnRydWUsImNhbl91cGxvYWRfYnJhbmNoX2V4Y2VsIjp0cnVlLCJjYW5fcmVhZF9hcGkiOnRydWUsImNhbl9jcmVhdGVfYXBpIjp0cnVlLCJjYW5fdXBkYXRlX2FwaSI6dHJ1ZSwiY2FuX3JlYWRfYXBrIjp0cnVlLCJjYW5fY3JlYXRlX2FwayI6dHJ1ZSwiY2FuX3VwZGF0ZV9hcGsiOnRydWUsImNhbl9kZWxldGVfYXBrIjp0cnVlLCJjYW5fcGVyY2VudGFnZV9yZWFkIjp0cnVlLCJjYW5fcGVyY2VudGFnZV91cGRhdGUiOnRydWUsImNhbl9yZWFkX2F1ZGl0X2xvZ3MiOnRydWUsImNhbl9yZWFkX3Jpc2tfY29uZmlnIjp0cnVlLCJjYW5fdXBkYXRlX3Jpc2tfY29uZmlnIjp0cnVlLCJjYW5fcmVhZF9zaW1wbGlmaWVkX3Byb2Zlc3Npb24iOnRydWUsImNhbl9jcmVhdGVfc2ltcGxpZmllZF9wcm9mZXNzaW9uIjp0cnVlLCJjYW5fdXBkYXRlX3NpbXBsaWZpZWRfcHJvZmVzc2lvbiI6dHJ1ZSwiY2FuX3JlYWRfcmVndWxhcl9wcm9mZXNzaW9uIjp0cnVlLCJjYW5fY3JlYXRlX3JlZ3VsYXJfcHJvZmVzc2lvbiI6dHJ1ZSwiY2FuX3VwZGF0ZV9yZWd1bGFyX3Byb2Zlc3Npb24iOnRydWUsImNhbl9yZWFkX2J1c2luZXNzIjp0cnVlLCJjYW5fY3JlYXRlX2J1c2luZXNzIjp0cnVlLCJjYW5fdXBkYXRlX2J1c2luZXNzIjp0cnVlLCJjYW5fcmVhZF9hcHBsaWNhdGlvbiI6dHJ1ZSwiY2FuX2Rvd25sb2FkX2FwcGxpY2F0aW9uc19saXN0Ijp0cnVlLCJjYW5fcmVhZF9hcHBfY29uZmlndXJhdGlvbiI6dHJ1ZSwiY2FuX3VwZGF0ZV9hcHBfY29uZmlndXJhdGlvbiI6dHJ1ZSwiY2FuX3JlYWRfZmFpbGVkX2FwaV9saXN0Ijp0cnVlLCJjYW5fcmV0cnlfZmFpbGVkX2FwaV9saXN0Ijp0cnVlfSwidHlwZSI6ImJyYW5jaF91c2VyIn0.gSEOQOwgMlGfwcPQlBU3bAhLcStubSfk_QYJ06AfMTE",
          },
        },
      );
      const data = await res.json();
      setData(data as ProductList);
    } catch (err) {
      console.log(
        "Error fetching product data:",
        (err as any)?.message || err,
      );
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
