"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from 'next/navigation'
import { BXPLogo } from "@/public/bxplogo";
import dynamic from 'next/dynamic';

const WalletButton = dynamic(() => import('./WalletButton'), {
  ssr: false,
});

export default function App() {
  const pathname = usePathname()

  return (
    <Navbar isBordered>
      <NavbarBrand className="cursor-pointer">
        <Link color="foreground" href="/">
          <div className="mr-2">
            <BXPLogo />
          </div>
          <p className="font-bold text-foreground">BXP</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/dashboard"}>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/submit"}>
          <Link color="foreground" href="/submit">
            Submit
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/profile"}>
          <Link color="foreground" href="/profile">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        <WalletButton />
      </NavbarContent>
    </Navbar>
  );
}
