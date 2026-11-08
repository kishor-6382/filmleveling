import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
  Clock,
  Zap,
  ArrowRight,
  Archive,
  Terminal,
} from 'lucide-react';

export const PunishmentQuestsView: React.FC = () => {
  const {
    player,
    completePenaltyQuest,
    triggerPenaltyManually,
    penaltyMissionsHistory,
    setActiveTab,
  } = useGame();

  const [submissionNotes, setSubmissionNotes] = useState('');
  const [tasksChecked, setTasksChecked] = useState<Record<string, boolean>>({});

  const activePenalty = player.activePenalty;

  const toggleTask = (taskId: string) => {
    setTasksChecked((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const allTasksDone =
    activePenalty &&
    activePenalty.tasks.length > 0 &&
    activePenalty.tasks.every((t) => tasksChecked[t.id]);

  const handleClearPenalty = () => {
    if (!submissionNotes.trim()) {
      alert('Please submit your reflection notes or proof summary before clearing the penalty.');
      return;
    }
    completePenaltyQuest(submissionNotes);
    setSubmissionNotes('');
    setTasksChecked({});
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#1E293B] pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#FF4D6D] mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>DISCIPLINARY ENFORCEMENT PROTOCOL // PENALTY GATE</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-2xl text-white">
          PUNISHMENT QUESTS & RECOVERY GATE
        </h2>
        <p className="text-xs text-[#8995AA] mt-1">
          When daily commitments lapse, the System demands accountability. Regular progression locks until you clear your assigned penance.
        </p>
      </div>

      {/* Active Penalty Quest Section */}
      {activePenalty ? (
        <div className="rounded-2xl border-2 border-red-500 bg-gradient-to-b from-red-950/80 via-[#150A10] to-[#0A0D14] p-6 sm:p-8 shadow-danger-glow space-y-6 animate-pulse-slow">
          {/* Solo Leveling Dramatic Alert Banner */}
          <div className="space-y-2 text-center sm:text-left border-b border-red-900/60 pb-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-red-900/60 border border-red-500 text-red-200 text-xs font-mono font-bold tracking-widest uppercase">
              <AlertTriangle className="w-4 h-4 text-[#FF4D6D]" />
              <span>SYSTEM WARNING // LOCKDOWN ENFORCED</span>
            </div>

            <h3 className="font-orbitron font-black text-2xl sm:text-3xl text-white tracking-wide">
              DAILY QUEST FAILED!
            </h3>
            <p className="font-mono text-sm font-semibold text-red-300">
              YOU HAVE FAILED TO COMPLETE YOUR ASSIGNED MISSIONS. PENALTY QUEST HAS BEEN GENERATED.
            </p>
            <p className="text-xs text-[#8995AA]">
              REASON: {activePenalty.reason} (Triggered on {activePenalty.triggeredDate})
            </p>
          </div>

          {/* Penalty Mission Card Details */}
          <div className="p-5 rounded-xl bg-black/60 border border-red-500/40 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold text-[#FF4D6D] bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                {activePenalty.code}
              </span>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="text-[#8995AA] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FFB547]" />
                  <span>WINDOW: {activePenalty.deadlineHours} HOURS</span>
                </span>
                <span className="font-orbitron font-bold text-[#00D4FF] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-[#00D4FF]" />
                  +{activePenalty.xpReward} XP
                </span>
              </div>
            </div>

            <h4 className="font-orbitron font-extrabold text-xl text-white">
              {activePenalty.title}
            </h4>

            <p className="text-sm text-red-200/90 leading-relaxed">
              {activePenalty.description}
            </p>
          </div>

          {/* Interactive Checklist of Penalty Tasks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                MANDATORY PENALTY CRITERIA ({Object.values(tasksChecked).filter(Boolean).length}/{activePenalty.tasks.length})
              </span>
              <span className="text-[11px] font-mono text-[#8995AA]">Check off each item upon execution</span>
            </div>

            <div className="space-y-2">
              {activePenalty.tasks.map((task) => {
                const isChecked = !!tasksChecked[task.id];
                return (
                  <label
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-start space-x-3 p-3.5 rounded-xl border cursor-pointer transition ${
                      isChecked
                        ? 'bg-red-950/40 border-red-500 text-white'
                        : 'bg-[#101827] border-[#1E293B] text-[#8995AA] hover:border-red-500/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 h-4 w-4 rounded border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-xs font-mono leading-snug select-none">{task.text}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Proof / Reflection Field */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-white uppercase font-bold">
              EXECUTION EVIDENCE & REFLECTION (Required to unlock System):
            </label>
            <textarea
              required
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              placeholder="Paste your rewritten scene, analysis bullet points, or framing findings here to satisfy the System's penalty terms..."
              rows={4}
              className="w-full px-3 py-2.5 text-xs rounded-xl bg-black/70 border border-red-500/40 text-white placeholder-zinc-500 focus:outline-none focus:border-red-400"
            />
          </div>

          {/* Complete Action Button */}
          <div className="pt-2">
            <button
              onClick={handleClearPenalty}
              disabled={!submissionNotes.trim() || !allTasksDone}
              className={`w-full py-3.5 px-6 rounded-xl font-orbitron font-black text-sm tracking-widest uppercase transition flex items-center justify-center space-x-2 ${
                submissionNotes.trim() && allTasksDone
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white shadow-danger-glow'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
              }`}
            >
              <Unlock className="w-4 h-4" />
              <span>CLEAR PENALTY QUEST & UNLOCK NEXT GATES</span>
            </button>
            {(!allTasksDone || !submissionNotes.trim()) && (
              <p className="text-[11px] font-mono text-center text-[#8995AA] mt-2">
                All task criteria must be checked and reflection text submitted to clear the penalty.
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Status Clean: No Active Penalty */
        <div className="rounded-2xl border border-emerald-500/30 bg-[#0E1724] p-8 text-center space-y-4 shadow-lg">
          <div className="inline-flex items-center justify-center p-3.5 rounded-full bg-emerald-500/10 text-[#35D49A] border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#35D49A] uppercase block">
              SYSTEM STATUS // FULL COMPLIANCE
            </span>
            <h3 className="font-orbitron font-extrabold text-xl text-white mt-1">
              NO ACTIVE PENALTY QUESTS
            </h3>
            <p className="text-xs text-[#8995AA] max-w-md mx-auto mt-1 leading-relaxed">
              Your hunter training commitments are currently up to date. Stay disciplined and clear your daily quotas before each deadline to prevent penalty generation.
            </p>
          </div>

          <div className="pt-2 flex justify-center items-center gap-3">
            <button
              onClick={() => setActiveTab('daily-quests')}
              className="px-4 py-2 rounded-xl text-xs font-orbitron font-bold text-black bg-[#00D4FF] hover:brightness-110 transition shadow-cyan-glow flex items-center gap-1.5"
            >
              <span>RESUME DAILY QUESTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={triggerPenaltyManually}
              className="px-4 py-2 rounded-xl text-xs font-mono text-[#8995AA] hover:text-white bg-[#162238] border border-[#1E293B] hover:border-red-500/40 transition"
              title="Trigger a simulated penalty quest to experience the penalty flow"
            >
              Test Penalty Flow
            </button>
          </div>
        </div>
      )}

      {/* Penalty History Archive */}
      <div className="space-y-3 pt-6 border-t border-[#1E293B]">
        <div className="flex items-center space-x-2 text-sm font-orbitron font-bold text-white">
          <Archive className="w-4 h-4 text-[#8995AA]" />
          <span>PENALTY QUEST HISTORY ARCHIVE ({penaltyMissionsHistory.length} CLEARED)</span>
        </div>

        {penaltyMissionsHistory.length === 0 ? (
          <div className="p-6 rounded-xl bg-[#101827] border border-[#1E293B] text-center text-xs text-[#8995AA]">
            No disciplinary penalties recorded. Flawless record maintained!
          </div>
        ) : (
          <div className="space-y-3">
            {penaltyMissionsHistory.map((hist) => (
              <div
                key={hist.id}
                className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900">
                      {hist.code}
                    </span>
                    <span className="font-orbitron font-bold text-white">{hist.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#35D49A] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    CLEARED
                  </span>
                </div>

                <p className="text-[#8995AA] leading-relaxed">{hist.description}</p>

                {hist.userSubmission && (
                  <div className="p-2.5 rounded bg-[#090D18] border border-[#1E293B] text-[11px] text-[#8995AA]">
                    <span className="font-mono text-zinc-400 font-bold block mb-0.5">SUBMISSION RECORD:</span>
                    "{hist.userSubmission}"
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

