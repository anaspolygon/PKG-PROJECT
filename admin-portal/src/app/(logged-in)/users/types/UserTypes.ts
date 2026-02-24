/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultFormActionResult } from "@/types";
import { Department } from "../../branches/types/DepartmentTypes";

export interface FormValues {
  email: string;
  role: string;
  name: string;
  employee_id: string;
  branch_id: number | string;
  valid_till: string;
  mobile: string;
  department_id:number | string;
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
export interface UpdateUserData {
  id: number;
  name: string;
  email: string;
  roles: any;
  role:any;
  employee_id: string;
  branch_id: number | string;
  valid_till: string;
  department_id:number;
  status:string;
  comments:string;
}
export interface UpdateForm {
  email: string;
  name: string;
  role: any;
  employee_id: string;
  branch_id: string;
  valid_till: string;
  mobile: string;
  department_id:string | number;
  status:string;
  comments:string;
}
export interface AddUserResult extends DefaultFormActionResult {
  data?: AddUser;
}
export interface AddUser {
  message: string;
}

export interface UpdateUserData extends FormValues {
  id: number;
}

export type FormKey = keyof FormValues;
export type UpdateFormKey = keyof UpdateForm;

export type FormErrors = {
  [P in FormKey]: boolean;
};

export type AddUserActionFn = (
  _: DefaultFormActionResult,
  formData: FormData
) => Promise<DefaultFormActionResult>;

export interface UserList {
  data?: User[];
  links?: Links;
  meta?: Meta;
  success?:boolean,
  code?:number,
  message?:string
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
  name: string;
  email: string;
  employee_id: string;
  branch_id: string;
  branch: Branch;
  // is_active: boolean;
  user_type:string;
  status: string;
  roles: Role[];
  is_active:number;
  role:Role;
  created_at: string;
  updated_at: string;
  valid_till: string;
  comments:string;
  mobile:string;
  department_id:number;
  department:Department
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  model_type: string;
  model_id: number;
  role_id: number;
}

export interface Link {
  url: any;
  label: string;
  active: boolean;
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: any;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
