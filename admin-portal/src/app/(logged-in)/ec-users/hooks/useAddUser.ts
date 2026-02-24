"use client";

import { useActionState, useState } from "react";
import { defaultFormActionResult } from "@/types/Form";
import { AddUserResult, FormKey, FormValues } from "../types/UserTypes";
import addUser from "../actions/AddUser";
import { toast } from "sonner";

const useAddUser = (onSuccess?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [result, action, isPending] = useActionState<AddUserResult, FormData>(
    async (prev, formData) => {
      const res = await addUser(prev, formData);

      if (res.success) {
        toast.success(res.message || "User added successfully!");
        onSuccess?.();
      } else {
        toast.error(res.message || "Failed to add user.");
      }

      return res;
    },
    defaultFormActionResult
  );

  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    branch_id: "",
    password: "",
  });

  const [touched, setTouched] = useState<Record<FormKey, boolean>>({
    username: false,
    branch_id: false,
    password: false,
  });

  const update = (key: FormKey, value: string | number) => {
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

  const getPasswordStrengthError = (password: string) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    // if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
    // if (!/[a-z]/.test(password)) return "Include at least one lowercase letter";
    // if (!/[0-9]/.test(password)) return "Include at least one number";
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Include at least one special character";
    return null;
  };

  const canSubmit = Object.values(formValues).every(
    (val) => `${val}`.trim() !== ""
  );


  const resetForm = () => {
    setFormValues({ username: "", branch_id: "", password: "" });
    setTouched({ username: false, branch_id: false, password: false });
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormValues({
      username: "",
      branch_id: "",
      password: "",
    });
    setTouched({
      username: false,
      branch_id: false,
      password: false,
    });
  };

  const form = {
    values: formValues,
    update,
    onBlur,
    shouldShowError: (key: FormKey) =>
      touched[key] && `${formValues[key]}`.trim() === "",
    getPasswordStrengthError,
    canSubmit,
    result,
    // handleSubmit,
    action,
    resetForm,
  };
  return { form, isModalOpen, openModal, closeModal, isPending };
};
export default useAddUser;
