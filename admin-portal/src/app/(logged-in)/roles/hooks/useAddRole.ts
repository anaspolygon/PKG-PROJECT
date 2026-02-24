"use client";

import { AddFormKey, RoleAddFormValues } from "./../types/RoleTypes";
import { useActionState, useState } from "react";
import { defaultFormActionResult } from "@/types/Form";
import { toast } from "sonner";
import { AddRoleResult } from "../types/RoleTypes";
import addRole from "../actions/AddRole";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import { useRouter } from "next/navigation";

const useAddRole = (onSuccess?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { fetchPendingCount } = useGlobalState();

  const [result, action, isPending] = useActionState<AddRoleResult, FormData>(
    async (prev, formData) => {
      const res = await addRole(prev, formData);

      if (res.success) {
        toast.success(res.message || "Role added successfully!");
        onSuccess?.();
        fetchPendingCount();
      } else {
        toast.error(res.message || "Failed to add role.");
        if (res.code === 401) {
          router.push("/auth/login");
        }
      }

      return res;
    },
    defaultFormActionResult
  );

  const [formValues, setFormValues] = useState<RoleAddFormValues>({
    name: "",
    permissions: [],
  });

  const [touched, setTouched] = useState<Record<AddFormKey, boolean>>({
    name: false,
    permissions: false,
  });

  const update = <K extends AddFormKey>(
    key: K,
    value: RoleAddFormValues[K]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onBlur = (key: AddFormKey) => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const canSubmit =
    formValues.name.trim() !== "" && formValues.permissions.length > 0;

  const resetForm = () => {
    setFormValues({ name: "", permissions: [] });
    setTouched({ name: false, permissions: false });
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const form = {
    values: formValues,
    update,
    onBlur,
    shouldShowError: (key: AddFormKey) => {
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

  return { form, isModalOpen, openModal, closeModal, isPending };
};

export default useAddRole;
