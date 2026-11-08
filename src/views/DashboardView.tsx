import React from 'react';
import { useGame } from '../context/GameContext';
import { getRankBadgeColor } from '../utils/levelSystem';
import {
  Trophy,
  Flame,
  CheckCircle2,
  AlertOctagon,
  ShieldAlert,
  Coffee,
  Zap,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  Clapperboard,
  Camera,
  Scissors,
  Film,
  TrendingUp,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    player,
    dailyMissions,
    weeklyMissions,
    attributes,
    setActiveTab,
    openMissionConfirmModal,
    confirmCompleteDailyMission,
  } = useGame();

  const rankColors = getRankBadgeColor(player.rank);
  const xpPercent = Math.min(100, Math.floor((player.currentLevelXp / player.nextLevelXp) * 100));
  const completedTodayCount = dailyMissions.filter((m) => m.status === 'completed').length;
  const totalTodayCount = dailyMissions.length;
  const todayProgressPercent = totalTodayCount > 0 ? Math.round((completedTodayCount / totalTodayCount) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Recovery Day Special Banner */}
      {player.isRecoveryDayToday && (
        <div className="relative rounded-2xl overflow-hidden border border-emerald-500/50 bg-gradient-to-r from-emerald-950/80 via-[#101827] to-[#080B14] p-5 shadow-success-glow animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                  SANCTUARY PROTOCOL ACTIVE
                </span>
                <h3 className="font-orbitron font-extrabold text-lg sm:text-xl text-white">
                  RECOVERY DAY: EVEN THE STRONGEST HUNTERS NEED TO RECOVER.
                </h3>
                <p className="text-xs text-emerald-200/80 mt-1">
                  Filmmaking is an endurance marathon. No mandatory quotas, zero penalty triggers, and protected streaks today. Immerse yourself in a comfort film, rest your eyes, and recharge your creative well.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('film-library')}
              className="px-4 py-2 rounded-xl text-xs font-orbitron font-bold text-black bg-[#35D49A] hover:brightness-110 transition whitespace-nowrap"
            >
              BROWSE COMFORT FILMS
            </button>
          </div>
        </div>
      )}

      {/* Active Penalty Quest Urgent Alert Banner */}
      {player.activePenalty && (
        <div className="relative rounded-2xl overflow-hidden border border-red-500 bg-gradient-to-r from-red-950/90 via-[#1a080c] to-[#080B14] p-5 shadow-danger-glow animate-pulse">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-red-600/30 text-[#FF4D6D] border border-red-500">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase px-2 py-0.5 rounded bg-red-950 border border-red-500/50">
                    SYSTEM LOCKDOWN // PENALTY ACTIVE
                  </span>
                  <span className="text-xs font-mono text-red-300 font-bold">{player.activePenalty.code}</span>
                </div>
                <h3 className="font-orbitron font-black text-xl text-white mt-1">
                  DAILY QUEST FAILED! PENALTY QUEST GENERATED.
                </h3>
                <p className="text-xs text-red-200 mt-0.5">
                  Regular progression is locked until you clear your disciplinary task: "{player.activePenalty.title}".
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('punishment-quests')}
              className="px-5 py-2.5 rounded-xl text-xs font-orbitron font-black text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 transition whitespace-nowrap shadow-danger-glow"
            >
              ENTER PENALTY GATE
            </button>
          </div>
        </div>
      )}

      {/* Main Large Futuristic Player Level Card */}
      <div className="relative rounded-2xl overflow-hidden border border-[#00D4FF]/40 bg-gradient-to-b from-[#101827] via-[#0E1524] to-[#080B14] p-6 sm:p-8 shadow-cyan-glow">
        {/* Holographic backdrop lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#00d4ff10_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Player Identity */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className={`px-2.5 py-1 rounded-md text-xs font-orbitron font-bold border ${rankColors.border} ${rankColors.bg} ${rankColors.text} ${rankColors.glow}`}>
                {player.rank}
              </span>
              <span className="text-xs font-mono text-[#00D4FF] tracking-wider uppercase">
                {player.title}
              </span>
            </div>

            <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white tracking-wide">
              {player.name}
            </h2>

            <p className="text-xs font-mono text-[#8995AA]">
              SOLO LEVELING CINEMATOGRAPHIC PROTOCOL // REAL-LIFE RPG TRANSFORMATION
            </p>
          </div>

          {/* Level Big Badge */}
          <div className="flex items-center space-x-4 bg-[#080B14]/80 p-4 rounded-2xl border border-[#1E293B] shadow-inner">
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#8995AA] uppercase tracking-widest block">
                CURRENT LEVEL
              </span>
              <div className="font-orbitron font-black text-4xl sm:text-5xl text-[#00D4FF] tracking-tight leading-none drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]">
                LEVEL {player.level.toString().padStart(3, '0')}
              </div>
            </div>
            <div className="h-12 w-px bg-[#1E293B]" />
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#8995AA] uppercase tracking-widest block">
                NEXT TIER
              </span>
              <div className="font-orbitron font-bold text-lg sm:text-xl text-[#F5F7FF]">
                LV. {(player.level + 1).toString().padStart(3, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Visual XP Progress Bar */}
        <div className="mt-6 pt-6 border-t border-[#1E293B] space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#8995AA] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>EXPERIENCE POINTS (XP)</span>
            </span>
            <span className="text-white font-bold">
              <span className="text-[#00D4FF]">{player.currentLevelXp.toLocaleString()}</span> / {player.nextLevelXp.toLocaleString()} XP
              <span className="text-[#8995AA] ml-2">({xpPercent}%)</span>
            </span>
          </div>

          {/* Glowing bar */}
          <div className="h-4 w-full rounded-full bg-[#080B14] p-0.5 border border-[#1E293B] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] via-[#36AFFF] to-[#785CFF] shadow-[0_0_12px_rgba(0,212,255,0.7)] transition-all duration-500"
              style={{ width: `${Math.max(4, xpPercent)}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-[#8995AA]">
            <span>TOTAL ACCUMULATED XP: {player.totalXp.toLocaleString()} XP</span>
            <span>XP TO NEXT ASCENSION: {(player.nextLevelXp - player.currentLevelXp).toLocaleString()} XP</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1E293B]/70">
          <div className="p-3 rounded-xl bg-[#090E1A] border border-[#1E293B]">
            <div className="flex items-center space-x-1.5 text-xs text-[#8995AA]">
              <Flame className="w-3.5 h-3.5 text-[#FFB547]" />
              <span>CURRENT STREAK</span>
            </div>
            <div className="font-orbitron font-extrabold text-lg text-white mt-1">
              {player.currentStreak} <span className="text-xs font-mono text-[#FFB547]">DAYS</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#090E1A] border border-[#1E293B]">
            <div className="flex items-center space-x-1.5 text-xs text-[#8995AA]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#35D49A]" />
              <span>COMPLETED QUESTS</span>
            </div>
            <div className="font-orbitron font-extrabold text-lg text-white mt-1">
              {player.completedMissionsTotal}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#090E1A] border border-[#1E293B]">
            <div className="flex items-center space-x-1.5 text-xs text-[#8995AA]">
              <AlertOctagon className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span>FAILED QUOTAS</span>
            </div>
            <div className="font-orbitron font-extrabold text-lg text-white mt-1">
              {player.failedMissionsTotal}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#090E1A] border border-[#1E293B]">
            <div className="flex items-center space-x-1.5 text-xs text-[#8995AA]">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              <span>PENALTIES SURVIVED</span>
            </div>
            <div className="font-orbitron font-extrabold text-lg text-white mt-1">
              {player.punishmentMissionsTotal}
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Today's Quests & Weekly Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Daily Missions (2 Cols Wide) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <h3 className="font-orbitron font-bold text-lg text-white">TODAY'S QUESTS</h3>
              <span className="text-xs font-mono text-[#8995AA]">
                ({completedTodayCount}/{totalTodayCount} Cleared)
              </span>
            </div>
            <button
              onClick={() => setActiveTab('daily-quests')}
              className="text-xs font-mono text-[#00D4FF] hover:underline flex items-center gap-1"
            >
              <span>VIEW FULL QUEST LOG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Daily missions list */}
          <div className="space-y-3">
            {dailyMissions.slice(0, 4).map((mission) => {
              const isDone = mission.status === 'completed';
              const isLocked = mission.status === 'locked';

              return (
                <div
                  key={mission.id}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    isDone
                      ? 'bg-[#0E1B24]/60 border-[#35D49A]/40'
                      : isLocked
                      ? 'bg-red-950/20 border-red-900/50 opacity-70'
                      : 'bg-[#101827] border-[#1E293B] hover:border-[#00D4FF]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#162238] text-[#8995AA] uppercase">
                          {mission.category}
                        </span>
                        {mission.mandatory && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/40">
                            MANDATORY
                          </span>
                        )}
                        <span className="text-xs font-mono text-[#8995AA] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#36AFFF]" />
                          {mission.duration}
                        </span>
                      </div>
                      <h4 className={`font-orbitron font-bold text-sm ${isDone ? 'line-through text-[#8995AA]' : 'text-white'}`}>
                        {mission.title}
                      </h4>
                      <p className="text-xs text-[#8995AA] line-clamp-2">
                        {mission.description}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0 space-y-2">
                      <div className="text-xs font-orbitron font-bold text-[#00D4FF]">
                        +{mission.xpReward} XP
                      </div>

                      {isDone ? (
                        <div className="flex items-center space-x-1 text-xs font-mono text-[#35D49A]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>CLEARED</span>
                        </div>
                      ) : (
                        <button
                          disabled={isLocked}
                          onClick={() => openMissionConfirmModal(mission)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition ${
                            isLocked
                              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-[#00D4FF] to-[#36AFFF] text-black hover:brightness-110 shadow-cyan-glow'
                          }`}
                        >
                          {isLocked ? 'LOCKED' : 'VERIFY & CLAIM'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Creator Bar */}
          <div className="p-3 rounded-xl bg-[#0D1424] border border-[#1E293B] flex items-center justify-between text-xs">
            <span className="text-[#8995AA] font-mono">Need a custom training assignment?</span>
            <button
              onClick={() => setActiveTab('daily-quests')}
              className="text-[#00D4FF] font-orbitron font-bold hover:underline"
            >
              + ADD CUSTOM MISSION
            </button>
          </div>
        </div>

        {/* Right Column: Weekly Quests & Skill Attributes Preview */}
        <div className="space-y-6">
          {/* Weekly Missions Card */}
          <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-orbitron font-bold text-sm text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#FFB547]" />
                <span>MAJOR WEEKLY MISSIONS</span>
              </h3>
              <button
                onClick={() => setActiveTab('weekly-quests')}
                className="text-[11px] font-mono text-[#00D4FF] hover:underline"
              >
                VIEW ALL
              </button>
            </div>

            <div className="space-y-3">
              {weeklyMissions.slice(0, 3).map((wm) => {
                const percent = Math.min(100, Math.round((wm.currentValue / wm.targetValue) * 100));
                return (
                  <div key={wm.id} className="p-3 rounded-xl bg-[#090D18] border border-[#1E293B] space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-orbitron font-semibold text-white truncate max-w-[170px]">
                        {wm.title}
                      </span>
                      <span className="font-orbitron font-bold text-[#FFB547]">
                        +{wm.xpReward} XP
                      </span>
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-[#8995AA]">
                      <span>Progress</span>
                      <span>
                        {wm.currentValue} / {wm.targetValue} {wm.unit} ({percent}%)
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-[#162238] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FFB547] to-[#F97316] rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Filmmaking Skill Attributes */}
          <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-orbitron font-bold text-sm text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00D4FF]" />
                <span>CORE ATTRIBUTES</span>
              </h3>
              <button
                onClick={() => setActiveTab('player-status')}
                className="text-[11px] font-mono text-[#00D4FF] hover:underline"
              >
                ALL 12 SKILLS
              </button>
            </div>

            <div className="space-y-3">
              {attributes.slice(0, 4).map((attr) => {
                const percent = Math.min(100, Math.round((attr.xp / attr.nextLevelXp) * 100));
                return (
                  <div key={attr.id} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: attr.color }} />
                        {attr.name}
                      </span>
                      <span className="font-orbitron font-bold text-[#00D4FF]">
                        LV. {attr.level}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#162238] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%`, backgroundColor: attr.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filmmaking Specialized Labs Fast Travel Dock */}
      <div className="space-y-3 pt-2">
        <h3 className="font-orbitron font-bold text-sm text-[#8995AA] uppercase tracking-wider">
          FILMMAKER WORKSPACES & INTERACTIVE LABS
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => setActiveTab('story-lab')}
            className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#00D4FF] transition-all duration-200 text-left group"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 text-[#36AFFF] w-fit mb-2 group-hover:scale-110 transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="font-orbitron font-bold text-xs text-white">STORY LAB</div>
            <div className="text-[10px] text-[#8995AA] mt-0.5">Beat sheets & Logline vault</div>
          </button>

          <button
            onClick={() => setActiveTab('directors-room')}
            className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#785CFF] transition-all duration-200 text-left group"
          >
            <div className="p-2 rounded-lg bg-purple-500/10 text-[#785CFF] w-fit mb-2 group-hover:scale-110 transition">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div className="font-orbitron font-bold text-xs text-white">DIRECTOR'S ROOM</div>
            <div className="text-[10px] text-[#8995AA] mt-0.5">Shot lists & Blocking grid</div>
          </button>

          <button
            onClick={() => setActiveTab('cinematography')}
            className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#35D49A] transition-all duration-200 text-left group"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-[#35D49A] w-fit mb-2 group-hover:scale-110 transition">
              <Camera className="w-5 h-5" />
            </div>
            <div className="font-orbitron font-bold text-xs text-white">CINEMATOGRAPHY</div>
            <div className="text-[10px] text-[#8995AA] mt-0.5">Lenses & Lighting ratios</div>
          </button>

          <button
            onClick={() => setActiveTab('editing-lab')}
            className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#FF4D6D] transition-all duration-200 text-left group"
          >
            <div className="p-2 rounded-lg bg-rose-500/10 text-[#FF4D6D] w-fit mb-2 group-hover:scale-110 transition">
              <Scissors className="w-5 h-5" />
            </div>
            <div className="font-orbitron font-bold text-xs text-white">EDITING LAB</div>
            <div className="text-[10px] text-[#8995AA] mt-0.5">Rhythm & Cut types</div>
          </button>

          <button
            onClick={() => setActiveTab('film-library')}
            className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#FFB547] transition-all duration-200 text-left group"
          >
            <div className="p-2 rounded-lg bg-amber-500/10 text-[#FFB547] w-fit mb-2 group-hover:scale-110 transition">
              <Film className="w-5 h-5" />
            </div>
            <div className="font-orbitron font-bold text-xs text-white">FILM LIBRARY</div>
            <div className="text-[10px] text-[#8995AA] mt-0.5">Masterclass analysis notes</div>
          </button>
        </div>
      </div>
    </div>
  );
};

