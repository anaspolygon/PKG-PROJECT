// enums-with-colors.ts

// 1. Application Status
export enum ApplicationStatus {
  APPROVED = "approved",
  IN_PROGRESS = "in_progress",
  INITIATED = "initiated",
  SUBMITTED = "submitted",
  REJECTED = "rejected",
  RESUBMISSION_REQUESTED = "resubmission_requested",
  RESUBMITTED = "resubmitted",
  MQC_REJECTED = "mqc_rejected",
  ESCALATED = "escalated",
  CBS_FAILED = "cbs_failed",
}

export const ApplicationStatusBgColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.APPROVED]: "bg-green-100", // Light green background
  [ApplicationStatus.IN_PROGRESS]: "bg-amber-100", // Light amber background
  [ApplicationStatus.INITIATED]: "bg-sky-100", // Light sky background
  [ApplicationStatus.SUBMITTED]: "bg-blue-100", // Light blue background
  [ApplicationStatus.REJECTED]: "bg-red-100", // Light red background
  [ApplicationStatus.RESUBMISSION_REQUESTED]: "bg-orange-100", // Light orange background
  [ApplicationStatus.RESUBMITTED]: "bg-cyan-100", // Light cyan background
  [ApplicationStatus.MQC_REJECTED]: "bg-rose-100", // Light rose background
  [ApplicationStatus.ESCALATED]: "bg-purple-100", // Light purple background
  [ApplicationStatus.CBS_FAILED]: "bg-red-100", // Light red background
};

export const ApplicationStatusTextColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.APPROVED]: "text-green-700", // Bold green text
  [ApplicationStatus.IN_PROGRESS]: "text-amber-700", // Bold amber text
  [ApplicationStatus.INITIATED]: "text-sky-700", // Bold sky text
  [ApplicationStatus.SUBMITTED]: "text-blue-700", // Bold blue text
  [ApplicationStatus.REJECTED]: "text-red-700", // Bold red text
  [ApplicationStatus.RESUBMISSION_REQUESTED]: "text-orange-700", // Bold orange text
  [ApplicationStatus.RESUBMITTED]: "text-cyan-700", // Bold cyan text
  [ApplicationStatus.MQC_REJECTED]: "text-rose-700", // Bold rose text
  [ApplicationStatus.ESCALATED]: "text-purple-700", // Bold purple text
  [ApplicationStatus.CBS_FAILED]: "text-red-700", // Bold red text
};


// 2. User Status
export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  CLOSED = "closed",
  LOCKED = "locked",
}

export const UserStatusBgColors: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "bg-green-100", // Light green background
  [UserStatus.INACTIVE]: "bg-gray-100", // Light gray background
  [UserStatus.CLOSED]: "bg-red-100", // Light red background
  [UserStatus.LOCKED]: "bg-slate-100", // Light slate background
};


export const UserStatusTextColors: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "text-green-700", // Bold green text
  [UserStatus.INACTIVE]: "text-gray-700", // Bold gray text
  [UserStatus.CLOSED]: "text-red-700", // Bold red text
  [UserStatus.LOCKED]: "text-slate-700", // Bold slate text
};


// 3. Branch Status
export enum BranchStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const BranchStatusBgColors: Record<BranchStatus, string> = {
  [BranchStatus.ACTIVE]: "bg-[#094E9E]",
  [BranchStatus.INACTIVE]: "bg-[#BDC3C7]",
};

// 4. Banking / Branch Type
export enum BankType {
  ISLAMIC = "islamic",
  CONVENTIONAL = "conventional",
  BOTH = "both"
}

export const BankTypeBgColors: Record<BankType, string> = {
  [BankType.ISLAMIC]: "bg-emerald-100", // Light emerald background
  [BankType.CONVENTIONAL]: "bg-blue-100", // Light blue background
  [BankType.BOTH]: "bg-purple-100", // Light purple background
};

export const BankTypeTextColors: Record<BankType, string> = {
  [BankType.ISLAMIC]: "text-emerald-700", // Bold emerald text
  [BankType.CONVENTIONAL]: "text-blue-700", // Bold blue text
  [BankType.BOTH]: "text-purple-700", // Bold purple text
};

// 5. Occupation Type
export enum OccupationType {
  BUSINESS = "Business",
  PROFESSION = "Profession",
}

export const OccupationTypeBgColors: Record<OccupationType, string> = {
  [OccupationType.BUSINESS]: "bg-[#16A085]",
  [OccupationType.PROFESSION]: "bg-[#34495E]",
};

// 6. Business Profession Status
export enum BusinessProfessionStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const BusinessProfessionStatusBgColors: Record<
  BusinessProfessionStatus,
  string
> = {
  [BusinessProfessionStatus.ACTIVE]: "bg-[#28A745]",
  [BusinessProfessionStatus.INACTIVE]: "bg-[#95A5A6]",
};

// 7. Onboarding Type
export enum OnboardingType {
  SELF = "self",
  ASSISTED = "assisted",
}

export const OnboardingTypeBgColors: Record<OnboardingType, string> = {
  [OnboardingType.SELF]: "bg-[#3498DB]",
  [OnboardingType.ASSISTED]: "bg-[#E67E22]",
};

export enum MakerCheckerStatus {
  APPROVED = "approved",
  PENDING = "pending",
  REJECTED = "rejected",
}

export const MakerCheckerStatusBgColors: Record<MakerCheckerStatus, string> = {
  [MakerCheckerStatus.APPROVED]: "bg-green-100", // Green
  [MakerCheckerStatus.PENDING]: "bg-yellow-100", // Yellow
  [MakerCheckerStatus.REJECTED]: "bg-red-100", // Red
};

export const MakerCheckerStatusTextColors: Record<MakerCheckerStatus, string> = {
  [MakerCheckerStatus.APPROVED]: "text-green-700", // Dark Green
  [MakerCheckerStatus.PENDING]: "text-yellow-700", // Dark Yellow
  [MakerCheckerStatus.REJECTED]: "text-red-700", // Dark Red
};
