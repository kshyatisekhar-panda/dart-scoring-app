'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/stores/game-store';
import { usePlayerStore } from '@/lib/stores/player-store';
import type { GameType, GameSettings } from '@/types/game';

export default function SetupPage() {
  const router = useRouter();
  const { startGame } = useGameStore();
  const { players, addPlayer } = usePlayerStore();

  const [gameType, setGameType] = useState<GameType>('501');
  const [gameName, setGameName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [doubleIn, setDoubleIn] = useState(false);
  const [doubleOut, setDoubleOut] = useState(true);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      const player = addPlayer(newPlayerName.trim());
      setSelectedPlayers([...selectedPlayers, player.id]);
      setNewPlayerName('');
    }
  };

  const togglePlayerSelection = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  const handleStartGame = () => {
    if (selectedPlayers.length < 1) {
      alert('Please select at least one player');
      return;
    }

    const settings: GameSettings = {
      gameType,
      gameName: gameName.trim() || undefined,
      ...(gameType === '501' || gameType === '301' || gameType === '701') && {
        startingScore: parseInt(gameType),
        doubleIn,
        doubleOut
      }
    };

    startGame(settings, selectedPlayers);
    router.push('/game');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Game Setup</h1>
          <button
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </button>
        </div>

        {/* Game Name */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Game/Tournament Name</h2>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="e.g., Friday Night Championship, League Round 3..."
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none placeholder-gray-400"
            maxLength={50}
          />
          <p className="text-sm text-gray-400">Optional - Give your game a memorable name</p>
        </div>

        {/* Game Type Selection */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Select Game Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(['501', '301', '701', 'cricket', 'around-the-clock'] as GameType[]).map((type) => (
              <button
                key={type}
                onClick={() => setGameType(type)}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  gameType === type
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Game Rules */}
        {(gameType === '501' || gameType === '301' || gameType === '701') && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Game Rules</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={doubleIn}
                  onChange={(e) => setDoubleIn(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
                <span>Double In (start with a double)</span>
              </label>
              <label className="flex items-center space-x-3 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={doubleOut}
                  onChange={(e) => setDoubleOut(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
                <span>Double Out (finish with a double)</span>
              </label>
            </div>
          </div>
        )}

        {/* Player Selection */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Select Players</h2>

          {/* Add New Player */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
              placeholder="Enter player name"
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAddPlayer}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Player List */}
          {players.length > 0 ? (
            <div className="space-y-2">
              {players.map((player) => (
                <button
                  key={player.id}
                  onClick={() => togglePlayerSelection(player.id)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    selectedPlayers.includes(player.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{player.name}</span>
                    <span className="text-sm">
                      {player.statistics.gamesPlayed} games • {player.statistics.gamesWon} wins
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">
              No players yet. Add your first player above.
            </p>
          )}

          <div className="text-sm text-gray-400">
            Selected: {selectedPlayers.length} player{selectedPlayers.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Start Game Button */}
        <button
          onClick={handleStartGame}
          disabled={selectedPlayers.length === 0}
          className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-xl rounded-lg transition-all transform hover:scale-105 disabled:transform-none"
        >
          Start Game
        </button>

        {/* Copyright Footer */}
        <div className="text-center pt-6 text-gray-500 text-xs">
          © {new Date().getFullYear()} Kshyatisekhar Panda
        </div>
      </div>
    </main>
  );
}
