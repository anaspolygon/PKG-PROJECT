export interface Branch {
  id: number;
  label_en: string;
  label_bn: string;
  code: string;
  is_islamic: boolean;
  is_onboarding: boolean;
  is_active: boolean;
  division: string;
  district: string;
  created_at: string;
  updated_at: string;
}

export interface BranchList {
  current_page?: number;
  data?: Branch[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  links?: Link[];
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
  success?: false;
  code?: number;
  message?: string;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface FormValues {
  label_en: string;
  label_bn: string;
  code: string;
  is_islamic: string;
  is_onboarding: string;
  // division: string;
  district: string;
}

export interface UpdateBranchData {
  id: number;
  label_en: string;
  label_bn: string;
  code: string;
  is_islamic: string;
  is_onboarding: boolean;
  // division: string;
  district: string;
}

export interface AddBranchResult {
  error?: Error | null;
  success?: boolean;
  message?: string;
  data?: Branch;
}

export type FormKey = keyof FormValues;
export type UpdateFormKey = keyof FormValues;
