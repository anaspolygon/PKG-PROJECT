import { DefaultFormActionResult } from "@/types";
import { PreLoadRoot } from "@/types/PreloadTypes";

export interface FormValues {
  employee_id: string;
  password: string;
}

export interface AdminLogin {
  mobile: string;
  auth_token: string;
  message?: string;
  expired_password?: boolean;
  token: string;
}

export interface ValidateOtpResponse {
  error?: Error | null;
  success?: boolean;
  message?: string;
  token: string;
  info: UserLoginInfo;
}

export interface AdminLoginResult extends DefaultFormActionResult {
  data?: LoginResult;
}

export interface LoginResult {
  mobile: string;
  auth_token: string;
  expiredPassword: boolean | undefined;
  token?: string;
  preload: PreLoadRoot | undefined;
  preloadDataBangla: PreLoadRoot | undefined;
}

export interface UserLoginInfo {
  id: number;
  name: string;
  branch: string;
  email: string;
  role: string;
  has_super_admin_permission: boolean;
  can_read_dashboard: boolean;
  can_read_role: boolean;
  can_create_role: boolean;
  can_update_role: boolean;
  can_read_user: boolean;
  can_create_user: boolean;
  can_update_user: boolean;
  can_read_branch: boolean;
  can_read_department: boolean;
  can_create_department: boolean;
  can_update_department: boolean;
  can_delete_department: boolean;
  can_create_branch: boolean;
  can_update_branch: boolean;
  can_delete_branch: boolean;
  canEcUserRead: boolean;
  canEcUserCreate: boolean;
  canEcUserUpdate: boolean;
  canEcVerify: boolean;
  canEcVerifyLogRead: boolean;
  canApplicationRead: boolean;
  canApplicationPdfDownload: boolean;
  canBusinessProfessionsRead: boolean;
  canBusinessProfessionsCreate: boolean;
  canBusinessProfessionsUpdate: boolean;
  canBusinessProfessionsDelete: boolean;
  canActivityLogRead: boolean;
  canPercentageConfigsRead: boolean;
  canPercentageConfigsUpdate: boolean;
  canDownloadApplicationPdf: boolean;
  canActionRead: boolean;
  canActionCheck: boolean;
  resetPasswordMessage: string;
}

export type FormKey = keyof FormValues;

export type FormErrors = {
  [P in FormKey]: boolean;
};

export type AdminLoginActionFn = (
  _: DefaultFormActionResult,
  formData: FormData
) => Promise<DefaultFormActionResult>;
