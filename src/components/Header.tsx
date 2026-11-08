import React from 'react';
import { useGame } from '../context/GameContext';
import { getRankBadgeColor } from '../utils/levelSystem';
import {
  Volume2,
  VolumeX,
  Flame,
  ShieldAlert,
  Coffee,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { player, updatePreferences, toggleRecoveryDay, currentSimulatedDate, setActiveTab } = useGame();
  const rankColors = getRankBadgeColor(player.rank);

  return (
    <header className="sticky top-0 z-40 bg-[#080B14]/90 backdrop-blur-md border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & System Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D4FF]/20 to-[#785CFF]/30 border border-[#00D4FF]/50 shadow-cyan-glow">
              <span className="font-orbitron font-black text-[#00D4FF] text-xl tracking-tighter">SL</span>
              <div className="absolute -inset-0.5 rounded-lg bg-[#00D4FF]/20 blur-sm -z-10 animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-1.5 py-0.5 rounded border border-[#00D4FF]/30">
                  SYSTEM ONLINE
                </span>
                <span className="text-xs font-mono text-[#8995AA] hidden sm:inline">v2.4 HUNTER PROTOCOL</span>
              </div>
              <h1 className="font-orbitron font-extrabold text-base sm:text-lg text-white tracking-wide flex items-center gap-1.5">
                FILMMAKER LEVELING SYSTEM
              </h1>
            </div>
          </div>

          {/* Player Level & XP summary */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Level & Rank Pill */}
            <div
              onClick={() => setActiveTab('player-status')}
              className={`flex items-center space-x-3 px-3 py-1.5 rounded-lg border ${rankColors.border} ${rankColors.bg} ${rankColors.glow} cursor-pointer hover:brightness-110 transition`}
            >
              <div className="text-right">
                <div className="text-[10px] font-mono text-[#8995AA] uppercase tracking-wider">LEVEL</div>
                <div className="font-orbitron font-black text-[#00D4FF] text-base leading-none">
                  {player.level.toString().padStart(3, '0')}
                </div>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <div className="text-[10px] font-mono text-[#8995AA] uppercase tracking-wider">RANK</div>
                <div className={`text-xs font-bold font-orbitron ${rankColors.text} leading-none`}>
                  {player.rank}
                </div>
              </div>
            </div>

            {/* Streak Counter */}
            <div
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#101827] border border-[#1E293B] cursor-pointer hover:border-[#FFB547]/50 transition"
              title={`Current Streak: ${player.currentStreak} days (Best: ${player.longestStreak})`}
              onClick={() => setActiveTab('analytics')}
            >
              <Flame className="w-4 h-4 text-[#FFB547] animate-pulse" />
              <div className="text-right">
                <span className="font-orbitron font-bold text-sm text-[#FFB547]">{player.currentStreak}</span>
                <span className="text-[10px] font-mono text-[#8995AA] ml-1">DAYS</span>
              </div>
            </div>

            {/* Penalty Active Alert Pill */}
            {player.activePenalty && (
              <button
                onClick={() => setActiveTab('punishment-quests')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500 text-red-200 animate-pulse shadow-danger-glow"
              >
                <ShieldAlert className="w-4 h-4 text-[#FF4D6D]" />
                <span className="text-xs font-bold font-orbitron">PENALTY ACTIVE</span>
              </button>
            )}

            {/* Recovery Day Pill */}
            {player.isRecoveryDayToday && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/60 text-emerald-300">
                <Coffee className="w-4 h-4 text-[#35D49A]" />
                <span className="text-xs font-bold font-orbitron">RECOVERY DAY</span>
              </div>
            )}
          </div>

          {/* Quick Controls */}
          <div className="flex items-center space-x-2">
            {/* Recovery Day Toggle */}
            <button
              onClick={toggleRecoveryDay}
              className={`p-2 rounded-lg border transition ${
                player.isRecoveryDayToday
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-success-glow'
                  : 'bg-[#101827] border-[#1E293B] text-[#8995AA] hover:text-white hover:border-[#35D49A]/50'
              }`}
              title={player.isRecoveryDayToday ? 'Recovery Day is ACTIVE (Click to toggle)' : 'Toggle Stress-Free Recovery Day'}
            >
              <Coffee className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => updatePreferences({ soundEnabled: !player.preferences.soundEnabled })}
              className={`p-2 rounded-lg border transition ${
                player.preferences.soundEnabled
                  ? 'bg-cyan-950/80 border-[#00D4FF] text-[#00D4FF] shadow-cyan-glow'
                  : 'bg-[#101827] border-[#1E293B] text-[#8995AA] hover:text-white hover:border-white/30'
              }`}
              title={player.preferences.soundEnabled ? 'Futuristic SFX: ON' : 'Futuristic SFX: MUTED (Click to enable)'}
            >
              {player.preferences.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Date Indicator */}
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#101827] border border-[#1E293B] text-xs font-mono text-[#8995AA]">
              <Calendar className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>{currentSimulatedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

