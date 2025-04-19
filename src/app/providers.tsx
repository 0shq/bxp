"use client";

import { HeroUIProvider } from "@heroui/react";
import { SolanaWalletProvider } from "@/providers/WalletProvider";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
