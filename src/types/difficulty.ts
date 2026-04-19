export type DifficultyLevel = 'debutant' | 'intermediaire' | 'avance' | 'expert';

export interface DifficultyConfig {
  level: DifficultyLevel;
  labelFr: string;
  emoji: string;
  description: string;
  tickIntervalMs: number;
  showHints: boolean;
  showSlTpSuggestions: boolean;
  showScenarioPreAnnounced: boolean;
  showSignalBox: boolean;
  scoringEnabled: boolean;
  leaderboardEnabled: boolean;
}

export const DIFFICULTY_ORDER: Record<DifficultyLevel, number> = {
  debutant: 0,
  intermediaire: 1,
  avance: 2,
  expert: 3,
};

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  debutant: {
    level: 'debutant',
    labelFr: 'Débutant',
    emoji: '🟢',
    description: 'Hints complets, vitesse lente, SL/TP suggérés',
    tickIntervalMs: 2000,
    showHints: true,
    showSlTpSuggestions: true,
    showScenarioPreAnnounced: true,
    showSignalBox: true,
    scoringEnabled: false,
    leaderboardEnabled: false,
  },
  intermediaire: {
    level: 'intermediaire',
    labelFr: 'Intermédiaire',
    emoji: '🟡',
    description: 'Hints partiels, vitesse normale, calcule ton SL/TP',
    tickIntervalMs: 800,
    showHints: true,
    showSlTpSuggestions: false,
    showScenarioPreAnnounced: true,
    showSignalBox: true,
    scoringEnabled: false,
    leaderboardEnabled: false,
  },
  avance: {
    level: 'avance',
    labelFr: 'Avancé',
    emoji: '🟠',
    description: 'Hints minimaux, vitesse rapide, scoring activé',
    tickIntervalMs: 300,
    showHints: false,
    showSlTpSuggestions: false,
    showScenarioPreAnnounced: false,
    showSignalBox: true,
    scoringEnabled: true,
    leaderboardEnabled: false,
  },
  expert: {
    level: 'expert',
    labelFr: 'Expert',
    emoji: '🔴',
    description: 'Sans hints, temps réel, classement mondial',
    tickIntervalMs: 50,
    showHints: false,
    showSlTpSuggestions: false,
    showScenarioPreAnnounced: false,
    showSignalBox: false,
    scoringEnabled: true,
    leaderboardEnabled: true,
  },
};
