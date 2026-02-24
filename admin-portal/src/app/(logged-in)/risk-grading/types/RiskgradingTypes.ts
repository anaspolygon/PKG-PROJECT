export interface PossibleValue {
  label: string;
  risk_score: number;
}

export interface FieldConfig {
  label: string;
  possible_values: Record<string, PossibleValue>;
}

export interface RootData {
  business_type: FieldConfig;
  expected_transaction_volume_in_1_year: FieldConfig;
  is_bangladeshi_resident: FieldConfig;
  is_ip: FieldConfig;
  is_pep: FieldConfig;
  is_pep_family: FieldConfig;
  profession_type: FieldConfig;
}

export interface RiskgradingResponse {
  data: RootData;
}
