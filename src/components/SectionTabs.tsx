import { Card } from "@heroui/react";

export default function SectionTabs({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-6">
    <Card className="h-full flex flex-col">
      {/* Tabs Navigation */}
      <div className="border-b border-divider p-4">
        <div className="flex gap-4">
          <button className="text-primary font-medium">Explore</button>
          <button className="text-foreground-500">Connect</button>
          <button className="text-foreground-500">Jobs</button>
          <button className="text-foreground-500">Learn</button>
          <button className="text-foreground-500">Profile</button>
        </div>
      </div>

      {/* Feed Content */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>

      {/* Bottom Tabs - Will be dynamic based on content */}
      <div className="border-t border-divider p-4">
        <div className="flex gap-4 text-sm text-foreground-500">
          <span>World</span>
          <span>Regional</span>
          <span>Following</span>
          <span>New</span>
          <span>Trending</span>
        </div>
      </div>
    </Card>
  </div>
  );
}
