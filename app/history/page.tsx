'use client';

import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Game History</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Back
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg mb-4">
            Game history feature coming soon!
          </p>
          <p className="text-gray-500">
            Your completed games will be saved and displayed here.
          </p>
        </div>
      </div>
    </main>
  );
}
