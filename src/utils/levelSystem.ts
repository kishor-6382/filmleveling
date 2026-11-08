import { RankTier, SkillAttributeId } from '../types';

export function getRankForLevel(level: number): RankTier {
  if (level >= 100) return 'Shadow Monarch / Master Filmmaker';
  if (level >= 91) return 'Legendary Director';
  if (level >= 81) return 'National-Level Hunter';
  if (level >= 71) return 'Elite Hunter';
  if (level >= 61) return 'S-Rank Hunter';
  if (level >= 51) return 'A-Rank Hunter';
  if (level >= 41) return 'B-Rank Hunter';
  if (level >= 31) return 'C-Rank Hunter';
  if (level >= 21) return 'D-Rank Hunter';
  if (level >= 11) return 'E-Rank Hunter';
  return 'Beginner Hunter';
}

export function getRankBadgeColor(rank: RankTier): { text: string; bg: string; border: string; glow: string } {
  switch (rank) {
    case 'Shadow Monarch / Master Filmmaker':
      return {
        text: 'text-purple-300',
        bg: 'bg-purple-950/70',
        border: 'border-purple-500',
        glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
      };
    case 'Legendary Director':
      return {
        text: 'text-amber-300',
        bg: 'bg-amber-950/70',
        border: 'border-amber-400',
        glow: 'shadow-[0_0_15px_rgba(251,191,36,0.45)]',
      };
    case 'National-Level Hunter':
      return {
        text: 'text-rose-300',
        bg: 'bg-rose-950/70',
        border: 'border-rose-400',
        glow: 'shadow-[0_0_15px_rgba(244,63,94,0.45)]',
      };
    case 'Elite Hunter':
      return {
        text: 'text-cyan-300',
        bg: 'bg-cyan-950/70',
        border: 'border-cyan-400',
        glow: 'shadow-[0_0_15px_rgba(6,182,212,0.45)]',
      };
    case 'S-Rank Hunter':
      return {
        text: 'text-blue-300',
        bg: 'bg-blue-950/70',
        border: 'border-blue-400',
        glow: 'shadow-[0_0_15px_rgba(59,130,246,0.45)]',
      };
    case 'A-Rank Hunter':
      return {
        text: 'text-emerald-300',
        bg: 'bg-emerald-950/70',
        border: 'border-emerald-400',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,0.35)]',
      };
    case 'B-Rank Hunter':
      return {
        text: 'text-teal-300',
        bg: 'bg-teal-950/70',
        border: 'border-teal-400',
        glow: 'shadow-[0_0_10px_rgba(20,184,166,0.3)]',
      };
    case 'C-Rank Hunter':
      return {
        text: 'text-sky-300',
        bg: 'bg-sky-950/70',
        border: 'border-sky-400',
        glow: 'shadow-[0_0_10px_rgba(56,189,248,0.3)]',
      };
    case 'D-Rank Hunter':
      return {
        text: 'text-slate-300',
        bg: 'bg-slate-800/80',
        border: 'border-slate-500',
        glow: 'shadow-[0_0_8px_rgba(148,163,184,0.2)]',
      };
    case 'E-Rank Hunter':
      return {
        text: 'text-zinc-300',
        bg: 'bg-zinc-800/80',
        border: 'border-zinc-500',
        glow: 'shadow-[0_0_8px_rgba(161,161,170,0.2)]',
      };
    default:
      return {
        text: 'text-blue-200',
        bg: 'bg-blue-950/50',
        border: 'border-blue-700/60',
        glow: 'shadow-[0_0_5px_rgba(54,175,255,0.2)]',
      };
  }
}

// Progressive XP requirement calculation
export function getXpRequiredForLevel(level: number): number {
  if (level >= 100) return 999999;
  // Scaled XP formula: base 500, increases with non-linear curve
  // Level 1: 500 XP
  // Level 10: ~1,500 XP
  // Level 50: ~5,200 XP
  // Level 99: ~15,000 XP
  return Math.floor(450 + Math.pow(level, 1.45) * 65);
}

