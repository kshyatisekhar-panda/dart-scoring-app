'use client';

import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Back
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">App Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between text-white cursor-pointer">
                <span>Sound Effects</span>
                <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
              </label>
              <label className="flex items-center justify-between text-white cursor-pointer">
                <span>Haptic Feedback</span>
                <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
              </label>
              <label className="flex items-center justify-between text-white cursor-pointer">
                <span>Dark Mode</span>
                <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
              </label>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">About</h2>
            <div className="text-gray-300 space-y-2">
              <p>Dart Scoring App v1.0.0</p>
              <p>Professional dart scoring for all game modes</p>
              <p className="text-sm text-gray-500 mt-4">
                Built with Next.js, React, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Data Management</h2>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
