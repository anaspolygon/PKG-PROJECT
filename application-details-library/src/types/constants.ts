// Application Status Enum
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
  [ApplicationStatus.APPROVED]: "bg-green-100",
  [ApplicationStatus.IN_PROGRESS]: "bg-amber-100",
  [ApplicationStatus.INITIATED]: "bg-sky-100",
  [ApplicationStatus.SUBMITTED]: "bg-blue-100",
  [ApplicationStatus.REJECTED]: "bg-red-100",
  [ApplicationStatus.RESUBMISSION_REQUESTED]: "bg-orange-100",
  [ApplicationStatus.RESUBMITTED]: "bg-cyan-100",
  [ApplicationStatus.MQC_REJECTED]: "bg-rose-100",
  [ApplicationStatus.ESCALATED]: "bg-purple-100",
  [ApplicationStatus.CBS_FAILED]: "bg-red-100",
};

export const ApplicationStatusTextColors: Record<ApplicationStatus, string> = {
  [ApplicationStatus.APPROVED]: "text-green-700",
  [ApplicationStatus.IN_PROGRESS]: "text-amber-700",
  [ApplicationStatus.INITIATED]: "text-sky-700",
  [ApplicationStatus.SUBMITTED]: "text-blue-700",
  [ApplicationStatus.REJECTED]: "text-red-700",
  [ApplicationStatus.RESUBMISSION_REQUESTED]: "text-orange-700",
  [ApplicationStatus.RESUBMITTED]: "text-cyan-700",
  [ApplicationStatus.MQC_REJECTED]: "text-rose-700",
  [ApplicationStatus.ESCALATED]: "text-purple-700",
  [ApplicationStatus.CBS_FAILED]: "text-red-700",
};

// Helper function to get application status display text
export const getApplicationStatus = (status: string): string => {
  if (!status) return "N/A";
  if (status === "submitted") return "Submitted";
  if (status === "initiated") return "Initiated";
  if (status === "in_progress") return "In Progress";
  if (status === "cbs_failed") return "CBS Failed";
  if (status === "islamic") return "Islamic";
  if (status === "conventional") return "Conventional";
  if (status === "approved") return "Approved";
  if (status === "rejected") return "Rejected";
  return status;
};
