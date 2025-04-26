"use client";

import { useFeatureAccess } from '@/hooks/useFeatureAccess'
import { Card } from '@heroui/react'
import type { TopTab } from '@/types'
import WalletButton from './WalletButton';

interface FeatureAccessProps {
  children: React.ReactNode
  currentTab: TopTab
  profileAddress?: string
  limitedContent?: React.ReactNode
}

const SECTION_MESSAGES = {
  explore: {
    title: "Limited Access",
    description: "Connect your wallet to see more content and interact with the community."
  },
  connect: {
    title: "Connect Your Wallet",
    description: "Connect your wallet to interact with other users and join groups."
  },
  jobs: {
    title: "Limited Jobs Access",
    description: "Connect your wallet to apply for jobs and post opportunities."
  },
  learn: {
    title: "Limited Learning Access",
    description: "Connect your wallet to track progress and earn certificates."
  },
  profile: {
    title: "View Only Access",
    description: "Connect your wallet to edit profile and manage your experience."
  }
} as const;

export function FeatureAccess({ children, currentTab, profileAddress, limitedContent }: FeatureAccessProps) {
  const { 
    isFullAccess, 
    isLimitedAccess, 
    requiresWallet,
    isProfileView,
    isProfileOwner 
  } = useFeatureAccess(currentTab, profileAddress)

  // Show limited access view
  if (!isFullAccess && isLimitedAccess && limitedContent) {
    return (
      <div>
        {limitedContent}
        <Card className="mt-4 p-4">
          <h3 className="text-lg font-semibold">
            {SECTION_MESSAGES[currentTab].title}
          </h3>
          <p className="text-foreground-500 mt-2">
            {SECTION_MESSAGES[currentTab].description}
          </p>
          <div className="mt-4">
            <WalletButton />
          </div>
        </Card>
      </div>
    )
  }

  // Show wallet required message
  if (requiresWallet && !isFullAccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full p-6 text-center space-y-4">
          <h2 className="text-xl font-bold">
            {SECTION_MESSAGES[currentTab].title}
          </h2>
          <p className="text-foreground-500">
            {SECTION_MESSAGES[currentTab].description}
          </p>
          <div className="mt-4">
            <WalletButton />
          </div>
        </Card>
      </div>
    )
  }

  // For profile view, show edit notice if not owner
  if (isProfileView && !isProfileOwner) {
    return (
      <div>
        {children}
        <Card className="mt-4 p-4">
          <p className="text-foreground-500">
            Connect wallet to edit profile and interact with features
          </p>
          <div className="mt-4">
            <WalletButton />
          </div>
        </Card>
      </div>
    )
  }

  // Show full access content
  return <>{children}</>
} 