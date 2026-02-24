"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DefaultFormActionResult, defaultFormActionResult } from "@/types/Form";
import { useActionState } from "react";
import {
  FormValues,
  UpdateBusiness,
  UpdateFormKey,
} from "../types/BusinessTypes";
import updateBranch from "../actions/UpdateBusinessProfession";
import { useRouter } from "next/navigation";

const useUpdateBusinessProfession = (
  onSuccess?: () => void,
  initialData?: UpdateBusiness | null
) => {
  const router = useRouter();

  const [result, action, isPending] = useActionState<
    DefaultFormActionResult,
    FormData
  >(async (prev, formData) => {
    const res = await updateBranch(prev, formData);
    if (res.success) {
      onSuccess?.();
      toast.success(res.message || "Business Profession updated successfully!");
    } else {
      toast.error(res.message || "Failed to update branch.");
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

  const [touched, setTouched] = useState<Record<UpdateFormKey, boolean>>({
    label_bn: false,
    label_en: false,
    type: false,
    occupation_nature: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormValues((prev) => {
        const unchanged =
          prev.label_bn === initialData.label_bn &&
          prev.label_en === initialData.label_en &&
          prev.type === initialData.type &&
          prev.occupation_nature === initialData.occupation_nature;

        if (unchanged) return prev;

        return {
          label_bn: initialData.label_bn || "",
          label_en: initialData.label_en || "",
          type: initialData.type || "",
          occupation_nature: initialData.occupation_nature || "",
        };
      });

      setTouched({
        label_bn: false,
        label_en: false,
        type: false,
        occupation_nature: false,
      });
    }
  }, [initialData]);

  const update = (key: UpdateFormKey, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const onBlur = (key: UpdateFormKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const shouldShowError = (key: UpdateFormKey) =>
    touched[key] && formValues[key].trim() === "";

  const canSubmit =
    !!formValues.label_bn &&
    !!formValues.label_en &&
    !!formValues.type &&
    !!formValues.occupation_nature;

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

  const form = {
    values: formValues,
    update,
    onBlur,
    shouldShowError,
    canSubmit,
    result,
    action,
    resetForm,
  };

  return { form, isPending };
};

export default useUpdateBusinessProfession;
