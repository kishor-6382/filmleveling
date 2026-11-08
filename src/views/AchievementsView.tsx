import React from 'react';
import { useGame } from '../context/GameContext';
import {
  Award,
  Trophy,
  Sparkles,
  Flame,
  Shield,
  Star,
  Crown,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements } = useGame();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const percent = Math.round((unlockedCount / totalCount) * 100);

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'monarch':
        return {
          label: 'MONARCH TIER',
          color: 'text-purple-300 border-purple-500 bg-purple-950/80 shadow-purple-glow',
        };
      case 'gold':
        return {
          label: 'GOLD TIER',
          color: 'text-amber-300 border-amber-400 bg-amber-950/80 shadow-[0_0_12px_rgba(251,191,36,0.3)]',
        };
      case 'silver':
        return {
          label: 'SILVER TIER',
          color: 'text-cyan-200 border-cyan-400 bg-cyan-950/80 shadow-[0_0_8px_rgba(0,212,255,0.2)]',
        };
      default:
        return {
          label: 'BRONZE TIER',
          color: 'text-emerald-200 border-emerald-500 bg-emerald-950/80',
        };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FFB547] mb-1">
            <Trophy className="w-4 h-4" />
            <span>HALL OF MONARCHS // TROPHIES & TITLES</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-2xl text-white">
            SYSTEM ACHIEVEMENTS & MEDALS
          </h2>
          <p className="text-xs text-[#8995AA] mt-1">
            Honor your creative milestones. Every achievement commemorates a proven breakthrough in your craft.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-xl bg-[#101827] border border-[#1E293B] text-right">
          <span className="text-[10px] font-mono text-[#8995AA] uppercase block">UNLOCKED TROPHIES</span>
          <span className="font-orbitron font-black text-lg text-[#FFB547]">
            {unlockedCount} / {totalCount} ({percent}%)
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] space-y-2">
        <div className="flex justify-between text-xs font-mono text-[#8995AA]">
          <span>COMPLETION RATE</span>
          <span className="font-bold text-white">{percent}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-[#080D18] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FFB547] via-[#00D4FF] to-purple-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((ach) => {
          const tierInfo = getTierBadge(ach.tier);

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-[#101827] border-[#00D4FF]/40 shadow-cyan-glow'
                  : 'bg-[#090D18] border-[#1E293B] opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${tierInfo.color}`}
                  >
                    {tierInfo.label}
                  </span>

                  {ach.unlocked ? (
                    <span className="text-[10px] font-mono text-[#35D49A] flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[#8995AA] flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      LOCKED
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      ach.unlocked
                        ? 'bg-gradient-to-br from-[#00D4FF]/20 to-[#785CFF]/30 border-[#00D4FF]/50 text-[#00D4FF]'
                        : 'bg-zinc-800/50 border-zinc-700 text-zinc-500'
                    }`}
                  >
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h3
                    className={`font-orbitron font-bold text-sm ${
                      ach.unlocked ? 'text-white' : 'text-[#8995AA]'
                    }`}
                  >
                    {ach.title}
                  </h3>
                </div>

                <p className="text-xs text-[#8995AA] leading-relaxed mt-2">
                  {ach.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-[10px] font-mono text-[#8995AA]">
                <span>CATEGORY: {ach.category}</span>
                {ach.unlockedAt && <span>EARNED: {ach.unlockedAt}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

