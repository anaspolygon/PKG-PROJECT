/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DefaultEcUser {
  id: number
  branch_id: any
  name: string
  created_at: string
  updated_at: string
  token_expire_time: string
  token_issue_time: string
}

export interface UpdateForm {
    username: string;
    password?: string;
}
export type UpdateFormKey = keyof UpdateForm;
