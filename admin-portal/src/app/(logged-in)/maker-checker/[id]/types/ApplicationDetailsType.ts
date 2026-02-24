/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApplicationDetailsRoot {
    application_data: ApplicationData[]
    additional_info: AdditionalInfo
  }
  
  export interface ApplicationData {
    label?: string
    description: any
    section_slug: string
    type: string
    buttons?: Button[]
    qc_decision: any
    resubmission_status: any
    visible_if: any
    bottom_sheet?: string
    value?: Value | string[]
    resubmission_note: any
    section_order: number
    pages?: Page[]
    field?: Field2
    nominees?: Nominee[]
  }
  
  export interface Button {
    title: string
    action: string
    link: any
  }
  
  export interface Value {
    front_image: string
    back_image: string
  }
  
  export interface Page {
    label: string
    description?: string
    section_slug: string
    page_slug: string
    type: string
    buttons?: Button2[]
    qc_decision: any
    resubmission_status: any
    visible_if: any
    bottom_sheet: any
    page_order: number
    fields: Field[]
  }
  
  export interface Button2 {
    title: string
    action: string
    link: any
  }
  
  export interface Field {
    slug: string
    order: number
    input_type?: string
    type: string
    group_id: any
    description_type: string
    value: any
    visible_if?: VisibleIf
    is_editable?: boolean
    resubmission_status: any
    id: number
    label?: string
    description?: string
    is_resubmission_requested?: boolean
    resubmission_note: any
    rules?: Rules
    dependent_fields?: any[]
    depends_on: any
    cached_key: any
    possible_values?: PossibleValue[]
    unacceptable_values?: any[]
    unacceptable_value_error: any
    children?: Children[]
    image_capture_content: any
  }
  
  export interface VisibleIf {
    param_type: string
    condition_param: ConditionParam
    value?: string
    operator: string
    logical_operator: any
    condition: any
  }
  
  export interface ConditionParam {
    section_slug: string
    field_slug: string
    page_slug: string
    group_slug: any
  }
  
  export interface Rules {
    is_alpha_supported?: IsAlphaSupported
    is_number_supported?: IsNumberSupported
    is_special_character_supported?: IsSpecialCharacterSupported
    contain_only_bangla_characters?: ContainOnlyBanglaCharacters
    contain_only_english_characters?: ContainOnlyEnglishCharacters
    regex?: Regex
    is_required: IsRequired
    required_if: RequiredIf
    allowed_extensions?: AllowedExtensions
    size?: Size
    max_count?: MaxCount
    length?: Length
    before?: Before
  }
  
  export interface IsAlphaSupported {
    value: boolean
    message: string
  }
  
  export interface IsNumberSupported {
    value: boolean
    message: string
  }
  
  export interface IsSpecialCharacterSupported {
    value: boolean
    message: string
  }
  
  export interface ContainOnlyBanglaCharacters {
    value: boolean
    message: string
  }
  
  export interface ContainOnlyEnglishCharacters {
    value: boolean
    message: string
  }
  
  export interface Regex {
    value: any
    message: string
  }
  
  export interface IsRequired {
    value: boolean
    message: string
  }
  
  export interface RequiredIf {
    value: any
    message: string
  }
  
  export interface AllowedExtensions {
    value: string[]
    message: string
  }
  
  export interface Size {
    value: number
    message: string
  }
  
  export interface MaxCount {
    value: number
    message: string
  }
  
  export interface Length {
    value: Value2
    message: string
  }
  
  export interface Value2 {
    min: any
    max?: number
    lengths: number[]
  }
  
  export interface Before {
    value: string
    message: string
  }
  
  export interface PossibleValue {
    label: string
    description: any
    description_type: string
    value: string
    icon: any
    visible_if: any
    tag: any
  }
  
  export interface Children {
    slug: string
    order: number
    input_type: string
    type: string
    group_id: number
    description_type: string
    value: string
    visible_if: any
    is_editable: boolean
    resubmission_status: any
    id: number
    label: string
    description: any
    is_resubmission_requested: boolean
    resubmission_note: any
    dependent_fields?: string[]
    depends_on?: string
    cached_key?: string
    possible_values?: any[]
    unacceptable_values?: any[]
    unacceptable_value_error: any
    rules: Rules2
  }
  
  export interface Rules2 {
    is_required: IsRequired2
    required_if: RequiredIf2
    is_alpha_supported?: IsAlphaSupported2
    is_number_supported?: IsNumberSupported2
    is_special_character_supported?: IsSpecialCharacterSupported2
    contain_only_bangla_characters?: ContainOnlyBanglaCharacters2
    contain_only_english_characters?: ContainOnlyEnglishCharacters2
    regex?: Regex2
  }
  
  export interface IsRequired2 {
    value: boolean
    message: string
  }
  
  export interface RequiredIf2 {
    value: any
    message: string
  }
  
  export interface IsAlphaSupported2 {
    value: boolean
    message: string
  }
  
  export interface IsNumberSupported2 {
    value: boolean
    message: string
  }
  
  export interface IsSpecialCharacterSupported2 {
    value: boolean
    message: string
  }
  
  export interface ContainOnlyBanglaCharacters2 {
    value: boolean
    message: string
  }
  
  export interface ContainOnlyEnglishCharacters2 {
    value: boolean
    message: string
  }
  
  export interface Regex2 {
    value: any
    message: string
  }
  
  export interface Field2 {
    slug?: string
    order?: number
    input_type?: string
    type: string
    group_id: any
    description_type?: string
    value?: string
    visible_if: any
    is_editable?: boolean
    resubmission_status: any
    id?: number
    label?: string
    description: any
    is_resubmission_requested?: boolean
    resubmission_note: any
    dependent_fields?: any[]
    depends_on: any
    cached_key: any
    possible_values?: PossibleValue2[]
    unacceptable_values?: any[]
    unacceptable_value_error: any
    rules?: Rules3
  }
  
  export interface PossibleValue2 {
    label: string
    description: any
    description_type: string
    value: string
    icon: any
    visible_if: any
    tag: any
  }
  
  export interface Rules3 {
    is_required: IsRequired3
    required_if: RequiredIf3
  }
  
  export interface IsRequired3 {
    value: boolean
    message: string
  }
  
  export interface RequiredIf3 {
    value: any
    message: string
  }
  
  export interface Nominee {
    name: string
    relation: string
    dob: string
    share: number
    mobile: string
    email: string
    address: string
    user_image: string[]
    nid_number: string
    nid_front: string[]
    nid_back: string[]
    guardian_name?: string | null
    guardian_nid_number?: string | null
    guardian_nid_front?: string[] | null
    guardian_nid_back?: string[] | null
    nominee_signature?: string
  }
  
  export interface AdditionalInfo {
    application_id: string
    application_display_id: string
    first_submitted_at: string
    mobile: string
    name: string
    business_name: any
    nid_no: any
    user_image: string
    face_match_percentage: string
    application_status: ApplicationStatus
    risk_rating: RiskRating
    mqc_updated_at: any
    hqc_updated_at: any
    risk_rating_updated_at: any
    has_assigned: boolean
    assigned_to: any
    has_resubmitted: boolean
    ocr_data: OcrData
    ec_data: EcData
  }
  
  export interface ApplicationStatus {
    type: string
    bg_color: string
    font_color: string
    value: string
  }
  
  export interface RiskRating {
    type: string
    bg_color: string
    font_color: string
  }
  
  export interface OcrData {
  applicant_name_ben: string
  applicant_name_eng: string
  father_name: string
  mother_name: string
  spouse_name: any
  nid_no: string
  dob: string
  address: string
}

export interface EcData {
  status: string
  message: string
  verified: boolean
  fieldVerificationResult: FieldVerificationResult
}

export interface FieldVerificationResult {
  name: boolean
  father: boolean
  mother: boolean
  nameEn: boolean
  dateOfBirth: boolean
  "presentAddress.upozila": boolean
  "presentAddress.district": boolean
  "presentAddress.division": boolean
  "permanentAddress.upozila": boolean
  "permanentAddress.district": boolean
  "permanentAddress.division": boolean
  "presentAddress.postOffice": boolean
  "presentAddress.postalCode": boolean
  "permanentAddress.postOffice": boolean
  "permanentAddress.postalCode": boolean
}

export interface NIDForm {
    fields: Field []
}
export interface Field {
    field: string | undefined
    value: any
}