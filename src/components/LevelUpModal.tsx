import React from 'react';
import { useGame } from '../context/GameContext';
import { getRankForLevel, getRankBadgeColor } from '../utils/levelSystem';
import { Sparkles, Trophy, ArrowUpRight, Crown, X } from 'lucide-react';

export const LevelUpModal: React.FC = () => {
  const { levelUpModal, closeLevelUpModal, player } = useGame();

  if (!levelUpModal || !levelUpModal.show) return null;

  const isLevel100 = levelUpModal.newLevel >= 100;
  const newRank = getRankForLevel(levelUpModal.newLevel);
  const rankColors = getRankBadgeColor(newRank);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Background glow & holographic rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className={`w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 animate-pulse ${
          isLevel100 ? 'bg-purple-600' : 'bg-[#00D4FF]'
        }`} />
      </div>

      <div className={`relative w-full max-w-lg rounded-2xl border p-6 sm:p-8 text-center bg-[#0B1120]/95 shadow-2xl overflow-hidden ${
        isLevel100 ? 'border-purple-500 shadow-purple-glow' : 'border-[#00D4FF] shadow-cyan-glow-lg'
      }`}>
        {/* Holographic grid lines accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeLevelUpModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#8995AA] hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Emblem */}
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-[#00D4FF]/20 to-[#785CFF]/30 border border-[#00D4FF]/50 mb-4 shadow-cyan-glow animate-bounce">
          {isLevel100 ? (
            <Crown className="w-10 h-10 text-purple-400" />
          ) : (
            <Sparkles className="w-10 h-10 text-[#00D4FF]" />
          )}
        </div>

        {/* Title & Banner */}
        {isLevel100 ? (
          <div>
            <div className="text-xs font-mono tracking-widest text-purple-400 uppercase mb-1">
              THE APOTHEOSIS OF THE DIRECTOR
            </div>
            <h2 className="font-orbitron font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 tracking-wider">
              THE JOURNEY IS COMPLETE.
            </h2>
            <p className="mt-2 text-sm text-purple-200 font-mono italic">
              "YOU ARE NO LONGER THE PERSON WHO STARTED AT LEVEL 001."
            </p>
          </div>
        ) : (
          <div>
            <div className="text-xs font-mono tracking-widest text-[#00D4FF] uppercase mb-1">
              SYSTEM NOTIFICATION // ASCENSION CONFIRMED
            </div>
            <h2 className="font-orbitron font-black text-3xl sm:text-4xl text-white tracking-widest">
              LEVEL UP!
            </h2>
            <p className="mt-1 text-sm font-semibold tracking-wider text-[#35D49A] uppercase font-orbitron">
              YOUR SKILLS HAVE EVOLVED.
            </p>
          </div>
        )}

        {/* Level Transition Pill */}
        <div className="my-6 p-4 rounded-xl bg-[#101827] border border-[#1E293B] flex items-center justify-center space-x-6">
          <div className="text-center">
            <span className="text-[10px] font-mono text-[#8995AA] uppercase block">PREVIOUS</span>
            <span className="font-orbitron font-extrabold text-2xl text-[#8995AA]">
              LV. {levelUpModal.oldLevel.toString().padStart(3, '0')}
            </span>
          </div>

          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00D4FF]/20 text-[#00D4FF]">
            <ArrowUpRight className="w-5 h-5" />
          </div>

          <div className="text-center">
            <span className="text-[10px] font-mono text-[#00D4FF] uppercase block">NEW LEVEL</span>
            <span className="font-orbitron font-black text-3xl text-[#00D4FF] drop-shadow-[0_0_12px_rgba(0,212,255,0.8)]">
              LV. {levelUpModal.newLevel.toString().padStart(3, '0')}
            </span>
          </div>
        </div>

        {/* Rank & Unlocked Abilities */}
        <div className="text-left space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[#1E293B] pb-2">
            <span className="text-[#8995AA]">CURRENT RANK:</span>
            <span className={`font-orbitron font-bold ${rankColors.text}`}>{newRank}</span>
          </div>

          <div>
            <div className="text-[11px] font-mono text-[#00D4FF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>UNLOCKED CAPABILITIES & PERKS</span>
            </div>
            <ul className="space-y-1.5">
              {levelUpModal.unlockedAbilities.map((ability, i) => (
                <li
                  key={i}
                  className="flex items-center text-xs text-[#F5F7FF] bg-[#162238]/60 px-3 py-1.5 rounded-lg border border-[#1E293B]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mr-2" />
                  <span>{ability}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={closeLevelUpModal}
          className={`w-full py-3 px-6 rounded-xl font-orbitron font-bold text-sm tracking-widest uppercase transition-all duration-200 ${
            isLevel100
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-glow'
              : 'bg-gradient-to-r from-[#00D4FF] to-[#36AFFF] hover:brightness-110 text-black shadow-cyan-glow font-black'
          }`}
        >
          {isLevel100 ? 'CLAIM MONARCH SOVEREIGNTY' : 'ACCEPT SYSTEM EVOLUTION'}
        </button>
      </div>
    </div>
  );
};

