import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { MissionCategory, MissionDifficulty, DailyMission } from '../types';
import {
  CheckSquare,
  Clock,
  Zap,
  Filter,
  Plus,
  Lock,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  BookOpen,
  Film,
  Camera,
  Scissors,
  Clapperboard,
  Activity,
  FileText,
} from 'lucide-react';

export const DailyQuestsView: React.FC = () => {
  const {
    dailyMissions,
    openMissionConfirmModal,
    addCustomDailyMission,
    player,
    setActiveTab,
  } = useGame();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // Custom mission form state
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customCat, setCustomCat] = useState<MissionCategory>('Directing Skills');
  const [customDuration, setCustomDuration] = useState('30 mins');
  const [customDiff, setCustomDiff] = useState<MissionDifficulty>('Normal');
  const [customXp, setCustomXp] = useState(100);

  const isLockedByPenalty = !!player.activePenalty;

  const categories: { label: string; value: string; icon: React.ElementType }[] = [
    { label: 'ALL CATEGORIES', value: 'ALL', icon: CheckSquare },
    { label: 'FILM STUDY', value: 'Film Study', icon: BookOpen },
    { label: 'FILM WATCHING', value: 'Film Watching', icon: Film },
    { label: 'SCREENPLAY', value: 'Screenplay & Story Writing', icon: FileText },
    { label: 'DIRECTING', value: 'Directing Skills', icon: Clapperboard },
    { label: 'CINEMATOGRAPHY', value: 'Cinematography', icon: Camera },
    { label: 'EDITING', value: 'Cinematic Editing', icon: Scissors },
    { label: 'FITNESS', value: 'Physical Fitness', icon: Activity },
  ];

  const filteredMissions = dailyMissions.filter((m) => {
    if (selectedCategory === 'ALL') return true;
    return m.category === selectedCategory;
  });

  const completedCount = dailyMissions.filter((m) => m.status === 'completed').length;
  const mandatoryCount = dailyMissions.filter((m) => m.mandatory).length;
  const completedMandatoryCount = dailyMissions.filter((m) => m.mandatory && m.status === 'completed').length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    addCustomDailyMission({
      title: customTitle.trim(),
      description: customDesc.trim() || 'Self-assigned personalized filmmaking mission.',
      category: customCat,
      duration: customDuration,
      difficulty: customDiff,
      xpReward: customXp,
      mandatory: false,
    });

    setCustomTitle('');
    setCustomDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#00D4FF] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <span>DAILY PROGRESSION PROTOCOL</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-2xl text-white">
            DAILY MISSIONS & QUEST LOG
          </h2>
          <p className="text-xs text-[#8995AA] mt-1">
            Realize your daily filmmaking commitment. Honest verification generates unshakeable creative discipline.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right px-3 py-1.5 rounded-lg bg-[#101827] border border-[#1E293B]">
            <span className="text-[10px] font-mono text-[#8995AA] uppercase block">MANDATORY QUOTA</span>
            <span className="font-orbitron font-bold text-sm text-[#00D4FF]">
              {completedMandatoryCount} / {mandatoryCount} CLEARED
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-orbitron font-bold bg-[#162238] hover:bg-[#1E2E4A] text-white border border-[#00D4FF]/40 shadow-cyan-glow transition"
          >
            <Plus className="w-4 h-4 text-[#00D4FF]" />
            <span>CUSTOM QUEST</span>
          </button>
        </div>
      </div>

      {/* Lock Warning if Penalty is Active */}
      {isLockedByPenalty && (
        <div className="p-4 rounded-xl border border-red-500 bg-red-950/40 flex items-center justify-between shadow-danger-glow animate-pulse">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-[#FF4D6D]" />
            <div>
              <span className="font-orbitron font-bold text-sm text-red-200">
                DAILY QUESTS LOCKED BY THE SYSTEM
              </span>
              <p className="text-xs text-red-300">
                A disciplinary Penalty Quest is active. You must clear the penalty before claiming today's mission rewards.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('punishment-quests')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-orbitron font-bold bg-[#FF4D6D] text-white shadow-danger-glow whitespace-nowrap"
          >
            VIEW PENALTY
          </button>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition ${
                isSelected
                  ? 'bg-[#00D4FF] text-black shadow-cyan-glow font-bold'
                  : 'bg-[#101827] text-[#8995AA] hover:text-white border border-[#1E293B]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map((mission) => {
          const isDone = mission.status === 'completed';
          const isLocked = mission.status === 'locked' || isLockedByPenalty;

          return (
            <div
              key={mission.id}
              className={`relative rounded-xl border p-5 flex flex-col justify-between transition-all duration-200 ${
                isDone
                  ? 'bg-[#0B151E] border-[#35D49A]/40'
                  : isLocked
                  ? 'bg-[#110D16] border-red-900/40 opacity-75'
                  : 'bg-[#101827] border-[#1E293B] hover:border-[#00D4FF]/60 hover:shadow-cyan-glow'
              }`}
            >
              <div>
                {/* Meta Top Line */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#162238] text-[#00D4FF] uppercase border border-[#1E293B]">
                      {mission.category}
                    </span>
                    {mission.mandatory && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-700/50">
                        MANDATORY
                      </span>
                    )}
                    {mission.isCustom && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-700/50">
                        CUSTOM
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      mission.difficulty === 'Expert'
                        ? 'bg-purple-950 text-purple-300 border border-purple-600/40'
                        : mission.difficulty === 'Hard'
                        ? 'bg-rose-950 text-rose-300 border border-rose-600/40'
                        : mission.difficulty === 'Medium'
                        ? 'bg-amber-950 text-amber-300 border border-amber-600/40'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                    }`}
                  >
                    {mission.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`font-orbitron font-bold text-base leading-snug ${
                    isDone ? 'line-through text-[#8995AA]' : 'text-white'
                  }`}
                >
                  {mission.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#8995AA] mt-2 leading-relaxed">
                  {mission.description}
                </p>

                {/* Completion Notes display if completed */}
                {isDone && mission.userNotes && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#080D17] border border-[#1E293B] text-[11px] text-[#35D49A]">
                    <span className="font-mono font-bold text-[#8995AA] block mb-0.5">DIRECTOR'S LOG:</span>
                    "{mission.userNotes}"
                  </div>
                )}
              </div>

              {/* Bottom Meta & Action */}
              <div className="mt-5 pt-4 border-t border-[#1E293B] flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="flex items-center gap-1 text-[#8995AA]">
                    <Clock className="w-3.5 h-3.5 text-[#36AFFF]" />
                    {mission.duration}
                  </span>
                  <span className="font-orbitron font-bold text-[#00D4FF] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-[#00D4FF]" />
                    +{mission.xpReward} XP
                  </span>
                </div>

                <div>
                  {isDone ? (
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#35D49A]/10 text-[#35D49A] border border-[#35D49A]/30 text-xs font-mono font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>CLEARED</span>
                    </div>
                  ) : (
                    <button
                      disabled={isLocked}
                      onClick={() => openMissionConfirmModal(mission)}
                      className={`px-4 py-2 rounded-xl text-xs font-orbitron font-bold transition flex items-center space-x-1.5 ${
                        isLocked
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                          : 'bg-gradient-to-r from-[#00D4FF] to-[#36AFFF] text-black hover:brightness-110 shadow-cyan-glow'
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>LOCKED</span>
                        </>
                      ) : (
                        <>
                          <CheckSquare className="w-3.5 h-3.5" />
                          <span>MARK COMPLETED</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Custom Mission */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl border border-[#00D4FF]/40 bg-[#0E1526] p-6 shadow-cyan-glow text-[#F5F7FF]">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1 rounded text-[#8995AA] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-orbitron font-bold text-lg text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              <span>CREATE CUSTOM ASSIGNMENT</span>
            </h3>
            <p className="text-xs text-[#8995AA] mb-4">
              Add your own custom self-directed filmmaking study or shoot mission.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-[#8995AA] mb-1">MISSION TITLE</label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. MISSION: Shoot 3 Low-Key Portrait Lighting Tests"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none focus:border-[#00D4FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8995AA] mb-1">DESCRIPTION</label>
                <textarea
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="Describe your execution criteria and expected learning outcome..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none focus:border-[#00D4FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#8995AA] mb-1">CATEGORY</label>
                  <select
                    value={customCat}
                    onChange={(e) => setCustomCat(e.target.value as MissionCategory)}
                    className="w-full px-2.5 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                  >
                    <option value="Film Study">Film Study</option>
                    <option value="Film Watching">Film Watching</option>
                    <option value="Screenplay & Story Writing">Screenplay & Story</option>
                    <option value="Directing Skills">Directing Skills</option>
                    <option value="Cinematography">Cinematography</option>
                    <option value="Cinematic Editing">Cinematic Editing</option>
                    <option value="Physical Fitness">Physical Fitness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8995AA] mb-1">DIFFICULTY</label>
                  <select
                    value={customDiff}
                    onChange={(e) => setCustomDiff(e.target.value as MissionDifficulty)}
                    className="w-full px-2.5 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                  >
                    <option value="Easy">Easy (50 XP)</option>
                    <option value="Normal">Normal (100 XP)</option>
                    <option value="Medium">Medium (150 XP)</option>
                    <option value="Hard">Hard (250 XP)</option>
                    <option value="Expert">Expert (400 XP)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#8995AA] mb-1">EST. DURATION</label>
                  <input
                    type="text"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    placeholder="30 mins"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8995AA] mb-1">XP REWARD</label>
                  <input
                    type="number"
                    value={customXp}
                    onChange={(e) => setCustomXp(Number(e.target.value))}
                    min={25}
                    max={500}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs bg-gradient-to-r from-[#00D4FF] to-[#36AFFF] text-black hover:brightness-110 shadow-cyan-glow"
                >
                  ADD TO TODAY'S QUEST LOG
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

