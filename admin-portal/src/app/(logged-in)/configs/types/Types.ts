export interface PercentageConfigList {
  data: PercentageConfig[];
  success?: boolean;
  code?:number,
  message?:string
}

export interface PercentageConfig {
  id: number;
  key: string;
  label: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateConfigRequest {
  key: string;
  value: string;
}

export interface UpdateConfigResponse {
  message: string;
  data?: PercentageConfig;
  errors?: UpdateConfigError;
  code?:number
}

export interface UpdateConfigError {
  value: string[];
  key: string[];
}
