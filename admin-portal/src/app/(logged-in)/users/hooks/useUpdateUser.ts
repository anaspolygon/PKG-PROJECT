"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import updateUser from "../actions/UpdateUser";
import { UpdateForm, UpdateFormKey, UpdateUserData } from "../types/UserTypes";
import { DefaultFormActionResult, defaultFormActionResult } from "@/types/Form";
import { useActionState } from "react";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import { useRouter } from "next/navigation";

const useUpdateUser = (
  onSuccess?: () => void,
  initialData?: UpdateUserData | null
) => {
  const { fetchPendingCount } = useGlobalState();
  const router = useRouter();
  const [result, action, isPending] = useActionState<
    DefaultFormActionResult,
    FormData
  >(async (prev, formData) => {
    const res = await updateUser(prev, formData);
    if (res?.success) {
      onSuccess?.();
      fetchPendingCount();
      toast.success(res.message || "User updated successfully!");
    } else {
      toast.error(res.message || "Failed to update user.");
      if (res.code === 401) {
        router.push("/auth/login");
      }
    }
    return res;
  }, defaultFormActionResult);


  const [formValues, setFormValues] = useState<UpdateForm>({
    name: "",
    email: "",
    role: "",
    branch_id: "",
    employee_id: "",
    valid_till: "",
    mobile: "",
    department_id: "",
    status: "",
    comments: "",
  });

  const [touched, setTouched] = useState<Record<UpdateFormKey, boolean>>({
    name: false,
    email: false,
    role: false,
    branch_id: false,
    employee_id: false,
    valid_till: false,
    mobile: false,
    department_id: false,
    status: false,
    comments: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormValues((prev) => {
        const unchanged =
          prev.name === initialData.name &&
          prev.email === initialData.email &&
          String(prev.branch_id) === String(initialData.branch_id) &&
          prev.employee_id === initialData.employee_id &&
          prev.role === initialData.role &&
          String(prev.valid_till) === String(initialData.valid_till) &&
          prev.mobile === initialData.mobile &&
          String(prev.department_id) === String(initialData.department_id) &&
          prev.status === initialData.status &&
          prev.comments === initialData.comments;

        if (unchanged) return prev;

        return {
          name: initialData.name || "",
          email: initialData.email || "",
          role: initialData.role || "",
          employee_id: initialData.employee_id || "",
          branch_id: initialData.branch_id ? String(initialData.branch_id) : "",
          valid_till: initialData.valid_till ?? "",
          mobile: initialData.mobile || "",
          department_id: initialData.department_id || "",
          status: initialData.status || "",
          comments: initialData.comments || "",
        };
      });

      setTouched({
        name: false,
        email: false,
        role: false,
        branch_id: false,
        employee_id: false,
        valid_till: false,
        mobile: false,
        department_id: false,
        status: false,
        comments: false,
      });
    }
  }, [initialData]);

  const update = (key: UpdateFormKey, value: string | number | null) => {
    setFormValues((prev) => ({ ...prev, [key]: value ?? "" }));
  };

  const onBlur = (key: UpdateFormKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const shouldShowError = (key: UpdateFormKey) =>
    touched[key] && String(formValues[key] ?? "").trim() === "";

  const validateMobile = (mobile: string) => {
    const localRegex = /^01[3-9]\d{8}$/;

    const intlRegexWithPlus = /^\+8801[3-9]\d{8}$/;

    const intlRegexWithoutPlus = /^8801[3-9]\d{8}$/;

    return (
      localRegex.test(mobile) ||
      intlRegexWithPlus.test(mobile) ||
      intlRegexWithoutPlus.test(mobile)
    );
  };

  const canSubmit =
    String(formValues.name ?? "").trim() !== "" &&
    String(formValues.email ?? "").trim() !== "" &&
    String(formValues.role ?? "").trim() !== "" &&
    String(formValues.mobile ?? "").trim() !== "" &&
    validateMobile(formValues.mobile) &&
    String(formValues.comments ?? "").trim() !== "";

  const resetForm = () => {
    setFormValues({
      name: "",
      email: "",
      role: "",
      branch_id: "",
      employee_id: "",
      valid_till: "",
      mobile: "",
      department_id: "",
      status: "",
      comments: "",
    });
    setTouched({
      name: false,
      email: false,
      role: false,
      branch_id: false,
      employee_id: false,
      valid_till: false,
      mobile: false,
      department_id: false,
      status: false,
      comments: false,
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
    hasMobileError: touched.mobile && !validateMobile(formValues.mobile),
  };

  return { form, isPending };
};

export default useUpdateUser;
