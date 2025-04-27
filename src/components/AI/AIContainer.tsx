"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import AIChat  from './AIChat';
import { DefaultAIChat } from './DefaultAIChat';

export function AIContainer({ address }: { address: string }) {
  const { connected } = useWallet();

  return (
    <div className="col-span-3">
      <div className="w-full h-full">
        {connected ? <AIChat address={address} /> : <DefaultAIChat />}
      </div>
    </div>
  );
} 