'use client';

import { useEffect, useState } from 'react';
import type { GameState } from '@/types/game';
import type { Player } from '@/types/player';
import ExportMenu from './ExportMenu';

interface WinnerCelebrationProps {
  winner: Player;
  gameState: GameState;
  onClose: () => void;
  getPlayer: (playerId: string) => Player | undefined;
}

export default function WinnerCelebration({ winner, gameState, onClose, getPlayer }: WinnerCelebrationProps) {
  const [confetti, setConfetti] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate confetti
    const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2
    }));
    setConfetti(confettiPieces);

    // Play celebration sound if available
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }, []);

  const winnerScore = gameState.scores[winner.id];
  const gameName = gameState.settings.gameName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 w-2 h-2 rounded-full animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            background: `hsl(${Math.random() * 360}, 70%, 60%)`
          }}
        />
      ))}

      {/* Winner Card */}
      <div className="bg-gradient-to-br from-yellow-600 via-yellow-500 to-orange-500 rounded-2xl p-8 max-w-2xl w-full shadow-2xl transform animate-bounce-in">
        {/* Trophy */}
        <div className="text-center mb-6">
          <div className="text-8xl animate-pulse">🏆</div>
        </div>

        {/* Winner Name */}
        <h1 className="text-5xl font-bold text-white text-center mb-2 drop-shadow-lg">
          {winner.name} Wins!
        </h1>

        {/* Tournament/Game Name */}
        {gameName && (
          <p className="text-3xl text-yellow-100 text-center mb-2 font-bold">
            {gameName}
          </p>
        )}

        {/* Game Type */}
        <p className="text-xl text-yellow-200/80 text-center mb-6">
          {gameState.gameType.toUpperCase()} Game
        </p>

        {/* Game Stats */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">{winnerScore.dartsThrown}</div>
              <div className="text-sm text-yellow-100">Darts Thrown</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{winnerScore.average.toFixed(1)}</div>
              <div className="text-sm text-yellow-100">Average</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{winnerScore.rounds.length}</div>
              <div className="text-sm text-yellow-100">Rounds</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{winnerScore.totalScore}</div>
              <div className="text-sm text-yellow-100">Total Score</div>
            </div>
          </div>
        </div>

        {/* Best Round */}
        {winnerScore.rounds.length > 0 && (() => {
          const bestRound = winnerScore.rounds.reduce((best, round) =>
            round.totalThrown > best.totalThrown ? round : best,
            winnerScore.rounds[0]
          );
          return (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 text-center">
              <div className="text-yellow-100 text-sm mb-1">Best Round</div>
              <div className="text-2xl font-bold text-white">
                R{bestRound.roundNumber}: {bestRound.totalThrown} points
              </div>
            </div>
          );
        })()}

        {/* Celebration Message */}
        <div className="text-center mb-6">
          <p className="text-xl text-white font-semibold">
            🎯 Congratulations! 🎯
          </p>
          {gameName && (
            <p className="text-yellow-100 mt-2">
              {gameName} Champion
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-white hover:bg-gray-100 text-yellow-600 font-bold rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Back to Home
          </button>
          <div className="flex-1 w-full">
            <div className="w-full">
              <ExportMenu currentGame={gameState} getPlayer={getPlayer} variant="full-width" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotate(5deg);
          }
          70% {
            transform: scale(0.9) rotate(-2deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-confetti-fall {
          animation: confetti-fall linear infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
