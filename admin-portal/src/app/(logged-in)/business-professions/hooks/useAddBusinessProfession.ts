"use client";

import { useActionState, useState } from "react";
import { defaultFormActionResult } from "@/types/Form";
import { toast } from "sonner";
import { AddBusinessResult, FormKey, FormValues } from "../types/BusinessTypes";
import addBusinessProfession from "../actions/AddBusinessProfession";
import { useRouter } from "next/navigation";

const useAddBusinessProfession = (onSuccess?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [result, action, isPending] = useActionState<
    AddBusinessResult,
    FormData
  >(async (prev, formData) => {
    const res = await addBusinessProfession(prev, formData);

    if (res.success) {
      toast.success(res.message || "Business Profession added successfully!");
      onSuccess?.();
    } else {
      toast.error(res.message || "Failed to add branch.");
      if (res.code === 401) {
        router.push("/auth/login");
      }
    }

    return res;
  }, defaultFormActionResult);

  const [formValues, setFormValues] = useState<FormValues>({
    label_bn: "",
    label_en: "",
    type: "",
    occupation_nature: "",
  });

  const [touched, setTouched] = useState<Record<FormKey, boolean>>({
    label_bn: false,
    label_en: false,
    type: false,
    occupation_nature: false,
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

  const canSubmit = Object.values(formValues).every((val) => val.trim() !== "");

  const resetForm = () => {
    setFormValues({
      label_bn: "",
      label_en: "",
      type: "",
      occupation_nature: "",
    });
    setTouched({
      label_bn: false,
      label_en: false,
      type: false,
      occupation_nature: false,
    });
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormValues({
      label_bn: "",
      label_en: "",
      type: "",
      occupation_nature: "",
    });
    setTouched({
      label_bn: false,
      label_en: false,
      type: false,
      occupation_nature: false,
    });
  };

  const form = {
    values: formValues,
    update,
    onBlur,
    shouldShowError: (key: FormKey) =>
      touched[key] && formValues[key].trim() === "",
    canSubmit,
    result,
    action,
    resetForm,
  };
  return { form, isModalOpen, openModal, closeModal, isPending };
};
export default useAddBusinessProfession;
