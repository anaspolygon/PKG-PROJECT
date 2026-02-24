"use client";

import { useActionState, useState } from "react";
import { defaultFormActionResult } from "@/types/Form";
import { toast } from "sonner";
import {
  AddDepartmentResult,
  FormKey,
  FormValues,
} from "../types/DepartmentTypes";
import addDepartment from "../actions/AddDepartment";
import { useRouter } from "next/navigation";

const useAddDepartment = (onSuccess?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [result, action, isPending] = useActionState<
    AddDepartmentResult,
    FormData
  >(async (prev, formData) => {
    const res = await addDepartment(prev, formData);

    if (res.success) {
      toast.success(res.message || "Department added successfully!");
      onSuccess?.();
    } else {
      toast.error(res.message || "Failed to add department.");
      if (res.code === 401) {
        router.push("/auth/login");
      }
    }

    return res;
  }, defaultFormActionResult);

  const [formValues, setFormValues] = useState<FormValues>({
    label_bn: "",
    label_en: "",
  });

  const [touched, setTouched] = useState<Record<FormKey, boolean>>({
    label_bn: false,
    label_en: false,
  });

  const update = (key: FormKey, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onBlur = (key: FormKey) => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const canSubmit = formValues.label_en !== "";

  const resetForm = () => {
    setFormValues({
      label_bn: "",
      label_en: "",
    });
    setTouched({
      label_bn: false,
      label_en: false,
    });
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
    shouldShowError: (key: FormKey) =>
      touched[key] && (formValues[key] as string).trim() === "",
    canSubmit,
    result,
    action,
    resetForm,
  };

  return { form, isModalOpen, openModal, closeModal, isPending };
};

export default useAddDepartment;
