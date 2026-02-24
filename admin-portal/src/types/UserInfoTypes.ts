export type Location = {
  latitude?: number | null;
  longitude?: number | null;
};

export type UserInfo  = {
  location?: Location;
  phoneNumber?: string;
  address?: string;
};
export type UserContextType = {
  userInfo: Record<string, unknown>;
  setUserInfo: (info: Record<string, unknown>) => void;
};