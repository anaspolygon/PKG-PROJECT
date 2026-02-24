'use client';

import { useEffect, useState } from "react";
import generateToken from "../actions/GenerateToken";
import { Token } from "../types/Types";

const useGetToken = () => {
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      try {
        const response = await generateToken();
        setToken(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { token, loading, error };
};

export default useGetToken;
