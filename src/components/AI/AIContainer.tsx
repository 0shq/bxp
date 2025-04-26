"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import AIChat  from './AIChat';
import { LimitedAIChat } from './LimitedAIChat';

export function AIContainer() {
  const { connected } = useWallet();

  return (
    <div className="col-span-3">
      <div className="w-full h-full">
        {connected ? <AIChat /> : <LimitedAIChat />}
      </div>
    </div>
  );
} 