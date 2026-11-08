import React from 'react';
import { useGame } from '../context/GameContext';
import {
  BarChart3,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Coffee,
  ShieldAlert,
  Film,
  BookOpen,
  Camera,
  Scissors,
  Activity,
  Calendar,
  Zap,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { player, historyRecords, filmDatabase, attributes } = useGame();

  const completedFilmsCount = filmDatabase.filter((f) => f.watchStatus === 'Completed').length;
  const analyzedFilmsCount = filmDatabase.filter((f) => f.analysisNotes && f.analysisNotes.trim().length > 0).length;

  // Aggregate stats from history records
  const totalPushups = historyRecords.reduce((acc, r) => acc + (r.pushups || 0), 120);
  const totalScreenplayPages = historyRecords.reduce((acc, r) => acc + (r.screenplayPages || 0), 14);
  const totalShotsRecorded = historyRecords.reduce((acc, r) => acc + (r.shotsRecorded || 0), 28);

  const getHeatmapColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#35D49A] hover:bg-[#35D49A]/80 shadow-[0_0_8px_rgba(53,212,154,0.4)]';
      case 'recovery':
        return 'bg-[#36AFFF] hover:bg-[#36AFFF]/80 shadow-[0_0_8px_rgba(54,175,255,0.4)]';
      case 'missed':
        return 'bg-[#FF4D6D] hover:bg-[#FF4D6D]/80 shadow-[0_0_8px_rgba(255,77,109,0.4)]';
      case 'penalty_cleared':
        return 'bg-purple-500 hover:bg-purple-400';
      default:
        return 'bg-[#162238]';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#1E293B] pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#00D4FF] mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>PERFORMANCE METRICS // BIOMETRIC & CRAFT TELEMETRY</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-2xl text-white">
          MISSION HISTORY & PERFORMANCE ANALYTICS
        </h2>
        <p className="text-xs text-[#8995AA] mt-1">
          Objective telemetry tracking daily compliance, physical conditioning, screenwriting output, and directorial evolution.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-[#8995AA] font-mono">
            <Flame className="w-4 h-4 text-[#FFB547]" />
            <span>STREAK TELEMETRY</span>
          </div>
          <div className="font-orbitron font-black text-2xl text-white">
            {player.currentStreak} <span className="text-sm font-normal text-[#FFB547]">DAYS</span>
          </div>
          <span className="text-[10px] font-mono text-[#8995AA]">
            LONGEST ALL-TIME: {player.longestStreak} DAYS
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-[#8995AA] font-mono">
            <CheckCircle2 className="w-4 h-4 text-[#35D49A]" />
            <span>SUCCESSFUL CLEARS</span>
          </div>
          <div className="font-orbitron font-black text-2xl text-white">
            {player.completedMissionsTotal}
          </div>
          <span className="text-[10px] font-mono text-[#35D49A]">
            VERIFIED HUNTER MISSIONS
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-[#8995AA] font-mono">
            <AlertTriangle className="w-4 h-4 text-[#FF4D6D]" />
            <span>MISSED COMMITMENTS</span>
          </div>
          <div className="font-orbitron font-black text-2xl text-white">
            {player.failedMissionsTotal}
          </div>
          <span className="text-[10px] font-mono text-[#FF4D6D]">
            PENALTIES SURVIVED: {player.punishmentMissionsTotal}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-[#8995AA] font-mono">
            <Zap className="w-4 h-4 text-[#00D4FF]" />
            <span>TOTAL XP ACCUMULATED</span>
          </div>
          <div className="font-orbitron font-black text-2xl text-[#00D4FF]">
            {player.totalXp.toLocaleString()}
          </div>
          <span className="text-[10px] font-mono text-[#8995AA]">
            RANK: {player.rank}
          </span>
        </div>
      </div>

      {/* Calendar Heatmap Section */}
      <div className="p-6 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-[#00D4FF]" />
            <h3 className="font-orbitron font-bold text-base text-white">
              ACTIVITY HEATMAP // DISCIPLINE RADAR
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-[#35D49A]" />
              <span className="text-[#8995AA]">Completed</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-[#36AFFF]" />
              <span className="text-[#8995AA]">Recovery Day</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-[#FF4D6D]" />
              <span className="text-[#8995AA]">Missed (Penalty)</span>
            </div>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 pt-2">
          {historyRecords.slice(0, 14).map((rec, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-xl text-center border border-white/5 transition cursor-pointer ${getHeatmapColor(
                rec.status
              )}`}
              title={`${rec.date}: ${rec.status.toUpperCase()} (${rec.completedMissions} missions, ${rec.xpEarned} XP)`}
            >
              <div className="text-[10px] font-mono font-bold text-black/80">
                {rec.date.split('-')[2]}
              </div>
              <div className="text-[9px] font-mono font-black text-black/90 uppercase mt-0.5 truncate">
                {rec.status === 'completed' ? 'PASS' : rec.status === 'recovery' ? 'REST' : 'MISS'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FFB547]">
            <Film className="w-4 h-4" />
            <span>CINEMA WATCHED & ANALYZED</span>
          </div>
          <div className="font-orbitron font-black text-2xl text-white">
            {completedFilmsCount} / {filmDatabase.length}
          </div>
          <p className="text-[11px] text-[#8995AA]">
            {analyzedFilmsCount} masterclass analyses recorded with full notes.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#00D4FF]">
            <BookOpen className="w-4 h-4" />
            <span>SCREENPLAY PAGES DRAFTED</span>
          </div>
          <div className="font-orbitron font-black text-2xl text-white">
            {totalScreenplayPages} PAGES
          </div>
          <p className="text-[11px] text-[#8995AA]">
            Formatted scenes drafted and archived across exercises.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#785CFF]">
            <Camera className="w-4 h-4" />
            <span>PRACTICE SHOTS RECORDED</span>
          </div>
          <div className="font-orbitron font-black text-2xl text-white">
            {totalShotsRecorded} SHOTS
          </div>
          <p className="text-[11px] text-[#8995AA]">
            Camera angle & lighting ratio test captures logged.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#35D49A]">
            <Activity className="w-4 h-4" />
            <span>DIRECTOR PUSH-UPS LOGGED</span>
          </div>
          <div className="font-orbitron font-black text-2xl text-white">
            {totalPushups} REPS
          </div>
          <p className="text-[11px] text-[#8995AA]">
            Physical on-set endurance and posture conditioning.
          </p>
        </div>
      </div>

      {/* 12 Skills Distribution Radar Bar Chart */}
      <div className="p-6 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-4">
        <h3 className="font-orbitron font-bold text-base text-white">
          SKILL LEVEL DISTRIBUTION (12 ATTRIBUTES)
        </h3>

        <div className="space-y-3">
          {attributes.map((attr) => {
            const widthPercent = Math.min(100, Math.max(10, attr.level * 10));

            return (
              <div key={attr.id} className="space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: attr.color }} />
                    {attr.name}
                  </span>
                  <span className="text-[#00D4FF] font-bold">
                    LV. {attr.level} ({attr.xp} XP)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#080D18] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${widthPercent}%`, backgroundColor: attr.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

