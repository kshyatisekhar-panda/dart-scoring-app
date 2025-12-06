import { MultiplierType } from './game';

export interface DartboardSegment {
  number: number;
  angle: number;
  color: 'black' | 'white' | 'red' | 'green';
}

export interface DartboardSection {
  number: number;
  multiplier: MultiplierType;
  angle: number;
  isOuter: boolean;
}

export interface ClickPosition {
  x: number;
  y: number;
}

export interface DartboardHit extends DartboardSection {
  score: number;
}

export const DARTBOARD_NUMBERS = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5
] as const;

export const DARTBOARD_COLORS: ('black' | 'white')[] = [
  'black', 'white', 'black', 'white', 'black', 'white',
  'black', 'white', 'black', 'white', 'black', 'white',
  'black', 'white', 'black', 'white', 'black', 'white',
  'black', 'white'
];

export const OUTER_RING_COLORS: ('red' | 'green')[] = [
  'red', 'green', 'red', 'green', 'red', 'green',
  'red', 'green', 'red', 'green', 'red', 'green',
  'red', 'green', 'red', 'green', 'red', 'green',
  'red', 'green'
];
