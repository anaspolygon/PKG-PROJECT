"use client";
import NextTopLoader from "nextjs-toploader";
import AdminLoggedInLayout from "@/components/layouts/AdminLoggedInLayout";

export default function AdminDynamicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLoggedInLayout>
      <NextTopLoader color="#C0C0C2" showSpinner={false} />
      {children}
    </AdminLoggedInLayout>
  );
}
