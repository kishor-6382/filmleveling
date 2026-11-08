import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PlayerProfile,
  SkillAttribute,
  DailyMission,
  WeeklyMission,
  PunishmentMission,
  FilmItem,
  SpecialMission,
  Achievement,
  HistoryDayRecord,
  ActiveTab,
  UserPreferences,
  SkillAttributeId,
  MissionCategory,
} from '../types';
import {
  getRankForLevel,
  getXpRequiredForLevel,
  getPlayerTitle,
  INITIAL_SKILL_ATTRIBUTES,
} from '../utils/levelSystem';
import {
  DAILY_MISSION_POOL,
  INITIAL_WEEKLY_MISSIONS,
  PENALTY_QUEST_TEMPLATES,
  SPECIAL_LEVEL_MISSIONS,
} from '../data/missionDatabase';
import { INITIAL_FILM_DATABASE } from '../data/filmDatabase';
import { INITIAL_ACHIEVEMENTS } from '../data/achievementsDatabase';
import { sounds } from '../utils/soundEffects';

interface LevelUpModalData {
  show: boolean;
  oldLevel: number;
  newLevel: number;
  xpGained: number;
  unlockedAbilities: string[];
}

interface GameContextType {
  player: PlayerProfile;
  attributes: SkillAttribute[];
  dailyMissions: DailyMission[];
  weeklyMissions: WeeklyMission[];
  penaltyMissionsHistory: PunishmentMission[];
  specialMissions: SpecialMission[];
  filmDatabase: FilmItem[];
  achievements: Achievement[];
  historyRecords: HistoryDayRecord[];
  activeTab: ActiveTab;
  levelUpModal: LevelUpModalData | null;
  missionConfirmModal: DailyMission | null;
  currentSimulatedDate: string;

  // Actions
  setActiveTab: (tab: ActiveTab) => void;
  openMissionConfirmModal: (mission: DailyMission) => void;
  closeMissionConfirmModal: () => void;
  confirmCompleteDailyMission: (missionId: string, notes?: string, evidence?: string) => void;
  incrementWeeklyMission: (missionId: string, amount?: number) => void;
  completePenaltyQuest: (submissionProof: string) => void;
  triggerPenaltyManually: () => void;
  toggleRecoveryDay: () => void;
  addCustomDailyMission: (mission: Partial<DailyMission>) => void;
  updateFilmItem: (filmId: string, partial: Partial<FilmItem>) => void;
  addFilmItem: (film: Omit<FilmItem, 'id'>) => void;
  completeSpecialMission: (missionId: string) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  closeLevelUpModal: () => void;
  advanceDaySimulation: (failMissions?: boolean) => void;
  resetToInitialState: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'filmmaker_leveling_system_state_v1';

function getTodayDateString(offsetDays = 0): string {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate missions for a specific date
function generateMissionsForDate(dateStr: string, isPenaltyActive = false): DailyMission[] {
  // Use date string hash to deterministically rotate missions
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  const categories: MissionCategory[] = [
    'Film Study',
    'Film Watching',
    'Screenplay & Story Writing',
    'Directing Skills',
    'Cinematography',
    'Cinematic Editing',
    'Physical Fitness',
  ];

  return categories.map((cat, idx) => {
    const matching = DAILY_MISSION_POOL.filter((m) => m.category === cat);
    const template = matching[(positiveHash + idx) % matching.length] || DAILY_MISSION_POOL[idx % DAILY_MISSION_POOL.length];

    return {
      id: `daily-${dateStr}-${idx}`,
      title: template.title,
      description: template.description,
      category: template.category,
      duration: template.duration,
      difficulty: template.difficulty,
      xpReward: template.xpReward,
      attributeRewards: template.attributeRewards,
      status: isPenaltyActive ? 'locked' : 'pending',
      dateAssigned: dateStr,
      mandatory: template.mandatory ?? (idx < 4),
      isCustom: false,
    };
  });
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const today = getTodayDateString();

  const [currentSimulatedDate, setCurrentSimulatedDate] = useState<string>(today);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [missionConfirmModal, setMissionConfirmModal] = useState<DailyMission | null>(null);
  const [levelUpModal, setLevelUpModal] = useState<LevelUpModalData | null>(null);

  // Player state
  const [player, setPlayer] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_player`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: 'Captain Kishor Ram',
      title: 'The Awakened Filmmaker',
      level: 1,
      rank: 'Beginner Hunter',
      totalXp: 320,
      currentLevelXp: 320,
      nextLevelXp: 500,
      currentStreak: 4,
      longestStreak: 4,
      completedMissionsTotal: 18,
      failedMissionsTotal: 1,
      punishmentMissionsTotal: 0,
      lastActiveDate: today,
      isRecoveryDayToday: false,
      activePenalty: null,
      preferences: {
        dailyAvailabilityMinutes: 60,
        preferredDifficulty: 'normal',
        recoveryDays: [0], // Sunday
        soundEnabled: false,
        accentTheme: 'electric-blue',
      },
    };
  });

  // 12 Attributes
  const [attributes, setAttributes] = useState<SkillAttribute[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_attributes`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_SKILL_ATTRIBUTES.map((attr, idx) => ({
      ...attr,
      level: 1 + (idx % 3),
      xp: 80 * (idx + 1),
      nextLevelXp: 250,
    }));
  });

