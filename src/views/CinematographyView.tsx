import React, { useState } from 'react';
import {
  Camera,
  Sun,
  Maximize,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const CinematographyView: React.FC = () => {
  // Lighting Ratio State
  const [selectedRatio, setSelectedRatio] = useState<number>(4); // 1:1, 2:1, 4:1, 8:1, 16:1
  const [lightingStyle, setLightingStyle] = useState<'rembrandt' | 'split' | 'butterfly' | 'rim'>('rembrandt');

  // Focal Length Slider State
  const [focalLength, setFocalLength] = useState<number>(35);

  const getFocalDescription = (mm: number) => {
    if (mm <= 20) {
      return {
        name: 'Ultra Wide Angle (14-20mm)',
        fov: '104° - 94° FOV',
        effect: 'Exaggerates space, dramatizes foreground size, stretches edges. Unsettling claustrophobia or cosmic scale.',
        directorRef: 'Terry Gilliam (Brazil), Yorgos Lanthimos (The Favourite)',
        distortion: 'Strong perspective distortion; unflattering for standard close-ups.',
      };
    }
    if (mm <= 28) {
      return {
        name: 'Cinematic Wide Angle (24-28mm)',
        fov: '84° - 75° FOV',
        effect: 'Environmental immersion. Keeps character intimately close while revealing their surrounding world.',
        directorRef: 'Alfonso Cuarón (Children of Men), Terrence Malick (The Tree of Life)',
        distortion: 'Gentle perspective stretching; majestic sense of place.',
      };
    }
    if (mm <= 40) {
      return {
        name: 'Classic Narrative Normal (35mm)',
        fov: '63° FOV',
        effect: 'The quintessential narrative lens. Natural human field of attention. Perfect for two-shots and staging.',
        directorRef: 'Martin Scorsese (Taxi Driver), Stanley Kubrick (The Shining)',
        distortion: 'Negligible distortion; authentic documentary weight.',
      };
    }
    if (mm <= 65) {
      return {
        name: 'The Human Eye (50mm)',
        fov: '46° FOV',
        effect: 'Pure honesty. Neutral compression matching organic human perception without editorial flair.',
        directorRef: 'Yasujiro Ozu (Tokyo Story), Robert Bresson (Pickpocket)',
        distortion: 'Zero distortion; clinical dramatic truth.',
      };
    }
    if (mm <= 100) {
      return {
        name: 'Portrait & Character Isolation (85mm)',
        fov: '28° FOV',
        effect: 'Shallow depth of field melts background into creamy bokeh. Separates character from their environment.',
        directorRef: 'David Fincher (The Social Network), Wong Kar-wai (In the Mood for Love)',
        distortion: 'Flattering facial compression; intense subjective intimacy.',
      };
    }
    return {
      name: 'Telephoto Compression (135mm+)',
      fov: '18° FOV',
      effect: 'Crushes spatial depth. Distant background elements appear immediately behind the character. Stalking/voyeuristic.',
      directorRef: 'Akira Kurosawa (Seven Samurai rain battle), Sidney Lumet (12 Angry Men final act)',
      distortion: 'Extreme spatial flattening; heat shimmer and surveillance feel.',
    };
  };

  const focalInfo = getFocalDescription(focalLength);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#1E293B] pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#35D49A] mb-1">
          <Camera className="w-4 h-4" />
          <span>VISUAL GRAMMAR // CINEMATOGRAPHY & LIGHTING LAB</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-2xl text-white">
          LIGHTING RATIOS, OPTICS & COMPOSITION
        </h2>
        <p className="text-xs text-[#8995AA] mt-1">
          Master the psychological geometry of light, focal length compression, and motivated camera placement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Lighting Ratio Simulator */}
        <div className="p-6 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#FFB547]" />
              <span>LIGHTING RATIO CALCULATOR</span>
            </h3>
            <span className="font-mono text-xs text-[#00D4FF] bg-[#162238] px-2 py-0.5 rounded">
              RATIO: {selectedRatio}:1
            </span>
          </div>

          {/* Ratio Buttons */}
          <div className="grid grid-cols-5 gap-2">
            {[
              { val: 1, label: '1:1', tag: 'Flat / Sitcom' },
              { val: 2, label: '2:1', tag: 'Subtle Drama' },
              { val: 4, label: '4:1', tag: 'Cinematic Noir' },
              { val: 8, label: '8:1', tag: 'Chiaroscuro' },
              { val: 16, label: '16:1', tag: 'Silhouette' },
            ].map((r) => (
              <button
                key={r.val}
                onClick={() => setSelectedRatio(r.val)}
                className={`p-2 rounded-xl text-center border transition ${
                  selectedRatio === r.val
                    ? 'bg-[#00D4FF] text-black border-[#00D4FF] font-bold shadow-cyan-glow'
                    : 'bg-[#090D18] text-[#8995AA] border-[#1E293B] hover:text-white'
                }`}
              >
                <div className="font-orbitron text-sm">{r.label}</div>
                <div className="text-[9px] font-mono leading-none mt-1 opacity-80">{r.tag}</div>
              </button>
            ))}
          </div>

          {/* Visual Face Lightfall Diagram */}
          <div className="p-5 rounded-xl bg-[#090D18] border border-[#1E293B] flex flex-col items-center justify-center space-y-3">
            <div className="relative w-44 h-44 rounded-full border border-white/10 overflow-hidden flex shadow-2xl">
              {/* Lit side (Key light) */}
              <div
                className="w-1/2 h-full bg-gradient-to-r from-amber-100 to-amber-200 transition-all duration-300"
                style={{ opacity: 1 }}
              />
              {/* Shadow / Fill side */}
              <div
                className="w-1/2 h-full bg-neutral-900 transition-all duration-300"
                style={{
                  opacity:
                    selectedRatio === 1
                      ? 0.15
                      : selectedRatio === 2
                      ? 0.45
                      : selectedRatio === 4
                      ? 0.75
                      : selectedRatio === 8
                      ? 0.92
                      : 0.98,
                }}
              />
              {/* Center nose bridge dividing silhouette */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-1 h-20 bg-black/40 blur-[1px]" />
              </div>
            </div>

            <div className="text-center">
              <span className="font-orbitron font-bold text-xs text-white block">
                {selectedRatio === 1 && 'FLAT COMMERCIAL LIGHTING (Zero Shadow Depth)'}
                {selectedRatio === 2 && 'CLASSIC DRAMATIC LIGHTING (Gentle 1-Stop Falloff)'}
                {selectedRatio === 4 && 'STANDARD CINEMATIC RATIO (2 Stops Difference, Rembrandt Triangle)'}
                {selectedRatio === 8 && 'HIGH DRAMA CHIAROSCURO (3 Stops Difference, Deep Shadows)'}
                {selectedRatio === 16 && 'EXTREME GRAPHIC TENSION (4+ Stops Difference, Near Black)'}
              </span>
              <p className="text-[11px] text-[#8995AA] mt-1 max-w-sm">
                Key Light intensity vs Fill Light intensity. Measured with a light meter or false color monitor.
              </p>
            </div>
          </div>

          {/* Lighting Schemes */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#8995AA]">CLASSIC PORTRAIT SCHEMES:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'rembrandt', name: 'Rembrandt Triangle', note: 'Triangle of light on shadow cheek' },
                { id: 'split', name: 'Split Lighting', note: 'Exact 50/50 light and dark divide' },
                { id: 'butterfly', name: 'Butterfly / Paramount', note: 'Light high above, shadow under nose' },
                { id: 'rim', name: 'Back / Edge Kick', note: 'Rim separation from dark background' },
              ].map((sch) => (
                <div
                  key={sch.id}
                  onClick={() => setLightingStyle(sch.id as any)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition ${
                    lightingStyle === sch.id
                      ? 'bg-[#162238] border-[#35D49A] text-white shadow-success-glow'
                      : 'bg-[#090D18] border-[#1E293B] text-[#8995AA] hover:text-white'
                  }`}
                >
                  <div className="font-bold">{sch.name}</div>
                  <div className="text-[10px] text-[#8995AA] mt-0.5">{sch.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Optics & Focal Length Simulator */}
        <div className="p-6 rounded-2xl bg-[#101827] border border-[#1E293B] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
              <Maximize className="w-4 h-4 text-[#00D4FF]" />
              <span>LENS FOCAL LENGTH & COMPRESSION</span>
            </h3>
            <span className="font-orbitron font-black text-xl text-[#00D4FF]">
              {focalLength}mm
            </span>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="14"
              max="135"
              step="1"
              value={focalLength}
              onChange={(e) => setFocalLength(Number(e.target.value))}
              className="w-full accent-[#00D4FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8995AA]">
              <span>14mm (Ultra Wide)</span>
              <span>35mm (Classic)</span>
              <span>50mm (Normal)</span>
              <span>85mm (Portrait)</span>
              <span>135mm (Telephoto)</span>
            </div>
          </div>

          {/* Dynamic Lens Card */}
          <div className="p-5 rounded-xl bg-[#090D18] border border-[#00D4FF]/30 space-y-3">
            <div className="flex justify-between items-center border-b border-[#1E293B] pb-2">
              <span className="font-orbitron font-extrabold text-sm text-[#00D4FF]">
                {focalInfo.name}
              </span>
              <span className="text-xs font-mono text-[#35D49A] font-bold">
                {focalInfo.fov}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-mono text-[#8995AA] uppercase block font-bold">
                  PSYCHOLOGICAL EFFECT:
                </span>
                <p className="text-white leading-relaxed">{focalInfo.effect}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#FFB547] uppercase block font-bold">
                  AUTEUR PRECEDENTS:
                </span>
                <p className="text-zinc-300 font-mono text-[11px]">{focalInfo.directorRef}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase block font-bold">
                  SPATIAL CHARACTERISTIC:
                </span>
                <p className="text-[#8995AA] leading-relaxed">{focalInfo.distortion}</p>
              </div>
            </div>
          </div>

          {/* 5 Dynamic Angles Reference */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#8995AA]">THE 5 ESSENTIAL ANGLES OF CINEMA:</span>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              <div className="p-2 rounded bg-[#090D18] border border-[#1E293B] flex justify-between">
                <span className="font-bold text-white">1. Extreme Wide Establishing</span>
                <span className="text-[#8995AA] text-[11px]">Geography, weather, existential isolation</span>
              </div>
              <div className="p-2 rounded bg-[#090D18] border border-[#1E293B] flex justify-between">
                <span className="font-bold text-white">2. Low-Angle Dutch Tilt</span>
                <span className="text-[#8995AA] text-[11px]">Psychological fracture, vertigo, looming threat</span>
              </div>
              <div className="p-2 rounded bg-[#090D18] border border-[#1E293B] flex justify-between">
                <span className="font-bold text-white">3. High-Angle Surveillance</span>
                <span className="text-[#8995AA] text-[11px]">Diminished status, vulnerability, voyeurism</span>
              </div>
              <div className="p-2 rounded bg-[#090D18] border border-[#1E293B] flex justify-between">
                <span className="font-bold text-white">4. Over-The-Shoulder (Dirty OTS)</span>
                <span className="text-[#8995AA] text-[11px]">Conversational spatial tether, intimacy or interrogation</span>
              </div>
              <div className="p-2 rounded bg-[#090D18] border border-[#1E293B] flex justify-between">
                <span className="font-bold text-white">5. Macro Extreme Close-Up (ECU)</span>
                <span className="text-[#8995AA] text-[11px]">Dilating pupils, trembling hands, ticking clock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

