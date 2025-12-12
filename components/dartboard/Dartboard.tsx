'use client';

import { useState, useRef, PointerEvent, useEffect } from 'react';
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <div className="flex flex-col items-center justify-center no-select w-full">
      {/* Zoom Controls - Only on mobile */}
      {isMobile && !disabled && (
        <div className="flex gap-3 mb-4 bg-gray-800 p-3 rounded-lg">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              isZoomed
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {isZoomed ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
                Zoom Out
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                Zoom In
              </>
            )}
          </button>
          <div className="flex items-center text-gray-400 text-sm">
            <span>Easier clicking on small screens</span>
          </div>
        </div>
      )}

      {/* Dartboard Container */}
      <div
        ref={containerRef}
        className={`relative w-full aspect-square transition-all duration-300 ${
          isZoomed ? 'scale-150 my-8' : ''
        }`}
      >
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
              <div className={`bg-black/90 text-white px-6 py-3 rounded-xl font-bold shadow-lg border-2 border-green-500 animate-score-pop ${
                isZoomed ? 'text-2xl' : 'text-3xl'
              }`}>
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

      {isZoomed && isMobile && (
        <div className="text-gray-400 text-sm mt-4 text-center">
          <p>Scroll if needed • Tap outside dartboard to pan</p>
        </div>
      )}
    </div>
  );
}
