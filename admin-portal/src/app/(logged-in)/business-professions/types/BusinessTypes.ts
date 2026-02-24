export interface BusinessProfession {
  id: number;
  label_en: string;
  label_bn: string;
  type: string;
  occupation_nature: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BusinessProfessionList {
  current_page?: number;
  data?: BusinessProfession[];
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
  success?: boolean;
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
  type: string;
  occupation_nature: string;
}

export interface UpdateBusiness {
  id: number;
  label_en: string;
  label_bn: string;
  occupation_nature: string;
  type: string;
}

export interface AddBusinessResult {
  error?: Error | null;
  success?: boolean;
  message?: string;
  data?: BusinessProfession;
  code?: number;
}

export type FormKey = keyof FormValues;
export type UpdateFormKey = keyof FormValues;
