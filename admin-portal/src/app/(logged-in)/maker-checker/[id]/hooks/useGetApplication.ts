/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState} from "react";
import getApplication from "../actions/GetApplicationDetails";
import { ApplicationDetailsRoot } from "../types/ApplicationDetailsType";

const useGetApplication = (id: string) => {
  const [data, setData] = useState<ApplicationDetailsRoot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

    useEffect(() => {
      const fetchApplication = async () => {
        setLoading(true);
        try {
          const response = await getApplication(id);
          setData(response);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchApplication();
    }, [id]);

  return { application:data, loading, error };
};

export default useGetApplication;
