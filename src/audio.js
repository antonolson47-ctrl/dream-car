// Original piece in D minor. Not a transcription of any film theme.
// A slow violin line, a quiet pad, and a little room. Faint on purpose.

const BPM = 66;
const BEAT = 60 / BPM;

const MELODY = [
  [74, 1.5], [76, 0.5], [77, 1], [74, 1],
  [72, 1], [74, 1], [69, 2],
  [70, 1], [72, 1], [74, 1], [77, 1],
  [76, 1.5], [74, 0.5], [72, 2],
  [74, 1], [77, 1], [81, 2],
  [79, 1], [77, 1], [74, 1], [70, 1],
  [70, 1.5], [72, 0.5], [74, 2],
  [69, 3], [74, 1],
];

const CHORDS = [
  [50, 53, 57],
  [50, 53, 57],
  [46, 50, 53],
  [53, 57, 60],
  [50, 53, 57],
  [55, 58, 62],
  [46, 50, 53],
  [50, 53, 57],
];

const BASS = [38, 38, 34, 41, 38, 43, 34, 38];

function midiToFreq(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

class Soundtrack {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.on = false;
    this.timer = null;
    this.cursor = 0;
    this.nextTime = 0;
    this.barBeat = 0;
  }

  async start() {
    if (this.on) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!this.ctx) {
      this.ctx = new Ctx();
      this.buildGraph();
    }
    await this.ctx.resume();
    this.on = true;
    this.nextTime = this.ctx.currentTime + 0.08;
    this.cursor = 0;
    this.barBeat = 0;
    this.schedule();
  }

  buildGraph() {
    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0.42;

    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 4200;
    tone.Q.value = 0.4;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 18;
    comp.ratio.value = 2.2;
    comp.attack.value = 0.02;
    comp.release.value = 0.25;

    const wet = ctx.createGain();
    wet.gain.value = 0.28;
    const dry = ctx.createGain();
    dry.gain.value = 0.82;

    const delayA = ctx.createDelay(1);
    delayA.delayTime.value = 0.29;
    const delayB = ctx.createDelay(1);
    delayB.delayTime.value = 0.47;
    const fb = ctx.createGain();
    fb.gain.value = 0.28;
    const damp = ctx.createBiquadFilter();
    damp.type = 'lowpass';
    damp.frequency.value = 2200;

    this.bus = ctx.createGain();
    this.bus.gain.value = 1;
    this.bus.connect(dry);
    this.bus.connect(delayA);
    delayA.connect(damp);
    damp.connect(delayB);
    delayB.connect(fb);
    fb.connect(delayA);
    damp.connect(wet);

    dry.connect(tone);
    wet.connect(tone);
    tone.connect(comp);
    comp.connect(this.master);
    this.master.connect(ctx.destination);
  }

  stop() {
    this.on = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  async toggle() {
    if (this.on) {
      this.stop();
      return false;
    }
    await this.start();
    return this.on;
  }

  schedule() {
    if (!this.on || !this.ctx) return;
    const horizon = this.ctx.currentTime + 1.4;
    let guard = 0;
    while (this.nextTime < horizon && guard < 32) {
      guard += 1;
      const [midi, beats] = MELODY[this.cursor];
      const dur = beats * BEAT;
      this.violin(this.nextTime, midi, dur * 0.94);
      const beatsBefore = melodyBeatsBefore(this.cursor);
      if (beatsBefore % 4 === 0) {
        const bar = (beatsBefore / 4) % 8;
        this.pad(this.nextTime, CHORDS[bar], BEAT * 4 * 0.98);
        this.bass(this.nextTime, BASS[bar], BEAT * 3.2);
      }
      this.nextTime += dur;
      this.cursor = (this.cursor + 1) % MELODY.length;
    }
    this.timer = setTimeout(() => this.schedule(), 400);
  }

  violin(time, midi, dur) {
    const ctx = this.ctx;
    const freq = midiToFreq(midi);
    const osc = ctx.createOscillator();
    const over = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const overGain = ctx.createGain();
    const vib = ctx.createOscillator();
    const vibGain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    over.type = 'triangle';
    over.frequency.setValueAtTime(freq * 2, time);
    overGain.gain.value = 0.07;

    vib.type = 'sine';
    vib.frequency.value = 5.3;
    vibGain.gain.setValueAtTime(0, time);
    vibGain.gain.linearRampToValueAtTime(freq * 0.0045, time + 0.28);
    vib.connect(vibGain);
    vibGain.connect(osc.frequency);

    filter.type = 'lowpass';
    filter.Q.value = 0.65;
    filter.frequency.setValueAtTime(780, time);
    filter.frequency.linearRampToValueAtTime(1680, time + 0.14);
    filter.frequency.linearRampToValueAtTime(1240, time + dur);

    const peak = 0.075;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + 0.09);
    gain.gain.exponentialRampToValueAtTime(peak * 0.72, time + 0.24);
    const releaseAt = Math.max(time + 0.26, time + dur - 0.16);
    gain.gain.setValueAtTime(peak * 0.72, releaseAt);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur + 0.05);

    osc.connect(filter);
    over.connect(overGain);
    overGain.connect(filter);
    filter.connect(gain);
    gain.connect(this.bus);

    osc.start(time);
    over.start(time);
    vib.start(time);
    const stopAt = time + dur + 0.08;
    osc.stop(stopAt);
    over.stop(stopAt);
    vib.stop(stopAt);
    osc.onended = () => {
      osc.disconnect();
      over.disconnect();
      filter.disconnect();
      gain.disconnect();
      vib.disconnect();
      vibGain.disconnect();
      overGain.disconnect();
    };
  }

  pad(time, chord, dur) {
    const ctx = this.ctx;
    for (const midi of chord) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = midiToFreq(midi);
      osc.detune.value = (midi % 2 === 0 ? -6 : 6);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.018, time + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      osc.connect(gain);
      gain.connect(this.bus);
      osc.start(time);
      osc.stop(time + dur + 0.05);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    }
  }

  bass(time, midi, dur) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = midiToFreq(midi);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.045, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(gain);
    gain.connect(this.bus);
    osc.start(time);
    osc.stop(time + dur + 0.02);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }

  tick() {
    if (!this.on || !this.ctx) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 880;
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.03, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  land() {
    if (!this.on || !this.ctx) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 392;
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(t);
    osc.stop(t + 0.2);
  }
}

function melodyBeatsBefore(index) {
  let beats = 0;
  for (let i = 0; i < index; i += 1) beats += MELODY[i][1];
  return beats;
}

export const audio = new Soundtrack();
