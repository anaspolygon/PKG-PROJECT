export interface ApkVersion {
  id: number;
  version: string;
  download_url: string;
  force_download:boolean;
  release_notes: string;
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


export interface ApkVersionResponse {
  data: ApkVersion[];
  links: PaginationLinks;
  meta: Meta;
}
