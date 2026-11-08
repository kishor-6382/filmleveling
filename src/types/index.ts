export type RankTier =
  | 'Beginner Hunter'
  | 'E-Rank Hunter'
  | 'D-Rank Hunter'
  | 'C-Rank Hunter'
  | 'B-Rank Hunter'
  | 'A-Rank Hunter'
  | 'S-Rank Hunter'
  | 'Elite Hunter'
  | 'National-Level Hunter'
  | 'Legendary Director'
  | 'Shadow Monarch / Master Filmmaker';

export type MissionCategory =
  | 'Film Study'
  | 'Film Watching'
  | 'Screenplay & Story Writing'
  | 'Directing Skills'
  | 'Cinematography'
  | 'Cinematic Editing'
  | 'Physical Fitness';

export type MissionDifficulty = 'Easy' | 'Normal' | 'Medium' | 'Hard' | 'Expert';

export type SkillAttributeId =
  | 'storytelling'
  | 'screenplay_writing'
  | 'directing'
  | 'cinematography'
  | 'visual_storytelling'
  | 'film_analysis'
  | 'cinematic_editing'
  | 'sound_design'
  | 'character_development'
  | 'creative_thinking'
  | 'physical_fitness'
  | 'general_film_knowledge';

export interface SkillAttribute {
  id: SkillAttributeId;
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  description: string;
  iconName: string;
  color: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  duration: string;
  difficulty: MissionDifficulty;
  xpReward: number;
  attributeRewards: Partial<Record<SkillAttributeId, number>>;
  status: 'pending' | 'completed' | 'failed' | 'locked';
  dateAssigned: string; // YYYY-MM-DD
  mandatory: boolean;
  completedAt?: string;
  userNotes?: string;
  evidenceText?: string;
  isCustom?: boolean;
}

export interface WeeklyMission {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  xpReward: number;
  attributeRewards: Partial<Record<SkillAttributeId, number>>;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadlineDate: string;
  status: 'pending' | 'completed' | 'failed';
  weekNumber: number;
  year: number;
}

export interface PenaltyTaskItem {
  id: string;
  text: string;
  done: boolean;
}

export interface PunishmentMission {
  id: string;
  code: string;
  title: string;
  description: string;
  reason: string;
  difficulty: 'Medium' | 'Hard' | 'Extreme';
  xpReward: number;
  triggeredDate: string;
  deadlineHours: number;
  status: 'active' | 'cleared';
  tasks: PenaltyTaskItem[];
  userSubmission?: string;
  clearedAt?: string;
}

export interface FilmItem {
  id: string;
  title: string;
  year: number;
  country: string;
  director: string;
  genre: string;
  category:
    | 'Screenwriting'
    | 'Nonlinear Storytelling'
    | 'Character Development'
    | 'Visual Storytelling'
    | 'Cinematography'
    | 'Editing'
    | 'Direction'
    | 'Emotional Storytelling'
    | 'Indian Commercial Filmmaking'
    | 'Experimental Cinema'
    | 'World Cinema';
  whyWatch: string;
  techniqueToStudy: string;
  difficulty: 'Accessible' | 'Intermediate' | 'Masterclass';
  watchStatus: 'To Watch' | 'Watching' | 'Completed';
  personalRating: number; // 0-10
  analysisNotes: string;
  posterBg: string; // Tailwind gradient or color
  watchedDate?: string;
}

export interface SpecialMission {
  id: string;
  levelRequired: number;
  title: string;
  description: string;
  rewardXp: number;
  rewardTitle?: string;
  unlocked: boolean;
  completed: boolean;
  completedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'monarch';
  unlocked: boolean;
  unlockedAt?: string;
  category: string;
}

export interface HistoryDayRecord {
  date: string; // YYYY-MM-DD
  status: 'completed' | 'partial' | 'missed' | 'recovery' | 'penalty_cleared';
  completedMissions: number;
  totalMissions: number;
  xpEarned: number;
  pushups: number;
  screenplayPages: number;
  shotsRecorded: number;
  filmsWatched: number;
}

export interface UserPreferences {
  dailyAvailabilityMinutes: number;
  preferredDifficulty: 'easy' | 'normal' | 'hard';
  recoveryDays: number[]; // 0=Sun, 6=Sat
  soundEnabled: boolean;
  accentTheme: 'electric-blue' | 'monarch-purple' | 'crimson-blood' | 'emerald-hunter';
}

export interface PlayerProfile {
  name: string;
  title: string;
  level: number;
  rank: RankTier;
  totalXp: number;
  currentLevelXp: number;
  nextLevelXp: number;
  currentStreak: number;
  longestStreak: number;
  completedMissionsTotal: number;
  failedMissionsTotal: number;
  punishmentMissionsTotal: number;
  lastActiveDate: string; // YYYY-MM-DD
  isRecoveryDayToday: boolean;
  activePenalty: PunishmentMission | null;
  preferences: UserPreferences;
}

export type ActiveTab =
  | 'dashboard'
  | 'daily-quests'
  | 'weekly-quests'
  | 'punishment-quests'
  | 'film-library'
  | 'story-lab'
  | 'directors-room'
  | 'cinematography'
  | 'editing-lab'
  | 'player-status'
  | 'achievements'
  | 'analytics';

