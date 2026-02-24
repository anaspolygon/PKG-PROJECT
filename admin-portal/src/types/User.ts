import { IdName } from "./Common";
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoyaltyPoints {
  id: 6;
  name: string;
  point: number;
}
export interface User {
  mobile: string;
  name: string;
  dob: string;
  email: string;
  full_address: string;
  nid_no: string;
  division: string;
  district: string;
  thana: string;
  division_new: IdName<number>;
  district_new: IdName<number>;
  thana_new: IdName<number>;
  account_type: string;
  account_no: string;
  profile_image: string;
  nid_front: string;
  nid_back: string;
  vehicleType: string;
  vehicleType_new: IdName<number>;
  vehicleBrand: string;
  vehicleBrand_new: IdName<number>;
  vehicleModal: string;
  vehicleModal_new: IdName<number>;
  vehicleCc: string;
  vehicleCc_new: IdName<number>;
  referral_code: string;
  lat: string;
  long: string;
  social_media: SocialInfo;
  total_loyalty_points: string;
  loyalty_points: LoyaltyPoints[];
}
export type SocialInfo = {
  id: number;
  consumer_id: number;
  fb_email: string;
  fb_phone: string;
  fb_name: string;
  fb_image: string;
  fb_lp_status: number;
  google_email: string;
  google_name: string;
  google_image: string;
  google_lp_status: number;
};
export interface LoggedInUser extends Tokens {
  message: string;
  token: string;
  role: string;
}

export interface TokensWithId extends Tokens {
  id: number;
}
