"use client";

import Dashboard from "@/app/dashboard";
import SectionTabs from "./SectionTabs";
import AI from "@/app/ai";
interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className=" mx-auto px-4 py-4">
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-5rem)]">
        {/* Dashboard Column */}
        <Dashboard />

        {/* Feed Column */}
       <SectionTabs>
        {children}
       </SectionTabs>

        {/* AI Chat Column */}
        <AI />
      </div>
    </div>
  );
} 