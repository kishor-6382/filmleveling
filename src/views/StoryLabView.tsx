import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Save,
  Plus,
  Trash2,
  FileText,
  Copy,
  Check,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface LoglineEntry {
  id: string;
  title: string;
  protagonist: string;
  flaw: string;
  incitingEvent: string;
  want: string;
  obstacle: string;
  twist: string;
  createdAt: string;
}

const PRESET_IDEAS = [
  {
    title: 'THE SHADOW SOUND RECORDIST',
    protagonist: 'A deafened Foley artist with synthetic cochlear implants',
    flaw: 'Pathological paranoia and isolated reclusiveness',
    incitingEvent: 'accidentally captures the ultrasonic frequency of an on-set assassination disguised as a stunt malfunction',
    want: 'must isolate the acoustic signature before the next production wraps',
    obstacle: 'while being pursued by the studio head who funded the hit',
    twist: 'only to discover the killer is his estranged daughter using his own acoustic patents.',
  },
  {
    title: 'THE RE-EDIT CONSPIRACY',
    protagonist: 'An obsessive film restoration editor in Chennai',
    flaw: 'Addicted to amphetamines and unable to grieve his deceased brother',
    incitingEvent: 'discovers missing film negative frames from a banned 1978 political thriller',
    want: 'must reconstruct the censored final reel before the archive is seized',
    obstacle: 'against a ruthless corporate real-estate cartel',
    twist: 'discovering the censored reel exposes that his own grandfather faked the historic riot.',
  },
];

