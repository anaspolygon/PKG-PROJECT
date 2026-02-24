"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DefaultFormActionResult, defaultFormActionResult } from "@/types/Form";
import { useActionState } from "react";
import {
  FormValues,
  UpdateBranchData,
  UpdateFormKey,
} from "../types/BranchTypes";
import updateBranch from "../actions/UpdateBranch";
import { useRouter } from "next/navigation";

const useUpdateBranch = (
  onSuccess?: () => void,
  initialData?: UpdateBranchData | null
) => {
  const router = useRouter()
  const [result, action, isPending] = useActionState<
    DefaultFormActionResult,
    FormData
  >(async (prev, formData) => {
    const res = await updateBranch(prev, formData);
    if (res.success) {
      onSuccess?.();
      toast.success(res.message || "Branch updated successfully!");
    } else {
      toast.error(res.message || "Failed to update branch.");
      if(res.code === 401){
        router.push("/auth/login")
      }
    }
    return res;
  }, defaultFormActionResult);

  const [formValues, setFormValues] = useState<FormValues>({
    label_bn: "",
    label_en: "",
    code: "",
    is_islamic: "",
    is_onboarding: "",
    // division: "",
    district: "",
  });

  const [touched, setTouched] = useState<Record<UpdateFormKey, boolean>>({
    label_bn: false,
    label_en: false,
    code: false,
    is_islamic: false,
    is_onboarding: false,
    // division: false,
    district: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormValues((prev) => {
        const unchanged =
          prev.label_bn === initialData.label_bn &&
          prev.label_en === initialData.label_en &&
          prev.is_islamic === initialData.is_islamic &&
          prev.district === initialData.district &&
          prev.code === initialData.code && 
          prev.is_onboarding === String(initialData.is_onboarding);

        if (unchanged) return prev;

        return {
          label_bn: initialData.label_bn || "",
          label_en: initialData.label_en || "",
          is_islamic: initialData.is_islamic || "",
          district: initialData.district || "",
          is_onboarding: initialData.is_onboarding ? "true" : "false",
          code: initialData.code || "",
        };
      });

      setTouched({
        label_bn: false,
        label_en: false,
        code: false,
        is_islamic: false,
        is_onboarding: false,
        district: false,
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
    !!formValues.label_bn && !!formValues.label_en && !!formValues.code;

  const resetForm = () => {
    setFormValues({
      label_bn: "",
      label_en: "",
      code: "",
      is_islamic: "",
      is_onboarding: "",
      district: "",
    });
    setTouched({
      label_bn: false,
      label_en: false,
      code: false,
      is_islamic: false,
      is_onboarding: false,
      district: false,
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

export default useUpdateBranch;
