/* eslint-disable @typescript-eslint/no-explicit-any */
export interface API {
  id: number;
  label:string;
  api_name: string;
  url: string;
  login_id: string;
  additional_fields:Record<string,any>
  created_at:string;
  updated_at:string;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
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

export interface APIResponse {
  data: API[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: Meta;
}
