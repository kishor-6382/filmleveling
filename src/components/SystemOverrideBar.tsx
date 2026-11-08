import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  Sliders,
  FastForward,
  AlertTriangle,
  RotateCcw,
  Download,
  Upload,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Zap,
} from 'lucide-react';

export const SystemOverrideBar: React.FC = () => {
  const {
    advanceDaySimulation,
    triggerPenaltyManually,
    resetToInitialState,
    exportDataJSON,
    importDataJSON,
    player,
    currentSimulatedDate,
  } = useGame();

  const [isOpen, setIsOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);

  const handleExport = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `filmmaker_leveling_system_${currentSimulatedDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const ok = importDataJSON(importText);
    if (ok) {
      alert('System state imported successfully.');
      setShowImport(false);
      setImportText('');
    } else {
      alert('Invalid JSON structure.');
    }
  };

  return (
    <aside aria-label="Developer & Testing Console" className="fixed bottom-0 right-4 z-40">
      {/* Toggle Tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-t-lg bg-[#101827] border-t border-x border-[#1E293B] text-[11px] font-mono text-[#00D4FF] hover:text-white transition shadow-lg"
      >
        <Sliders className="w-3.5 h-3.5 text-[#00D4FF]" />
        <span>SYSTEM CONTROLS & DEV SIMULATOR</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Drawer Content */}
      {isOpen && (
        <div className="w-80 sm:w-96 p-4 rounded-tl-xl bg-[#0D1322]/95 border-t border-l border-[#1E293B] backdrop-blur-md shadow-2xl text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
            <span className="font-mono text-[#00D4FF] uppercase tracking-wider font-bold">
              SYSTEM TESTING DECK
            </span>
            <span className="text-[10px] font-mono text-[#8995AA]">DATE: {currentSimulatedDate}</span>
          </div>

          <p className="text-[11px] text-[#8995AA]">
            Use these controls to test progression, simulate missed deadlines, test the Penalty Gate, or backup progress.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {/* Advance Day (Clean) */}
            <button
              onClick={() => advanceDaySimulation(false)}
              className="flex items-center justify-center space-x-1.5 p-2 rounded-lg bg-[#162238] hover:bg-[#1E2E4A] text-white border border-[#1E293B] transition"
              title="Advances date by 1 day cleanly"
            >
              <FastForward className="w-3.5 h-3.5 text-[#35D49A]" />
              <span>Simulate Next Day</span>
            </button>

            {/* Advance Day (Missed -> Triggers Penalty) */}
            <button
              onClick={() => advanceDaySimulation(true)}
              className="flex items-center justify-center space-x-1.5 p-2 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-200 border border-red-500/50 transition"
              title="Simulates missing daily mandatory quests, triggering Penalty Quest"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span>Simulate Missed Day</span>
            </button>

            {/* Direct Penalty Trigger */}
            <button
              onClick={triggerPenaltyManually}
              className="flex items-center justify-center space-x-1.5 p-2 rounded-lg bg-[#162238] hover:bg-[#1E2E4A] text-[#FFB547] border border-[#1E293B] transition"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Trigger Penalty Quest</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExport}
              className="flex items-center justify-center space-x-1.5 p-2 rounded-lg bg-[#162238] hover:bg-[#1E2E4A] text-[#38BDF8] border border-[#1E293B] transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Save JSON</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#1E293B]">
            <button
              onClick={() => setShowImport(!showImport)}
              className="flex items-center space-x-1 text-[11px] text-[#8995AA] hover:text-white transition"
            >
              <Upload className="w-3 h-3" />
              <span>Import Backup</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all progress to initial level 1?')) {
                  resetToInitialState();
                }
              }}
              className="flex items-center space-x-1 text-[11px] text-red-400 hover:text-red-300 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset State</span>
            </button>
          </div>

          {showImport && (
            <div className="space-y-2 pt-2 border-t border-[#1E293B]">
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste save JSON here..."
                rows={3}
                className="w-full p-2 text-[10px] font-mono rounded bg-black/60 border border-[#1E293B] text-white focus:outline-none"
              />
              <button
                onClick={handleImportSubmit}
                className="w-full py-1.5 rounded bg-[#00D4FF] text-black font-bold font-mono text-[11px]"
              >
                Restore Save Data
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

