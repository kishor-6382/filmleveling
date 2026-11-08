// Futuristic Web Audio API sound synthesizer
// Requires zero external sound assets; generates authentic futuristic RPG audio

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    // Sound is disabled by default per user request
    const saved = localStorage.getItem('filmmaker_sound_enabled');
    this.enabled = saved ? JSON.parse(saved) : false;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    localStorage.setItem('filmmaker_sound_enabled', JSON.stringify(val));
    if (val) {
      this.initCtx();
      this.playClick();
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // UI click sound
  public playClick() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Audio error ignored safely
    }
  }

  // Quest Completed Chime (Solo Leveling System ding)
  public playQuestComplete() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.35);
      });
    } catch (e) {
      // Audio error ignored safely
    }
  }

  // Dramatic Level Up Fanfare
  public playLevelUp() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Sub-bass thump
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(130, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.6);
      subGain.gain.setValueAtTime(0.3, now);
      subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.8);

      // Heroic ascending arpeggios
      const notes = [
        { f: 440, t: 0.1 },  // A4
        { f: 554.37, t: 0.22 }, // C#5
        { f: 659.25, t: 0.34 }, // E5
        { f: 880, t: 0.46 }, // A5
        { f: 1108.73, t: 0.6 }, // C#6
        { f: 1318.51, t: 0.75 } // E6
      ];

      notes.forEach(({ f, t }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + t);

        // Lowpass filter for warm cyber sheen
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2500, now + t);

        gain.gain.setValueAtTime(0, now + t);
        gain.gain.linearRampToValueAtTime(0.15, now + t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + 0.65);
      });
    } catch (e) {
      // Audio error ignored safely
    }
  }

  // Penalty Quest Warning Alarm
  public playPenaltyAlert() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const t = now + i * 0.28;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.linearRampToValueAtTime(220, t + 0.2);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.24);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.25);
      }
    } catch (e) {
      // Audio error ignored safely
    }
  }
}

export const sounds = new SoundManager();

