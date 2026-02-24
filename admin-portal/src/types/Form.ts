

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DefaultFormActionResult {
  error?: Error | null;
  success?: boolean;
  message?: string;
  verified?:boolean;
  can_retry_after?: number;
  fieldVerificationResult?: Record<string, any>;
  photo?: string | null;
  pin?: string | null;
  nid?: string | null;
  data?:any;
  code?:number

}

export const defaultFormActionResult: DefaultFormActionResult = {
  error: undefined,
  success: undefined,
  message: undefined,
  data:undefined,

};

export type DefaultActionFn = (
  _: DefaultFormActionResult,
  formData: FormData
) => Promise<DefaultFormActionResult>;

export type InputError = { [key: string]: string | null };

