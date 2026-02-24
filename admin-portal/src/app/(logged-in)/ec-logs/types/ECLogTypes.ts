/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ECVerifyLogs {
  data?: ECVerifyLog[];
  links?: Links;
  meta?: Meta;
  success?: boolean;
  code?: number;
  message?: string;
}

export interface ECVerifyLog {
  nid: string;
  ec_user: string;
  application_id?: number;
  mobile?: string;
  display_id?: string;
  request_user: any;
  response_status: number;
  created_at: string;
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
