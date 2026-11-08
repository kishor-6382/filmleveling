import React from 'react';
import { useGame } from '../context/GameContext';
import { getRankBadgeColor } from '../utils/levelSystem';
import {
  User,
  Shield,
  Zap,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Award,
  Lock,
  Unlock,
  Camera,
  Film,
  BookOpen,
  Volume2,
  Activity,
  Layers,
  Sparkles,
  Crown,
} from 'lucide-react';

export const PlayerStatusView: React.FC = () => {
  const { player, attributes, specialMissions, completeSpecialMission } = useGame();
  const rankColors = getRankBadgeColor(player.rank);

  const xpPercent = Math.min(100, Math.floor((player.currentLevelXp / player.nextLevelXp) * 100));

  const EQUIPMENT = [
    { name: 'ARRI ALEXA 35 // DIGITAL SENSOR', slot: 'CAMERA BODY', rarity: 'S-Rank Legendary', desc: '17 stops of dynamic range; reveals emotional subtext in deepest shadows.' },
    { name: 'COOKE S4/I ANAMORPHIC PRIMES', slot: 'OPTICAL CORE', rarity: 'A-Rank Relic', desc: 'Organic "Cooke Look" with gentle skin smoothing and elliptical flares.' },
    { name: 'ALAN GORDON MARK VB VIEWFINDER', slot: 'DIRECTOR EYEWEAR', rarity: 'B-Rank Gear', desc: 'Allows instant focal-length preview without rolling camera.' },
    { name: 'SOUND DEVICES 833 8-TRACK', slot: 'ACOUSTIC RECEPTOR', rarity: 'A-Rank Relic', desc: 'Ultra-low-noise preamps; captures silent whispers and environmental terror.' },
    { name: 'SMALLHD CINE 7 MONITOR', slot: 'HUD DISPLAY', rarity: 'B-Rank Gear', desc: 'Daylight viewable 1800-nit panel with instant False Color and waveform readouts.' },
    { name: 'TITANIUM WOODEN CLAPPER SLATE', slot: 'SYNCHRONIZER', rarity: 'C-Rank Tool', desc: 'Timecode synchronized slate ensuring frame-accurate sound alignment.' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#1E293B] pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#00D4FF] mb-1">
          <User className="w-4 h-4" />
          <span>PLAYER DOSSIER // SOLO LEVELING CHARACTER SHEET</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-2xl text-white">
          PLAYER STATUS & 12 SKILL ATTRIBUTES
        </h2>
        <p className="text-xs text-[#8995AA] mt-1">
          Detailed RPG attributes, hunter equipment loadout, and progressive milestone missions.
        </p>
      </div>

      {/* Main Status Window (Solo Leveling HUD Box) */}
      <div className="relative rounded-2xl border-2 border-[#00D4FF]/50 bg-gradient-to-b from-[#101827] via-[#0B101E] to-[#080B14] p-6 sm:p-8 shadow-cyan-glow overflow-hidden">
        {/* Holographic Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00D4FF]">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <span>HUNTER DESIGNATION PROTOCOL</span>
            </div>
            <h3 className="font-orbitron font-black text-2xl sm:text-3xl text-white">
              {player.name}
            </h3>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#8995AA]">
              <span className={`px-2 py-0.5 rounded font-orbitron font-bold border ${rankColors.border} ${rankColors.bg} ${rankColors.text}`}>
                {player.rank}
              </span>
              <span>TITLE: <strong className="text-white">{player.title}</strong></span>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-[#080D18] p-4 rounded-xl border border-[#1E293B]">
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#8995AA] uppercase block">LEVEL</span>
              <span className="font-orbitron font-black text-3xl sm:text-4xl text-[#00D4FF]">
                {player.level.toString().padStart(3, '0')}
              </span>
            </div>
            <div className="h-10 w-px bg-[#1E293B]" />
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#8995AA] uppercase block">TOTAL XP</span>
              <span className="font-orbitron font-bold text-sm sm:text-base text-white">
                {player.totalXp.toLocaleString()} XP
              </span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="py-5 border-b border-[#1E293B] space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#8995AA]">CURRENT LEVEL XP PROGRESS</span>
            <span className="text-white font-bold">
              <span className="text-[#00D4FF]">{player.currentLevelXp.toLocaleString()}</span> / {player.nextLevelXp.toLocaleString()} XP ({xpPercent}%)
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-[#080B14] p-0.5 border border-[#1E293B] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] via-[#36AFFF] to-[#785CFF] shadow-[0_0_12px_rgba(0,212,255,0.7)] transition-all duration-500"
              style={{ width: `${Math.max(3, xpPercent)}%` }}
            />
          </div>
        </div>

        {/* Core Stats Line */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#080D18] border border-[#1E293B]">
            <span className="text-[#8995AA] block text-[10px]">CURRENT STREAK</span>
            <span className="font-orbitron font-bold text-base text-[#FFB547] mt-0.5 block">
              {player.currentStreak} DAYS
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080D18] border border-[#1E293B]">
            <span className="text-[#8995AA] block text-[10px]">TOTAL CLEARED QUESTS</span>
            <span className="font-orbitron font-bold text-base text-[#35D49A] mt-0.5 block">
              {player.completedMissionsTotal}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080D18] border border-[#1E293B]">
            <span className="text-[#8995AA] block text-[10px]">FAILED QUOTAS</span>
            <span className="font-orbitron font-bold text-base text-[#FF4D6D] mt-0.5 block">
              {player.failedMissionsTotal}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080D18] border border-[#1E293B]">
            <span className="text-[#8995AA] block text-[10px]">PENALTIES SURVIVED</span>
            <span className="font-orbitron font-bold text-base text-purple-400 mt-0.5 block">
              {player.punishmentMissionsTotal}
            </span>
          </div>
        </div>
      </div>

      {/* 12 Skill Attributes Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#35D49A]" />
            <h3 className="font-orbitron font-bold text-lg text-white">
              THE 12 FILMMAKING SKILL ATTRIBUTES
            </h3>
          </div>
          <span className="text-xs font-mono text-[#8995AA]">
            EACH SKILL LEVELS UP THROUGH RELEVANT QUEST VERIFICATION
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {attributes.map((attr) => {
            const percent = Math.min(100, Math.round((attr.xp / attr.nextLevelXp) * 100));

            return (
              <div
                key={attr.id}
                className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] hover:border-[#00D4FF]/40 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: attr.color }}
                    />
                    <span className="font-orbitron font-bold text-xs text-white">
                      {attr.name}
                    </span>
                  </div>
                  <span className="font-orbitron font-black text-sm text-[#00D4FF]">
                    LV. {attr.level}
                  </span>
                </div>

                <p className="text-[11px] text-[#8995AA] leading-relaxed line-clamp-2">
                  {attr.description}
                </p>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-[#8995AA]">
                    <span>Attribute XP</span>
                    <span>
                      {attr.xp} / {attr.nextLevelXp} ({percent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#080D18] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${percent}%`, backgroundColor: attr.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hunter Equipment & Tools Loadout */}
      <div className="space-y-4 pt-4 border-t border-[#1E293B]">
        <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#785CFF]" />
          <span>HUNTER'S PRODUCTION LOADOUT // ARTIFACT GEAR</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EQUIPMENT.map((eq, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#8995AA] uppercase">{eq.slot}</span>
                <span className="text-purple-400 font-bold">{eq.rarity}</span>
              </div>
              <div className="font-orbitron font-bold text-sm text-white">{eq.name}</div>
              <p className="text-[11px] text-[#8995AA] leading-relaxed">{eq.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Special Level Milestone Missions */}
      <div className="space-y-4 pt-4 border-t border-[#1E293B]">
        <div className="flex items-center justify-between">
          <h3 className="font-orbitron font-bold text-lg text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FFB547]" />
            <span>PROGRESSIVE LEVEL MILESTONES (LEVELS 5 TO 100)</span>
          </h3>
          <span className="text-xs font-mono text-[#8995AA]">
            UNLOCK AS YOUR LEVEL ADVANCES
          </span>
        </div>

        <div className="space-y-3">
          {specialMissions.map((sm) => {
            const isUnlocked = sm.unlocked;
            const isDone = sm.completed;

            return (
              <div
                key={sm.id}
                className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-[#0E1A17] border-[#35D49A]/50'
                    : isUnlocked
                    ? 'bg-[#101827] border-[#00D4FF]/40 shadow-cyan-glow'
                    : 'bg-[#0A0D16] border-[#1E293B] opacity-60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-[#00D4FF] bg-[#162238] px-2 py-0.5 rounded">
                      REQUIRED: LEVEL {sm.levelRequired.toString().padStart(3, '0')}
                    </span>
                    {sm.rewardTitle && (
                      <span className="font-mono text-[10px] text-[#FFB547] bg-[#FFB547]/10 px-2 py-0.5 rounded border border-[#FFB547]/30">
                        {sm.rewardTitle}
                      </span>
                    )}
                  </div>
                  <h4 className="font-orbitron font-bold text-sm text-white">{sm.title}</h4>
                  <p className="text-xs text-[#8995AA]">{sm.description}</p>
                </div>

                <div className="text-right flex-shrink-0 flex items-center space-x-3">
                  <div className="text-right font-mono text-xs">
                    <span className="font-orbitron font-bold text-[#00D4FF] block">
                      +{sm.rewardXp.toLocaleString()} XP
                    </span>
                  </div>

                  {isDone ? (
                    <div className="flex items-center space-x-1 text-xs font-mono text-[#35D49A] bg-[#35D49A]/10 px-3 py-1.5 rounded-lg border border-[#35D49A]/30">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ACHIEVED</span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => completeSpecialMission(sm.id)}
                      className="px-4 py-2 rounded-xl text-xs font-orbitron font-bold bg-[#00D4FF] text-black hover:brightness-110 shadow-cyan-glow transition"
                    >
                      CLAIM MILESTONE
                    </button>
                  ) : (
                    <div className="flex items-center space-x-1 text-xs font-mono text-[#8995AA] bg-zinc-800/60 px-3 py-1.5 rounded-lg border border-zinc-700">
                      <Lock className="w-3.5 h-3.5" />
                      <span>LOCKED (LV. {sm.levelRequired})</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

