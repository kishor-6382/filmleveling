import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { LevelUpModal } from './components/LevelUpModal';
import { MissionConfirmModal } from './components/MissionConfirmModal';
import { SystemOverrideBar } from './components/SystemOverrideBar';

// Views
import { DashboardView } from './views/DashboardView';
import { DailyQuestsView } from './views/DailyQuestsView';
import { WeeklyQuestsView } from './views/WeeklyQuestsView';
import { PunishmentQuestsView } from './views/PunishmentQuestsView';
import { FilmLibraryView } from './views/FilmLibraryView';
import { StoryLabView } from './views/StoryLabView';
import { DirectorsRoomView } from './views/DirectorsRoomView';
import { CinematographyView } from './views/CinematographyView';
import { EditingLabView } from './views/EditingLabView';
import { PlayerStatusView } from './views/PlayerStatusView';
import { AchievementsView } from './views/AchievementsView';
import { AnalyticsView } from './views/AnalyticsView';

const MainContent: React.FC = () => {
  const { activeTab } = useGame();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 min-h-[calc(100vh-140px)]">
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'daily-quests' && <DailyQuestsView />}
      {activeTab === 'weekly-quests' && <WeeklyQuestsView />}
      {activeTab === 'punishment-quests' && <PunishmentQuestsView />}
      {activeTab === 'film-library' && <FilmLibraryView />}
      {activeTab === 'story-lab' && <StoryLabView />}
      {activeTab === 'directors-room' && <DirectorsRoomView />}
      {activeTab === 'cinematography' && <CinematographyView />}
      {activeTab === 'editing-lab' && <EditingLabView />}
      {activeTab === 'player-status' && <PlayerStatusView />}
      {activeTab === 'achievements' && <AchievementsView />}
      {activeTab === 'analytics' && <AnalyticsView />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-[#080B14] text-[#F5F7FF] relative overflow-hidden font-sans">
        {/* Ambient background glow orbs */}
        <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#785CFF]/5 blur-[120px] pointer-events-none" />

        {/* Scanline subtle texture */}
        <div className="fixed inset-0 scanline-overlay pointer-events-none z-50 opacity-40" />

        {/* App Layout */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <Navigation />
          <MainContent />
          <SystemOverrideBar />
        </div>

        {/* Modals */}
        <LevelUpModal />
        <MissionConfirmModal />
      </div>
    </GameProvider>
  );
};

export default App;

