"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DefaultFormActionResult, defaultFormActionResult } from "@/types/Form";
import { useActionState } from "react";
import {
  FormValues,
  UpdateDepartmentData,
  UpdateFormKey,
} from "../types/DepartmentTypes";
import updateDepartment from "../actions/UpdateBranch";
import { useRouter } from "next/navigation";

const useUpdateDepartment = (
  onSuccess?: () => void,
  initialData?: UpdateDepartmentData | null
) => {
  const router = useRouter();
  const [result, action, isPending] = useActionState<
    DefaultFormActionResult,
    FormData
  >(async (prev, formData) => {
    const res = await updateDepartment(prev, formData);
    if (res.success) {
      onSuccess?.();
      toast.success(res.message || "Department updated successfully!");
    } else {
      toast.error(res.message || "Failed to update department.");
      router.push("/auth/login");
    }
    return res;
  }, defaultFormActionResult);

  const [formValues, setFormValues] = useState<FormValues>({
    label_bn: "",
    label_en: "",
  });

  const [touched, setTouched] = useState<Record<UpdateFormKey, boolean>>({
    label_bn: false,
    label_en: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormValues((prev) => {
        const unchanged =
          prev.label_bn === initialData.label_bn &&
          prev.label_en === initialData.label_en;

        if (unchanged) return prev;

        return {
          label_bn: initialData.label_bn || "",
          label_en: initialData.label_en || "",
        };
      });

      setTouched({
        label_bn: false,
        label_en: false,
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

  const canSubmit = !!formValues.label_en;

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

export default useUpdateDepartment;
