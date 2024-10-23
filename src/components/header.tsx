"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import SignInButtons from "./signInButton";
import ConfigurationDrawer from "./ConfigurationDrawer";
import Account from "./Account";
import { Input } from "./ui/input";
import { setCurrentkey } from "@/store/slices/keys.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
const Header = () => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const pathname = usePathname();
  const [apiKey, setApiKey] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const getHeading = (page: string): string => {
    const headings: { [key: string]: string } = {
      "/playground": "Playground",
      "/api-keys": "API",
      "/docs": "Documentation",
      "/usage": "Usage",
    };
    return headings[page] || "Dashboard";
  };
  useEffect(() => {
    const savedKey = localStorage.getItem("_apiKey");
    if (savedKey) {
      setApiKey(savedKey);
      dispatch(setCurrentkey(savedKey));
    }
  }, [dispatch]);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length !== 67) {
      setIsValid(false);
    }
    dispatch(setCurrentkey(value));
    localStorage.setItem("_apiKey", value);
    setApiKey(value);
    setIsValid(null);

    if (value) {
      setTimeout(() => {
        setIsValid(value.length === 67);
      }, 1000);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-[8vh] items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-6 justify-between shadow-sm">
      <h1 className="text-xl font-semibold">{getHeading(pathname)}</h1>

      <div className="relative flex-1 max-w-sm">
        <Input
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Paste your API key"
          className={`pl-4 pr-10 py-2 h-10 transition-all duration-200 
              ${isValid === true && "border-green-500 focus:ring-green-500"}
              ${isValid === false && "border-red-500 focus:ring-red-500"}
            `}
        />
      </div>

      <div className="flex items-center gap-4">
        <ConfigurationDrawer />
        {user ? <Account user={user} /> : <SignInButtons />}
      </div>
    </header>
  );
};

export default Header;
