"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import SignInButtons from "./signInButton";
import ConfigurationDrawer from "./ConfigurationDrawer";
import Account from "./Account";


const Header = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  
  

  const getHeading = (page: string): string => {
    const headings: { [key: string]: string } = {
      "/playground": "Playground",
      "/api-keys": "API",
      "/docs": "Documentation",
      "/usage": "Usage",
      "/logs":"Events Logs"
    };
    return headings[page] || "Dashboard";
  };

  return (
    <header className="sticky top-0 z-10 flex h-[8vh] items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-6 justify-between shadow-sm">
      <h1 className="text-xl font-semibold">{getHeading(pathname)}</h1>
      <div className="flex items-center gap-4">
        <ConfigurationDrawer />
        {user ? <Account user={user} /> : <SignInButtons />}
      </div>
    </header>
  );
};

export default Header;