/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApplicationList {
  data?: Application[];
  links?: Links;
  meta?: Meta;
  success?: boolean;
  code?: number;
  message?: string;
}

export interface Application {
  id: number;
  status: string;
  identifier: string;
  name: string;
  display_id: string;
  account_number: string;
  branch_code: string;
  banking_type: string;
  last_submission_at: string;
  onboarding_type: string;
  failed_reason: string;
  gender: string;
  product_type: string;
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

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface GetApplicationListParams {
  page?: number;
  identifier?: string;
  submittedFrom?: Date | null;
  submittedTo?: Date | null;
}
