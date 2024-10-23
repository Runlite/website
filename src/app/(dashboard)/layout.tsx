import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ReduxProvider } from "@/providers/RxProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dashboard | Runlite",
  description:
    "Runlite provides a powerful code compilation API for developers. Execute code in 40+ programming languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <div className="grid h-screen w-full pl-[56px]">
                <Sidebar />
                <div className="flex flex-col">
                  <Header />
                  {children}
                </div>
              </div>
            </TooltipProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
