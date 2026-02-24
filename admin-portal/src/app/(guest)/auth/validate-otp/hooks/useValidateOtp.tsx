"use client";

import { defaultFormActionResult } from "@/types/Form";
import { useActionState, useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import validateOtp from "../actions/ValidateOtp";
import { FormKey, FormValues, ValidateOTPFormActionResult } from "../types/Types";
import { shootOtp } from "../../shoot-otp/actions/ShootOtpAction";

export const useValidateOtp = () => {
  const [result, action, isPending] = useActionState<
    ValidateOTPFormActionResult,
    FormData
  >(async (prev, formData) => {
    const res = await validateOtp(prev, formData);

    if (res.success) {
      if (res.data) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('reset_email', formData.get('email') as string);
          localStorage.setItem('api_token', formData.get('apiToken') as string);
          localStorage.setItem('otp', formData.get('otp') as string);
          
          if (res.data.authorization_code) {
            localStorage.setItem('authorization_code', res.data.authorization_code);
          }
        }
      }
      redirect('/auth/reset-password');
    } else {
      toast.error(res.message || "OTP verification failed");
    }

    return res;
  }, defaultFormActionResult);

  const [formValues, setFormValues] = useState<FormValues>({
    email: typeof window !== 'undefined' ? localStorage.getItem('resetEmail') || "" : "",
    apiToken: typeof window !== 'undefined' ? localStorage.getItem('apiToken') || "" : "",
    otp: "",
  });

  const [isLoadingLocalStorage, setIsLoadingLocalStorage] = useState(true);

  useEffect(() => {
    const getLocalStorageValues = () => {
      if (typeof window !== 'undefined') {
        setIsLoadingLocalStorage(false);
      }
    };

    getLocalStorageValues();
  }, []);

  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  
  const RESEND_INTERVAL = 60;
  const [resendTimer, setResendTimer] = useState(0);
  const [isTimerInitialized, setIsTimerInitialized] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isTimerInitialized) {
      const retryTime = localStorage.getItem('retry_time');
      const retryTimestamp = localStorage.getItem('retry_timestamp');
      
      if (retryTime && retryTimestamp) {
        const storedTime = Number(retryTime);
        const storedTimestamp = Number(retryTimestamp);
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - storedTimestamp) / 1000);
        const remainingTime = Math.max(0, storedTime - elapsedSeconds);
        
        setResendTimer(remainingTime);
      } else {
        setResendTimer(0);
      }
      
      setIsTimerInitialized(true);
    }
  }, [isTimerInitialized]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const update = (key: FormKey, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    
    update('otp', newOtp.join(''));
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer <= 0 && !isResending) {
      setIsResending(true);
      
      try {
        const formData = new FormData();
        formData.append('email', formValues.email);
        formData.append('apiToken', formValues.apiToken);
        
        const res = await shootOtp(defaultFormActionResult, formData);
        
        if (res.success) {
          setOtpDigits(Array(6).fill(''));
          update('otp', '');
          
          if (res.data?.can_retry_after) {
            const newRetryTime = Number(res.data.can_retry_after);
            setResendTimer(newRetryTime);
            if (typeof window !== 'undefined') {
              localStorage.setItem('retry_time', res.data.can_retry_after);
              localStorage.setItem('retry_timestamp', Date.now().toString());
            }
          } else {
            setResendTimer(RESEND_INTERVAL);
            if (typeof window !== 'undefined') {
              localStorage.setItem('retry_time', RESEND_INTERVAL.toString());
              localStorage.setItem('retry_timestamp', Date.now().toString());
            }
          }
          
          toast.success(res.message || 'OTP resent successfully.');
        } else {
          toast.error(res.message || 'Failed to resend OTP.');
        }
      } catch (error) {
        toast.error('Failed to resend OTP. Please try again.');
        console.error('Resend OTP error:', error);
      } finally {
        setIsResending(false);
      }
    }
  };

  const form = {
    values: formValues,
    update,
    result,
    action,
    canSubmit: formValues.otp.length === 6,
    errors: {
      otp: formValues.otp.trim() === "",
      email: formValues.email.trim() === "",
      apiToken: formValues.apiToken.trim() === "",
    },
  };

  return { 
    form, 
    isPending, 
    otpDigits, 
    inputRefs,
    resendTimer,
    isResending,
    isLoadingLocalStorage,
    handleOtpChange,
    handleOtpKeyDown,
    handleResendOtp
  };
};