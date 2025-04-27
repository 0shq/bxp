"use client";

import SectionTabs from "../SectionTabs";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { AIContainer } from "../AI/AIContainer";
import { AnalyticsContainer } from "../Analytics/AnalyticsContainer";
interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { walletAddress } = useWalletAuth()
  const address = walletAddress as string
  return (
    <div className=" mx-auto px-4 py-4">
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-5rem)]">
        {/* Dashboard Column */}
        <AnalyticsContainer address={address} />

        {/* Feed Column */}
       <SectionTabs>
        {children}
       </SectionTabs>

        {/* AI Chat Column */}
        <AIContainer address={address} />
      </div>
    </div>
  );
} 