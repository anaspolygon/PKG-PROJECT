export interface FormValues {
	email: string;
	apiToken: string;
}

export type FormKey = keyof FormValues;

export type FormErrors = {
    [P in FormKey]: boolean;
};

export interface Token {
  token: string
}


export interface OTPFormActionResult {
  error?: Error | null; 
  success?: boolean;
  message?: string;
  data?: ShootOTPResponse;
}

export interface ShootOTPResponse {
  message: string;
  can_retry_after: string;
}


export const defaultFormActionResult: OTPFormActionResult = {
  error: undefined,
  success: undefined,
  message: undefined,
};

export type DefaultActionFn = (
  _: OTPFormActionResult,
  formData: FormData
) => Promise<OTPFormActionResult>;

export type InputError = { [key: string]: string | null };