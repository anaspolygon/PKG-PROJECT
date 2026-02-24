// import "server-only";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// interface OTPData {
//   email: string;
//   retryAfter: number;
//   journey: "sign_up" | "forgot_password";
//   pageTitle?: string;
//   redirectToURL?: string;
//   redirectBackURL?: string;
// }

// interface useWhatsAppOTPData {
//   mobile: string;
//   countryCode:string
//   retryAfter?:number;
// }

// export interface AuthCode {
//   authorization_code: string;
// }

// export const startOtpJourney = (
//   data: Omit<OTPData, "pageTitle" | "redirectToURL" | "redirectBackURL">
// ) => {
//   cookies().set("otp_data", JSON.stringify(data));

//   redirect("/auth/otp");
// };

// export const setWhatsAppOtpJourney = (data: useWhatsAppOTPData) => {
//   cookies().set("whatsAppOtp_data", JSON.stringify(data));
// };

// export const updateRetry = (retryAfter: number) => {
//   let data: OTPData = JSON.parse(cookies().get("otp_data")?.value!);
//   data.retryAfter = retryAfter;
//   cookies().set("otp_data", JSON.stringify(data));
// };

// export const updateWhatsAppRetry = (retryAfter: number) => {
//   let data: useWhatsAppOTPData = JSON.parse(
//     cookies().get("whatsAppOtp_data")?.value!
//   );
//   data.retryAfter = retryAfter;
//   cookies().set("whatsAppOtp_data", JSON.stringify(data));
// };

// export const getOtpData = (): Required<OTPData> => {
//   let data: OTPData = JSON.parse(cookies().get("otp_data")?.value!);

//   return {
//     ...data,
//     pageTitle: data.journey === "sign_up" ? "Sign Up" : "Forgot Password",
//     redirectBackURL:
//       data.journey === "sign_up" ? "/auth/sign-up" : "/auth/forgot-password",
//     redirectToURL:
//       data.journey === "sign_up"
//         ? "/auth/sign-up/set-password"
//         : "/auth/forgot-password/set-password",
//   };
// };

// export const getWhatsAppOtpData = (): useWhatsAppOTPData |null=> {
//   const cookieValue = cookies().get("whatsAppOtp_data")?.value;
//   if (!cookieValue) {
//     return null;
//   }
//   try {
//     let data: useWhatsAppOTPData = JSON.parse(cookieValue);
//     return data;
//   } catch (error) {
//     console.error("Failed to parse WhatsApp OTP data:", error);
//     return null;
//   }
// };



// export const redirectAfterValidation = (authCode: AuthCode) => {
//   let data = getOtpData();
//   cookies().delete("otp_data");
//   cookies().set("otp_authorization_code", authCode.authorization_code);
//   redirect(data.redirectToURL);
// };

// export const getAuthCode = (): string => {
//   return cookies().get("otp_authorization_code")?.value!;
// };

// export const deleteAuthCode = () => {
//   cookies().delete("otp_authorization_code");
// };

// export const deleteWhatsAppCredentials = () => {
//   cookies().delete("whatsAppOtp_data");
// };

