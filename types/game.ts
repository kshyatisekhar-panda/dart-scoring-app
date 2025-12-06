export type GameType = '501' | '301' | '701' | 'cricket' | 'around-the-clock' | 'killer' | 'shanghai';

export type GameStatus = 'setup' | 'in-progress' | 'paused' | 'finished';

export type MultiplierType = 'single' | 'double' | 'triple';

export interface ScoreSegment {
  number: number;
  multiplier: MultiplierType;
  score: number;
}

export interface GameSettings {
  gameType: GameType;
  gameName?: string;
  startingScore?: number;
  doubleIn?: boolean;
  doubleOut?: boolean;
  sets?: number;
  legs?: number;
}

export interface GameState {
  id: string;
  gameType: GameType;
  settings: GameSettings;
  status: GameStatus;
  players: string[];
  currentPlayerIndex: number;
  scores: Record<string, PlayerGameScore>;
  history: GameHistory[];
  startedAt: number;
  finishedAt?: number;
  winner?: string;
}

export interface PlayerGameScore {
  playerId: string;
  currentScore: number;
  dartsThrown: number;
  totalScore: number;
  average: number;
  checkouts: number;
  visits: Visit[];
  rounds: Round[];
  cricketScores?: CricketScore;
}

export interface Round {
  roundNumber: number;
  visits: Visit[];
  totalThrown: number;
  startScore: number;
  endScore: number;
}

export interface Visit {
  id: string;
  playerId: string;
  darts: ScoreSegment[];
  total: number;
  remaining: number;
  timestamp: number;
}

export interface CricketScore {
  15: number;
  16: number;
  17: number;
  18: number;
  19: number;
  20: number;
  25: number; // Bull
}

export interface GameHistory {
  id: string;
  action: 'score' | 'undo' | 'player-change' | 'game-start' | 'game-end';
  playerId?: string;
  data: unknown;
  timestamp: number;
}
