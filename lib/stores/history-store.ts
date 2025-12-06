import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState } from '@/types/game';

interface HistoryStore {
  games: GameState[];

  // Actions
  addGameToHistory: (game: GameState) => void;
  deleteGameFromHistory: (gameId: string) => void;
  clearHistory: () => void;
  getGameById: (gameId: string) => GameState | undefined;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      games: [],

      addGameToHistory: (game) => {
        const { games } = get();

        // Check if game already exists (avoid duplicates)
        const existingIndex = games.findIndex(g => g.id === game.id);

        if (existingIndex !== -1) {
          // Update existing game
          const updatedGames = [...games];
          updatedGames[existingIndex] = game;
          set({ games: updatedGames });
        } else {
          // Add new game to the beginning of the list
          set({ games: [game, ...games] });
        }
      },

      deleteGameFromHistory: (gameId) => {
        const { games } = get();
        set({ games: games.filter(g => g.id !== gameId) });
      },

      clearHistory: () => {
        set({ games: [] });
      },

      getGameById: (gameId) => {
        const { games } = get();
        return games.find(g => g.id === gameId);
      }
    }),
    {
      name: 'dart-history-storage',
    }
  )
);
