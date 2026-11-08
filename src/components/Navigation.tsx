import React from 'react';
import { useGame } from '../context/GameContext';
import { ActiveTab } from '../types';
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  ShieldAlert,
  Film,
  BookOpen,
  Clapperboard,
  Camera,
  Scissors,
  User,
  Award,
  BarChart3,
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  alert?: boolean;
}

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, dailyMissions, player } = useGame();

  const pendingDailyCount = dailyMissions.filter((m) => m.status === 'pending').length;
  const isPenaltyActive = !!player.activePenalty;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'daily-quests', label: 'DAILY QUESTS', icon: CheckSquare, badge: pendingDailyCount > 0 ? pendingDailyCount : undefined },
    { id: 'weekly-quests', label: 'WEEKLY QUESTS', icon: CalendarDays },
    {
      id: 'punishment-quests',
      label: 'PENALTY ZONE',
      icon: ShieldAlert,
      alert: isPenaltyActive,
      badge: isPenaltyActive ? 'ACTIVE' : undefined,
    },
    { id: 'film-library', label: 'FILM LIBRARY', icon: Film },
    { id: 'story-lab', label: 'STORY LAB', icon: BookOpen },
    { id: 'directors-room', label: "DIRECTOR'S ROOM", icon: Clapperboard },
    { id: 'cinematography', label: 'CINEMATOGRAPHY', icon: Camera },
    { id: 'editing-lab', label: 'EDITING LAB', icon: Scissors },
    { id: 'player-status', label: 'PLAYER STATUS', icon: User },
    { id: 'achievements', label: 'ACHIEVEMENTS', icon: Award },
    { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
  ];

  return (
    <nav className="bg-[#0D1322] border-b border-[#1E293B] sticky top-16 sm:top-20 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-2.5 scrollbar-thin scrollbar-thumb-[#1E293B]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-orbitron font-semibold whitespace-nowrap transition-all duration-200 relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00D4FF]/20 to-[#785CFF]/20 text-white border border-[#00D4FF]/60 shadow-cyan-glow'
                    : item.alert
                    ? 'bg-red-950/60 text-red-300 border border-red-500/80 hover:bg-red-900/40 animate-pulse'
                    : 'text-[#8995AA] hover:text-white hover:bg-[#162238]/60 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors ${
                    isActive
                      ? 'text-[#00D4FF]'
                      : item.alert
                      ? 'text-[#FF4D6D]'
                      : 'text-[#8995AA] group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>

                {item.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold leading-tight ${
                      item.alert
                        ? 'bg-[#FF4D6D] text-white shadow-danger-glow'
                        : isActive
                        ? 'bg-[#00D4FF] text-black'
                        : 'bg-[#1E293B] text-[#8995AA]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <div className="absolute -bottom-2.5 left-2 right-2 h-0.5 bg-gradient-to-r from-[#00D4FF] to-[#785CFF]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

