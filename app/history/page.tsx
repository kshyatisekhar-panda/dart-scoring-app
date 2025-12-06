'use client';

import { useRouter } from 'next/navigation';
import { useHistoryStore } from '@/lib/stores/history-store';
import { usePlayerStore } from '@/lib/stores/player-store';

export default function HistoryPage() {
  const router = useRouter();
  const { games, deleteGameFromHistory, clearHistory } = useHistoryStore();
  const { getPlayer } = usePlayerStore();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (start: number, end?: number) => {
    if (!end) return 'N/A';
    const durationMs = end - start;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Game History</h1>
          <div className="flex gap-2">
            {games.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all game history?')) {
                    clearHistory();
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Back
              </button>
          </div>
        </div>

        {games.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg mb-4">
              No games in history yet
            </p>
            <p className="text-gray-500">
              Your completed games will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {games.map((game) => {
              const winner = game.winner ? getPlayer(game.winner) : null;
              const sortedPlayers = [...game.players]
                .map(playerId => ({
                  playerId,
                  player: getPlayer(playerId),
                  score: game.scores[playerId]
                }))
                .sort((a, b) => a.score.currentScore - b.score.currentScore);

              return (
                <div
                  key={game.id}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {game.settings.gameName ? (
                        <>
                          <h2 className="text-2xl font-bold text-white mb-1">
                            {game.settings.gameName}
                          </h2>
                          <p className="text-gray-400">
                            {game.gameType.toUpperCase()} Game
                          </p>
                        </>
                      ) : (
                        <h2 className="text-2xl font-bold text-white">
                          {game.gameType.toUpperCase()} Game
                        </h2>
                      )}
                      <p className="text-gray-500 text-sm mt-1">
                        {formatDate(game.startedAt)}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Delete this game from history?')) {
                          deleteGameFromHistory(game.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      🗑️
                    </button>
                  </div>

                  {winner && (
                    <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🏆</span>
                        <div>
                          <p className="text-yellow-400 font-bold text-lg">
                            {winner.name}
                          </p>
                          <p className="text-yellow-200/70 text-sm">Winner</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {sortedPlayers.map((p, index) => (
                      <div
                        key={p.playerId}
                        className={`bg-gray-700 rounded-lg p-3 ${
                          p.playerId === game.winner ? 'ring-2 ring-yellow-500' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-white">
                            #{index + 1} {p.player?.name || 'Unknown'}
                          </span>
                          {p.score.currentScore === 0 && (
                            <span className="text-green-400 text-sm">✓ Finished</span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <div className="text-gray-400">Score</div>
                            <div className="text-white font-bold">
                              {p.score.currentScore}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400">Avg</div>
                            <div className="text-white font-bold">
                              {p.score.average.toFixed(1)}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400">Darts</div>
                            <div className="text-white font-bold">
                              {p.score.dartsThrown}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 pt-3 border-t border-gray-700">
                    <span>Duration: {formatDuration(game.startedAt, game.finishedAt)}</span>
                    <span>Players: {game.players.length}</span>
                    <span>Status: <span className="text-green-400">{game.status}</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Copyright Footer */}
      <div className="text-center py-8 text-gray-500 text-xs">
        © {new Date().getFullYear()} Kshyatisekhar Panda
      </div>
    </main>
  );
}
