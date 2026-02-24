/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AdditionalData {
  risk_type: string;
  risk_score: number;
  ababil_sbs_code: string;
  finacle_sbs_code: string;
  category_code?: string;
}

export interface ProfessionBase {
  label: string;
  value: string;
}

export interface ProfessionItem extends ProfessionBase {
  additional_data: AdditionalData;
}

export interface ProfessionResponse {
  data: ProfessionItem[];
}

export interface ProfessionRow extends AdditionalData {
  label: string;
  value: string;
}

export type PageName =
  | "regular-business"
  | "regular-profession"
  | "simplified-profession";

export function isRegularBusinessOrProfession(pageName: string) {
  return ["regular-business", "regular-profession"].includes(pageName);
}

export const getBtnText = (pageName: string) => {
  return pageName === "regular-business"
    ? "+ Add Regular Business"
    : pageName === "regular-profession"
      ? "+ Add Regular Profession"
      : "+ Add Simplified Profession";
};

export const getAddContext = (pageName: string) => {
  return pageName === "regular-business"
    ? "Add Regular Business"
    : pageName === "regular-profession"
      ? "Add Regular Profession"
      : "Add Simplified Profession";
};

export const getUpdateContext = (pageName: string) => {
  return pageName === "regular-business"
    ? "Update Regular Business"
    : pageName === "regular-profession"
      ? "Update Regular Profession"
      : "Update Simplified Profession";
};

export const checkPermission = (pageName: string, info: any) => {
  return (
    (pageName == "regular-business" &&
      info?.permissions?.can_create_business) ||
    (pageName == "regular-profession" &&
      info?.permissions?.can_create_regular_profession) ||
    (pageName == "simplified-profession" &&
      info?.permissions?.can_create_simplified_profession)
  );
};
