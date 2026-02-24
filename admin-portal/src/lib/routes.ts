export const routes = [
  { path: "/applications", permission: "can_read_application" },
  { path: "/users", permission: "can_read_user" },
  { path: "/roles", permission: "can_read_role" },
  { path: "/configs", permission: "can_percentage_read" },
  { path: "/api-management", permission: "can_read_api" },
  { path: "/apk-verison", permission: "can_read_apk" },
  { path: "/branch", permission: "can_read_branch" },
  { path: "/maker-checker", permission: "can_read_maker_checker" },
  { path: "/audit-logs", permission: "can_read_audit_logs" },
  { path: "/risk-grading", permission: "can_read_risk_config" },
  { path: "/regular-business", permission: "can_read_business" },
  { path: "/regular-profession", permission: "can_read_regular_profession" },
  {
    path: "/simplified-profession",
    permission: "can_read_simplified_profession",
  },
];
