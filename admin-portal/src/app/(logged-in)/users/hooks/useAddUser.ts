"use client";

import { useActionState, useState } from "react";
import { defaultFormActionResult } from "@/types/Form";
import { AddUserResult, FormKey, FormValues } from "../types/UserTypes";
import addUser from "../actions/AddUser";
import { toast } from "sonner";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import { useRouter } from "next/navigation";

const useAddUser = (onSuccess?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchPendingCount } = useGlobalState();
  const router = useRouter();

  const [result, action, isPending] = useActionState<AddUserResult, FormData>(
    async (prev, formData) => {
      const res = await addUser(prev, formData);

      if (res.success) {
        toast.success(res.message || "User added successfully!");
        fetchPendingCount();
        onSuccess?.();
      } else {
        toast.error(res.message || "Failed to add user.");
        if (res.code === 401) {
          router.push("/auth/login");
        }
      }
      return res;
    },
    defaultFormActionResult
  );

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    role: "",
    email: "",
    employee_id: "",
    branch_id: "",
    valid_till: "",
    mobile: "",
    department_id: "",
  });

  const [touched, setTouched] = useState<Record<FormKey, boolean>>({
    email: false,
    role: false,
    name: false,
    employee_id: false,
    branch_id: false,
    valid_till: false,
    mobile: false,
    department_id: false,
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
  // const validateEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     return false;
  //   }

  //   const requiredDomain = "primebank.com.bd";
  //   return email.includes(requiredDomain);
  // };

  const canSubmit =
    !!formValues.email &&
    !!formValues.name &&
    !!formValues.employee_id &&
    !!formValues.role &&
    !!formValues.mobile &&
    validateMobile(formValues.mobile) &&
    !!formValues.employee_id;

  const resetForm = () => {
    setFormValues({
      name: "",
      role: "",
      email: "",
      employee_id: "",
      branch_id: "",
      valid_till: "",
      mobile: "",
      department_id: "",
    });
    setTouched({
      name: false,
      role: false,
      email: false,
      employee_id: false,
      branch_id: false,
      valid_till: false,
      mobile: false,
      department_id: false,
    });
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormValues({
      name: "",
      role: "",
      email: "",
      employee_id: "",
      branch_id: "",
      valid_till: "",
      mobile: "",
      department_id: "",
    });
    setTouched({
      name: false,
      role: false,
      email: false,
      employee_id: false,
      branch_id: false,
      valid_till: false,
      mobile: false,
      department_id: false,
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
    hasMobileError: touched.mobile && !validateMobile(formValues.mobile),
    // hasEmailError:
    //   touched.email &&
    //   formValues.email.trim() !== "" &&
    //   !validateEmail(formValues.email),
        hasEmailError:
      touched.email &&
      formValues.email.trim() !== "" &&
      !formValues.email,
  };
  return { form, isModalOpen, openModal, closeModal, isPending };
};
export default useAddUser;
