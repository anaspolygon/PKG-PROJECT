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
  
  export const defaultFormActionResult: OTPFormActionResult | ValidateOTPFormActionResult = {
    error: undefined,
    success: undefined,
    message: undefined,
  };
  
  export type DefaultActionFn = (
    _: OTPFormActionResult | ValidateOTPFormActionResult,
    formData: FormData
  ) => Promise<OTPFormActionResult | ValidateOTPFormActionResult>;
  
  export type InputError = { [key: string]: string | null };