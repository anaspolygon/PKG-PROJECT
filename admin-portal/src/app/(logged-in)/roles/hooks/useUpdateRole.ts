"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DefaultFormActionResult, defaultFormActionResult } from "@/types/Form";
import { useActionState } from "react";
import { Role, RoleUpdateFormValues, UpdateFormKey } from "../types/RoleTypes";
import updateRole from "../actions/UpdateRole";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import { useRouter } from "next/navigation";

const useUpdateRole = (onSuccess?: () => void, initialData?: Role | null) => {
  const { fetchPendingCount } = useGlobalState();
  const router = useRouter();
  const [result, action, isPending] = useActionState<
    DefaultFormActionResult,
    FormData
  >(async (prev, formData) => {
    const res = await updateRole(prev, formData);
    if (res.success) {
      onSuccess?.();
      fetchPendingCount();
      toast.success(res.message || "Role updated successfully!");
    } else {
      toast.error(res.message || "Failed to update role.");
      if (res.code === 401) {
        router.push("/auth/login");
      }
    }
    return res;
  }, defaultFormActionResult);

  const [formValues, setFormValues] = useState<RoleUpdateFormValues>({
    name: "",
    permissions: [],
  });

  const [touched, setTouched] = useState<Record<UpdateFormKey, boolean>>({
    name: false,
    permissions: false,
  });

  useEffect(() => {
    if (initialData) {
      const permissionIds =
        initialData.permissions?.map((permission) => permission.id) || [];

      setFormValues((prev) => {
        const unchanged =
          prev.name === initialData.name &&
          JSON.stringify(prev.permissions.sort()) ===
            JSON.stringify(permissionIds.sort());

        if (unchanged) return prev;

        return {
          name: initialData.name || "",
          permissions: permissionIds,
        };
      });

      setTouched({
        name: false,
        permissions: false,
      });
    }
  }, [initialData]);

  const update = (key: UpdateFormKey, value: string | number[]) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const onBlur = (key: UpdateFormKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const canSubmit =
    formValues.name.trim() !== "" && formValues.permissions.length > 0;

  const resetForm = () => {
    setFormValues({
      name: "",
      permissions: [],
    });
    setTouched({
      name: false,
      permissions: false,
    });
  };

  const form = {
    values: formValues,
    update,
    onBlur,
    shouldShowError: (key: UpdateFormKey) => {
      const value = formValues[key];
      if (key === "name")
        return touched[key] && (value as string).trim() === "";
      if (key === "permissions")
        return touched[key] && (value as number[]).length === 0;
      return false;
    },
    canSubmit,
    result,
    action,
    resetForm,
  };

  return { form, isPending };
};

export default useUpdateRole;
