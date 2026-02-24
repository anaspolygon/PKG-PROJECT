"use client";

import {
  defaultFormActionResult,
} from "@/types/Form";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { shootOtp } from "../actions/ShootOtpAction";
import { FormKey, FormValues, OTPFormActionResult } from "../types/Types";
import { redirect } from "next/navigation";

export const useShootOtp = ()=> {
  
  const [result, action, isPending] = useActionState<
    OTPFormActionResult,
    FormData
  >(async (prev, formData) => {
        const res = await shootOtp(prev, formData);
  
        if (res.success) {
          toast.success(res.message || "OTP sent successfully.");
          if (res.data)
          {
            if (typeof window !== 'undefined') {

              localStorage.setItem('retry_time', res.data.can_retry_after)
              localStorage.setItem('retry_timestamp', Date.now().toString());
              localStorage.setItem('reset_email',  formData.get('email') as string )
              localStorage.setItem('api_token',  formData.get('apiToken') as string )
            }
          }
          redirect('/auth/validate-otp')

        } else {
          toast.error(res.message || "OTP sent failed");
        }
  
        return res;
      }, defaultFormActionResult);

          
    const [formValues, setFormValues] = useState<FormValues>({
        email: "",
        apiToken: "",
      });
    
    
      const update = (key:FormKey , value: string) => {
        setFormValues((prev) => ({
          ...prev,
          [key]: value,
        }));
      };
    
  const form = {
    values: formValues,
    update,
    result,
    action,
    canSubmit: formValues.email !== "",
    errors: {
      email: formValues.email.trim() !== "",
    },
  }

  return {form, isPending};
};
