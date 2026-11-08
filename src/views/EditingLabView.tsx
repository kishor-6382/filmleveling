import React, { useState } from 'react';
import {
  Scissors,
  Volume2,
  Film,
  Layers,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface CutType {
  id: string;
  name: string;
  category: string;
  explanation: string;
  example: string;
  tempo: 'Rapid' | 'Rhythmic' | 'Contemplative' | 'Abrupt';
}

const CUT_TYPES: CutType[] = [
  {
    id: 'match-cut',
    name: 'Graphic & Action Match Cut',
    category: 'Continuity & Metaphor',
    explanation: 'Cuts between two completely different scenes by matching an identical physical movement, object shape, or compositional geometry.',
    example: '2001: A Space Odyssey (Bone tossed into the air cuts directly to an orbiting nuclear satellite millions of years later).',
    tempo: 'Contemplative',
  },
  {
    id: 'j-cut',
    name: 'J-Cut (Audio Lead-in)',
    category: 'Sound Transition',
    explanation: 'The audio from the upcoming scene begins playing 2 to 3 seconds before the visual camera cuts away from the current scene. Prepares audience subconsciously.',
    example: 'Hearing the thunder or police sirens while the character is still silently staring at their reflection.',
    tempo: 'Rhythmic',
  },
  {
    id: 'l-cut',
    name: 'L-Cut (Audio Spillover)',
    category: 'Sound Transition',
    explanation: 'The visual cut switches to a new character or environment, but the dialogue or acoustic environment of the previous scene continues to resonate.',
    example: 'Cutting to a listener’s weeping reaction while the speaker’s voice continues over them.',
    tempo: 'Rhythmic',
  },
  {
    id: 'jump-cut',
    name: 'Jump Cut',
    category: 'Elliptical / Disjunctive',
    explanation: 'Two sequential shots of the exact same subject taken from camera positions that vary only slightly. Violates traditional continuity to simulate psychological anxiety or compressed time.',
    example: 'Breathless (Godard) passenger seat shots, or editing an artist painting a canvas in sudden stuttering increments.',
    tempo: 'Rapid',
  },
  {
    id: 'smash-cut',
    name: 'Smash Cut',
    category: 'Dynamic Contrast',
    explanation: 'Violent abrupt transition between two scenes with diametrically opposed audio volume, emotional tone, and pacing.',
    example: 'Waking up screaming from a deafening nightmare into a dead-silent, white hospital room.',
    tempo: 'Abrupt',
  },
  {
    id: 'cross-cut',
    name: 'Parallel Editing / Cross-Cutting',
    category: 'Narrative Convergence',
    explanation: 'Alternating back and forth between two or more events happening simultaneously in different geographical locations, accelerating the cut tempo as they converge.',
    example: 'The Godfather baptism massacre (Holy rites spoken at the altar cut against coordinated mob assassinations).',
    tempo: 'Rapid',
  },
];

export const EditingLabView: React.FC = () => {
  const [selectedCut, setSelectedCut] = useState<CutType>(CUT_TYPES[0]);

  // Project post-production pipeline checklist state
  const [pipelineSteps, setPipelineSteps] = useState<{ id: string; name: string; done: boolean }[]>(() => {
    const s = localStorage.getItem('filmmaker_saved_pipeline');
    if (s) {
      try {
        return JSON.parse(s);
      } catch (e) {}
    }
    return [
      { id: 'p1', name: '1. Media Ingest, Sync Audio & Metadata Logging', done: true },
      { id: 'p2', name: '2. First Assembly / Radio Cut (Spoken Narrative Spine)', done: true },
      { id: 'p3', name: '3. Rough Cut (Pacing, Scene Economy & Trims)', done: false },
      { id: 'p4', name: '4. Fine Cut & Director Trim Pass', done: false },
      { id: 'p5', name: '5. Picture Lock (No further edit modifications)', done: false },
      { id: 'p6', name: '6. Audio Track Laying, Dialogue Cleanup & Foley', done: false },
      { id: 'p7', name: '7. Musical Score Integration & Master Audio Mix', done: false },
      { id: 'p8', name: '8. Color Grading (LUTs, Primary & Secondary Balance)', done: false },
      { id: 'p9', name: '9. Master ProRes 4444 / DCP Export & Archival', done: false },
    ];
  });

  const togglePipelineStep = (id: string) => {
    const updated = pipelineSteps.map((st) => (st.id === id ? { ...st, done: !st.done } : st));
    setPipelineSteps(updated);
    localStorage.setItem('filmmaker_saved_pipeline', JSON.stringify(updated));
  };

  const completedStepsCount = pipelineSteps.filter((s) => s.done).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#1E293B] pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#FF4D6D] mb-1">
          <Scissors className="w-4 h-4" />
          <span>TEMPORAL RHYTHM // THE EDITING SUITE</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-2xl text-white">
          PACING, CUT TYPES & SOUND TRANSITIONS
        </h2>
        <p className="text-xs text-[#8995AA] mt-1">
          Cinema is forged in the cut. Direct the viewer's heartbeat through rhythmic duration, sound anticipations, and montage kinetics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cut Types Selector & Deconstruct */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#8995AA]">
              MASTER CUT TYPES & TRANSITIONAL LOGIC
            </span>
            <span className="text-xs font-mono text-[#00D4FF]">
              ACTIVE: {selectedCut.name}
            </span>
          </div>

          {/* Cards List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CUT_TYPES.map((cut) => {
              const isSelected = selectedCut.id === cut.id;
              return (
                <button
                  key={cut.id}
                  onClick={() => setSelectedCut(cut)}
                  className={`p-3 rounded-xl border text-left transition ${
                    isSelected
                      ? 'bg-[#1E1428] border-[#FF4D6D] text-white shadow-danger-glow'
                      : 'bg-[#101827] border-[#1E293B] text-[#8995AA] hover:text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#FF4D6D] font-bold uppercase">{cut.category}</div>
                  <div className="font-orbitron font-bold text-xs mt-1 text-white truncate">{cut.name}</div>
                  <div className="text-[9px] font-mono text-[#8995AA] mt-1">Tempo: {cut.tempo}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Deconstruction Card */}
          <div className="p-6 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-4">
            <div className="flex justify-between items-center border-b border-[#1E293B] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#FF4D6D] uppercase tracking-wider block">
                  CUT TYPE DECONSTRUCTION
                </span>
                <h3 className="font-orbitron font-extrabold text-lg text-white">
                  {selectedCut.name}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#162238] text-[#00D4FF] border border-[#1E293B]">
                {selectedCut.category}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-mono text-[10px] text-[#8995AA] uppercase block font-bold">
                  MECHANICS & PSYCHOLOGICAL EFFECT:
                </span>
                <p className="text-white leading-relaxed mt-0.5">{selectedCut.explanation}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#090D18] border border-[#1E293B]">
                <span className="font-mono text-[10px] text-[#35D49A] uppercase block font-bold">
                  CLASSIC FILM REFERENCE:
                </span>
                <p className="text-zinc-300 font-mono text-[11px] mt-0.5">{selectedCut.example}</p>
              </div>
            </div>

            {/* Simulated Timeline Visualizer */}
            <div className="pt-2 space-y-2">
              <span className="font-mono text-[10px] text-[#8995AA] uppercase block">
                TIMELINE STRUCTURE ({selectedCut.name})
              </span>
              <div className="p-3 rounded-xl bg-[#090D18] border border-white/10 space-y-2 font-mono text-[10px]">
                {/* Video Track */}
                <div className="flex items-center space-x-2">
                  <span className="w-12 text-[#8995AA]">VIDEO:</span>
                  <div className="flex-1 flex h-6 rounded overflow-hidden border border-white/20">
                    <div className="w-1/2 bg-blue-900/60 border-r border-cyan-400 flex items-center justify-center text-cyan-200">
                      SHOT A (Scene 1)
                    </div>
                    <div className="w-1/2 bg-purple-900/60 flex items-center justify-center text-purple-200">
                      SHOT B (Scene 2)
                    </div>
                  </div>
                </div>

                {/* Audio Track */}
                <div className="flex items-center space-x-2">
                  <span className="w-12 text-[#8995AA]">AUDIO:</span>
                  <div className="flex-1 flex h-6 rounded overflow-hidden border border-white/20">
                    {selectedCut.id === 'j-cut' ? (
                      <>
                        <div className="w-2/5 bg-amber-950/60 border-r border-amber-400 flex items-center justify-center text-amber-200 text-[9px]">
                          AUDIO A
                        </div>
                        <div className="w-3/5 bg-emerald-950/70 flex items-center justify-center text-emerald-200 text-[9px]">
                          AUDIO B (J-CUT PRE-ROLL)
                        </div>
                      </>
                    ) : selectedCut.id === 'l-cut' ? (
                      <>
                        <div className="w-3/5 bg-amber-950/60 border-r border-amber-400 flex items-center justify-center text-amber-200 text-[9px]">
                          AUDIO A (L-CUT SPILLOVER)
                        </div>
                        <div className="w-2/5 bg-emerald-950/70 flex items-center justify-center text-emerald-200 text-[9px]">
                          AUDIO B
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 bg-amber-950/60 border-r border-amber-400 flex items-center justify-center text-amber-200 text-[9px]">
                          AUDIO A
                        </div>
                        <div className="w-1/2 bg-emerald-950/70 flex items-center justify-center text-emerald-200 text-[9px]">
                          AUDIO B
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Post-Production Pipeline Tracker */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-orbitron font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#35D49A]" />
              <span>POST-PRODUCTION PIPELINE</span>
            </h3>
            <span className="text-xs font-mono text-[#35D49A] font-bold">
              {completedStepsCount} / {pipelineSteps.length} MILESTONES
            </span>
          </div>

          <p className="text-xs text-[#8995AA]">
            Track your film through the 9 rigorous post-production gates from ingest to master exhibition.
          </p>

          <div className="space-y-2">
            {pipelineSteps.map((step) => (
              <label
                key={step.id}
                onClick={() => togglePipelineStep(step.id)}
                className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition ${
                  step.done
                    ? 'bg-[#0E1A17] border-[#35D49A]/40 text-white'
                    : 'bg-[#090D18] border-[#1E293B] text-[#8995AA] hover:text-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={step.done}
                  onChange={() => {}}
                  className="h-4 w-4 rounded border-gray-600 text-emerald-600 focus:ring-emerald-500"
                />
                <span className={`text-xs font-mono select-none ${step.done ? 'font-bold' : ''}`}>
                  {step.name}
                </span>
              </label>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#090D18] border border-[#1E293B] text-xs text-[#8995AA] space-y-1">
            <span className="font-mono font-bold text-white block">RULE OF THUMB:</span>
            <p className="text-[11px] leading-relaxed">
              Never commence color grading or sound design before securing PICTURE LOCK. Changing edit timing resets all audio sync and graded clip handles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

