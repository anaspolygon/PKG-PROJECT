/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MakerCheckerResponse {
  data: MakerCheckerItem[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface MakerCheckerItem {
  id: number;
  column_1: string | null;
  column_2: string | null;
  column_3: string | null;
  status: "approved" | "pending" | "rejected" | string;
  action_maker: number | null;
  action_checker: number | null;
  action_type: "create" | "update" | "delete" | string;
  action_label: string;
  body: any;
  old_data: any;
  rejection_reason: string | null;
  subject_type: string;
  subject_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Logs {
  action_type: string;
  body: any;
  old_data: any;
  subject: string;
  field_label?: string;
  field_slug?: string;
  id?: number;
  ip_address?: string;
  created_at?: string;
  performed_by?: string;
  time_ago?: string;
}

