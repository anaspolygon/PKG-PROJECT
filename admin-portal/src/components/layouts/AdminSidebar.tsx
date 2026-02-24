/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Badge } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Database,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleDotDashed,
  CircleUser,
  UserRoundCheck,
  Settings,
  Logs,
  ServerCrash,
} from "lucide-react";
import { useGlobalState } from "./GlobalContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { logout } from "@/hooks/logout";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface NavItemBase {
  label: string;
  icon?: React.ElementType;
}

interface NavLinkItem extends NavItemBase {
  href: string;
}

interface NavDropdownItem extends NavItemBase {
  children: NavItem[];
}

type NavItem = NavLinkItem | NavDropdownItem;

export default function AdminSidebar({
  isOpen,
  onClose,
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);

  const toggleMenu = (key: string) => {
    setExpandedMenu((prev) => (prev === key ? null : key));
    setExpandedSubMenu(null);
  };

  const toggleSubMenu = (key: string) => {
    setExpandedSubMenu((prev) => (prev === key ? null : key));
  };

  const user = useLocalStorage("info");
  const { pendingCount, fetchPendingCount } = useGlobalState();

  const navItems: NavItem[] = [
    user?.permissions?.can_read_dashboard
      ? { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" }
      : null,
    user?.permissions?.can_read_application
      ? { href: "/applications", icon: FileText, label: "Applications" }
      : null,
    user?.permissions?.can_read_user || user?.permissions?.can_read_role
      ? {
          label: "User Management",
          icon: Users,
          children: [
            ...(user.permissions.can_read_user
              ? [{ href: "/users", label: "Users" }]
              : []),
            ...(user.permissions.can_read_role
              ? [{ href: "/roles", label: "User Roles" }]
              : []),
          ],
        }
      : null,
    user?.permissions?.can_percentage_read ||
    user?.permissions?.can_read_apk ||
    user?.permissions?.can_read_api ||
    user?.permissions.can_read_risk_config ||
    user?.permissions?.can_read_app_configuration
      ? {
          label: "Configurations",
          icon: Settings,
          children: [
            ...(user.permissions.can_percentage_read
              ? [{ href: "/configs", label: "Percentage Config" }]
              : []),
            ...(user.permissions.can_read_apk
              ? [{ href: "/apk-version", label: "APK Version" }]
              : []),
            ...(user.permissions.can_read_api
              ? [{ href: "/api-management", label: "API Management" }]
              : []),
            ...(user.permissions.can_read_risk_config
              ? [{ href: "/risk-grading", label: "Risk Grading" }]
              : []),
            ...(user.permissions.can_read_app_configuration
              ? [{ href: "/app-configs", label: "App Config" }]
              : []),
          ],
        }
      : null,
    user?.permissions?.can_read_branch ||
    user?.permissions?.can_read_business ||
    user?.permissions?.can_read_regular_profession ||
    user?.permissions?.can_read_simplified_profession
      ? {
          label: "Master Data",
          icon: Database,
          children: [
            ...(user?.permissions.can_read_branch
              ? [{ href: "/branch", label: "Branches" }]
              : []),
            ...(user?.permissions.can_read_business
              ? [{ href: "/regular-business", label: "Regular Business" }]
              : []),
            ...(user?.permissions.can_read_regular_profession
              ? [{ href: "/regular-profession", label: "Regular Profession" }]
              : []),
            ...(user?.permissions.can_read_simplified_profession
              ? [
                  {
                    href: "/simplified-profession",
                    label: "Simplified Profession",
                  },
                ]
              : []),
          ],
        }
      : null,
    user?.permissions?.can_read_maker_checker
      ? {
          href: "/maker-checker",
          icon: UserRoundCheck,
          label: "Pending List",
        }
      : null,
    user?.permissions?.can_read_audit_logs
      ? { href: "/audit-logs", icon: Logs, label: "Audit Logs" }
      : null,
    user?.permissions?.can_read_failed_api_list
      ? {
          href: "/failed-api-list",
          icon: ServerCrash,
          label: "City API Logs",
        }
      : null,
  ].filter(Boolean) as NavItem[];

  const renderNavItem = (item: NavItem) => {
    if ("children" in item) {
      const isExpanded = expandedMenu === item.label;

      return (
        <li key={item.label}>
          <button
            onClick={() => toggleMenu(item.label)}
            className={clsx(
              "flex items-center justify-between px-3 py-2 w-full text-[#3c3c3cde] rounded-md hover:bg-[#e20001] font-medium hover:text-white cursor-pointer",
            )}
          >
            <span className="flex items-center gap-5">
              {item.icon && <item.icon className="w-5 h-5" />}
              {item.label}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.ul
                className="ml-6 mt-1 space-y-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {item.children.map((child: NavItem) => {
                  if ("children" in child) {
                    const isSubExpanded = expandedSubMenu === child.label;
                    return (
                      <li key={child.label}>
                        <button
                          onClick={() => toggleSubMenu(child.label)}
                          className={clsx(
                            "flex items-center justify-between px-3 py-1.5 w-full text-[#3c3c3cde] rounded-md hover:bg-[#e20001] font-medium hover:text-white cursor-pointer",
                          )}
                        >
                          <span className="flex items-center gap-2 text-left">
                            {child.icon && <child.icon className="w-5 h-5" />}
                            {child.label}
                          </span>
                          {isSubExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        <AnimatePresence initial={false}>
                          {isSubExpanded && (
                            <motion.ul
                              className="ml-4 mt-1 space-y-1"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                              {child.children.map((subChild) =>
                                "href" in subChild ? (
                                  <li key={subChild.href} onClick={onClose}>
                                    <Link
                                      href={subChild.href}
                                      className={clsx(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors",
                                        pathname.startsWith(subChild.href)
                                          ? "bg-[#e20001] text-white font-medium"
                                          : "text-[#3c3c3cde] hover:bg-[#e20001] font-medium hover:text-white",
                                      )}
                                    >
                                      {/* Submenu items: Circle / CircleDotDashed */}
                                      {pathname.startsWith(subChild.href) ? (
                                        <CircleDotDashed className="w-2.5 h-2.5" />
                                      ) : (
                                        <Circle className="w-2 h-2" />
                                      )}
                                      {subChild.label}
                                    </Link>
                                  </li>
                                ) : null,
                              )}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li
                      key={
                        "href" in child
                          ? child.href
                          : "label" in child
                            ? (child as NavDropdownItem).label
                            : ""
                      }
                      onClick={onClose}
                    >
                      {"href" in child && (
                        <Link
                          href={child.href}
                          className={clsx(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors",
                            pathname.startsWith(child.href)
                              ? "bg-[#e20001] text-white font-medium"
                              : "text-[#3c3c3cde] hover:bg-[#e20001] font-medium hover:text-white",
                          )}
                        >
                          {pathname.startsWith(child.href) ? (
                            <CircleDotDashed className="w-2.5 h-2.5" />
                          ) : (
                            <Circle className="w-2 h-2" />
                          )}
                          {child.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      );
    }

    return (
      <li key={item.href} onClick={onClose} className="group">
        <Link
          href={item.href}
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium",
            pathname.startsWith(item.href)
              ? "bg-[#e20001] text-white font-medium"
              : "text-[#3c3c3cde] hover:bg-[#e20001] font-medium hover:text-white",
          )}
          onClick={() => setExpandedMenu(null)}
        >
          {item.icon && <item.icon className="w-5 h-5 mr-3" />}
          {item.label}
          {item.href === "/maker-checker" &&
          user.permissions.can_read_maker_checker ? (
            <Badge
              count={pendingCount}
              showZero
              title="Total pending count"
              className={clsx(
                "sidebar-badge",
                pathname.startsWith(item.href)
                  ? "sidebar-badge-active"
                  : "sidebar-badge-inactive",
              )}
            />
          ) : null}
        </Link>
      </li>
    );
  };

  const pathName = usePathname();
  useEffect(() => {
    if (pathName === "/maker-checker") {
      fetchPendingCount();
    }
  }, [pathName, fetchPendingCount]);

  return (
    <>
      <aside
        className={clsx(
          // `fixed left-0 z-30 w-64 bg-white p-4 pt-6 ml-2 mr-2 mb-2 rounded-xl shadow-xl`,
          `fixed left-0 z-30 w-70 bg-white p-4 pt-6 ml-2 mr-2 mb-2 rounded-xl shadow-xl`,
          isOpen ? "translate-x-0" : "-translate-x-full",
          "transition-transform duration-300 ease-in-out lg:translate-x-0 lg:flex lg:flex-col sm:mt-9 md:mt-9 lg:mt-2",
          "h-[calc(100vh-1.25rem)]",
        )}
      >
        <div className="mb-4 px-2 flex justify-center items-center">
          <img src="/layouts/citylogo.png" width={120} height={32} alt="logo" />
        </div>

        <hr className="text-white/50 pb-4" />

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => renderNavItem(item))}
          </ul>
        </nav>

        <button className="flex items-center font-medium gap-2 text-[#3c3c3cde] w-full px-3 py-2 rounded-md mt-4">
          <CircleUser className="w-6 h-6" />
          <div>
            <p className="font-medium text-left text-base">{user?.name}</p>
            <p className="font-normal text-left text-xs">{user?.employee_id}</p>
          </div>
        </button>

        <button
          onClick={async () => {
            onLogout();
            logout();
          }}
          className="mb-6 flex items-center font-medium gap-2 text-[#e20001] w-full px-3 py-2 rounded-md hover:bg-[#e20001] hover:text-white cursor-pointer mt-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)] bg-opacity-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
