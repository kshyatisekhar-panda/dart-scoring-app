'use client';

import { useEffect } from 'react';
import type { PlayerGameScore } from '@/types/game';

interface RoundDetailsModalProps {
  playerName: string;
  playerScore: PlayerGameScore;
  isOpen: boolean;
  onClose: () => void;
  leaderScore: number;
}

export default function RoundDetailsModal({
  playerName,
  playerScore,
  isOpen,
  onClose,
  leaderScore
}: RoundDetailsModalProps) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate statistics
  const rounds = playerScore.rounds;
  const bestRound = rounds.length > 0
    ? rounds.reduce((best, round) => round.totalThrown > best.totalThrown ? round : best, rounds[0])
    : null;
  const worstRound = rounds.length > 0
    ? rounds.reduce((worst, round) => round.totalThrown < worst.totalThrown ? round : worst, rounds[0])
    : null;

  const pointsBehindLeader = playerScore.currentScore > leaderScore
    ? playerScore.currentScore - leaderScore
    : 0;

  const averagePerRound = rounds.length > 0
    ? rounds.reduce((sum, r) => sum + r.totalThrown, 0) / rounds.length
    : 0;

  // Calculate what score is needed to take the lead
  const scoreNeededForLead = pointsBehindLeader > 0
    ? Math.ceil(pointsBehindLeader / 3) * 3 // Approximate for 3 darts
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{playerName} - Round Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Summary Stats */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-xs text-gray-400">Current Score</div>
              <div className="text-2xl font-bold text-white">{playerScore.currentScore}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-xs text-gray-400">Total Thrown</div>
              <div className="text-2xl font-bold text-green-400">{playerScore.totalScore}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-xs text-gray-400">Average</div>
              <div className="text-2xl font-bold text-blue-400">{playerScore.average.toFixed(1)}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-xs text-gray-400">Darts Thrown</div>
              <div className="text-2xl font-bold text-purple-400">{playerScore.dartsThrown}</div>
            </div>
          </div>

          {/* Best/Worst Rounds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bestRound && (
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                <div className="text-xs text-green-400 font-semibold mb-1">🏆 Best Round</div>
                <div className="text-lg font-bold text-white">
                  R{bestRound.roundNumber}: {bestRound.totalThrown} points
                </div>
                <div className="text-xs text-gray-400">
                  {bestRound.startScore} → {bestRound.endScore}
                </div>
              </div>
            )}
            {worstRound && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                <div className="text-xs text-red-400 font-semibold mb-1">📉 Worst Round</div>
                <div className="text-lg font-bold text-white">
                  R{worstRound.roundNumber}: {worstRound.totalThrown} points
                </div>
                <div className="text-xs text-gray-400">
                  {worstRound.startScore} → {worstRound.endScore}
                </div>
              </div>
            )}
          </div>

          {/* Position Analysis */}
          {pointsBehindLeader > 0 && (
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
              <div className="text-xs text-yellow-400 font-semibold mb-2">📊 Position Analysis</div>
              <div className="space-y-1 text-sm text-gray-300">
                <div>Points behind leader: <span className="font-bold text-yellow-400">{pointsBehindLeader}</span></div>
                <div>Avg. per round: <span className="font-bold text-white">{averagePerRound.toFixed(1)}</span></div>
                <div>Score needed to lead: <span className="font-bold text-green-400">~{scoreNeededForLead}+</span></div>
              </div>
            </div>
          )}

          {/* Round by Round Table */}
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-600 px-4 py-2">
              <h3 className="font-semibold text-white">Round by Round Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-600 text-xs text-gray-300">
                  <tr>
                    <th className="px-3 py-2 text-left">Round</th>
                    <th className="px-3 py-2 text-center">Darts</th>
                    <th className="px-3 py-2 text-right">Score</th>
                    <th className="px-3 py-2 text-right">Start</th>
                    <th className="px-3 py-2 text-right">End</th>
                    <th className="px-3 py-2 text-right">Change</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {rounds.map((round) => {
                    const change = round.startScore - round.endScore;
                    return (
                      <tr key={round.roundNumber} className="border-t border-gray-600 hover:bg-gray-600/50">
                        <td className="px-3 py-2 font-semibold text-white">R{round.roundNumber}</td>
                        <td className="px-3 py-2 text-center text-gray-300">
                          {round.visits.flatMap(v => v.darts).map((dart, i) => {
                            const prefix = dart.multiplier === 'double' ? 'D' : dart.multiplier === 'triple' ? 'T' : '';
                            const num = dart.number === 25 && dart.multiplier === 'double' ? 'Bull' : dart.number;
                            return (
                              <span key={i} className="inline-block mx-1">
                                {prefix}{num}
                              </span>
                            );
                          })}
                        </td>
                        <td className="px-3 py-2 text-right font-bold text-green-400">{round.totalThrown}</td>
                        <td className="px-3 py-2 text-right text-gray-300">{round.startScore}</td>
                        <td className="px-3 py-2 text-right text-white font-semibold">{round.endScore}</td>
                        <td className={`px-3 py-2 text-right font-bold ${change > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                          {change > 0 ? '-' : ''}{Math.abs(change)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-600 font-bold text-sm">
                  <tr>
                    <td className="px-3 py-2 text-white" colSpan={2}>Total</td>
                    <td className="px-3 py-2 text-right text-green-400">{playerScore.totalScore}</td>
                    <td className="px-3 py-2 text-right text-gray-300">-</td>
                    <td className="px-3 py-2 text-right text-white">{playerScore.currentScore}</td>
                    <td className="px-3 py-2 text-right text-gray-300">-</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
