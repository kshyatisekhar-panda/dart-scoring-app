'use client';

import { forwardRef } from 'react';
import {
  DARTBOARD_NUMBERS,
  SEGMENT_ANGLE,
  HALF_SEGMENT,
  BULLSEYE_RADIUS,
  BULL_RADIUS,
  INNER_TRIPLE_RADIUS,
  OUTER_TRIPLE_RADIUS,
  INNER_DOUBLE_RADIUS,
  OUTER_DOUBLE_RADIUS,
  getSegmentColor,
  polarToCartesian,
} from '@/lib/dartboard-utils';

interface DartboardSVGProps {
  onPointerDown?: (event: React.PointerEvent<SVGSVGElement>) => void;
  className?: string;
}

const DartboardSVG = forwardRef<SVGSVGElement, DartboardSVGProps>(
  ({ onPointerDown, className }, ref) => {
    const centerX = 100;
    const centerY = 100;

    const createSegmentPath = (segmentIndex: number, innerRadius: number, outerRadius: number): string => {
      const startAngle = segmentIndex * SEGMENT_ANGLE - HALF_SEGMENT + 90;
      const endAngle = startAngle + SEGMENT_ANGLE;

      const outerStart = polarToCartesian(centerX, centerY, outerRadius, startAngle);
      const outerEnd = polarToCartesian(centerX, centerY, outerRadius, endAngle);
      const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngle);
      const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngle);

      return [
        `M ${outerStart.x} ${outerStart.y}`,
        `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
        'Z'
      ].join(' ');
    };

    return (
      <svg
        ref={ref}
        viewBox="-20 -20 240 240"
        className={`w-full h-full ${className}`}
        onPointerDown={onPointerDown}
        style={{ cursor: 'pointer', touchAction: 'none' }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Outer background circle */}
        <circle cx={centerX} cy={centerY} r={115} fill="#1a1a1a" />

        {/* Wire dividers between segments (thin lines) */}
        {DARTBOARD_NUMBERS.map((_, index) => {
          const angle = index * SEGMENT_ANGLE + 90;
          const innerPos = polarToCartesian(centerX, centerY, BULL_RADIUS, angle);
          const outerPos = polarToCartesian(centerX, centerY, OUTER_DOUBLE_RADIUS, angle);
          return (
            <line
              key={`wire-${index}`}
              x1={innerPos.x}
              y1={innerPos.y}
              x2={outerPos.x}
              y2={outerPos.y}
              stroke="#888"
              strokeWidth="0.3"
              style={{ pointerEvents: 'none' }}
            />
          );
        })}

        {/* Double ring segments */}
        {DARTBOARD_NUMBERS.map((_, index) => (
          <path
            key={`double-${index}`}
            d={createSegmentPath(index, INNER_DOUBLE_RADIUS, OUTER_DOUBLE_RADIUS)}
            fill={getSegmentColor(index, true)}
            stroke="#000"
            strokeWidth="0.2"
            className="transition-opacity hover:opacity-80"
          />
        ))}

        {/* Outer single segments */}
        {DARTBOARD_NUMBERS.map((_, index) => (
          <path
            key={`outer-single-${index}`}
            d={createSegmentPath(index, OUTER_TRIPLE_RADIUS, INNER_DOUBLE_RADIUS)}
            fill={getSegmentColor(index, false)}
            stroke="#000"
            strokeWidth="0.2"
            className="transition-opacity hover:opacity-80"
          />
        ))}

        {/* Triple ring segments */}
        {DARTBOARD_NUMBERS.map((_, index) => (
          <path
            key={`triple-${index}`}
            d={createSegmentPath(index, INNER_TRIPLE_RADIUS, OUTER_TRIPLE_RADIUS)}
            fill={getSegmentColor(index, true)}
            stroke="#000"
            strokeWidth="0.2"
            className="transition-opacity hover:opacity-80"
          />
        ))}

        {/* Inner single segments */}
        {DARTBOARD_NUMBERS.map((_, index) => (
          <path
            key={`inner-single-${index}`}
            d={createSegmentPath(index, BULL_RADIUS, INNER_TRIPLE_RADIUS)}
            fill={getSegmentColor(index, false)}
            stroke="#000"
            strokeWidth="0.2"
            className="transition-opacity hover:opacity-80"
          />
        ))}

        {/* Ring borders for better visibility */}
        <circle cx={centerX} cy={centerY} r={OUTER_DOUBLE_RADIUS} fill="none" stroke="#d4af37" strokeWidth="1" style={{ pointerEvents: 'none' }} />
        <circle cx={centerX} cy={centerY} r={INNER_DOUBLE_RADIUS} fill="none" stroke="#d4af37" strokeWidth="0.5" style={{ pointerEvents: 'none' }} />
        <circle cx={centerX} cy={centerY} r={OUTER_TRIPLE_RADIUS} fill="none" stroke="#d4af37" strokeWidth="1" style={{ pointerEvents: 'none' }} />
        <circle cx={centerX} cy={centerY} r={INNER_TRIPLE_RADIUS} fill="none" stroke="#d4af37" strokeWidth="0.5" style={{ pointerEvents: 'none' }} />

        {/* Outer Bull (green) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={BULL_RADIUS}
          fill="#16a34a"
          stroke="#d4af37"
          strokeWidth="0.8"
          className="transition-opacity hover:opacity-80"
        />

        {/* Bullseye (red) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={BULLSEYE_RADIUS}
          fill="#dc2626"
          stroke="#d4af37"
          strokeWidth="0.8"
          className="transition-opacity hover:opacity-80"
        />

        {/* Number labels */}
        {DARTBOARD_NUMBERS.map((number, index) => {
          const angle = index * SEGMENT_ANGLE + 90;
          const labelRadius = OUTER_DOUBLE_RADIUS + 11;
          const pos = polarToCartesian(centerX, centerY, labelRadius, angle);

          return (
            <text
              key={`label-${index}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize="11"
              fontWeight="bold"
              fontFamily="Arial, sans-serif"
              stroke="#000"
              strokeWidth="0.4"
              paintOrder="stroke"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {number}
            </text>
          );
        })}
      </svg>
    );
  }
);

DartboardSVG.displayName = 'DartboardSVG';

export default DartboardSVG;
