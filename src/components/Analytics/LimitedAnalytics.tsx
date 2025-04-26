"use client";

import { Card } from '@heroui/react'

export function LimitedAnalytics() {
  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-divider">
        <h2 className="text-xl font-bold">Dashboard Analytics</h2>
        <p className="text-sm text-foreground-500">
          Connect your wallet to track your growth
        </p>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Limited Stats */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Platform Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3">
              <p className="text-sm text-foreground-500">Total Users</p>
              <p className="text-xl font-bold">1,234</p>
            </Card>
            <Card className="p-3">
              <p className="text-sm text-foreground-500">Total Proofs</p>
              <p className="text-xl font-bold">5,678</p>
            </Card>
          </div>
        </div>

        {/* Limited Activity */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <Card className="p-4">
            <p className="text-center text-foreground-500">
              Connect wallet to view your activity
            </p>
          </Card>
        </div>

        {/* Limited Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Popular Skills</h3>
          <Card className="p-4">
            <p className="text-center text-foreground-500">
              Connect wallet to track your skills
            </p>
          </Card>
        </div>
      </div>
    </Card>
  )
} 