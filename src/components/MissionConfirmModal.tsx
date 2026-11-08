import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { X, Award, CheckCircle2, Clock, Zap, BookOpen, AlertCircle } from 'lucide-react';

export const MissionConfirmModal: React.FC = () => {
  const { missionConfirmModal, closeMissionConfirmModal, confirmCompleteDailyMission } = useGame();
  const [reflectionNotes, setReflectionNotes] = useState('');
  const [evidenceText, setEvidenceText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!missionConfirmModal) return null;

  const mission = missionConfirmModal;

  const handleConfirm = () => {
    setIsSubmitting(true);
    confirmCompleteDailyMission(mission.id, reflectionNotes, evidenceText);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#00D4FF]/40 bg-[#0E1526] shadow-cyan-glow p-6 sm:p-7 overflow-hidden text-[#F5F7FF]">
        {/* Holographic header line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00D4FF] via-[#785CFF] to-[#35D49A]" />

        {/* Close button */}
        <button
          onClick={closeMissionConfirmModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#8995AA] hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Badge */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#00D4FF] mb-2 uppercase">
          <Award className="w-4 h-4" />
          <span>MISSION COMPLETION VERIFICATION</span>
        </div>

        <h3 className="font-orbitron font-bold text-xl text-white mb-2 leading-tight">
          {mission.title}
        </h3>

        <p className="text-sm text-[#8995AA] mb-4 leading-relaxed">
          {mission.description}
        </p>

        {/* Meta badges */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#141E33] border border-[#1E293B] mb-5 text-xs">
          <div>
            <span className="text-[10px] font-mono text-[#8995AA] uppercase block">CATEGORY</span>
            <span className="font-semibold text-white truncate block">{mission.category}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#8995AA] uppercase block">DURATION</span>
            <span className="font-semibold text-white flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#36AFFF]" />
              {mission.duration}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#8995AA] uppercase block">REWARD</span>
            <span className="font-orbitron font-bold text-[#00D4FF] flex items-center gap-1">
              <Zap className="w-3 h-3 fill-[#00D4FF]" />
              +{mission.xpReward} XP
            </span>
          </div>
        </div>

        {/* User Notes / Reflection */}
        <div className="space-y-3 mb-5">
          <div>
            <label className="block text-xs font-mono text-[#8995AA] mb-1 uppercase">
              Directorial Notes / Lessons Learned (Optional):
            </label>
            <textarea
              value={reflectionNotes}
              onChange={(e) => setReflectionNotes(e.target.value)}
              placeholder="e.g. Discovered that lighting from the side emphasized the actor's conflict far more than front lighting..."
              rows={2}
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none focus:border-[#00D4FF] placeholder-[#8995AA]/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#8995AA] mb-1 uppercase">
              Evidence / Shot Link / Exercise Summary (Optional):
            </label>
            <input
              type="text"
              value={evidenceText}
              onChange={(e) => setEvidenceText(e.target.value)}
              placeholder="e.g. Drive / Unlisted link or completed exercise summary"
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none focus:border-[#00D4FF] placeholder-[#8995AA]/50"
            />
          </div>
        </div>

        {/* Accidental click warning */}
        <div className="flex items-center space-x-2 text-[11px] text-[#FFB547] bg-[#FFB547]/10 p-2.5 rounded-lg border border-[#FFB547]/30 mb-5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Confirm only if you have physically executed or studied this mission today. System integrity depends on your honest practice.</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={closeMissionConfirmModal}
            className="w-1/3 py-2.5 px-4 rounded-xl text-xs font-orbitron font-semibold bg-[#162238] hover:bg-[#1E2E4A] text-[#8995AA] hover:text-white transition"
          >
            CANCEL
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="w-2/3 py-2.5 px-4 rounded-xl text-xs font-orbitron font-bold text-black bg-gradient-to-r from-[#00D4FF] to-[#36AFFF] hover:brightness-110 transition flex items-center justify-center space-x-2 shadow-cyan-glow"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>CONFIRM & CLAIM +{mission.xpReward} XP</span>
          </button>
        </div>
      </div>
    </div>
  );
};

