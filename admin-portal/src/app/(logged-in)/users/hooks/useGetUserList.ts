/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { UserList } from "../types/UserTypes";
import getUserListAction from "../actions/GetUserList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Option = {
  key: string;
  label: string;
};

const useGetUserList = (page = 1) => {
  const [data, setData] = useState<UserList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [type, setType] = useState("");
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    const isSearchValid = searchValue || !searchValue;

    if (!isSearchValid) return;
    setLoading(true);
    try {
      const response = await getUserListAction(searchValue, page);
      if (response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else {
        if (response.data) {
          setData(response.data as UserList);
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchValue, router]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchUsers();
    }, 400);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [fetchUsers, searchValue]);

  const typeOptions: Option[] = [
    { key: "", label: "Select Type" },
    { key: "Email", label: "Email" },
    { key: "Name", label: "Name" },
  ];

  return {
    users: data,
    loading,
    error,
    fetchUsers,
    searchValue,
    setSearchValue,
    typeOptions,
    type,
    setType,
    searchTerm,
    setSearchTerm,
  };
};

export default useGetUserList;
