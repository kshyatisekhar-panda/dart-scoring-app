import { DARTBOARD_NUMBERS, DARTBOARD_COLORS, OUTER_RING_COLORS } from '@/types/dartboard';
import type { MultiplierType, ScoreSegment } from '@/types/game';

// Re-export constants from types
export { DARTBOARD_NUMBERS, DARTBOARD_COLORS, OUTER_RING_COLORS };

export const SEGMENT_ANGLE = 360 / 20;
export const HALF_SEGMENT = SEGMENT_ANGLE / 2;

// Dartboard ring radii (relative to viewBox size of 200)
export const BULLSEYE_RADIUS = 6;
export const BULL_RADIUS = 15;
export const INNER_TRIPLE_RADIUS = 65;
export const OUTER_TRIPLE_RADIUS = 73;
export const INNER_DOUBLE_RADIUS = 90;
export const OUTER_DOUBLE_RADIUS = 98;

export function getSegmentNumber(angle: number): number {
  // Normalize angle to 0-360
  let normalizedAngle = ((angle % 360) + 360) % 360;

  // Add half-segment offset so the segment boundary aligns correctly
  // (atan2 angle 0° = right, which is where segment index 0 is rendered in the SVG)
  normalizedAngle = (normalizedAngle + HALF_SEGMENT) % 360;

  const segmentIndex = Math.floor(normalizedAngle / SEGMENT_ANGLE);
  return DARTBOARD_NUMBERS[segmentIndex];
}

export function getMultiplier(radius: number): MultiplierType {
  if (radius <= BULLSEYE_RADIUS) return 'double'; // Bullseye counts as double
  if (radius <= BULL_RADIUS) return 'single'; // Bull
  if (radius >= INNER_TRIPLE_RADIUS && radius <= OUTER_TRIPLE_RADIUS) return 'triple';
  if (radius >= INNER_DOUBLE_RADIUS && radius <= OUTER_DOUBLE_RADIUS) return 'double';
  return 'single';
}

export function calculateScore(x: number, y: number, centerX: number, centerY: number): ScoreSegment | null {
  const dx = x - centerX;
  const dy = y - centerY;
  const radius = Math.sqrt(dx * dx + dy * dy);

  // Check if outside dartboard
  if (radius > OUTER_DOUBLE_RADIUS) {
    return null;
  }

  // Calculate angle in degrees
  const angle = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;

  let number: number;
  let multiplier: MultiplierType;

  // Handle bullseye and bull
  if (radius <= BULL_RADIUS) {
    number = 25;
    multiplier = radius <= BULLSEYE_RADIUS ? 'double' : 'single';
  } else {
    number = getSegmentNumber(angle);
    multiplier = getMultiplier(radius);
  }

  const score = number * (multiplier === 'single' ? 1 : multiplier === 'double' ? 2 : 3);

  return {
    number,
    multiplier,
    score,
  };
}

export function getSegmentColor(segmentIndex: number, isOuterRing: boolean): string {
  if (isOuterRing) {
    return OUTER_RING_COLORS[segmentIndex] === 'red' ? '#dc2626' : '#16a34a';
  }
  return DARTBOARD_COLORS[segmentIndex] === 'black' ? '#1a1a1a' : '#f5f5f5';
}

export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}
