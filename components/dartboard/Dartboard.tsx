'use client';

import { useState, useRef, PointerEvent } from 'react';
import { calculateScore } from '@/lib/dartboard-utils';
import DartboardSVG from './DartboardSVG';
import type { ScoreSegment } from '@/types/game';

interface DartboardProps {
  onScore: (score: ScoreSegment) => void;
  disabled?: boolean;
  size?: number;
}

export default function Dartboard({ onScore, disabled = false }: DartboardProps) {
  const [lastHit, setLastHit] = useState<ScoreSegment | null>(null);
  const [hitAnimation, setHitAnimation] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = (event: PointerEvent<SVGSVGElement>) => {
    if (disabled) return;

    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const clientX = event.clientX;
    const clientY = event.clientY;

    // Calculate relative position accounting for expanded viewBox (-20 to 220)
    const x = ((clientX - rect.left) / rect.width) * 240 - 20;
    const y = ((clientY - rect.top) / rect.height) * 240 - 20;

    const score = calculateScore(x, y, 100, 100);

    if (score) {
      setLastHit(score);
      setHitAnimation(true);

      // Vibration feedback (if supported)
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }

      onScore(score);

      // Reset animation
      setTimeout(() => {
        setHitAnimation(false);
      }, 300);
    }
  };

  return (
    <div className="flex items-center justify-center no-select w-full aspect-square">
      <div
        className={`relative w-full h-full ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <DartboardSVG
          ref={svgRef}
          onPointerDown={handleClick}
          className={hitAnimation ? 'dart-hit' : ''}
        />

        {lastHit && hitAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="bg-black/90 text-white px-6 py-3 rounded-xl text-3xl font-bold shadow-lg border-2 border-green-500 animate-score-pop">
              {lastHit.multiplier === 'triple' && 'T'}
              {lastHit.multiplier === 'double' && 'D'}
              {lastHit.number === 25 && lastHit.multiplier === 'double' ? 'Bull' : lastHit.number}
              {' = '}
              <span className="text-green-400">{lastHit.score}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