  // Daily missions
  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_daily`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return generateMissionsForDate(today, false);
  });

  // Weekly missions
  const [weeklyMissions, setWeeklyMissions] = useState<WeeklyMission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_weekly`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_WEEKLY_MISSIONS;
  });

  // Penalty history
  const [penaltyMissionsHistory, setPenaltyMissionsHistory] = useState<PunishmentMission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_penalty_history`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  // Special Level Milestones
  const [specialMissions, setSpecialMissions] = useState<SpecialMission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_special`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return SPECIAL_LEVEL_MISSIONS;
  });

  // Films
  const [filmDatabase, setFilmDatabase] = useState<FilmItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_films`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_FILM_DATABASE;
  });

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_achievements`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_ACHIEVEMENTS;
  });

  // Activity History Records (for heatmap & analytics)
  const [historyRecords, setHistoryRecords] = useState<HistoryDayRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_history`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Seed the last 14 days of realistic activity
    const records: HistoryDayRecord[] = [];
    for (let i = 14; i >= 1; i--) {
      const d = getTodayDateString(-i);
      const dayOfWeek = new Date(d).getDay();
      const isSun = dayOfWeek === 0;
      records.push({
        date: d,
        status: isSun ? 'recovery' : i === 7 ? 'missed' : 'completed',
        completedMissions: isSun ? 0 : i === 7 ? 1 : 5,
        totalMissions: isSun ? 0 : 6,
        xpEarned: isSun ? 0 : i === 7 ? 100 : 650,
        pushups: isSun ? 0 : 35,
        screenplayPages: isSun ? 0 : 2,
        shotsRecorded: isSun ? 0 : 4,
        filmsWatched: isSun ? 1 : 0,
      });
    }
    return records;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_player`, JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_attributes`, JSON.stringify(attributes));
  }, [attributes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_daily`, JSON.stringify(dailyMissions));
  }, [dailyMissions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_weekly`, JSON.stringify(weeklyMissions));
  }, [weeklyMissions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_penalty_history`, JSON.stringify(penaltyMissionsHistory));
  }, [penaltyMissionsHistory]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_special`, JSON.stringify(specialMissions));
  }, [specialMissions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_films`, JSON.stringify(filmDatabase));
  }, [filmDatabase]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_achievements`, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_history`, JSON.stringify(historyRecords));
  }, [historyRecords]);

  // Sync sound setting
  useEffect(() => {
    sounds.setEnabled(player.preferences.soundEnabled);
  }, [player.preferences.soundEnabled]);

  // Check milestone special missions when player level changes
  useEffect(() => {
    setSpecialMissions((prev) =>
      prev.map((sm) => ({
        ...sm,
        unlocked: player.level >= sm.levelRequired,
      }))
    );
  }, [player.level]);

  // Trigger XP and Level Up logic
  const grantXP = useCallback((xpGain: number, attrRewards?: Partial<Record<SkillAttributeId, number>>) => {
    setPlayer((prev) => {
      let newTotalXp = prev.totalXp + xpGain;
      let newLevel = prev.level;
      let currentLvlXp = prev.currentLevelXp + xpGain;
      let reqXp = prev.nextLevelXp;
      let leveledUp = false;
      const initialLevel = prev.level;

      while (currentLvlXp >= reqXp && newLevel < 100) {
        currentLvlXp -= reqXp;
        newLevel += 1;
        reqXp = getXpRequiredForLevel(newLevel);
        leveledUp = true;
      }

      const newRank = getRankForLevel(newLevel);
      const newTitle = getPlayerTitle(newLevel);

      if (leveledUp) {
        sounds.playLevelUp();
        // Unlocked abilities announcement
        const abilities: string[] = [
          `Ascended to Level ${newLevel.toString().padStart(3, '0')}`,
          `Rank Evolution: ${newRank}`,
          `Attribute Maximum Threshold Expanded +15%`,
          `Special Milestone Questline Unlocked`,
        ];
        if (newLevel >= 100) {
          abilities.push('APOTHEOSIS UNLOCKED: Shadow Monarch Directorial Aura');
        }

        setLevelUpModal({
          show: true,
          oldLevel: initialLevel,
          newLevel: newLevel,
          xpGained: xpGain,
          unlockedAbilities: abilities,
        });
      }

      return {
        ...prev,
        totalXp: newTotalXp,
        level: newLevel,
        rank: newRank,
        title: newTitle,
        currentLevelXp: currentLvlXp,
        nextLevelXp: reqXp,
      };
    });

    // Update individual skill attributes
    if (attrRewards) {
      setAttributes((prev) =>
        prev.map((attr) => {
          const reward = attrRewards[attr.id];
          if (!reward) return attr;
          const updatedXp = attr.xp + reward;
          let updatedLevel = attr.level;
          let nextLevelXp = attr.nextLevelXp;

          if (updatedXp >= nextLevelXp) {
            updatedLevel += 1;
            nextLevelXp = Math.floor(nextLevelXp * 1.35);
          }

          return {
            ...attr,
            xp: updatedXp,
            level: updatedLevel,
            nextLevelXp: nextLevelXp,
          };
        })
      );
    }
  }, []);

  // Modal open/close for mission confirm
  const openMissionConfirmModal = useCallback((mission: DailyMission) => {
    sounds.playClick();
    setMissionConfirmModal(mission);
  }, []);

  const closeMissionConfirmModal = useCallback(() => {
    sounds.playClick();
    setMissionConfirmModal(null);
  }, []);

  const closeLevelUpModal = useCallback(() => {
    sounds.playClick();
    setLevelUpModal(null);
  }, []);

  // Confirm complete daily mission
  const confirmCompleteDailyMission = useCallback(
    (missionId: string, notes?: string, evidence?: string) => {
      if (player.activePenalty) {
        alert('ACCESS DENIED: Penalty Quest is active! Clear your penalty first to resume daily missions.');
        return;
      }

      const mission = dailyMissions.find((m) => m.id === missionId);
      if (!mission || mission.status === 'completed') return;

      sounds.playQuestComplete();

      // Mark completed
      setDailyMissions((prev) =>
        prev.map((m) =>
          m.id === missionId
            ? {
                ...m,
                status: 'completed',
                completedAt: new Date().toISOString(),
                userNotes: notes || m.userNotes,
                evidenceText: evidence || m.evidenceText,
              }
            : m
        )
      );

      // Increment stats
      setPlayer((prev) => ({
        ...prev,
        completedMissionsTotal: prev.completedMissionsTotal + 1,
      }));

      // Grant rewards
      grantXP(mission.xpReward, mission.attributeRewards);
      setMissionConfirmModal(null);

      // Check achievements
      setAchievements((prev) =>
        prev.map((ach) => {
          if (ach.id === 'ach-first-mission' && !ach.unlocked) {
            return { ...ach, unlocked: true, unlockedAt: getTodayDateString() };
          }
          return ach;
        })
      );
    },
    [dailyMissions, player.activePenalty, grantXP]
  );

  // Increment weekly mission progress
  const incrementWeeklyMission = useCallback(
    (missionId: string, amount = 1) => {
      sounds.playClick();
      setWeeklyMissions((prev) =>
        prev.map((m) => {
          if (m.id !== missionId || m.status === 'completed') return m;
          const nextVal = Math.min(m.targetValue, m.currentValue + amount);
          const isDone = nextVal >= m.targetValue;
          if (isDone) {
            sounds.playQuestComplete();
            grantXP(m.xpReward, m.attributeRewards);
          }
          return {
            ...m,
            currentValue: nextVal,
            status: isDone ? 'completed' : 'pending',
          };
        })
      );
    },
    [grantXP]
  );

  // Complete penalty quest
  const completePenaltyQuest = useCallback(
    (submissionProof: string) => {
      if (!player.activePenalty) return;

      sounds.playQuestComplete();
      const completedPenalty: PunishmentMission = {
        ...player.activePenalty,
        status: 'cleared',
        userSubmission: submissionProof,
        clearedAt: new Date().toISOString(),
      };

      setPenaltyMissionsHistory((prev) => [completedPenalty, ...prev]);

      // Unlock daily missions
      setDailyMissions((prev) =>
        prev.map((m) => ({
          ...m,
          status: m.status === 'locked' ? 'pending' : m.status,
        }))
      );

      // Clear player active penalty and award reward XP
      grantXP(player.activePenalty.xpReward);
      setPlayer((prev) => ({
        ...prev,
        activePenalty: null,
        punishmentMissionsTotal: prev.punishmentMissionsTotal + 1,
      }));

      // Unlock penalty survivor achievement
      setAchievements((prev) =>
        prev.map((ach) =>
          ach.id === 'ach-penalty-survivor' && !ach.unlocked
            ? { ...ach, unlocked: true, unlockedAt: getTodayDateString() }
            : ach
        )
      );
    },
    [player.activePenalty, grantXP]
  );

  // Trigger penalty manually (for testing or missed day)
  const triggerPenaltyManually = useCallback(() => {
    sounds.playPenaltyAlert();
    const template = PENALTY_QUEST_TEMPLATES[Math.floor(Math.random() * PENALTY_QUEST_TEMPLATES.length)];
    const penalty: PunishmentMission = {
      id: `penalty-${Date.now()}`,
      code: template.code,
      title: template.title,
      description: template.description,
      reason: template.reason,
      difficulty: template.difficulty,
      xpReward: template.xpReward,
      triggeredDate: currentSimulatedDate,
      deadlineHours: template.deadlineHours,
      status: 'active',
      tasks: template.tasks.map((t) => ({ ...t })),
    };

    setPlayer((prev) => ({
      ...prev,
      activePenalty: penalty,
      failedMissionsTotal: prev.failedMissionsTotal + 1,
      currentStreak: 0,
    }));

    // Lock daily missions
    setDailyMissions((prev) =>
      prev.map((m) => ({
        ...m,
        status: m.status === 'completed' ? 'completed' : 'locked',
      }))
    );

    setActiveTab('punishment-quests');
  }, [currentSimulatedDate]);

  // Toggle recovery day
  const toggleRecoveryDay = useCallback(() => {
    sounds.playClick();
    setPlayer((prev) => {
      const nextRecoveryState = !prev.isRecoveryDayToday;
      if (nextRecoveryState) {
        // Unlock recovery achievement
        setAchievements((aPrev) =>
          aPrev.map((ach) =>
            ach.id === 'ach-recovery-day' && !ach.unlocked
              ? { ...ach, unlocked: true, unlockedAt: getTodayDateString() }
              : ach
          )
        );
      }
      return {
        ...prev,
        isRecoveryDayToday: nextRecoveryState,
      };
    });
  }, []);

  // Add custom daily mission
  const addCustomDailyMission = useCallback((missionData: Partial<DailyMission>) => {
    sounds.playClick();
    const newMission: DailyMission = {
      id: `custom-${Date.now()}`,
      title: missionData.title || 'CUSTOM MISSION: Personal Practice',
      description: missionData.description || 'Custom self-directed filmmaking exercise.',
      category: missionData.category || 'Directing Skills',
      duration: missionData.duration || '30 mins',
      difficulty: missionData.difficulty || 'Normal',
      xpReward: missionData.xpReward || 100,
      attributeRewards: missionData.attributeRewards || { directing: 60, visual_storytelling: 40 },
      status: 'pending',
      dateAssigned: getTodayDateString(),
      mandatory: false,
      isCustom: true,
    };
    setDailyMissions((prev) => [newMission, ...prev]);
  }, []);

  // Update film item
  const updateFilmItem = useCallback((filmId: string, partial: Partial<FilmItem>) => {
    sounds.playClick();
    setFilmDatabase((prev) =>
      prev.map((f) => (f.id === filmId ? { ...f, ...partial } : f))
    );
  }, []);

  // Add film item
  const addFilmItem = useCallback((film: Omit<FilmItem, 'id'>) => {
    sounds.playClick();
    const newFilm: FilmItem = {
      ...film,
      id: `film-${Date.now()}`,
    };
    setFilmDatabase((prev) => [newFilm, ...prev]);
  }, []);

  // Complete special milestone mission
  const completeSpecialMission = useCallback(
    (missionId: string) => {
      const sm = specialMissions.find((m) => m.id === missionId);
      if (!sm || sm.completed || !sm.unlocked) return;

      sounds.playLevelUp();
      setSpecialMissions((prev) =>
        prev.map((m) =>
          m.id === missionId
            ? { ...m, completed: true, completedAt: new Date().toISOString() }
            : m
        )
      );
      grantXP(sm.rewardXp);
    },
    [specialMissions, grantXP]
  );

  // Update user preferences
  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    sounds.playClick();
    setPlayer((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...prefs,
      },
    }));
  }, []);

  // Simulate Day Advance (allows easy testing of daily progression, missed days, and penalties)
  const advanceDaySimulation = useCallback(
    (failMissions = false) => {
      const nextDate = getTodayDateString(1);
      setCurrentSimulatedDate(nextDate);

      // Check if current day was recovery
      if (player.isRecoveryDayToday) {
        // Recovery day protected: no penalty, streak maintained
        setDailyMissions(generateMissionsForDate(nextDate, false));
        setPlayer((prev) => ({
          ...prev,
          lastActiveDate: nextDate,
          isRecoveryDayToday: false,
        }));
        return;
      }

      // Check if mandatory missions were completed
      const pendingMandatory = dailyMissions.filter(
        (m) => m.mandatory && m.status !== 'completed'
      );

      if (failMissions || (pendingMandatory.length > 0 && !player.activePenalty)) {
        // Failed! Trigger penalty quest
        sounds.playPenaltyAlert();
        const template =
          PENALTY_QUEST_TEMPLATES[Math.floor(Math.random() * PENALTY_QUEST_TEMPLATES.length)];
        const penalty: PunishmentMission = {
          id: `penalty-${Date.now()}`,
          code: template.code,
          title: template.title,
          description: template.description,
          reason: 'Failed to complete mandatory missions before date deadline.',
          difficulty: template.difficulty,
          xpReward: template.xpReward,
          triggeredDate: nextDate,
          deadlineHours: template.deadlineHours,
          status: 'active',
          tasks: template.tasks.map((t) => ({ ...t })),
        };

        // Record missed day in history
        setHistoryRecords((prev) => [
          {
            date: currentSimulatedDate,
            status: 'missed',
            completedMissions: dailyMissions.filter((m) => m.status === 'completed').length,
            totalMissions: dailyMissions.length,
            xpEarned: 0,
            pushups: 0,
            screenplayPages: 0,
            shotsRecorded: 0,
            filmsWatched: 0,
          },
          ...prev,
        ]);

        setPlayer((prev) => ({
          ...prev,
          activePenalty: penalty,
          failedMissionsTotal: prev.failedMissionsTotal + 1,
          currentStreak: 0,
          lastActiveDate: nextDate,
        }));

        // Next day's missions generated but LOCKED
        setDailyMissions(generateMissionsForDate(nextDate, true));
        setActiveTab('punishment-quests');
      } else {
        // Success! Streak increments
        sounds.playQuestComplete();
        setPlayer((prev) => {
          const newStreak = prev.currentStreak + 1;
          return {
            ...prev,
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, prev.longestStreak),
            lastActiveDate: nextDate,
          };
        });

        // Record completed day in history
        setHistoryRecords((prev) => [
          {
            date: currentSimulatedDate,
            status: 'completed',
            completedMissions: dailyMissions.filter((m) => m.status === 'completed').length,
            totalMissions: dailyMissions.length,
            xpEarned: 600,
            pushups: 35,
            screenplayPages: 2,
            shotsRecorded: 4,
            filmsWatched: 1,
          },
          ...prev,
        ]);

        setDailyMissions(generateMissionsForDate(nextDate, false));
      }
    },
    [player, dailyMissions, currentSimulatedDate]
  );

  // Reset all state to defaults
  const resetToInitialState = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  // Export full JSON backup
  const exportDataJSON = useCallback(() => {
    const backup = {
      player,
      attributes,
      dailyMissions,
      weeklyMissions,
      penaltyMissionsHistory,
      specialMissions,
      filmDatabase,
      achievements,
      historyRecords,
      exportTimestamp: new Date().toISOString(),
    };
    return JSON.stringify(backup, null, 2);
  }, [
    player,
    attributes,
    dailyMissions,
    weeklyMissions,
    penaltyMissionsHistory,
    specialMissions,
    filmDatabase,
    achievements,
    historyRecords,
  ]);

  // Import JSON backup
  const importDataJSON = useCallback((jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.player && data.attributes) {
        setPlayer(data.player);
        setAttributes(data.attributes);
        if (data.dailyMissions) setDailyMissions(data.dailyMissions);
        if (data.weeklyMissions) setWeeklyMissions(data.weeklyMissions);
        if (data.penaltyMissionsHistory) setPenaltyMissionsHistory(data.penaltyMissionsHistory);
        if (data.specialMissions) setSpecialMissions(data.specialMissions);
        if (data.filmDatabase) setFilmDatabase(data.filmDatabase);
        if (data.achievements) setAchievements(data.achievements);
        if (data.historyRecords) setHistoryRecords(data.historyRecords);
        return true;
      }
    } catch (e) {
      console.error('Import failed', e);
    }
    return false;
  }, []);

  return (
    <GameContext.Provider
      value={{
        player,
        attributes,
        dailyMissions,
        weeklyMissions,
        penaltyMissionsHistory,
        specialMissions,
        filmDatabase,
        achievements,
        historyRecords,
        activeTab,
        levelUpModal,
        missionConfirmModal,
        currentSimulatedDate,
        setActiveTab,
        openMissionConfirmModal,
        closeMissionConfirmModal,
        confirmCompleteDailyMission,
        incrementWeeklyMission,
        completePenaltyQuest,
        triggerPenaltyManually,
        toggleRecoveryDay,
        addCustomDailyMission,
        updateFilmItem,
        addFilmItem,
        completeSpecialMission,
        updatePreferences,
        closeLevelUpModal,
        advanceDaySimulation,
        resetToInitialState,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

