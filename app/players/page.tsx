'use client';

import { useRouter } from 'next/navigation';
import { usePlayerStore } from '@/lib/stores/player-store';

export default function PlayersPage() {
  const router = useRouter();
  const { players, removePlayer } = usePlayerStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Players</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Back
          </button>
        </div>

        {players.length > 0 ? (
          <div className="grid gap-4">
            {players.map((player) => (
              <div key={player.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{player.name}</h2>
                    <p className="text-gray-400">
                      Member since {new Date(player.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${player.name}?`)) {
                        removePlayer(player.id);
                      }
                    }}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">
                      {player.statistics.gamesPlayed}
                    </div>
                    <div className="text-sm text-gray-400">Games Played</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-500">
                      {player.statistics.gamesWon}
                    </div>
                    <div className="text-sm text-gray-400">Games Won</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-500">
                      {player.statistics.averageScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-400">Avg Score</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-500">
                      {player.statistics.highestScore}
                    </div>
                    <div className="text-sm text-gray-400">Highest Score</div>
                  </div>
                </div>

                {player.statistics.ton80s > 0 && (
                  <div className="mt-4 flex gap-2 text-sm">
                    <span className="bg-yellow-600 text-white px-2 py-1 rounded">
                      🎯 {player.statistics.ton80s}x 180
                    </span>
                    {player.statistics.ton40s > 0 && (
                      <span className="bg-orange-600 text-white px-2 py-1 rounded">
                        {player.statistics.ton40s}x 140+
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg mb-4">No players yet</p>
            <button
              onClick={() => router.push('/setup')}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
            >
              Add Players in Game Setup
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
