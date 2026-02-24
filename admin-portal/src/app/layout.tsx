import type { Metadata } from "next";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import OptimizedIntlProvider from "@/components/providers/OptimizedIntlProvider";
import Providers from "./components/Providers";
import "./globals.css";
import ActiveTabGuard from "./components/ActiveTabGuard";

const openSans = localFont({
  src: [
    {
      path: "./fonts/OpenSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/OpenSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/OpenSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/OpenSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "City Bank PLC.",
  description:
    "City Bank PLC., Deposit Scheme, Loans, SME Banking, Islami Banking and Agriculture Banking in Bangladesh.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${openSans.variable} antialiased `}>
        <ActiveTabGuard />
        <OptimizedIntlProvider locale={locale}>
          <Providers>{children}</Providers>
        </OptimizedIntlProvider>
      </body>
    </html>
  );
}
