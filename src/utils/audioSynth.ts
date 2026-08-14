/**
 * Web Audio API synthesizer for interactive dance rhythm previews
 */

class DanceRhythmSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentPatternTimer: number | null = null;
  private currentGenre: string | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, gainVal: number = 0.2) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // safe fallback
    }
  }

  private playDrum(frequency: number, decay: number, isSnare = false) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isSnare ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + decay);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + decay);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + decay);
    } catch {
      // safe fallback
    }
  }

  public playRhythm(genre: string, onStop?: () => void) {
    this.stop();
    this.initContext();
    this.isPlaying = true;
    this.currentGenre = genre;

    let step = 0;
    const intervalMs = genre === 'hiphop' ? 240 : genre === 'salsa' ? 180 : genre === 'classical' ? 220 : 200;

    const tick = () => {
      if (!this.isPlaying) return;

      switch (genre) {
        case 'bollywood':
          // Dholak-like swing (Dha-Ge-Na-Ti...)
          if (step % 8 === 0) {
            this.playDrum(120, 0.28); // Low dhol bass
            this.playTone(480, 'triangle', 0.08, 0.15);
          } else if (step % 8 === 2) {
            this.playTone(550, 'sine', 0.06, 0.12);
          } else if (step % 8 === 4) {
            this.playDrum(150, 0.18, true); // Snare/chhaat
            this.playTone(600, 'triangle', 0.08, 0.15);
          } else if (step % 8 === 6 || step % 8 === 7) {
            this.playTone(520, 'sine', 0.05, 0.1);
          }
          break;

        case 'classical':
          // Teen Taal / Bol accents
          if (step % 8 === 0) {
            this.playDrum(140, 0.3); // Sam (Dha)
            this.playTone(330, 'triangle', 0.12, 0.2); // Tanpura drone
          } else if (step % 8 === 2) {
            this.playDrum(190, 0.12); // Dhin
          } else if (step % 8 === 4) {
            this.playDrum(240, 0.1); // Ta
            this.playTone(392, 'triangle', 0.1, 0.15);
          } else if (step % 8 === 6) {
            this.playDrum(210, 0.14); // Tin
          }
          break;

        case 'hiphop':
          // Boom bap beat (Kick - Hat - Snare - Hat)
          if (step % 4 === 0) {
            this.playDrum(80, 0.25); // Heavy 808 Kick
          } else if (step % 4 === 2) {
            this.playDrum(200, 0.18, true); // Snare
          }
          // Hi-hat
          this.playTone(1200, 'triangle', 0.03, 0.06);
          break;

        case 'salsa':
          // Son Clave 3-2 rhythm
          if (step % 8 === 0 || step % 8 === 3 || step % 8 === 6) {
            this.playTone(880, 'sine', 0.08, 0.25); // Wood block / Clave
          } else if (step % 8 === 4) {
            this.playDrum(110, 0.2); // Conga bass
          }
          break;

        case 'contemporary':
          // Ambient fluid arpeggio
          const notes = [261.63, 329.63, 392.0, 523.25, 493.88, 392.0];
          const note = notes[step % notes.length];
          this.playTone(note, 'sine', 0.35, 0.12);
          break;

        case 'kids':
          // Playful bounce
          const melody = [523.25, 587.33, 659.25, 783.99, 659.25, 587.33];
          this.playTone(melody[step % melody.length], 'triangle', 0.14, 0.15);
          if (step % 2 === 0) this.playDrum(130, 0.15);
          break;

        default:
          this.playTone(440, 'sine', 0.1, 0.1);
      }

      step++;
    };

    // Run for 12 seconds then auto stop
    this.currentPatternTimer = window.setInterval(tick, intervalMs);

    setTimeout(() => {
      if (this.currentGenre === genre) {
        this.stop();
        if (onStop) onStop();
      }
    }, 10000);
  }

  public stop() {
    this.isPlaying = false;
    this.currentGenre = null;
    if (this.currentPatternTimer) {
      clearInterval(this.currentPatternTimer);
      this.currentPatternTimer = null;
    }
  }

  public getCurrentGenre() {
    return this.isPlaying ? this.currentGenre : null;
  }
}

export const rhythmSynth = new DanceRhythmSynth();
