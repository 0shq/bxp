"use client";

import { Card } from '@heroui/react'

interface WalletAnalyticsProps {
  address: string
}

export function WalletAnalytics({ address }: WalletAnalyticsProps) {
  return (
    <div className="col-span-3">
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-divider">
        <h2 className="text-xl font-bold">Dashboard Analytics</h2>
        <p className="text-sm text-foreground-500 break-all">{address}</p>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Overall Stats */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Overall Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3">
              <p className="text-sm text-foreground-500">Total XP</p>
              <p className="text-xl font-bold">0</p>
            </Card>
            <Card className="p-3">
              <p className="text-sm text-foreground-500">Proofs</p>
              <p className="text-xl font-bold">0</p>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <Card className="p-4">
            <p className="text-center text-foreground-500">No recent activity</p>
          </Card>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Top Skills</h3>
          <Card className="p-4">
            <p className="text-center text-foreground-500">No skills yet</p>
          </Card>
        </div>
      </div>
    </Card>
    </div>
  )
} 