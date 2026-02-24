export interface Pivot {
  model_type: string;
  model_id: number;
  role_id: number;
}
export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}
export interface Branch {
  code: string;
  district: string;
  id: number;
  is_active: boolean;
  is_islamic: boolean;
  label_bn: string;
  label_en: string;
}
export interface User {
  id: number;
  employee_id: number;
  branch_id: number;
  name: string;
  email: string;
  is_active: boolean;
  role: Role;
  branch: Branch | null;
  status: string;
  created_at: string;
  updated_at: string | null;
}
