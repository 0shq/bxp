"use client";

import { Card } from '@heroui/react';
import WalletButton from '../WalletButton';

export function LimitedAIChat() {
  return (
    <Card className="w-full h-full flex flex-col items-center justify-center p-8 space-y-6 bg-background text-foreground">
      <h2 className="text-2xl font-bold text-center">Connect Your Wallet to Start Building Experience</h2>
      <p className="text-center text-gray-500 max-w-md">
        Connect your Solana wallet to start submitting proofs of experience and building your on-chain portfolio.
      </p>
      <WalletButton />
    </Card>
  );
} 