'use client';

import { useState } from 'react';
import type { ScoreSegment, MultiplierType } from '@/types/game';

interface QuickScoreInputProps {
  onScore: (score: ScoreSegment) => void;
  disabled?: boolean;
}

const NUMBERS = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
];

export default function QuickScoreInput({ onScore, disabled = false }: QuickScoreInputProps) {
  const [multiplier, setMultiplier] = useState<MultiplierType>('single');

  const handleNumberClick = (number: number) => {
    if (disabled) return;

    const mult = number === 25 && multiplier === 'triple' ? 'single' : multiplier;
    const scoreValue = number * (mult === 'single' ? 1 : mult === 'double' ? 2 : 3);

    onScore({
      number,
      multiplier: mult,
      score: scoreValue,
    });
  };

  const handleMiss = () => {
    if (disabled) return;
    onScore({ number: 0, multiplier: 'single', score: 0 });
  };

  const multiplierLabel = (m: MultiplierType) =>
    m === 'single' ? 'Single' : m === 'double' ? 'Double' : 'Triple';

  const multiplierStyles = (m: MultiplierType, active: boolean) => {
    if (!active) return 'bg-gray-700 text-gray-300 hover:bg-gray-600';
    if (m === 'single') return 'bg-white text-gray-900 ring-2 ring-white';
    if (m === 'double') return 'bg-green-600 text-white ring-2 ring-green-400';
    return 'bg-red-600 text-white ring-2 ring-red-400';
  };

  return (
    <div className={`w-full ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Multiplier Toggle */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {(['single', 'double', 'triple'] as MultiplierType[]).map((m) => (
          <button
            key={m}
            onClick={() => setMultiplier(m)}
            className={`py-2.5 rounded-lg font-bold text-sm transition-all ${multiplierStyles(m, multiplier === m)}`}
          >
            {multiplierLabel(m)}
          </button>
        ))}
      </div>

      {/* Number Grid */}
      <div className="space-y-1.5">
        {NUMBERS.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
            {row.map((num) => {
              const mult = multiplier;
              const score = num * (mult === 'single' ? 1 : mult === 'double' ? 2 : 3);
              return (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className={`relative py-3 rounded-lg font-bold text-base transition-all active:scale-95 ${
                    multiplier === 'triple'
                      ? 'bg-red-900/60 hover:bg-red-800/80 text-white border border-red-700/50'
                      : multiplier === 'double'
                      ? 'bg-green-900/60 hover:bg-green-800/80 text-white border border-green-700/50'
                      : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600/50'
                  }`}
                >
                  <span>{num}</span>
                  {multiplier !== 'single' && (
                    <span className="absolute bottom-0.5 right-1 text-[10px] opacity-60">
                      {score}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bull and Miss row */}
      <div className="grid grid-cols-3 gap-1.5 mt-1.5">
        <button
          onClick={() => handleNumberClick(25)}
          className={`py-3 rounded-lg font-bold text-sm transition-all active:scale-95 ${
            multiplier === 'double'
              ? 'bg-red-700 hover:bg-red-600 text-white border border-red-500/50'
              : 'bg-green-800 hover:bg-green-700 text-white border border-green-600/50'
          }`}
        >
          {multiplier === 'double' ? 'BULL (50)' : 'Bull (25)'}
        </button>
        <button
          onClick={handleMiss}
          className="py-3 rounded-lg font-bold text-sm bg-gray-800 hover:bg-gray-700 text-gray-400 border border-gray-600/50 transition-all active:scale-95"
        >
          MISS (0)
        </button>
        <div className="flex items-center justify-center text-xs text-gray-500">
          {multiplier === 'single' ? '' : multiplier === 'double' ? '×2' : '×3'}
        </div>
      </div>
    </div>
  );
}
