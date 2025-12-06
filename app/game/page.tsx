'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/stores/game-store';
import { usePlayerStore } from '@/lib/stores/player-store';
import Dartboard from '@/components/dartboard/Dartboard';
import QuickReference from '@/components/dartboard/QuickReference';
import RoundDetailsModal from '@/components/game/RoundDetailsModal';
import ExportMenu from '@/components/game/ExportMenu';
import WinnerCelebration from '@/components/game/WinnerCelebration';
import type { ScoreSegment } from '@/types/game';

export default function GamePage() {
  const router = useRouter();
  const { currentGame, submitVisit, nextPlayer, endGame, pauseGame } = useGameStore();
  const { getPlayer } = usePlayerStore();

  const [currentDarts, setCurrentDarts] = useState<ScoreSegment[]>([]);
  const [selectedPlayerForDetails, setSelectedPlayerForDetails] = useState<string | null>(null);
  const [showWinnerCelebration, setShowWinnerCelebration] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (!currentGame) {
      router.push('/setup');
    }
  }, [currentGame, router]);

  if (!currentGame) {
    return null;
  }

  const currentPlayerId = currentGame.players[currentGame.currentPlayerIndex];
  const currentPlayer = getPlayer(currentPlayerId);
  const playerScore = currentGame.scores[currentPlayerId];

  // Player theme colors
  const playerColors = [
    { bg: 'bg-blue-900/30', border: 'border-blue-500', text: 'text-blue-400', ring: 'ring-blue-400' },
    { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400', ring: 'ring-green-400' },
    { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-400', ring: 'ring-purple-400' },
    { bg: 'bg-orange-900/30', border: 'border-orange-500', text: 'text-orange-400', ring: 'ring-orange-400' },
    { bg: 'bg-pink-900/30', border: 'border-pink-500', text: 'text-pink-400', ring: 'ring-pink-400' },
    { bg: 'bg-cyan-900/30', border: 'border-cyan-500', text: 'text-cyan-400', ring: 'ring-cyan-400' },
    { bg: 'bg-yellow-900/30', border: 'border-yellow-500', text: 'text-yellow-400', ring: 'ring-yellow-400' },
    { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400', ring: 'ring-red-400' },
  ];

  const getPlayerColor = (index: number) => playerColors[index % playerColors.length];

  const handleScore = (score: ScoreSegment) => {
    if (currentDarts.length >= 3) return;

    const newDarts = [...currentDarts, score];
    setCurrentDarts(newDarts);

    // Auto-submit after 3 darts
    if (newDarts.length === 3) {
      setTimeout(() => {
        handleNextPlayer(newDarts);
      }, 1000);
    }
  };

  const handleNextPlayer = (darts?: ScoreSegment[]) => {
    const dartsToSubmit = darts || currentDarts;
    if (dartsToSubmit.length === 0) return;

    // Calculate new score for X01 games
    if (currentGame.gameType === '501' || currentGame.gameType === '301' || currentGame.gameType === '701') {
      const totalThrown = dartsToSubmit.reduce((sum, dart) => sum + dart.score, 0);
      const newScore = playerScore.currentScore - totalThrown;

      // Check for bust
      if (newScore < 0 || (currentGame.settings.doubleOut && newScore === 1)) {
        alert('Bust! Score remains the same.');
        setCurrentDarts([]);
        nextPlayer();
        return;
      } else if (newScore === 0) {
        // Check if finished with a double
        const lastDart = dartsToSubmit[dartsToSubmit.length - 1];
        if (currentGame.settings.doubleOut && lastDart.multiplier !== 'double') {
          alert('Must finish with a double!');
          setCurrentDarts([]);
          nextPlayer();
          return;
        } else {
          // Submit the winning visit before ending the game
          submitVisit(currentPlayerId, dartsToSubmit);
          endGame(currentPlayerId);
          setWinner(currentPlayerId);
          setShowWinnerCelebration(true);
          return;
        }
      }
    }

    // Submit the visit with the darts
    submitVisit(currentPlayerId, dartsToSubmit);
    setCurrentDarts([]);
    nextPlayer();
  };

  const handleSkipTurn = () => {
    setCurrentDarts([]);
    nextPlayer();
  };

  const calculateTotalThrown = () => {
    return currentDarts.reduce((sum, dart) => sum + dart.score, 0);
  };

  const formatDart = (dart: ScoreSegment) => {
    const prefix = dart.multiplier === 'double' ? 'D' : dart.multiplier === 'triple' ? 'T' : '';
    const number = dart.number === 25 && dart.multiplier === 'double' ? 'Bull' : dart.number;
    return `${prefix}${number}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-2 md:p-4">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {currentGame.settings.gameName || `${currentGame.gameType.toUpperCase()} Game`}
            </h1>
            {currentGame.settings.gameName && (
              <p className="text-sm text-gray-400">{currentGame.gameType.toUpperCase()} Game</p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <ExportMenu currentGame={currentGame} getPlayer={getPlayer} />
            <button
              onClick={() => pauseGame()}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold"
            >
              Pause
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
            >
              Exit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4">
          {/* Left Side - Dartboard */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-800 rounded-lg p-3 w-full flex flex-col items-center">
              {(() => {
                const currentPlayerIndex = currentGame.players.indexOf(currentPlayerId);
                const currentPlayerColors = getPlayerColor(currentPlayerIndex);
                return (
                  <div className={`w-full mb-2 p-3 rounded-lg ${currentPlayerColors.bg} ${currentPlayerColors.border} border-2 flex items-center justify-center gap-2`}>
                    <div className={`w-3 h-3 rounded-full ${currentPlayerColors.border.replace('border-', 'bg-')}`}></div>
                    <h2 className={`text-base font-semibold ${currentPlayerColors.text}`}>
                      {currentPlayer?.name}&apos;s Turn 🎯
                    </h2>
                  </div>
                );
              })()}

              <div className="flex justify-center mb-2 w-full px-2">
                <div className="w-full max-w-[min(90vw,500px)] lg:max-w-[550px]">
                  <Dartboard
                    onScore={handleScore}
                    disabled={currentDarts.length >= 3}
                    size={500}
                  />
                </div>
              </div>

              {/* Current Darts */}
              <div className="grid grid-cols-3 gap-2 mb-2 w-full max-w-[90vw] lg:max-w-[550px]">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-2 text-center"
                  >
                    {currentDarts[index] ? (
                      <>
                        <div className="text-lg font-bold text-white">
                          {formatDart(currentDarts[index])}
                        </div>
                        <div className="text-green-500 font-semibold text-xs">
                          {currentDarts[index].score}
                        </div>
                      </>
                    ) : (
                      <div className="text-2xl text-gray-600">-</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Turn Total */}
              <div className="bg-green-600 rounded-lg p-2 text-center mb-2 w-full max-w-[90vw] lg:max-w-[550px]">
                <div className="text-xs text-white/80">Turn Total</div>
                <div className="text-xl font-bold text-white">
                  {calculateTotalThrown()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full max-w-[90vw] lg:max-w-[550px]">
                <button
                  onClick={handleSkipTurn}
                  className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg"
                >
                  Skip Turn
                </button>
                <button
                  onClick={handleNextPlayer}
                  disabled={currentDarts.length === 0}
                  className="flex-1 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg"
                >
                  Next Player
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Scoreboard */}
          <div className="space-y-3">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-white mb-3">Scoreboard</h2>
              <div className="space-y-2">
                {currentGame.players
                  .map((playerId, originalIndex) => ({
                    playerId,
                    player: getPlayer(playerId),
                    score: currentGame.scores[playerId],
                    isCurrentPlayer: playerId === currentPlayerId,
                    originalIndex
                  }))
                  .sort((a, b) => {
                    // For X01 games, sort by current score (ascending - lowest first)
                    if (currentGame.gameType === '501' || currentGame.gameType === '301' || currentGame.gameType === '701') {
                      return a.score.currentScore - b.score.currentScore;
                    }
                    // For other games, keep original order
                    return 0;
                  })
                  .map(({ playerId, player, score, isCurrentPlayer, originalIndex }) => {
                    const colors = getPlayerColor(originalIndex);
                    return (
                    <div
                      key={playerId}
                      className={`p-3 rounded-lg border-2 transition-all ${colors.bg} ${colors.border} ${
                        isCurrentPlayer
                          ? `ring-4 ${colors.ring} shadow-lg`
                          : 'opacity-90'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${colors.border.replace('border-', 'bg-')} flex-shrink-0`}></div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-bold text-sm truncate ${colors.text}`}>
                              {player?.name}
                              {isCurrentPlayer && ' 🎯'}
                            </div>
                            <div className="text-xs text-white/70">
                              Avg: {score.average.toFixed(1)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-2">
                          <div className="text-2xl font-bold text-white">
                            {score.currentScore}
                          </div>
                          {score.visits.length > 0 && (
                            <div className="text-xs text-white/70">
                              Last: {score.visits[score.visits.length - 1].total}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Round info */}
                      {score.rounds.length > 0 && (
                        <div className="pt-2 border-t border-white/20 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/70">Rounds:</span>
                            <div className="flex gap-1 flex-wrap">
                              {score.rounds.slice(-3).map((round) => (
                                <span
                                  key={round.roundNumber}
                                  className={`${colors.bg} ${colors.border} border px-2 py-0.5 rounded ${colors.text} font-semibold`}
                                >
                                  R{round.roundNumber}: {round.totalThrown}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedPlayerForDetails(playerId)}
                            className={`w-full text-xs py-1 ${colors.bg} ${colors.border} border hover:opacity-80 ${colors.text} rounded transition-all font-semibold`}
                          >
                            📊 More Details
                          </button>
                        </div>
                      )}
                    </div>
                    );
                  })}
              </div>
            </div>

            {/* Game Info */}
            <div className="bg-gray-800 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-white mb-2">Game Info</h3>
              <div className="space-y-1 text-gray-300 text-xs">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-semibold">{currentGame.gameType.toUpperCase()}</span>
                </div>
                {currentGame.settings.doubleOut && (
                  <div className="flex justify-between">
                    <span>Double Out:</span>
                    <span className="text-green-400">✓</span>
                  </div>
                )}
                {currentGame.settings.doubleIn && (
                  <div className="flex justify-between">
                    <span>Double In:</span>
                    <span className="text-green-400">✓</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Reference - moved to sidebar */}
            <QuickReference />
          </div>
        </div>
      </div>

      {/* Round Details Modal */}
      {selectedPlayerForDetails && (
        <RoundDetailsModal
          playerName={getPlayer(selectedPlayerForDetails)?.name || 'Player'}
          playerScore={currentGame.scores[selectedPlayerForDetails]}
          isOpen={!!selectedPlayerForDetails}
          onClose={() => setSelectedPlayerForDetails(null)}
          leaderScore={Math.min(
            ...Object.values(currentGame.scores).map(s => s.currentScore)
          )}
        />
      )}

      {/* Winner Celebration */}
      {showWinnerCelebration && winner && (
        <WinnerCelebration
          winner={getPlayer(winner)!}
          gameState={currentGame}
          onClose={() => {
            setShowWinnerCelebration(false);
            router.push('/');
          }}
        />
      )}

      {/* Copyright Footer */}
      <div className="text-center py-4 text-gray-500 text-xs">
        © {new Date().getFullYear()} Kshyatisekhar Panda
      </div>
    </main>
  );
}
