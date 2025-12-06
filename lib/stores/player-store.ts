import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Player, PlayerStatistics } from '@/types/player';

interface PlayerStore {
  players: Player[];

  // Actions
  addPlayer: (name: string) => Player;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  updateStatistics: (id: string, stats: Partial<PlayerStatistics>) => void;
  getPlayer: (id: string) => Player | undefined;
  getAllPlayers: () => Player[];
}

const createDefaultStatistics = (): PlayerStatistics => ({
  gamesPlayed: 0,
  gamesWon: 0,
  totalDartsThrown: 0,
  totalScore: 0,
  highestScore: 0,
  averageScore: 0,
  checkoutPercentage: 0,
  best3DartAverage: 0,
  ton80s: 0,
  ton40s: 0,
  ton00s: 0
});

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      players: [],

      addPlayer: (name) => {
        const newPlayer: Player = {
          id: `player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name,
          createdAt: Date.now(),
          statistics: createDefaultStatistics()
        };

        set(state => ({
          players: [...state.players, newPlayer]
        }));

        return newPlayer;
      },

      removePlayer: (id) => {
        set(state => ({
          players: state.players.filter(p => p.id !== id)
        }));
      },

      updatePlayer: (id, updates) => {
        set(state => ({
          players: state.players.map(p =>
            p.id === id ? { ...p, ...updates } : p
          )
        }));
      },

      updateStatistics: (id, stats) => {
        set(state => ({
          players: state.players.map(p =>
            p.id === id
              ? { ...p, statistics: { ...p.statistics, ...stats } }
              : p
          )
        }));
      },

      getPlayer: (id) => {
        return get().players.find(p => p.id === id);
      },

      getAllPlayers: () => {
        return get().players;
      }
    }),
    {
      name: 'dart-players-storage',
    }
  )
);
