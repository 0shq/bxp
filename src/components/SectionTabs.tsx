"use client";

import { Card, Tabs, Tab } from "@heroui/react";
import { useState, useEffect, Key } from "react";

interface SectionTabsProps {
  children?: React.ReactNode;
}

// Top tabs configuration
const TOP_TABS = [
  { key: "explore", title: "Explore" },
  { key: "connect", title: "Connect" },
  { key: "jobs", title: "Jobs" },
  { key: "learn", title: "Learn" },
  { key: "profile", title: "Profile" },
] as const;

// Bottom tabs configuration with type safety
const BOTTOM_TABS_CONFIG = {
  explore: [
    { key: "world", title: "World" },
    { key: "regional", title: "Regional" },
    { key: "following", title: "Following" },
    { key: "groups", title: "Groups" },
    { key: "news/trending", title: "News/Trending" },
  ],
  connect: [
    { key: "direct msg", title: "Direct Message" },
    { key: "email", title: "Email" },
    { key: "groups", title: "Groups" },
    { key: "private", title: "Private" },
  ],
  jobs: [
    { key: "jobs", title: "Jobs" },
    { key: "bounty", title: "Bounty" },
    { key: "contribute", title: "Contribute" },
    { key: "resume", title: "Resume" },
  ],
  learn: [
    { key: "lessons", title: "Lessons" },
    { key: "quiz", title: "Quiz" },
    { key: "challenges", title: "Challenges" },
    { key: "mentor", title: "Mentor" },
  ],
  profile: [
    { key: "showcase", title: "Showcase" },
    { key: "experience", title: "Experience" },
    { key: "skills", title: "Skills" },
    { key: "portfolio", title: "Portfolio" },
  ],
} as const;

// Type generation from config
type TopTab = (typeof TOP_TABS)[number]["key"];
type BottomTabsConfig = typeof BOTTOM_TABS_CONFIG;
type BottomTab = BottomTabsConfig[keyof BottomTabsConfig][number]["key"];

// Reusable tab component
function TabSection({
  tabs,
  selectedKey,
  onSelectionChange,
  variant = "bordered",
}: {
  tabs: readonly { key: string; title: string }[];
  selectedKey: string;
  onSelectionChange: (key: Key) => void;
  variant?: "bordered" | "light";
}) {
  return (
    <Tabs
      aria-label="Options"
      color="primary"
      variant={variant}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      className="p-4"
    >
      {tabs.map(({ key, title }) => (
        <Tab key={key} title={title} className="px-4 py-2" />
      ))}
    </Tabs>
  );
}

export default function SectionTabs({ children }: SectionTabsProps) {
  const [selectedTopTab, setSelectedTopTab] = useState<TopTab>("explore");
  const [selectedBottomTab, setSelectedBottomTab] = useState<BottomTab>(
    BOTTOM_TABS_CONFIG[selectedTopTab][0].key as BottomTab
  );

  // Update bottom tab when top tab changes
  useEffect(() => {
    const firstBottomTab = BOTTOM_TABS_CONFIG[selectedTopTab][0].key as BottomTab;
    setSelectedBottomTab(firstBottomTab);
  }, [selectedTopTab]);

  return (
    <div className="col-span-6 h-[calc(100vh-5rem)]">
      <Card className="h-full flex flex-col">
        {/* Top Fixed Tabs */}
        <div className="flex border-b border-divider justify-center items-center">
          <TabSection
            tabs={TOP_TABS}
            selectedKey={selectedTopTab}
            onSelectionChange={(key) => setSelectedTopTab(key as TopTab)}
          />
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 min-h-0 w-full">
          <div className="h-full overflow-y-auto p-4">
            {children}
          </div>
        </div>

        {/* Bottom Fixed Tabs */}
        <div className="flex border-t border-divider justify-center items-center">
          <TabSection
            tabs={BOTTOM_TABS_CONFIG[selectedTopTab]}
            selectedKey={selectedBottomTab}
            onSelectionChange={(key) => setSelectedBottomTab(key as BottomTab)}
            variant="bordered"
          />
        </div>
      </Card>
    </div>
  );
}
