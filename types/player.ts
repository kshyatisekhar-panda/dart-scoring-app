export interface Player {
  id: string;
  name: string;
  avatar?: string;
  createdAt: number;
  statistics: PlayerStatistics;
}

export interface PlayerStatistics {
  gamesPlayed: number;
  gamesWon: number;
  totalDartsThrown: number;
  totalScore: number;
  highestScore: number;
  averageScore: number;
  checkoutPercentage: number;
  favoriteDouble?: number;
  best3DartAverage: number;
  ton80s: number; // 180 scores
  ton40s: number; // 140-179 scores
  ton00s: number; // 100-139 scores
  cricketMarksPerRound?: number;
}

export interface PlayerProfile extends Player {
  achievements: Achievement[];
  gameHistory: string[]; // Game IDs
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}
