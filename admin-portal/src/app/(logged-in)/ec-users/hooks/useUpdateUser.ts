'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import updateUser from '../actions/UpdateUser';
import { UpdateForm, UpdateFormKey, UpdateUserData } from '../types/UserTypes';
import { DefaultFormActionResult, defaultFormActionResult } from '@/types/Form';
import { useActionState } from 'react';


const useUpdateUser = (onSuccess?: () => void, initialData?: UpdateUserData | null) => {

  const [result, action, isPending] = useActionState<DefaultFormActionResult, FormData>(
    async (prev, formData) => {
      const res = await updateUser(prev, formData);
      if (res.success) {
          onSuccess?.();
          toast.success(res.message || 'User updated successfully!');
      } else {
        toast.error(res.message || 'Failed to update user.');
      }
      return res;
    },
    defaultFormActionResult
  );

  const [formValues, setFormValues] = useState<UpdateForm>({
    username: '',
    branch_id: '',
  });

  const [touched, setTouched] = useState<Record<UpdateFormKey, boolean>>({
    username: false,
    branch_id: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormValues(prev => {
        const unchanged =
          prev.username === initialData.username &&
          prev.branch_id === initialData.branch_id 

        if (unchanged) return prev;

        return {
          username: initialData.username || '',
          branch_id: initialData.branch_id || '',
        };
      });

      setTouched({
        username: false,
        branch_id: false,
      });
    }
  }, [initialData]);

  const update = (key: UpdateFormKey, value: string | number) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  };

  const onBlur = (key: UpdateFormKey) => {
    setTouched(prev => ({ ...prev, [key]: true }));
  };

  const shouldShowError = (key: UpdateFormKey) =>
    touched[key] && `${formValues[key]}`?.trim() === '';

  const canSubmit = !!formValues.username && !!formValues.branch_id;

  const resetForm = () => {
    setFormValues({
      username: '',
      branch_id: '',
    });
    setTouched({
      username: false,
      branch_id: false,
    });
  };

  const form = {
    values: formValues,
    update,
    onBlur,
    shouldShowError,
    canSubmit,
    result,
    action: (formData: FormData) => {
      if (formValues.username) formData.append('name', formValues.username);
      if (formValues.branch_id) formData.append('email', formValues.branch_id);
      return action(formData);
    },
    resetForm,
  };

  return { form, isPending };
};

export default useUpdateUser;
