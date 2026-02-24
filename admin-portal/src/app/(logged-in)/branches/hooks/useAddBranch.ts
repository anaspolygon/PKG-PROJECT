"use client";

import { useActionState, useState } from "react";
import { defaultFormActionResult } from "@/types/Form";
import { toast } from "sonner";
import { AddBranchResult, FormKey, FormValues } from "../types/BranchTypes";
import addBranch from "../actions/AddBranch";

const useAddBranch = (onSuccess?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [result, action, isPending] = useActionState<AddBranchResult, FormData>(
    async (prev, formData) => {
      const res = await addBranch(prev, formData);

      if (res.success) {
        toast.success(res.message || "Branch added successfully!");
        onSuccess?.();
      } else {
        toast.error(res.message || "Failed to add branch.");
      }

      return res;
    },
    defaultFormActionResult
  );

  const [formValues, setFormValues] = useState<FormValues>({
    label_bn: "",
    label_en: "",
    code: "",
    is_islamic: "",
    // division: "",
    is_onboarding: "true",
    district: "",
  });

  const [touched, setTouched] = useState<Record<FormKey, boolean>>({
    label_bn: false,
    label_en: false,
    code: false,
    is_islamic: false,
    // division: false,
    is_onboarding: false,
    district: false,
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

  const canSubmit =
    formValues.label_en !== "" &&
    formValues.label_bn !== "" &&
    formValues.code !== "" &&
    formValues.is_islamic !== "";

  const resetForm = () => {
    setFormValues({
      label_bn: "",
      label_en: "",
      code: "",
      is_islamic: "",
      // division: "",
      is_onboarding: "true",
      district: "",
    });
    setTouched({
      label_bn: false,
      label_en: false,
      code: false,
      is_islamic: false,
      // division: false,
      is_onboarding: false,
      district: false,
    });
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormValues({
      label_bn: "",
      label_en: "",
      code: "",
      is_islamic: "",
      // division: "",
      is_onboarding: "true",
      district: "",
    });
    setTouched({
      label_bn: false,
      label_en: false,
      code: false,
      is_islamic: false,
      // division: false,
      is_onboarding: false,
      district: false,
    });
  };

  const form = {
    values: formValues,
    update,
    onBlur,
    shouldShowError: (key: FormKey) =>
      touched[key] && (formValues[key] as string).trim() === "",
    canSubmit,
    result,
    // handleSubmit,
    action,
    resetForm,
  };
  return { form, isModalOpen, openModal, closeModal, isPending };
};
export default useAddBranch;
