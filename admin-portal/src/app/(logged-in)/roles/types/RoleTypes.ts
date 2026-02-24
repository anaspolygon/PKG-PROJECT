export interface RoleList {
  data: Role[];
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
  guard_name: string;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: number;
  label: string;
  name: string;
  module: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  role_id: number;
  permission_id: number;
}

export interface RoleAddFormValues {
  name: string;
  permissions: number[];
}

export interface RoleUpdateFormValues {
  name: string;
  permissions: number[];
}

export interface RoleAddResponse {
  message: string;
}

export interface AddRoleResult {
  error?: Error | null;
  success?: boolean;
  message?: string;
  data?: string;
  code?: number;
}

export interface UpdateRoleData {
  id: number;
  name?: string;
  permissions?: number[];
}

export type AddFormKey = keyof RoleAddFormValues;
export type UpdateFormKey = keyof RoleUpdateFormValues;
