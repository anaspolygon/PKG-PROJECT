"use client";

import { useState } from "react";
import updatePercentageConfig from "../actions/UpdatePercentage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/components/layouts/GlobalContext";

const useUpdateConfig = () => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [editing, setEditing] = useState<Record<string, number>>({});
  const router = useRouter();
  const {fetchPendingCount} = useGlobalState();

  const handleChange = (key: string, value: number) => {
    if (value > 100) {
      toast.error("Percentage must be between 0 to 100.");
      value = 100;
    }

    setEditing((prev) => ({ ...prev, [key]: Math.abs(value) }));
  };

  const handleUpdate = async (key: string, value: number, id: number) => {
    const updateConfig = { key, value: value.toString() };

    setLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const response = await updatePercentageConfig(updateConfig, id);
      if (response.code === 401) {
        toast.error(response.message);
        router.push("/auth/login");
      } else if (response.code === 500) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        fetchPendingCount();
      }
    } catch (err) {
      toast.error(err as string);
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return {
    handleChange,
    handleUpdate,
    loading,
    editing,
  };
};

export default useUpdateConfig;
