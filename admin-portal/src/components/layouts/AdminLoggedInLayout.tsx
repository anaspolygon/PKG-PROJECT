"use client";
import { useState, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { clearUserSession } from "@/utils/tokenUtils";
import { GlobalProvider } from "./GlobalContext";
import { useItemsStore } from "@/store/useUserstore";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";
import ActiveTabGuard from "@/app/components/ActiveTabGuard";
export default function AdminLoggedInLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [, setLoggingOut] = useState(false);
  const router = useRouter();
  const { items, clearItems } = useItemsStore();
  const info: UserLoginInfo = (items.info as UserLoginInfo) ?? null;

  const handleLogout = useCallback(async () => {
    setLoggingOut(true);
    clearUserSession();
    clearItems();
    setTimeout(() => {
      router.push("/auth/login");
    }, 1000);
  }, [router, clearItems]);

  return (
    <div
      className="h-screen w-full flex flex-col relative"
      style={{ background: "var(--color-primary-bg)" }}
    >
      <header className="fixed top-0 left-0 right-0 z-40 bg-sky-50 px-4 shadow-sm flex items-center justify-between sm:p-2 md:p-2 lg:p-0">
        <button
          className="lg:hidden"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-800 m-1" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800 m-1" />
          )}
        </button>
      </header>

      <GlobalProvider>
        <ActiveTabGuard />
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col lg:ml-72 overflow-hidden">
          <main className="flex-1 overflow-y-auto pb-1 px-2 pt-2">
            {info && info.resetPasswordMessage ? (
              <Marquee
                speed={70}
                className="bg-white shadow rounded-xl py-3 px-4 mb-2 md:mt-6 lg:mt-4"
              >
                <h2 className="font-bold font-satoshi text-base text-[#C42126]">
                  {info.resetPasswordMessage}
                </h2>
              </Marquee>
            ) : null}
            <div className="h-[calc(100vh-20px)] overflow-y-auto bg-white shadow rounded-xl p-6 w-full sm:mt-8 md:mt-8 lg:mt-0">
              {children}
            </div>
          </main>
        </div>
      </GlobalProvider>
    </div>
  );
}
