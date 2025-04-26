"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { LimitedAnalytics } from './LimitedAnalytics';
import { WalletAnalytics } from './WalletAnalytics';

export function AnalyticsContainer({ address }: { address: string }) {
  const { connected } = useWallet();

  return (
    <div className="col-span-3">
      <div className="w-full h-full">
        {connected ? <WalletAnalytics address={address} /> : <LimitedAnalytics />}
      </div>
    </div>
  );
} 