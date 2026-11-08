import React from 'react';
import { useGame } from '../context/GameContext';
import {
  CalendarDays,
  Trophy,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  Plus,
  Flame,
  Award,
} from 'lucide-react';

export const WeeklyQuestsView: React.FC = () => {
  const { weeklyMissions, incrementWeeklyMission } = useGame();

  const completedCount = weeklyMissions.filter((m) => m.status === 'completed').length;
  const totalCount = weeklyMissions.length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FFB547] mb-1">
            <Trophy className="w-4 h-4" />
            <span>EXTENDED CAMPAIGN PROTOCOL // WEEK 01</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-2xl text-white">
            MAJOR WEEKLY MISSIONS
          </h2>
          <p className="text-xs text-[#8995AA] mt-1">
            Deep filmmaking projects that demand concentrated focus. Higher effort yields immense XP and substantial attribute evolution.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-[#101827] border border-[#1E293B] text-right">
          <span className="text-[10px] font-mono text-[#8995AA] uppercase block">WEEKLY CLEARANCE</span>
          <span className="font-orbitron font-black text-base text-[#FFB547]">
            {completedCount} / {totalCount} OBJECTIVES CLEARED
          </span>
        </div>
      </div>

      {/* Weekly Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {weeklyMissions.map((mission) => {
          const isDone = mission.status === 'completed';
          const percent = Math.min(100, Math.round((mission.currentValue / mission.targetValue) * 100));

          return (
            <div
              key={mission.id}
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isDone
                  ? 'bg-[#0E1A1A] border-[#35D49A]/50 shadow-success-glow'
                  : 'bg-[#101827] border-[#1E293B] hover:border-[#FFB547]/60'
              }`}
            >
              <div>
                {/* Top Line */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#162238] text-[#FFB547] border border-[#1E293B]">
                    {mission.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-[#8995AA] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#36AFFF]" />
                    <span>DEADLINE: {mission.deadlineDate}</span>
                  </span>
                </div>

                <h3 className={`font-orbitron font-bold text-lg ${isDone ? 'text-[#35D49A]' : 'text-white'}`}>
                  {mission.title}
                </h3>

                <p className="text-xs text-[#8995AA] mt-2 leading-relaxed">
                  {mission.description}
                </p>

                {/* Progress Bar & Value */}
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#8995AA]">GOAL PROGRESS</span>
                    <span className="font-bold text-white">
                      {mission.currentValue} / {mission.targetValue} {mission.unit}
                      <span className="text-[#FFB547] ml-2">({percent}%)</span>
                    </span>
                  </div>

                  <div className="h-3 w-full rounded-full bg-[#080B14] p-0.5 border border-[#1E293B] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isDone
                          ? 'bg-[#35D49A] shadow-success-glow'
                          : 'bg-gradient-to-r from-[#FFB547] to-[#F97316]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Reward & Manual Increment */}
              <div className="mt-6 pt-4 border-t border-[#1E293B] flex items-center justify-between">
                <div className="text-xs font-mono">
                  <span className="text-[10px] text-[#8995AA] uppercase block">REWARD</span>
                  <span className="font-orbitron font-extrabold text-[#00D4FF] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-[#00D4FF]" />
                    +{mission.xpReward} XP
                  </span>
                </div>

                <div>
                  {isDone ? (
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#35D49A]/20 text-[#35D49A] border border-[#35D49A]/40 text-xs font-mono font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>MISSION COMPLETE</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => incrementWeeklyMission(mission.id, 1)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold bg-[#162238] hover:bg-[#1E2E4A] text-white border border-[#1E293B] transition"
                        title="Add +1 unit of progress"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#FFB547]" />
                        <span>LOG +1 {mission.unit === 'Cumulative Push-ups' ? 'x15' : 'STEP'}</span>
                      </button>

                      {mission.targetValue === 1 && (
                        <button
                          onClick={() => incrementWeeklyMission(mission.id, 1)}
                          className="px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold bg-gradient-to-r from-[#FFB547] to-[#F97316] text-black hover:brightness-110 transition shadow-lg"
                        >
                          COMPLETE NOW
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

