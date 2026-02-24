/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuditLogResponse {
  data: AuditLog[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface AuditLog {
  id: number;
  user_type: string;
  performed_by: string;
  action_name: string;
  model: string;
  audited_section:string;
  table_id:number;
  auditable_id: number;
  old_values: Record<string, any> | [];
  new_values: Record<string, any>;
  url: string;
  ip_address: string;
  user_agent: string;
  tags: string | null;
  created_at: string;
  updated_at: string;
  time_ago:string;
  field_slug?:string;
  changes?:any;
  field_label?:string;
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
