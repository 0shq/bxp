"use client";

import { useWalletAuth } from '@/hooks/useWalletAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { isConnected, walletAddress } = useWalletAuth()
  const router = useRouter()

  // If wallet is connected, redirect to wallet address page
  useEffect(() => {
    if (isConnected && walletAddress) {
      router.push(`/${walletAddress}`)
    }
  }, [isConnected, walletAddress, router])

  return (
    <div className="p-4">
      Welcome to BXP
    </div>
  )
}
