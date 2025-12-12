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
  const [errors, setErrors] = useState<{ gameName?: string; playerName?: string }>({});

  const validateGameName = (name: string) => {
    if (name.length === 0) return true; // Optional field
    if (name.length < 2) return 'Game name must be at least 2 characters';
    if (name.length > 50) return 'Game name must be less than 50 characters';
    if (!/^[a-zA-Z0-9\s\-_.,!()]+$/.test(name)) return 'Game name contains invalid characters';
    return true;
  };

  const validatePlayerName = (name: string) => {
    if (name.length === 0) return 'Player name is required';
    if (name.length < 2) return 'Player name must be at least 2 characters';
    if (name.length > 30) return 'Player name must be less than 30 characters';
    if (!/^[a-zA-Z0-9\s\-_.]+$/.test(name)) return 'Player name contains invalid characters';
    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      return 'A player with this name already exists';
    }
    return true;
  };

  const handleGameNameChange = (value: string) => {
    setGameName(value);
    const validation = validateGameName(value);
    setErrors(prev => ({
      ...prev,
      gameName: validation === true ? undefined : validation
    }));
  };

  const handlePlayerNameChange = (value: string) => {
    setNewPlayerName(value);
    if (value.trim()) {
      const validation = validatePlayerName(value.trim());
      setErrors(prev => ({
        ...prev,
        playerName: validation === true ? undefined : validation
      }));
    } else {
      setErrors(prev => ({ ...prev, playerName: undefined }));
    }
  };

  const handleAddPlayer = () => {
    const trimmedName = newPlayerName.trim();
    const validation = validatePlayerName(trimmedName);

    if (validation !== true) {
      setErrors(prev => ({ ...prev, playerName: validation }));
      return;
    }

    const player = addPlayer(trimmedName);
    setSelectedPlayers([...selectedPlayers, player.id]);
    setNewPlayerName('');
    setErrors(prev => ({ ...prev, playerName: undefined }));
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
          <div>
            <input
              type="text"
              value={gameName}
              onChange={(e) => handleGameNameChange(e.target.value)}
              placeholder="e.g., Friday Night Championship, League Round 3..."
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border ${
                errors.gameName ? 'border-red-500' : 'border-gray-600'
              } focus:border-green-500 focus:outline-none placeholder-gray-400`}
              maxLength={50}
            />
            {errors.gameName && (
              <p className="text-sm text-red-400 mt-1">{errors.gameName}</p>
            )}
          </div>
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
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => handlePlayerNameChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                placeholder="Enter player name"
                className={`flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border ${
                  errors.playerName ? 'border-red-500' : 'border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                maxLength={30}
              />
              <button
                onClick={handleAddPlayer}
                disabled={!!errors.playerName || !newPlayerName.trim()}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg"
              >
                Add
              </button>
            </div>
            {errors.playerName && (
              <p className="text-sm text-red-400">{errors.playerName}</p>
            )}
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
