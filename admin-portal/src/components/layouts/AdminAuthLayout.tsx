import { ReactNode } from "react";

export default function AdminAuthLayout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="min-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2D2D2]">
      <header className="bg-[#F2F2F2] text-gray-900 py-6 text-center px-5">
        <h1 className="text-[20px] font-medium">{title}</h1>
      </header>

      <main className="p-6">{children}</main>

      <footer className="text-center text-gray-600 text-sm py-5 bg-gray-50 border-t border-gray-200">
        © {new Date().getFullYear()} City Bank PLC. All rights reserved.
      </footer>
    </div>
  );
}
