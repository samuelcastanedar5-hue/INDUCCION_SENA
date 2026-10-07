// Web Audio API Synthesizer for SENA Institutional Anthem Melody
class SenaHymnSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTimeout: number | null = null;
  private onNoteCallback: ((index: number) => void) | null = null;

  // Melody notes frequencies (C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25)
  // "Estudiantes del SENA adelante, por Colombia luchad con amor..."
  private melody = [
    { freq: 261.63, duration: 0.35 }, // Es-
    { freq: 329.63, duration: 0.35 }, // tu-
    { freq: 392.00, duration: 0.5 },  // dian-
    { freq: 523.25, duration: 0.7 },  // tes
    { freq: 440.00, duration: 0.35 }, // del
    { freq: 392.00, duration: 0.5 },  // SE-
    { freq: 329.63, duration: 0.7 },  // NA
    { freq: 349.23, duration: 0.4 },  // a-
    { freq: 392.00, duration: 0.4 },  // de-
    { freq: 440.00, duration: 0.8 },  // lan-
    { freq: 392.00, duration: 0.9 },  // te,
    { freq: 261.63, duration: 0.35 }, // por
    { freq: 329.63, duration: 0.35 }, // Co-
    { freq: 392.00, duration: 0.5 },  // lom-
    { freq: 440.00, duration: 0.5 },  // bia
    { freq: 392.00, duration: 0.4 },  // lu-
    { freq: 349.23, duration: 0.4 },  // chad
    { freq: 329.63, duration: 0.4 },  // con
    { freq: 293.66, duration: 0.6 },  // a-
    { freq: 261.63, duration: 1.1 },  // mor!
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(onNote?: (index: number) => void) {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.onNoteCallback = onNote || null;
    this.playSequence(0);
  }

  private playSequence(step: number) {
    if (!this.isPlaying || !this.ctx) return;

    if (step >= this.melody.length) {
      // Loop or stop
      this.isPlaying = false;
      if (this.onNoteCallback) this.onNoteCallback(-1);
      return;
    }

    const note = this.melody[step];
    this.playTone(note.freq, note.duration * 0.9);

    if (this.onNoteCallback) {
      this.onNoteCallback(step);
    }

    this.currentTimeout = window.setTimeout(() => {
      this.playSequence(step + 1);
    }, note.duration * 1000);
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Subtle overtone for warm institutional brass sound
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + duration);
    subOsc.stop(now + duration);
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      window.clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    if (this.onNoteCallback) {
      this.onNoteCallback(-1);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const hymnPlayer = new SenaHymnSynthesizer();
