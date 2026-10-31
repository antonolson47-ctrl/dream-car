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
    this.sfx = null;
    this.noise = null;
    this.lastChing = 0;
    this.lastMoan = 0;
  }

  async ensure() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return false;
    if (!this.ctx) {
      this.ctx = new Ctx();
      this.buildGraph();
    }
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    return this.ctx.state === 'running';
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

    this.sfxLevel = 0.36;
    this.musicLevel = 0.42;
    this.sfx = ctx.createGain();
    this.sfx.gain.value = this.sfxLevel;
    this.sfx.connect(ctx.destination);

    // Ricky's cries sit on their own bus, louder than the register and the violin,
    // with a limiter so the peak stays in the speaker instead of clipping.
    this.cry = ctx.createGain();
    this.cry.gain.value = 1;
    const cryLimit = ctx.createDynamicsCompressor();
    cryLimit.threshold.value = -3;
    cryLimit.knee.value = 3;
    cryLimit.ratio.value = 4;
    cryLimit.attack.value = 0.002;
    cryLimit.release.value = 0.08;
    this.cry.connect(cryLimit);
    cryLimit.connect(ctx.destination);
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

  // Original synthesis. No samples, no recorded effects.
  chaChing() {
    if (!this.ctx || !this.sfx) return;
    const t = this.ctx.currentTime;
    if (t - this.lastChing < 0.32) return;
    this.lastChing = t;
    this.bell(t, 1568, 0.2, 0.34);
    this.bell(t + 0.07, 2093, 0.24, 0.28);
    this.bell(t + 0.14, 3136, 0.16, 0.14);
    this.drawer(t + 0.015);
  }

  moan(level = 2) {
    if (!this.ctx || !this.cry) return;
    const t = this.ctx.currentTime;
    if (t - this.lastMoan < 0.82) return;
    this.lastMoan = t;
    const kind = (Math.max(1, level) + Math.floor(t * 8)) % 3;
    const dur = kind === 0 ? 0.42 + level * 0.04 : kind === 1 ? 0.54 : 0.55;
    this.duckForCry(t, dur);
    if (kind === 0) this.wail(t, 420 - level * 16, 150, dur);
    else if (kind === 1) {
      this.wail(t, 460, 280, 0.14);
      this.wail(t + 0.16, 260, 120, 0.4);
    } else this.wail(t, 240, 80, dur);
  }

  duckForCry(time, dur) {
    const sfx = this.sfx?.gain;
    const music = this.master?.gain;
    if (sfx) {
      sfx.cancelScheduledValues(time);
      sfx.setValueAtTime(sfx.value, time);
      sfx.linearRampToValueAtTime(this.sfxLevel * 0.18, time + 0.03);
      sfx.setValueAtTime(this.sfxLevel * 0.18, time + dur);
      sfx.linearRampToValueAtTime(this.sfxLevel, time + dur + 0.2);
    }
    if (this.on && music) {
      music.cancelScheduledValues(time);
      music.setValueAtTime(music.value, time);
      music.linearRampToValueAtTime(this.musicLevel * 0.28, time + 0.04);
      music.setValueAtTime(this.musicLevel * 0.28, time + dur);
      music.linearRampToValueAtTime(this.musicLevel, time + dur + 0.28);
    }
  }

  fanfare(scale = 1) {
    if (!this.ctx || !this.sfx) return;
    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, index) => this.bell(t + index * 0.09, freq, 0.28, 0.2 * scale));
    this.whistle(t, 0.22);
    this.crackle(t + 0.3, 0.45 * scale);
    this.bell(t + 0.42, 1318.5, 0.3, 0.12 * scale);
  }

  cheer() {
    if (!this.ctx || !this.sfx) return;
    const t = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, index) => this.bell(t + index * 0.08, freq, 0.22, 0.16));
  }

  spark() {
    if (!this.ctx || !this.sfx) return;
    this.bell(this.ctx.currentTime, 880, 0.18, 0.12);
  }

  wah(intensity = 2) {
    if (!this.ctx || !this.sfx) return;
    const t = this.ctx.currentTime;
    const notes = intensity >= 2
      ? [[329.63, 0.16], [261.63, 0.16], [220, 0.18], [174.61, 0.62]]
      : [[329.63, 0.15], [220, 0.48]];
    let at = t;
    for (const [freq, dur] of notes) {
      this.brass(at, freq, dur);
      at += dur * 0.92;
    }
  }

  bell(time, freq, dur, peak) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const over = ctx.createOscillator();
    const gain = ctx.createGain();
    const overGain = ctx.createGain();
    osc.type = 'sine';
    over.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    over.frequency.setValueAtTime(freq * 2.76, time);
    overGain.gain.value = 0.16;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(gain);
    over.connect(overGain);
    overGain.connect(gain);
    gain.connect(this.sfx);
    osc.start(time);
    over.start(time);
    const stop = time + dur + 0.02;
    osc.stop(stop);
    over.stop(stop);
    osc.onended = () => {
      osc.disconnect();
      over.disconnect();
      gain.disconnect();
      overGain.disconnect();
    };
  }

  drawer(time) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer();
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1900, time);
    filter.frequency.exponentialRampToValueAtTime(380, time + 0.14);
    filter.Q.value = 0.6;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.28, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfx);
    src.start(time);
    src.stop(time + 0.18);
    src.onended = () => {
      src.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }

  wail(time, fromHz, toHz, dur) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const subGain = ctx.createGain();
    const vib = ctx.createOscillator();
    const vibGain = ctx.createGain();
    osc.type = 'sawtooth';
    sub.type = 'triangle';
    const end = Math.max(48, toHz);
    osc.frequency.setValueAtTime(Math.max(50, fromHz), time);
    osc.frequency.exponentialRampToValueAtTime(end, time + dur);
    sub.frequency.setValueAtTime(Math.max(40, fromHz * 0.5), time);
    sub.frequency.exponentialRampToValueAtTime(Math.max(40, end * 0.5), time + dur);
    subGain.gain.value = 0.4;
    vib.frequency.value = 6.5 + Math.random();
    vibGain.gain.value = 14;
    vib.connect(vibGain);
    vibGain.connect(osc.frequency);
    filter.type = 'bandpass';
    filter.Q.value = 7;
    filter.frequency.setValueAtTime(980, time);
    filter.frequency.exponentialRampToValueAtTime(380, time + dur * 0.55);
    filter.frequency.exponentialRampToValueAtTime(1200, time + dur);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.85, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(filter);
    sub.connect(subGain);
    subGain.connect(filter);
    filter.connect(gain);
    gain.connect(this.cry);
    osc.start(time);
    sub.start(time);
    vib.start(time);
    const stop = time + dur + 0.04;
    osc.stop(stop);
    sub.stop(stop);
    vib.stop(stop);
    osc.onended = () => {
      osc.disconnect();
      sub.disconnect();
      filter.disconnect();
      gain.disconnect();
      subGain.disconnect();
      vib.disconnect();
      vibGain.disconnect();
    };
  }

  brass(time, freq, dur) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    filter.type = 'bandpass';
    filter.Q.value = 8;
    filter.frequency.setValueAtTime(260, time);
    filter.frequency.linearRampToValueAtTime(1480, time + dur * 0.32);
    filter.frequency.linearRampToValueAtTime(320, time + dur);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.2, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfx);
    osc.start(time);
    osc.stop(time + dur + 0.02);
    osc.onended = () => {
      osc.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }

  whistle(time, dur) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, time);
    osc.frequency.exponentialRampToValueAtTime(1680, time + dur);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.08, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(gain);
    gain.connect(this.sfx);
    osc.start(time);
    osc.stop(time + dur + 0.02);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }

  crackle(time, scale) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer();
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 900;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.32 * scale, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);
    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(180, time);
    thump.frequency.exponentialRampToValueAtTime(50, time + 0.18);
    thumpGain.gain.setValueAtTime(0.0001, time);
    thumpGain.gain.exponentialRampToValueAtTime(0.28 * scale, time + 0.012);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.2);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfx);
    thump.connect(thumpGain);
    thumpGain.connect(this.sfx);
    src.start(time);
    thump.start(time);
    src.stop(time + 0.24);
    thump.stop(time + 0.22);
    src.onended = () => {
      src.disconnect();
      filter.disconnect();
      gain.disconnect();
      thump.disconnect();
      thumpGain.disconnect();
    };
  }

  noiseBuffer() {
    if (this.noise) return this.noise;
    const ctx = this.ctx;
    const length = Math.floor(ctx.sampleRate * 0.5);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    this.noise = buffer;
    return buffer;
  }
}

function melodyBeatsBefore(index) {
  let beats = 0;
  for (let i = 0; i < index; i += 1) beats += MELODY[i][1];
  return beats;
}

export const audio = new Soundtrack();
