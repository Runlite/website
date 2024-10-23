import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ReduxProvider } from "@/providers/RxProvider";
import { AuthProvider } from "@/providers/AuthProvider";
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
  title: "Runlite | Fast & Reliable Code Compilation API",
  description:
    "Execify provides a powerful code compilation API for developers. Execute code in 40+ programming languages.",
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
            <TooltipProvider>{children}</TooltipProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
