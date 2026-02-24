/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useCallback } from "react";
import { UserList } from "../types/UserTypes";
import getUserListAction from "../actions/GetUserList";

const useGetUserList = (page = 1) => {
  const [data, setData] = useState<UserList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserListAction(page);
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users: data, loading, error, fetchUsers };
};

export default useGetUserList;
