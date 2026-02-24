/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FailedAPI {
  id: number;
  trans_id: string;
  application_id: number;
  api_name: string;
  method: string;
  url: string;
  is_failed:boolean;
  request_payload: Record<string, any>;
  response: Record<string, any>;
  http_code:number;
  created_at: string;
  updated_at: string;
}
export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface MetaLinkItem {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLinkItem[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface FailedAPIListResponse {
  data: FailedAPI[];
  links: PaginationLinks;
  meta: Meta;
}