// Calculate title based on level and top skill
export function getPlayerTitle(level: number, topSkill?: SkillAttributeId): string {
  if (level >= 100) return 'The Cinema Monarch';
  if (level >= 90) return 'Grand Visionary Auteur';
  if (level >= 80) return 'National Cinema Architect';
  if (level >= 70) return 'Vanguard Film Maestro';
  if (level >= 60) return 'Master of Dramatic Shadows';
  if (level >= 50) return 'Elite Narrative Weaver';
  if (level >= 40) return 'Adept Cinelogue Specialist';
  if (level >= 30) return 'Ascendant Screenplay Hunter';
  if (level >= 20) return 'Disciplined Lens Operator';
  if (level >= 10) return 'Awakened Story Apprentice';
  return 'The Awakened Filmmaker';
}

// Skill attributes metadata
export const INITIAL_SKILL_ATTRIBUTES: {
  id: SkillAttributeId;
  name: string;
  description: string;
  iconName: string;
  color: string;
}[] = [
    {
      id: 'storytelling',
      name: 'STORYTELLING',
      description: 'Narrative spine, theme synthesis, emotional stakes, and universal resonance.',
      iconName: 'BookOpen',
      color: '#36AFFF',
    },
    {
      id: 'screenplay_writing',
      name: 'SCREENPLAY WRITING',
      description: 'Scene construction, subtextual dialogue, 3-act pacing, and screenplay formatting.',
      iconName: 'FileText',
      color: '#00D4FF',
    },
    {
      id: 'directing',
      name: 'DIRECTING',
      description: 'Actor communication, scene vision, dramatic blocking, and on-set command.',
      iconName: 'Video',
      color: '#785CFF',
    },
    {
      id: 'cinematography',
      name: 'CINEMATOGRAPHY',
      description: 'Lighting ratios, lens choice, camera movement, composition, and color palette.',
      iconName: 'Camera',
      color: '#35D49A',
    },
    {
      id: 'visual_storytelling',
      name: 'VISUAL STORYTELLING',
      description: 'Conveying psychological truth and plot movement without reliance on dialogue.',
      iconName: 'Eye',
      color: '#38BDF8',
    },
    {
      id: 'film_analysis',
      name: 'FILM ANALYSIS',
      description: 'Deconstructing masterworks, decoding hidden motifs, and dissecting auteur styles.',
      iconName: 'Search',
      color: '#A855F7',
    },
    {
      id: 'cinematic_editing',
      name: 'CINEMATIC EDITING',
      description: 'Pacing, rhythm, match cuts, montage tempo, and psychological continuity.',
      iconName: 'Scissors',
      color: '#F43F5E',
    },
    {
      id: 'sound_design',
      name: 'SOUND DESIGN',
      description: 'Diegetic vs non-diegetic layers, auditory leitmotifs, ambience, and sound bridges.',
      iconName: 'Volume2',
      color: '#EAB308',
    },
    {
      id: 'character_development',
      name: 'CHARACTER DEVELOPMENT',
      description: 'Contradictions, fatal flaws, internal wants vs external needs, and dynamic arcs.',
      iconName: 'UserCheck',
      color: '#EC4899',
    },
    {
      id: 'creative_thinking',
      name: 'CREATIVE THINKING',
      description: 'Subverting cliches, generating novel high-concept premises, and inventive framing.',
      iconName: 'Zap',
      color: '#F97316',
    },
    {
      id: 'physical_fitness',
      name: 'PHYSICAL FITNESS',
      description: 'Directorial stamina, core endurance, physical posture, and on-set physical resilience.',
      iconName: 'Activity',
      color: '#22C55E',
    },
    {
      id: 'general_film_knowledge',
      name: 'GENERAL FILM KNOWLEDGE',
      description: 'Cinema history, world film movements, Indian commercial cinema theory, and craft lore.',
      iconName: 'Award',
      color: '#6366F1',
    },
  ];

