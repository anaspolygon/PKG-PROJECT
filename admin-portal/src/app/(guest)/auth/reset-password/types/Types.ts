/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormValues {
    email: string;
    apiToken: string;
    otp: string;
  }
  
  export type FormKey = keyof FormValues;
  
  export type FormErrors = {
    [P in FormKey]: boolean;
  };
  
  export interface Token {
    token: string
  }
  
  export interface ValidateOTPFormActionResult {
    error?: Error | null; 
    success?: boolean;
    message?: string;
    data?: {
      authorization_code: string;
      [key: string]: any;
    };
  }
  
  export interface ShootOTPResponse {
    message: string;
    can_retry_after: string;
  }
  
  export interface OTPFormActionResult {
    error?: Error | null; 
    success?: boolean;
    message?: string;
    data?: ShootOTPResponse;
  }
  
  // Reset Password Types
  export interface ResetPasswordFormValues {
    email: string;
    password: string;
    confirmPassword: string;
    authorizationCode: string;
  }
  
  export type ResetPasswordFormKey = keyof ResetPasswordFormValues;
  
  export interface ResetPasswordFormActionResult {
    error?: Error | null;
    success?: boolean;
    message?: string;
    data?: {
      message: string;
      [key: string]: any;
    };
  }
  
  export const defaultFormActionResult: OTPFormActionResult | ValidateOTPFormActionResult | ResetPasswordFormActionResult = {
    error: undefined,
    success: undefined,
    message: undefined,
  };
  
  export type DefaultActionFn = (
    _: OTPFormActionResult | ValidateOTPFormActionResult | ResetPasswordFormActionResult,
    formData: FormData
  ) => Promise<OTPFormActionResult | ValidateOTPFormActionResult | ResetPasswordFormActionResult>;
  
  export type InputError = { [key: string]: string | null };