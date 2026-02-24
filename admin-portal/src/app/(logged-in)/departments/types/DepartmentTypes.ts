export interface Department {
  id: number;
  label_en: string;
  label_bn: string;

  created_at: string;
  updated_at: string;
}

export interface DepartmentList {
  current_page?: number;
  data?: Department[];
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
}

export interface UpdateDepartmentData {
  id: number;
  label_en: string;
  label_bn: string;
}

export interface AddDepartmentResult {
  error?: Error | null;
  success?: boolean;
  message?: string;
  data?: Department;
  code?: number;
}

export type FormKey = keyof FormValues;
export type UpdateFormKey = keyof FormValues;
