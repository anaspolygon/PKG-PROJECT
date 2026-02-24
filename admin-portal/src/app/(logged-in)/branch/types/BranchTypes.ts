export interface Branch {
  id: number;
  branch_name: string;
  branch_code: number;
  window_branch_code:number;
  division: string;
  district: string;
  thana:string;
  postal_code:string;
  is_active: number;
  banking_type: string;
  created_at: string;
  updated_at: string;
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

export interface BranchResponse {
  data: Branch[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: Meta;
}
