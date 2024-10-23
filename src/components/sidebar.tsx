"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import {
  Book,
  ChartNoAxesColumn,
  LockKeyhole,
  LifeBuoy,
  Settings2,
  SquareTerminal,
  SquareUser,
} from "lucide-react";
import { Logo } from "./logo";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const mainNavItems: NavItem[] = [
  {
    icon: <SquareTerminal className="size-5" />,
    label: "Playground",
    href: "/playground",
  },

  {
    icon: <LockKeyhole className="size-5" />,
    label: "API Keys",
    href: "/api-keys",
  },
  { icon: <Book className="size-5" />, label: "Documentation", href: "/docs" },
  {
    icon: <ChartNoAxesColumn className="size-5" />,
    label: "Usage",
    href: "/usage",
  },
  {
    icon: <Settings2 className="size-5" />,
    label: "Settings",
    href: "/settings",
  },
];

const bottomNavItems: NavItem[] = [
  { icon: <LifeBuoy className="size-5" />, label: "Help", href: "/help" },
  {
    icon: <SquareUser className="size-5" />,
    label: "Account",
    href: "/account",
  },
];

const NavButton: React.FC<NavItem & { isActive: boolean }> = ({
  icon,
  label,
  href,
  isActive,
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-lg ${isActive ? "bg-muted" : ""}`}
        aria-label={label}
        asChild
      >
        <Link href={href}>{icon}</Link>
      </Button>
    </TooltipTrigger>
    <TooltipContent side="right" sideOffset={5}>
      {label}
    </TooltipContent>
  </Tooltip>
);

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home" asChild>
          <Link href="/">
            <Logo />
          </Link>
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {mainNavItems.map((item) => (
          <NavButton
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        {bottomNavItems.map((item) => (
          <NavButton
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}
