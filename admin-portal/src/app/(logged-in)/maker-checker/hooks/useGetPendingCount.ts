"use client";
import { useEffect, useState } from "react";
import getPendingCount from "../actions/getPendingCount";

export const useGetPendingCount = () => {
  const [count, setCount] = useState<number>();
  const getCount = async () => {
    const res = await getPendingCount();
    setCount(res);
  };
  useEffect(() => {
    getCount();
  }, []);
  return {
    pendingCount: count ?? 0,
  };
};
