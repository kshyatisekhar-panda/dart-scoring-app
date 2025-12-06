import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, GameSettings, ScoreSegment, Visit, PlayerGameScore, Round } from '@/types/game';
import { useHistoryStore } from './history-store';
import { usePlayerStore } from './player-store';

interface GameStore {
  currentGame: GameState | null;
  currentVisitDarts: ScoreSegment[];

  // Actions
  startGame: (settings: GameSettings, playerIds: string[]) => void;
  addScore: (playerId: string, dart: ScoreSegment) => void;
  submitVisit: (playerId: string, darts: ScoreSegment[]) => void;
  undoLastVisit: () => void;
  nextPlayer: () => void;
  endGame: (winnerId: string) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentGame: null,
      currentVisitDarts: [],

      startGame: (settings, playerIds) => {
        const gameId = `game-${Date.now()}`;
        const scores: Record<string, PlayerGameScore> = {};

        playerIds.forEach(playerId => {
          scores[playerId] = {
            playerId,
            currentScore: settings.startingScore || 501,
            dartsThrown: 0,
            totalScore: 0,
            average: 0,
            checkouts: 0,
            visits: [],
            rounds: [],
            ...(settings.gameType === 'cricket' && {
              cricketScores: { 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 25: 0 }
            })
          };
        });

        set({
          currentGame: {
            id: gameId,
            gameType: settings.gameType,
            settings,
            status: 'in-progress',
            players: playerIds,
            currentPlayerIndex: 0,
            scores,
            history: [{
              id: `history-${Date.now()}`,
              action: 'game-start',
              data: { settings, players: playerIds },
              timestamp: Date.now()
            }],
            startedAt: Date.now()
          }
        });
      },

      addScore: () => {
        // This function is now deprecated - use submitVisit instead
        // Kept for compatibility
      },

      submitVisit: (playerId, darts) => {
        const { currentGame } = get();
        if (!currentGame) return;

        const playerScore = currentGame.scores[playerId];
        if (!playerScore) return;

        // Calculate visit total
        const visitTotal = darts.reduce((sum, dart) => sum + dart.score, 0);

        // Calculate new score for X01 games
        let newScore = playerScore.currentScore;
        if (currentGame.gameType === '501' || currentGame.gameType === '301' || currentGame.gameType === '701') {
          newScore = playerScore.currentScore - visitTotal;
        }

        // Calculate average
        const totalDarts = playerScore.dartsThrown + darts.length;
        const average = totalDarts > 0 ? (playerScore.totalScore + visitTotal) / totalDarts * 3 : 0;

        // Create visit record
        const visit: Visit = {
          id: `visit-${Date.now()}`,
          playerId: playerId,
          darts: darts,
          total: visitTotal,
          remaining: newScore,
          timestamp: Date.now()
        };

        // Update visits
        const updatedVisits = [...playerScore.visits, visit];

        // Calculate current round number (each player's visit count)
        const currentRoundNumber = updatedVisits.length;

        // Create new round for this visit
        const newRound: Round = {
          roundNumber: currentRoundNumber,
          visits: [visit],
          totalThrown: visitTotal,
          startScore: playerScore.currentScore,
          endScore: newScore
        };

        const updatedRounds = [...playerScore.rounds, newRound];

        set({
          currentGame: {
            ...currentGame,
            scores: {
              ...currentGame.scores,
              [playerId]: {
                ...playerScore,
                currentScore: newScore,
                dartsThrown: totalDarts,
                totalScore: playerScore.totalScore + visitTotal,
                average: average,
                visits: updatedVisits,
                rounds: updatedRounds
              }
            }
          }
        });
      },

      nextPlayer: () => {
        const { currentGame } = get();
        if (!currentGame) return;

        const nextIndex = (currentGame.currentPlayerIndex + 1) % currentGame.players.length;

        set({
          currentGame: {
            ...currentGame,
            currentPlayerIndex: nextIndex
          }
        });
      },

      undoLastVisit: () => {
        const { currentGame } = get();
        if (!currentGame) return;

        // Implementation for undo functionality
        // This would revert the last visit and recalculate scores
      },

      endGame: (winnerId) => {
        const { currentGame } = get();
        if (!currentGame) return;

        const finishedGame = {
          ...currentGame,
          status: 'finished' as const,
          winner: winnerId,
          finishedAt: Date.now()
        };

        // Update player statistics
        const playerStore = usePlayerStore.getState();
        currentGame.players.forEach(playerId => {
          const player = playerStore.getPlayer(playerId);
          if (!player) return;

          const playerScore = currentGame.scores[playerId];
          const isWinner = playerId === winnerId;

          // Calculate new statistics
          const newGamesPlayed = player.statistics.gamesPlayed + 1;
          const newGamesWon = player.statistics.gamesWon + (isWinner ? 1 : 0);
          const newTotalDarts = player.statistics.totalDartsThrown + playerScore.dartsThrown;
          const newTotalScore = player.statistics.totalScore + playerScore.totalScore;
          const newAverageScore = newTotalDarts > 0 ? (newTotalScore / newTotalDarts) * 3 : 0;
          const newHighestScore = Math.max(player.statistics.highestScore, playerScore.totalScore);
          const newBest3DartAverage = Math.max(player.statistics.best3DartAverage, playerScore.average);

          // Count 180s, 140+, 100+
          let new180s = player.statistics.ton80s;
          let new140s = player.statistics.ton40s;
          let new100s = player.statistics.ton00s;

          playerScore.rounds.forEach(round => {
            if (round.totalThrown === 180) new180s++;
            else if (round.totalThrown >= 140) new140s++;
            else if (round.totalThrown >= 100) new100s++;
          });

          playerStore.updateStatistics(playerId, {
            gamesPlayed: newGamesPlayed,
            gamesWon: newGamesWon,
            totalDartsThrown: newTotalDarts,
            totalScore: newTotalScore,
            highestScore: newHighestScore,
            averageScore: newAverageScore,
            best3DartAverage: newBest3DartAverage,
            ton80s: new180s,
            ton40s: new140s,
            ton00s: new100s
          });
        });

        // Save to history
        useHistoryStore.getState().addGameToHistory(finishedGame);

        set({
          currentGame: finishedGame
        });
      },

      pauseGame: () => {
        const { currentGame } = get();
        if (!currentGame) return;

        set({
          currentGame: {
            ...currentGame,
            status: 'paused'
          }
        });
      },

      resumeGame: () => {
        const { currentGame } = get();
        if (!currentGame) return;

        set({
          currentGame: {
            ...currentGame,
            status: 'in-progress'
          }
        });
      },

      resetGame: () => {
        set({ currentGame: null });
      }
    }),
    {
      name: 'dart-game-storage',
    }
  )
);
