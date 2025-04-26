"use client";

import { useParams } from 'next/navigation'
import { useWalletAuth } from '@/hooks/useWalletAuth'
import { redirect } from 'next/navigation'
import SectionTabs from '@/components/SectionTabs';

export default function WalletConnectedPage() {
  const params = useParams()
  const { walletAddress } = useWalletAuth()
  const address = params.address as string

  // If wallet address doesn't match the URL, redirect to home
  if (walletAddress !== address) {
    redirect('/')
  }

  return (
    <div className="p-4">
      {/* <SectionTabs /> */}
    </div>
  )
} 