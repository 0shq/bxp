export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
                <p className="text-gray-500 dark:text-gray-400">Connect your wallet to view your profile</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total XP</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Skills Graph</h2>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 h-48 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Connect wallet to view skills graph</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-center text-gray-500 dark:text-gray-400">No recent activity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Verified Proofs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <p className="text-center text-gray-500 dark:text-gray-400">No verified proofs yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 