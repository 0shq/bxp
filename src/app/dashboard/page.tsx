export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">XP Earned</h2>
          <p className="text-4xl font-bold">0</p>
        </div>
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Active Skills</h2>
          <p className="text-4xl font-bold">0</p>
        </div>
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Streak</h2>
          <p className="text-4xl font-bold">0</p>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Proofs</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-center text-gray-500 dark:text-gray-400">No proofs submitted yet</p>
        </div>
      </div>
    </div>
  )
} 