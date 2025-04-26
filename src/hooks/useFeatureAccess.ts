import { useWalletAuth } from './useWalletAuth'

type TopTab = 'explore' | 'connect' | 'jobs' | 'learn' | 'profile'

interface FeatureAccess {
  isFullAccess: boolean
  isLimitedAccess: boolean
  requiresWallet: boolean
  isProfileView: boolean
  isProfileOwner: boolean
}

const SECTION_ACCESS = {
  explore: { requiresWallet: false, allowLimited: true },
  connect: { requiresWallet: true, allowLimited: false },
  jobs: { requiresWallet: false, allowLimited: true },
  learn: { requiresWallet: false, allowLimited: true },
  profile: { requiresWallet: false, allowLimited: true }
} as const;

export const useFeatureAccess = (
  currentTab: TopTab,
  profileAddress?: string
): FeatureAccess => {
  const { isConnected, walletAddress } = useWalletAuth()

  const isProfileView = currentTab === 'profile'
  const isProfileOwner = isConnected && profileAddress === walletAddress

  // Get section access requirements
  const { requiresWallet, allowLimited } = SECTION_ACCESS[currentTab]

  // Determine access levels
  const isFullAccess = isConnected
  const isLimitedAccess = !isConnected && allowLimited

  return {
    isFullAccess,
    isLimitedAccess,
    requiresWallet: requiresWallet || (isProfileView && !isProfileOwner),
    isProfileView,
    isProfileOwner
  }
} 