'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to bXp</h1>
        <p className="text-lg mb-6">
          Web3-native, AI-powered proof of experience platform
        </p>
        <div className="flex gap-4 items-center">
          <WalletMultiButton />
        </div>
      </div>
    </main>
  )
}
