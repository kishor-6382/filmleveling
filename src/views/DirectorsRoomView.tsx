import React, { useState } from 'react';
import {
  Clapperboard,
  Plus,
  Trash2,
  Move,
  Camera,
  User,
  Sun,
  Maximize2,
  Sparkles,
  Download,
  RotateCcw,
} from 'lucide-react';

interface ShotItem {
  id: string;
  shotNum: number;
  type: string;
  lens: string;
  movement: string;
  action: string;
  audioCue: string;
}

interface StagingElement {
  id: string;
  name: string;
  type: 'camera' | 'actor' | 'light' | 'prop';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  color: string;
}

export const DirectorsRoomView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shotlist' | 'blocking' | 'subtext'>('blocking');

  // Shot List State
  const [shots, setShots] = useState<ShotItem[]>(() => {
    const s = localStorage.getItem('filmmaker_saved_shots');
    if (s) {
      try {
        return JSON.parse(s);
      } catch (e) {}
    }
    return [
      {
        id: 's-1',
        shotNum: 1,
        type: 'Extreme Wide',
        lens: '24mm',
        movement: 'Slow Dolly In',
        action: 'Rain-soaked alleyway; protagonist enters silhouette from camera left.',
        audioCue: 'Heavy rain thunder + distant siren.',
      },
      {
        id: 's-2',
        shotNum: 2,
        type: 'Medium Close-Up',
        lens: '50mm',
        movement: 'Handheld subtle drift',
        action: 'Protagonist wipes blood from brow; checks pocket watch.',
        audioCue: 'Ticking pocket watch amplified.',
      },
      {
        id: 's-3',
        shotNum: 3,
        type: 'Over The Shoulder',
        lens: '85mm',
        movement: 'Static',
        action: 'Antagonist stepping out of black sedan; power dynamic established.',
        audioCue: 'Car door slam resonance.',
      },
    ];
  });

  // Staging Visualizer State
  const [elements, setElements] = useState<StagingElement[]>([
    { id: 'cam-1', name: 'MAIN CAM (A)', type: 'camera', x: 50, y: 80, color: '#00D4FF' },
    { id: 'actor-1', name: 'ACTOR A (Protagonist)', type: 'actor', x: 35, y: 35, color: '#35D49A' },
    { id: 'actor-2', name: 'ACTOR B (Antagonist)', type: 'actor', x: 65, y: 35, color: '#FF4D6D' },
    { id: 'light-1', name: 'KEY LIGHT (45°)', type: 'light', x: 15, y: 60, color: '#FFB547' },
    { id: 'light-2', name: 'RIM / BACK LIGHT', type: 'light', x: 50, y: 15, color: '#785CFF' },
  ]);

  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  // Subtext Generator State
  const [subtextScene, setSubtextScene] = useState(
    'A simple coffee shop reunion between two former best friends.'
  );
  const [generatedSubtext, setGeneratedSubtext] = useState<string[]>([]);

  const SUBTEXT_PROMPTS = [
    'Direct Actor A: Deliver your dialogue warmly, but physically treat the table as a barbed-wire boundary you refuse to cross.',
    'Direct Actor B: You already know Actor A committed the embezzlement, but you want to see how easily they lie to your face.',
    'Direct Actor A: You are terminally ill and this is the last time you will see them, but you are forbidden from saying so.',
    'Direct Actor B: You consider Actor A your moral superior, and every question you ask is actually a test of your own unworthiness.',
  ];

  const handleGenerateSubtext = () => {
    // Shuffle prompts
    setGeneratedSubtext([...SUBTEXT_PROMPTS].sort(() => 0.5 - Math.random()).slice(0, 3));
  };

  const handleAddShot = () => {
    const newShot: ShotItem = {
      id: `s-${Date.now()}`,
      shotNum: shots.length + 1,
      type: 'Medium Shot',
      lens: '35mm',
      movement: 'Static',
      action: 'Actor delivers critical turning point line.',
      audioCue: 'Atmospheric silence.',
    };
    const updated = [...shots, newShot];
    setShots(updated);
    localStorage.setItem('filmmaker_saved_shots', JSON.stringify(updated));
  };

  const updateShot = (id: string, field: keyof ShotItem, val: string) => {
    const updated = shots.map((s) => (s.id === id ? { ...s, [field]: val } : s));
    setShots(updated);
    localStorage.setItem('filmmaker_saved_shots', JSON.stringify(updated));
  };

  const deleteShot = (id: string) => {
    const updated = shots.filter((s) => s.id !== id).map((s, idx) => ({ ...s, shotNum: idx + 1 }));
    setShots(updated);
    localStorage.setItem('filmmaker_saved_shots', JSON.stringify(updated));
  };

  // Move staging element on click
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedElementId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setElements((prev) =>
      prev.map((el) => (el.id === selectedElementId ? { ...el, x, y } : el))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#785CFF] mb-1">
            <Clapperboard className="w-4 h-4" />
            <span>DIRECTORIAL COMMAND // THE DIRECTOR'S ROOM</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-2xl text-white">
            STAGING, BLOCKING & SHOT BREAKDOWN
          </h2>
          <p className="text-xs text-[#8995AA] mt-1">
            Plan character blocking, visualize spatial sightlines, generate actor subtext, and construct camera shot divisions.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-1 rounded-xl bg-[#101827] border border-[#1E293B]">
          <button
            onClick={() => setActiveTab('blocking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition ${
              activeTab === 'blocking'
                ? 'bg-[#785CFF] text-white shadow-purple-glow'
                : 'text-[#8995AA] hover:text-white'
            }`}
          >
            BLOCKING & STAGING
          </button>
          <button
            onClick={() => setActiveTab('shotlist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition ${
              activeTab === 'shotlist'
                ? 'bg-[#785CFF] text-white shadow-purple-glow'
                : 'text-[#8995AA] hover:text-white'
            }`}
          >
            SHOT LIST BUILDER
          </button>
          <button
            onClick={() => setActiveTab('subtext')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition ${
              activeTab === 'subtext'
                ? 'bg-[#785CFF] text-white shadow-purple-glow'
                : 'text-[#8995AA] hover:text-white'
            }`}
          >
            ACTOR SUBTEXT
          </button>
        </div>
      </div>

      {/* Tab 1: Blocking & Staging Visualizer */}
      {activeTab === 'blocking' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 2D Canvas */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#8995AA]">
                OVERHEAD BIRD'S-EYE STAGING GRID (Click canvas to reposition selected entity)
              </span>
              <span className="text-[10px] font-mono text-[#00D4FF]">
                {selectedElementId
                  ? `SELECTED: ${elements.find((e) => e.id === selectedElementId)?.name}`
                  : 'CLICK ELEMENT TO SELECT'}
              </span>
            </div>

            <div
              onClick={handleGridClick}
              className="relative w-full h-[420px] rounded-2xl bg-[#090D18] border-2 border-[#1E293B] overflow-hidden cursor-crosshair shadow-inner"
              style={{
                backgroundImage:
                  'radial-gradient(#1E293B 1px, transparent 1px), linear-gradient(to right, #101827 1px, transparent 1px), linear-gradient(to bottom, #101827 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              {/* Center Line / Axis of Action (180 Degree Rule Guide) */}
              <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-[#8995AA]/20 pointer-events-none" />
              <div className="absolute top-2 left-3 text-[10px] font-mono text-[#8995AA]/60 pointer-events-none">
                180° AXIS OF ACTION
              </div>

              {/* Elements on Canvas */}
              {elements.map((el) => {
                const isSelected = selectedElementId === el.id;
                return (
                  <div
                    key={el.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElementId(el.id);
                    }}
                    style={{
                      left: `${el.x}%`,
                      top: `${el.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute p-2 rounded-xl flex items-center space-x-1.5 cursor-pointer select-none transition-all duration-150 ${
                      isSelected
                        ? 'ring-2 ring-white scale-110 shadow-lg'
                        : 'hover:scale-105'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-black shadow-md"
                      style={{ backgroundColor: el.color }}
                    >
                      {el.type === 'camera' && <Camera className="w-4 h-4 text-black" />}
                      {el.type === 'actor' && <User className="w-4 h-4 text-black" />}
                      {el.type === 'light' && <Sun className="w-4 h-4 text-black" />}
                    </div>
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white whitespace-nowrap border border-white/20"
                    >
                      {el.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Staging Control Deck */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-4">
            <h3 className="font-orbitron font-bold text-sm text-white">SET ENTITIES</h3>

            <div className="space-y-2">
              {elements.map((el) => {
                const isSelected = selectedElementId === el.id;
                return (
                  <div
                    key={el.id}
                    onClick={() => setSelectedElementId(el.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-[#1E293B] border-[#00D4FF] text-white shadow-cyan-glow'
                        : 'bg-[#090D18] border-[#1E293B] text-[#8995AA] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: el.color }} />
                      <span className="font-mono font-bold">{el.name}</span>
                    </div>
                    <span className="text-[10px] font-mono">
                      X: {el.x}% Y: {el.y}%
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-[#090D18] border border-[#1E293B] text-xs text-[#8995AA] space-y-2">
              <span className="font-mono font-bold text-white block">DIRECTOR'S TIP:</span>
              <p className="text-[11px] leading-relaxed">
                Keep the camera on one side of the 180° line to maintain consistent eye-lines. When characters move, allow the camera to pivot or dolly to establish a new axis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Shot List Builder */}
      {activeTab === 'shotlist' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#8995AA]">
              ACTIVE PRODUCTION SHOT DIVISION ({shots.length} SHOTS MAPPED)
            </span>
            <button
              onClick={handleAddShot}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold bg-[#785CFF] text-white hover:brightness-110 shadow-purple-glow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD NEXT SHOT</span>
            </button>
          </div>

          <div className="space-y-3">
            {shots.map((shot) => (
              <div
                key={shot.id}
                className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] space-y-3 hover:border-[#785CFF]/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-orbitron font-black text-sm text-[#00D4FF] bg-[#162238] px-2.5 py-1 rounded-lg">
                      SHOT #{shot.shotNum.toString().padStart(2, '0')}
                    </span>
                    <select
                      value={shot.type}
                      onChange={(e) => updateShot(shot.id, 'type', e.target.value)}
                      className="px-2 py-1 text-xs font-mono rounded bg-[#090D18] border border-[#1E293B] text-white"
                    >
                      <option value="Extreme Wide">Extreme Wide</option>
                      <option value="Wide Shot">Wide Shot</option>
                      <option value="Medium Shot">Medium Shot</option>
                      <option value="Medium Close-Up">Medium Close-Up</option>
                      <option value="Close-Up">Close-Up</option>
                      <option value="Extreme Close-Up">Extreme Close-Up</option>
                      <option value="Over The Shoulder">Over The Shoulder</option>
                      <option value="Dutch Angle">Dutch Angle</option>
                      <option value="POV">POV</option>
                    </select>

                    <select
                      value={shot.lens}
                      onChange={(e) => updateShot(shot.id, 'lens', e.target.value)}
                      className="px-2 py-1 text-xs font-mono rounded bg-[#090D18] border border-[#1E293B] text-white"
                    >
                      <option value="18mm">18mm (Ultra Wide)</option>
                      <option value="24mm">24mm (Cinematic Wide)</option>
                      <option value="35mm">35mm (Classic Staging)</option>
                      <option value="50mm">50mm (Natural Eye)</option>
                      <option value="85mm">85mm (Portrait Isolation)</option>
                      <option value="135mm">135mm (Telephoto Compress)</option>
                    </select>

                    <input
                      type="text"
                      value={shot.movement}
                      onChange={(e) => updateShot(shot.id, 'movement', e.target.value)}
                      placeholder="Movement (e.g. Dolly In, Handheld)"
                      className="px-2 py-1 text-xs font-mono rounded bg-[#090D18] border border-[#1E293B] text-white w-40"
                    />
                  </div>

                  <button
                    onClick={() => deleteShot(shot.id)}
                    className="p-1 text-[#8995AA] hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-mono text-[10px] text-[#8995AA] mb-0.5">
                      VISUAL ACTION & FRAMING
                    </label>
                    <input
                      type="text"
                      value={shot.action}
                      onChange={(e) => updateShot(shot.id, 'action', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-[#8995AA] mb-0.5">
                      AUDIO / SOUND CUE / DIALOGUE
                    </label>
                    <input
                      type="text"
                      value={shot.audioCue}
                      onChange={(e) => updateShot(shot.id, 'audioCue', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Actor Subtext Generator */}
      {activeTab === 'subtext' && (
        <div className="space-y-4 max-w-2xl mx-auto p-6 rounded-2xl bg-[#101827] border border-[#1E293B]">
          <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#785CFF]" />
            <span>ACTOR SUBTEXT & PSYCHOLOGICAL DIRECTION FORGE</span>
          </h3>
          <p className="text-xs text-[#8995AA]">
            Never tell an actor what to feel. Give them a secret, contradictory action objective that produces authentic tension on camera.
          </p>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#8995AA]">SCENE PREMISE</label>
            <input
              type="text"
              value={subtextScene}
              onChange={(e) => setSubtextScene(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
            />
          </div>

          <button
            onClick={handleGenerateSubtext}
            className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs bg-[#785CFF] text-white hover:brightness-110 shadow-purple-glow"
          >
            GENERATE CONTRADICTORY SUBTEXT NOTES
          </button>

          {generatedSubtext.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-[#1E293B]">
              <span className="font-mono text-xs text-[#00D4FF] font-bold block">DIRECTOR NOTES:</span>
              {generatedSubtext.map((note, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#090D18] border border-[#1E293B] text-xs text-white">
                  {note}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

