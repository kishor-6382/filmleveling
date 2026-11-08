import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { FilmItem } from '../types';
import {
  Film,
  Search,
  Filter,
  Star,
  CheckCircle2,
  Clock,
  Eye,
  Plus,
  X,
  Sparkles,
  BookOpen,
  Camera,
  Edit3,
} from 'lucide-react';

export const FilmLibraryView: React.FC = () => {
  const { filmDatabase, updateFilmItem, addFilmItem } = useGame();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedFilmForAnalysis, setSelectedFilmForAnalysis] = useState<FilmItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New film form state
  const [newTitle, setNewTitle] = useState('');
  const [newYear, setNewYear] = useState(2024);
  const [newCountry, setNewCountry] = useState('India');
  const [newDirector, setNewDirector] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [newCategory, setNewCategory] = useState<FilmItem['category']>('Direction');
  const [newWhy, setNewWhy] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newDiff, setNewDiff] = useState<FilmItem['difficulty']>('Intermediate');

  // Analysis editor temporary state
  const [editRating, setEditRating] = useState<number>(0);
  const [editNotes, setEditNotes] = useState<string>('');
  const [editStatus, setEditStatus] = useState<FilmItem['watchStatus']>('To Watch');

  const categories = [
    'ALL',
    'Indian Commercial Filmmaking',
    'Direction',
    'Cinematography',
    'Editing',
    'Screenwriting',
    'Nonlinear Storytelling',
    'Visual Storytelling',
    'Character Development',
    'World Cinema',
  ];

  const filteredFilms = filmDatabase.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.techniqueToStudy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || f.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || f.watchStatus === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const openAnalysisEditor = (film: FilmItem) => {
    setSelectedFilmForAnalysis(film);
    setEditRating(film.personalRating || 0);
    setEditNotes(film.analysisNotes || '');
    setEditStatus(film.watchStatus);
  };

  const handleSaveAnalysis = () => {
    if (!selectedFilmForAnalysis) return;
    updateFilmItem(selectedFilmForAnalysis.id, {
      personalRating: editRating,
      analysisNotes: editNotes,
      watchStatus: editStatus,
      watchedDate: editStatus === 'Completed' ? new Date().toISOString().split('T')[0] : undefined,
    });
    setSelectedFilmForAnalysis(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addFilmItem({
      title: newTitle.trim(),
      year: Number(newYear),
      country: newCountry.trim(),
      director: newDirector.trim(),
      genre: newGenre.trim(),
      category: newCategory,
      whyWatch: newWhy.trim() || 'Crucial study in directorial syntax.',
      techniqueToStudy: newTech.trim() || 'Shot framing, pacing, and performance staging.',
      difficulty: newDiff,
      watchStatus: 'To Watch',
      personalRating: 0,
      analysisNotes: '',
      posterBg: 'from-blue-950 via-slate-900 to-black',
    });

    setNewTitle('');
    setNewDirector('');
    setNewGenre('');
    setNewWhy('');
    setNewTech('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FFB547] mb-1">
            <Film className="w-4 h-4" />
            <span>CINEMATIC APPRENTICESHIP // MASTERCLASS VAULT</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-2xl text-white">
            FILM WATCHLIST & ANALYSIS LABORATORY
          </h2>
          <p className="text-xs text-[#8995AA] mt-1">
            Curated works of Indian & World cinema. Study exact directorial mechanics to build an original filmmaking language.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-orbitron font-bold bg-[#162238] hover:bg-[#1E2E4A] text-white border border-[#FFB547]/50 shadow-lg transition"
        >
          <Plus className="w-4 h-4 text-[#FFB547]" />
          <span>ADD FILM TO VAULT</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#8995AA]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by film title, director, or technique (e.g. Nayakan, Kurosawa, Chiaroscuro)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-[#101827] border border-[#1E293B] text-white focus:outline-none focus:border-[#00D4FF]"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center space-x-1 bg-[#101827] p-1 rounded-xl border border-[#1E293B]">
            {['ALL', 'To Watch', 'Watching', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                  selectedStatus === st
                    ? 'bg-[#00D4FF] text-black font-bold shadow-cyan-glow'
                    : 'text-[#8995AA] hover:text-white'
                }`}
              >
                {st.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#FFB547] text-black font-bold'
                  : 'bg-[#101827] text-[#8995AA] hover:text-white border border-[#1E293B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Films Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFilms.map((film) => {
          const isCompleted = film.watchStatus === 'Completed';

          return (
            <div
              key={film.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 bg-gradient-to-b ${film.posterBg} ${
                isCompleted
                  ? 'border-[#35D49A]/50 shadow-success-glow'
                  : 'border-[#1E293B] hover:border-[#00D4FF]/60 hover:shadow-cyan-glow'
              }`}
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#FFB547] border border-white/10 uppercase">
                    {film.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      film.watchStatus === 'Completed'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                        : film.watchStatus === 'Watching'
                        ? 'bg-blue-950 text-blue-300 border border-blue-600/40'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {film.watchStatus.toUpperCase()}
                  </span>
                </div>

                {/* Title & Director */}
                <h3 className="font-orbitron font-bold text-lg text-white leading-tight">
                  {film.title}
                </h3>
                <div className="text-xs font-mono text-[#8995AA] mt-0.5">
                  {film.year} • {film.country} • Dir. {film.director}
                </div>

                {/* Rating if present */}
                {film.personalRating > 0 && (
                  <div className="flex items-center space-x-1 mt-2 text-xs font-orbitron font-bold text-[#FFB547]">
                    <Star className="w-3.5 h-3.5 fill-[#FFB547]" />
                    <span>{film.personalRating} / 10 RATING</span>
                  </div>
                )}

                {/* Why Watch */}
                <div className="mt-3.5 space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/10">
                    <span className="text-[10px] font-mono text-[#00D4FF] uppercase block font-bold mb-0.5">
                      WHY YOU MUST STUDY THIS:
                    </span>
                    <p className="text-[#8995AA] leading-relaxed line-clamp-3">
                      {film.whyWatch}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/10">
                    <span className="text-[10px] font-mono text-[#35D49A] uppercase block font-bold mb-0.5">
                      TECHNIQUE TO DECODE:
                    </span>
                    <p className="text-white/90 leading-relaxed font-mono text-[11px] line-clamp-2">
                      {film.techniqueToStudy}
                    </p>
                  </div>
                </div>

                {/* Analysis preview if saved */}
                {film.analysisNotes && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#0A1322] border border-[#00D4FF]/30 text-xs">
                    <span className="text-[10px] font-mono text-[#00D4FF] block font-bold mb-0.5">
                      YOUR DIRECTORIAL NOTES:
                    </span>
                    <p className="text-white italic text-[11px] line-clamp-2">
                      "{film.analysisNotes}"
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Action */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#8995AA]">
                  LEVEL: {film.difficulty}
                </span>

                <button
                  onClick={() => openAnalysisEditor(film)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold bg-[#162238] hover:bg-[#1E2E4A] text-white border border-white/20 transition"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#00D4FF]" />
                  <span>{film.analysisNotes ? 'EDIT ANALYSIS' : 'WRITE ANALYSIS'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Write Analysis & Rate Film */}
      {selectedFilmForAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#00D4FF]/50 bg-[#0E1526] p-6 sm:p-7 shadow-cyan-glow text-[#F5F7FF] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedFilmForAnalysis(null)}
              className="absolute top-4 right-4 p-1 rounded text-[#8995AA] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider block mb-1">
              DIRECTORIAL DECONSTRUCTION NOTEBOOK
            </span>

            <h3 className="font-orbitron font-bold text-xl text-white">
              {selectedFilmForAnalysis.title} ({selectedFilmForAnalysis.year})
            </h3>
            <p className="text-xs font-mono text-[#8995AA] mb-4">
              Dir. {selectedFilmForAnalysis.director} • {selectedFilmForAnalysis.country}
            </p>

            <div className="space-y-4">
              {/* Watch Status Selector */}
              <div>
                <label className="block text-xs font-mono text-[#8995AA] mb-1">WATCH STATUS</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['To Watch', 'Watching', 'Completed'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setEditStatus(st)}
                      className={`py-2 text-xs font-mono font-bold rounded-lg border transition ${
                        editStatus === st
                          ? 'bg-[#00D4FF] text-black border-[#00D4FF] shadow-cyan-glow'
                          : 'bg-[#101827] text-[#8995AA] border-[#1E293B]'
                      }`}
                    >
                      {st.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Rating (0-10) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-[#8995AA]">DIRECTORIAL RATING</label>
                  <span className="font-orbitron font-bold text-sm text-[#FFB547]">
                    {editRating} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={editRating}
                  onChange={(e) => setEditRating(Number(e.target.value))}
                  className="w-full accent-[#FFB547] cursor-pointer"
                />
              </div>

              {/* In-depth Analysis Notes */}
              <div>
                <label className="block text-xs font-mono text-[#8995AA] mb-1">
                  DETAILED ANALYSIS & CRAFT BREAKDOWN:
                </label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Document: 1) What was the central thematic motif? 2) How did camera movement emphasize power shifts? 3) What editing tempo dictated the climax? 4) What single shot will you steal for your own film?"
                  rows={6}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-[#090D18] border border-[#1E293B] text-white focus:outline-none focus:border-[#00D4FF] leading-relaxed"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setSelectedFilmForAnalysis(null)}
                className="w-1/3 py-2.5 rounded-xl text-xs font-orbitron bg-[#162238] text-[#8995AA] hover:text-white"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleSaveAnalysis}
                className="w-2/3 py-2.5 rounded-xl text-xs font-orbitron font-bold bg-[#00D4FF] text-black hover:brightness-110 shadow-cyan-glow"
              >
                SAVE ANALYSIS NOTES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Custom Film */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl border border-[#FFB547]/50 bg-[#0E1526] p-6 shadow-lg text-[#F5F7FF] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1 rounded text-[#8995AA] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-orbitron font-bold text-lg text-white mb-1 flex items-center gap-2">
              <Film className="w-4 h-4 text-[#FFB547]" />
              <span>ADD TO STUDY WATCHLIST</span>
            </h3>
            <p className="text-xs text-[#8995AA] mb-4">
              Add any film you plan to deconstruct.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-[#8995AA] mb-1">MOVIE TITLE</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Asuran / City of God"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none focus:border-[#FFB547]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#8995AA] mb-1">DIRECTOR</label>
                  <input
                    type="text"
                    required
                    value={newDirector}
                    onChange={(e) => setNewDirector(e.target.value)}
                    placeholder="e.g. Vetrimaaran"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#8995AA] mb-1">YEAR & COUNTRY</label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    placeholder="e.g. India (Tamil)"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8995AA] mb-1">CRAFT CATEGORY</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-2.5 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                >
                  <option value="Direction">Direction</option>
                  <option value="Cinematography">Cinematography</option>
                  <option value="Editing">Editing</option>
                  <option value="Screenwriting">Screenwriting</option>
                  <option value="Indian Commercial Filmmaking">Indian Commercial Filmmaking</option>
                  <option value="Nonlinear Storytelling">Nonlinear Storytelling</option>
                  <option value="Visual Storytelling">Visual Storytelling</option>
                  <option value="Character Development">Character Development</option>
                  <option value="World Cinema">World Cinema</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8995AA] mb-1">WHY STUDY THIS FILM</label>
                <textarea
                  value={newWhy}
                  onChange={(e) => setNewWhy(e.target.value)}
                  placeholder="What is the central cinematic breakthrough of this work?"
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8995AA] mb-1">TECHNIQUE TO DECODE</label>
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="e.g. Long-take handheld choreography, subtextual staging"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#090D18] border border-[#1E293B] text-white focus:outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs bg-gradient-to-r from-[#FFB547] to-[#F97316] text-black hover:brightness-110 shadow-lg"
                >
                  SAVE FILM TO LIBRARY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

