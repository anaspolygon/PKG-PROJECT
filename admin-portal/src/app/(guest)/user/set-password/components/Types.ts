export interface OtpResponse {
  success: boolean;
  message: string;
  retry_after: number;
}

export interface User {
  mobile:string;
  email: string;
  api_token: string;
  otp_response: OtpResponse;
  value: boolean;
}