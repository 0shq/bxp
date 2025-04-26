"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
} from "@heroui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { BXPLogo } from "@/public/bxplogo";
import dynamic from 'next/dynamic';

const WalletButton = dynamic(() => import('../WalletButton'), {
  ssr: false,
});

type SearchIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
};

export const SearchIcon: React.FC<SearchIconProps> = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height ?? size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width ?? size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function NavBar() {
  return (
    <Navbar isBordered>
      <NavbarBrand className="cursor-pointer">
        <a href="/" className="flex items-center">
          <div className="mr-2">
            <BXPLogo />
          </div>
          <p className="font-bold text-foreground">BXP</p>
        </a>
      </NavbarBrand>
      <NavbarContent className="flex-1 justify-center" justify="center">
        <div className="w-full max-w-xl">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} width={18} height={18} />}
          type="search"
        />
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        <WalletButton />
      </NavbarContent>
    </Navbar>
  );
}