export const StoryLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'loglines' | 'beatsheet' | 'scriptpad'>('loglines');

  // Logline generator state
  const [title, setTitle] = useState('');
  const [protagonist, setProtagonist] = useState('');
  const [flaw, setFlaw] = useState('');
  const [incitingEvent, setIncitingEvent] = useState('');
  const [want, setWant] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [twist, setTwist] = useState('');
  const [savedLoglines, setSavedLoglines] = useState<LoglineEntry[]>(() => {
    const s = localStorage.getItem('filmmaker_saved_loglines');
    if (s) {
      try {
        return JSON.parse(s);
      } catch (e) {}
    }
    return [
      {
        id: 'log-1',
        title: PRESET_IDEAS[0].title,
        protagonist: PRESET_IDEAS[0].protagonist,
        flaw: PRESET_IDEAS[0].flaw,
        incitingEvent: PRESET_IDEAS[0].incitingEvent,
        want: PRESET_IDEAS[0].want,
        obstacle: PRESET_IDEAS[0].obstacle,
        twist: PRESET_IDEAS[0].twist,
        createdAt: '2026-11-05',
      },
    ];
  });

  // Beat sheet state
  const [beats, setBeats] = useState<Record<string, string>>(() => {
    const s = localStorage.getItem('filmmaker_saved_beats');
    if (s) {
      try {
        return JSON.parse(s);
      } catch (e) {}
    }
    return {
      opening: 'Introduce protagonist trapped in their false belief and status quo.',
      inciting: 'The catalyst event that shatters normal life and cannot be undone.',
      breakAct2: 'Protagonist crosses the threshold of adventure with no turning back.',
      midpoint: 'False victory or major stakes escalation; clock begins ticking.',
      allHopeLost: 'The lowest emotional point; the external plan completely fails.',
      climax: 'Final confrontation; protagonist uses newly forged truth to resolve crisis.',
      resolution: 'The transformed world order; visual contrast against the opening frame.',
    };
  });

  // Scriptpad state
  const [scriptText, setScriptText] = useState<string>(() => {
    const s = localStorage.getItem('filmmaker_saved_scriptpad');
    return (
      s ||
      `EXT. ROOFTOP HELIPAD - NIGHT

Rain lashes against the wet asphalt. Electric cyan neon reflects off puddles.

KISHOR (30s), trench coat soaked, adjusts the optical viewfinder of his Arri 35. His hands tremble with adrenaline.

KISHOR
(whispering into comms)
The light is fading. We have thirty seconds before the storm drowns out the dialogue.

Across the perimeter, a figure emerges from the steam vents.`
    );
  });

  const [copied, setCopied] = useState(false);

  const saveLoglines = (list: LoglineEntry[]) => {
    setSavedLoglines(list);
    localStorage.setItem('filmmaker_saved_loglines', JSON.stringify(list));
  };

  const handleAddLogline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const entry: LoglineEntry = {
      id: `log-${Date.now()}`,
      title: title.trim(),
      protagonist: protagonist.trim() || 'A conflicted protagonist',
      flaw: flaw.trim() || 'plagued by past regret',
      incitingEvent: incitingEvent.trim() || 'faces an unexpected crisis',
      want: want.trim() || 'must overcome insurmountable odds',
      obstacle: obstacle.trim() || 'against a merciless adversary',
      twist: twist.trim() || 'with a final unforeseen truth.',
      createdAt: new Date().toISOString().split('T')[0],
    };

    saveLoglines([entry, ...savedLoglines]);
    setTitle('');
    setProtagonist('');
    setFlaw('');
    setIncitingEvent('');
    setWant('');
    setObstacle('');
    setTwist('');
  };

  const handleApplyPreset = () => {
    const preset = PRESET_IDEAS[Math.floor(Math.random() * PRESET_IDEAS.length)];
    setTitle(preset.title);
    setProtagonist(preset.protagonist);
    setFlaw(preset.flaw);
    setIncitingEvent(preset.incitingEvent);
    setWant(preset.want);
    setObstacle(preset.obstacle);
    setTwist(preset.twist);
  };

  const updateBeat = (key: string, val: string) => {
    const updated = { ...beats, [key]: val };
    setBeats(updated);
    localStorage.setItem('filmmaker_saved_beats', JSON.stringify(updated));
  };

  const handleScriptChange = (val: string) => {
    setScriptText(val);
    localStorage.setItem('filmmaker_saved_scriptpad', val);
  };

  const copyScript = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#00D4FF] mb-1">
            <BookOpen className="w-4 h-4" />
            <span>NARRATIVE FORGE // SCREENPLAY & STORY LAB</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-2xl text-white">
            SCREENPLAY & STORY ARCHITECTURE
          </h2>
          <p className="text-xs text-[#8995AA] mt-1">
            Build bulletproof high-concept premises, orchestrate 3-act dramatic beats, and draft industry-formatted scenes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-[#101827] border border-[#1E293B]">
          <button
            onClick={() => setActiveTab('loglines')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition ${
              activeTab === 'loglines'
                ? 'bg-[#00D4FF] text-black shadow-cyan-glow'
                : 'text-[#8995AA] hover:text-white'
            }`}
          >
            LOGLINE FORGE
          </button>
          <button
            onClick={() => setActiveTab('beatsheet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition ${
              activeTab === 'beatsheet'
                ? 'bg-[#00D4FF] text-black shadow-cyan-glow'
                : 'text-[#8995AA] hover:text-white'
            }`}
          >
            BEAT SHEET
          </button>
          <button
            onClick={() => setActiveTab('scriptpad')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold transition ${
              activeTab === 'scriptpad'
                ? 'bg-[#00D4FF] text-black shadow-cyan-glow'
                : 'text-[#8995AA] hover:text-white'
            }`}
          >
            SCENE SCRIPTPAD
          </button>
        </div>
      </div>

      {/* Tab 1: Logline Forge */}
      {activeTab === 'loglines' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-orbitron font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                <span>HIGH-CONCEPT GENERATOR</span>
              </h3>
              <button
                type="button"
                onClick={handleApplyPreset}
                className="text-xs font-mono text-[#00D4FF] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>LOAD PRESET</span>
              </button>
            </div>

            <form onSubmit={handleAddLogline} className="space-y-3 text-xs">
              <div>
                <label className="block font-mono text-[#8995AA] mb-1">WORKING TITLE</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. THE MIDNIGHT PROJECTIONIST"
                  className="w-full px-3 py-2 rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none focus:border-[#00D4FF]"
                />
              </div>

              <div>
                <label className="block font-mono text-[#8995AA] mb-1">PROTAGONIST & ROLE</label>
                <input
                  type="text"
                  value={protagonist}
                  onChange={(e) => setProtagonist(e.target.value)}
                  placeholder="e.g. An insomniac sound recordist in Mumbai..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[#8995AA] mb-1">FATAL FLAW / BLIND SPOT</label>
                <input
                  type="text"
                  value={flaw}
                  onChange={(e) => setFlaw(e.target.value)}
                  placeholder="e.g. Paralyzed by guilt over a fatal on-set accident..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[#8995AA] mb-1">INCITING INCIDENT</label>
                <input
                  type="text"
                  value={incitingEvent}
                  onChange={(e) => setIncitingEvent(e.target.value)}
                  placeholder="e.g. accidentally captures an audio frequency exposing an undercover hit..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[#8995AA] mb-1">PRIMARY GOAL & OPPOSING FORCE</label>
                <input
                  type="text"
                  value={want}
                  onChange={(e) => setWant(e.target.value)}
                  placeholder="e.g. must identify the shooter before midnight while pursued by police..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[#8995AA] mb-1">IRONIC TWIST / THIRD-ACT REVERSAL</label>
                <input
                  type="text"
                  value={twist}
                  onChange={(e) => setTwist(e.target.value)}
                  placeholder="e.g. discovering the target was his own brother..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs bg-gradient-to-r from-[#00D4FF] to-[#36AFFF] text-black hover:brightness-110 shadow-cyan-glow"
              >
                FORGE & SAVE PREMISE
              </button>
            </form>
          </div>

          {/* Saved Vault */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-orbitron font-bold text-sm text-white flex items-center justify-between">
              <span>SAVED LOGLINES VAULT ({savedLoglines.length})</span>
            </h3>

            <div className="space-y-3">
              {savedLoglines.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-[#101827] border border-[#1E293B] space-y-3 hover:border-[#00D4FF]/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-orbitron font-bold text-base text-white">
                      {item.title}
                    </span>
                    <button
                      onClick={() => saveLoglines(savedLoglines.filter((x) => x.id !== item.id))}
                      className="p-1 text-[#8995AA] hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[#8995AA] leading-relaxed">
                    When <span className="text-white font-medium">{item.protagonist}</span> ({item.flaw}){' '}
                    <span className="text-[#00D4FF] font-medium">{item.incitingEvent}</span>, they{' '}
                    <span className="text-white font-medium">{item.want}</span>, {item.obstacle},{' '}
                    <span className="text-[#FFB547] font-semibold">{item.twist}</span>.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Beat Sheet Outliner */}
      {activeTab === 'beatsheet' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] flex items-center justify-between">
            <span className="text-xs font-mono text-[#8995AA]">
              STANDARD 3-ACT / 8-BEAT HEROIC SPINE (Saves automatically to browser memory)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'opening', name: '1. OPENING IMAGE & STATUS QUO', tag: 'ACT 1' },
              { id: 'inciting', name: '2. INCITING INCIDENT / THE CATALYST', tag: 'ACT 1' },
              { id: 'breakAct2', name: '3. BREAK INTO ACT TWO', tag: 'ACT 1 -> 2' },
              { id: 'midpoint', name: '4. MIDPOINT (FALSE PEAK OR CATASTROPHE)', tag: 'ACT 2' },
              { id: 'allHopeLost', name: '5. ALL HOPE LOST / DARK NIGHT OF SOUL', tag: 'ACT 2' },
              { id: 'climax', name: '6. THE CLIMACTIC CONFRONTATION', tag: 'ACT 3' },
              { id: 'resolution', name: '7. FINAL IMAGE & TRANSFORMATION', tag: 'ACT 3' },
            ].map((beat) => (
              <div key={beat.id} className="p-4 rounded-xl bg-[#101827] border border-[#1E293B] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-orbitron font-bold text-xs text-white">{beat.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#162238] text-[#00D4FF]">
                    {beat.tag}
                  </span>
                </div>
                <textarea
                  value={beats[beat.id] || ''}
                  onChange={(e) => updateBeat(beat.id, e.target.value)}
                  rows={3}
                  className="w-full p-2.5 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none focus:border-[#00D4FF] leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Screenplay Pad */}
      {activeTab === 'scriptpad' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#101827] border border-[#1E293B]">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-[#8995AA]">FORMAT: INDUSTRY COURIER SCREENPLAY PAD</span>
            </div>

            <button
              onClick={copyScript}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-[#162238] text-white hover:bg-[#1E2E4A] transition border border-[#1E293B]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#35D49A]" /> : <Copy className="w-3.5 h-3.5 text-[#00D4FF]" />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY SCRIPT'}</span>
            </button>
          </div>

          <div className="relative rounded-2xl border border-[#1E293B] bg-[#0A0D16] p-6 shadow-2xl">
            <textarea
              value={scriptText}
              onChange={(e) => handleScriptChange(e.target.value)}
              rows={16}
              className="w-full bg-transparent text-[#F5F7FF] font-mono text-sm leading-relaxed focus:outline-none resize-y selection:bg-[#00D4FF]/30"
              placeholder="INT. ROOM - DAY..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

