// helpers/RedirectHelper.ts
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";

export const getRedirectPathFromPermissions = (user: UserLoginInfo): string | null => {
  const navOrder: { permission: keyof UserLoginInfo; path: string }[] = [
    { permission: "can_read_dashboard", path: "/dashboard" },
    { permission: "canApplicationRead", path: "/applications" },
    { permission: "can_read_user", path: "/users" },
    { permission: "can_read_role", path: "/roles" },
    { permission: "canEcVerify", path: "/ec-verify" },
    { permission: "canPercentageConfigsRead", path: "/configs" },
    { permission: "can_read_branch", path: "/branches" },
    { permission: "canBusinessProfessionsRead", path: "/business-professions" },
    { permission: "canEcUserRead", path: "/ec-users" },
    { permission: "canEcUserRead", path: "/default-ec-user" },
    { permission: "canActivityLogRead", path: "/activity-logs" },
    { permission: "canEcVerifyLogRead", path: "/ec-logs" },
    { permission: "canActionRead", path: "/maker-checker" },
  ];

  for (const entry of navOrder) {
    if (user?.[entry.permission]) {
      return entry.path;
    }
  }

  return null;
};
