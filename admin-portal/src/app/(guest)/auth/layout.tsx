"use client";
import AdminAuthLayout from "@/components/layouts/AdminAuthLayout";
import AdminLoggedInLayout from "@/components/layouts/AdminLoggedInLayout";
import { useLocalStorage } from "@/hooks/useLocalStorage";
// import { routes } from "@/lib/routes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDynamicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const isAuthRoute = pathname.includes("auth");
  const router = useRouter();
  const user = useLocalStorage("info");

  // if (user) {
  //   for (const route of routes) {
  //     if (user?.permissions[route.permission]) {
  //       router.push(route.path);
  //     }
  //   }
  // }

  useEffect(() => {
    setIsLoggedIn(!!user);

    if (!isAuthRoute && !user?.includes("token")) {
      router.push("/auth/login");
    }
  }, [isAuthRoute, router, user]);

  if (isAuthRoute)
    return (
      <AdminAuthLayout title="Digital Onboarding">{children}</AdminAuthLayout>
    );
  if (!isLoggedIn) return null;

  return <AdminLoggedInLayout>{children}</AdminLoggedInLayout>;
}
