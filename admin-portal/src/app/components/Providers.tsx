"use client";
import { Toaster, toast } from "sonner";
import { UserProvider } from "@/context/GetUserInfoContext";
import { useEffect } from "react";
const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Deduplicate identical error toasts for a short window to avoid spam
    const originalError = toast.error as (
      message: unknown,
      opts?: unknown,
    ) => void;
    const recent = new Set<string>();

    // Wrap the error function
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - we intentionally augment the runtime toast object here
    toast.error = (message: unknown, opts?: unknown) => {
      try {
        const key =
          typeof message === "string" ? message : JSON.stringify(message);
        if (recent.has(key)) return;
        recent.add(key);
        // keep dedupe window short (4s) — matches typical toast duration
        setTimeout(() => recent.delete(key), 4000);
      } catch {
        // ignore JSON errors
      }
      // call original
      originalError(message, opts);
    };

    return () => {
      // restore original on unmount
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error = originalError;
    };
  }, []);
  return (
    <>
      <Toaster richColors position="top-right" />
      <UserProvider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F5F8]">
          {children}
        </div>
      </UserProvider>
    </>
  );
};

export default Providers;
