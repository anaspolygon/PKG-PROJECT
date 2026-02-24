import { ReactNode } from "react";

const Layout = ({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} bg-white rounded-2xl shadow-lg overflow-hidden`}
    >
      <header className="bg-[#213170] text-white py-6 text-center">
        <h1 className="text-2xl font-medium">{title}</h1>
      </header>
      <main className="p-6">{children}</main>
      <footer className="text-center text-gray-500 text-sm py-4 border-t">
        © {new Date().getFullYear()} Prime Bank PLC. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
