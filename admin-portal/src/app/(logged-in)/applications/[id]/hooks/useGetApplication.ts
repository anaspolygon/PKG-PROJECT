/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import getApplication from "../actions/GetApplicationDetails";
import { ApplicationDetailsRoot } from "../types/ApplicationDetailsType";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useGetApplication = (id: string) => {
  const [data, setData] = useState<ApplicationDetailsRoot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchApplication = async () => {
      setLoading(true);
      try {
        const response = await getApplication(id);
        if (response.code === 401) {
          toast.error(response.message);
          router.push("/auth/login");
        } else {
          setData(response);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, router]);

  return { application: data, loading, error };
};

export default useGetApplication;
