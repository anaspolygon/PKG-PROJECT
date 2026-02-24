export interface Branch {
  id: number;
  label_en: string;
  label_bn: string;
  code: number;
  is_islamic: false;
  district: string;
  created_at: string;
  updated_at: string;
}

export type BranchList = Branch[];
