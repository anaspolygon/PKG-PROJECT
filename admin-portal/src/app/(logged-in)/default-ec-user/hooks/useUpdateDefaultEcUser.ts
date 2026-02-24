"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DefaultFormActionResult, defaultFormActionResult } from "@/types/Form";
import { useActionState } from "react";
import updateDefaultEcUser from "../actions/UpdateDefaultEcUser";
import { UpdateForm, UpdateFormKey } from "../types/DefaultEcUserTypes";
import { useRouter } from "next/navigation";

const useUpdateDefaultEcUser = (onSuccess?: () => void) => {
  const router = useRouter();

  const [result, action, isPending] = useActionState<
    DefaultFormActionResult,
    FormData
  >(async (prev, formData) => {
    const res = await updateDefaultEcUser(prev, formData);
    if (res.success) {
      onSuccess?.();
      toast.success(res.message || "Default Ec User updated successfully!");
    } else {
      toast.error(res.message || "Failed to update user.");
      if (res.code === 401) {
        router.push("/auth/login");
      }
    }
    return res;
  }, defaultFormActionResult);

  const [formValues, setFormValues] = useState<UpdateForm>({
    username: "",
    password: "",
  });

  const [touched, setTouched] = useState<Record<UpdateFormKey, boolean>>({
    username: false,
    password: false,
  });

  const update = (key: UpdateFormKey, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const onBlur = (key: UpdateFormKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const shouldShowError = (key: UpdateFormKey) =>
    touched[key] && formValues[key]?.trim() === "";

  // const canSubmit = !!formValues.username && !!formValues.password;
  const canSubmit = !!formValues.username;

  const resetForm = () => {
    setFormValues({
      username: "",
      // password: '',
    });
    setTouched({
      username: false,
      password: false,
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

export default useUpdateDefaultEcUser;
