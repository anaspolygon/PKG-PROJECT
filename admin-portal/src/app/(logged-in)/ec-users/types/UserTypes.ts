/* eslint-disable @typescript-eslint/no-explicit-any */

import { DefaultFormActionResult } from "@/types";

export interface FormValues {
  username: string;
  password: string;
  branch_id: string;
}
export interface UpdateUserData {
  id:number;
  branch_id: number;
  username: string;
}
export interface UpdateForm {
  username:string,
  branch_id:any,
}
export interface AddUserResult extends DefaultFormActionResult {
  data?: AddUser;
}
export interface AddUser {
  message: string;
}

export interface UpdateUserData {
  branch_id: number;
  username: string;
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
  current_page: number;
  data: User[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface User {
  id: number;
  branch_id: number;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
