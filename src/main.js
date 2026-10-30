import { audio } from './audio.js';
import { VIEWS } from './car-art.js';
import { TRADE } from './data.js';
import { aprFloor, aprOpen, floorPrice, openPrice } from './finance.js';
import { clamp } from './format.js';
import {
  adviceText,
  closeDrawer,
  closeOverlay,
  openGlossary,
  patchCategory,
  patchDesk,
  patchStudio,
  render,
  setOdo,
  syncAudioButton,
  toggleDrawer,
  toggleTopClass,
} from './ui.js';
import { gradeDeal } from './vinny.js';
import {
  effectiveScore,
  ensureBuild,
  ensureDeal,
  getCar,
  loadLastGrade,
  resetAll,
  rollScore,
  saveLastGrade,
  state,
} from './state.js';

let spinTimer = null;
let dragX = null;

function stopSpin() {
  state.spinning = false;
  if (spinTimer) {
    clearInterval(spinTimer);
    spinTimer = null;
  }
}

function goto(screen) {
  if (state.screen === 'studio' && screen !== 'studio') stopSpin();
  state.screen = screen;
  state.advice = screen === 'negotiate' ? state.advice : '';
  closeOverlay();
  closeDrawer();
  if (screen === 'negotiate') ensureDeal();
  render();
  const main = document.getElementById('screen');
  if (main) main.scrollTop = 0;
  if (screen === 'lot') bindLot();
}

async function toggleAudio() {
  try {
    if (audio.on) audio.stop();
    else await audio.start();
  } catch {
    audio.stop();
  }
  state.soundPref = audio.on ? 'on' : 'off';
  if (state.screen === 'intro') render();
  else syncAudioButton();
}

async function startGame() {
  if (state.soundPref !== 'off') {
    try { await audio.start(); } catch { /* the lot still opens */ }
  }
  goto('credit');
}

function roll() {
  if (state.credit.score || state.credit.rolling) return;
  state.credit.rolling = true;
  const finalScore = rollScore();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const button = document.querySelector('[data-action="roll"]');
  if (button) button.disabled = true;
  document.querySelector('.odo')?.classList.add('is-rolling');
  const started = performance.now();
  const duration = reduce ? 0 : 1650;
  const frame = (now) => {
    const t = duration === 0 ? 1 : (now - started) / duration;
    if (t < 1) {
      setOdo(675 + Math.floor(Math.random() * 146));
      if (audio.on && Math.random() < 0.4) audio.tick();
      requestAnimationFrame(frame);
    } else {
      state.credit.score = finalScore;
      state.credit.rolling = false;
      if (audio.on) audio.land();
      render();
    }
  };
  requestAnimationFrame(frame);
}

function cosign() {
  if (!state.credit.score || state.credit.cosign) return;
  state.credit.cosign = true;
  state.credit.boost = 50 + Math.floor(Math.random() * 26);
  state.deals = {};
  render();
}

function pick(id) {
  state.carId = id;
  state.category = 'sound';
  state.view = 0;
  state.hintSeen = false;
  stopSpin();
  ensureBuild();
  goto('studio');
}

function toggleSpin() {
  if (state.spinning) {
    stopSpin();
    patchStudio();
    return;
  }
  state.spinning = true;
  state.hintSeen = true;
  patchStudio();
  spinTimer = setInterval(() => {
    state.view = (state.view + 1) % VIEWS.length;
    patchStudio();
  }, 980);
}

function nudge(name) {
  const car = getCar();
  const deal = ensureDeal(car);
  if (name === 'price') deal.price = clamp(deal.price - 500, floorPrice(car), openPrice(car));
  if (name === 'trade') deal.trade = clamp(deal.trade + 200, TRADE.min, TRADE.max);
  if (name === 'apr') {
    const floor = aprFloor(effectiveScore() || deal.effectiveScore);
    deal.apr = clamp(Math.round((deal.apr - 0.1) * 100) / 100, floor, aprOpen(floor));
  }
  state.advice = '';
  patchDesk({ sliders: true });
}

function onLever(el) {
  const deal = ensureDeal();
  const value = Number(el.value);
  const name = el.dataset.lever;
  if (name === 'price') deal.price = value;
  if (name === 'trade') deal.trade = value;
  if (name === 'apr') deal.apr = value;
  if (name === 'checking') deal.downChecking = value;
  if (name === 'savings') deal.downSavings = value;
  state.advice = '';
  patchDesk();
}

function onOpt(btn) {
  const build = ensureBuild();
  const { group, id, mode } = btn.dataset;
  if (mode === 'single') {
    build.single[group] = id;
  } else {
    const list = build.multi[group] || [];
    const index = list.indexOf(id);
    if (index >= 0) list.splice(index, 1);
    else list.push(id);
    build.multi[group] = list;
  }
  patchStudio();
}

function shake() {
  const car = getCar();
  const grade = gradeDeal(car, ensureBuild(car), ensureDeal(car));
  state.grade = grade;
  saveLastGrade(grade, car);
  goto('grade');
}

function bindLot() {
  const el = document.getElementById('lot-scroller');
  if (!el || el.dataset.bound) return;
  el.dataset.bound = '1';
  el.addEventListener('scroll', () => {
    const index = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
    document.querySelectorAll('.lot-dot').forEach((dot, i) => dot.classList.toggle('is-on', i === index));
  }, { passive: true });
}

function moveLot(direction) {
  const el = document.getElementById('lot-scroller');
  if (!el) return;
  el.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' });
}

function onClick(event) {
  const btn = event.target.closest('[data-action]');
  if (!btn || btn.disabled) return;
  const action = btn.dataset.action;
  if (action === 'glossary') {
    event.preventDefault();
    openGlossary(btn.dataset.term);
    return;
  }
  const run = {
    'close-sheet': () => closeOverlay(),
    money: () => toggleDrawer(),
    audio: () => toggleAudio(),
    start: () => startGame(),
    roll: () => roll(),
    cosign: () => cosign(),
    'to-lot': () => { if (state.credit.score) goto('lot'); },
    'back-credit': () => goto('credit'),
    pick: () => pick(btn.dataset.car),
    'lot-prev': () => moveLot(-1),
    'lot-next': () => moveLot(1),
    'back-lot': () => goto('lot'),
    cat: () => {
      state.category = btn.dataset.cat;
      patchCategory();
    },
    opt: () => onOpt(btn),
    paint: () => {
      ensureBuild().paint = btn.dataset.paint;
      patchStudio();
    },
    view: () => {
      stopSpin();
      state.hintSeen = true;
      state.view = Number(btn.dataset.view);
      patchStudio();
    },
    spin: () => toggleSpin(),
    top: () => {
      const build = ensureBuild();
      build.topDown = !build.topDown;
      toggleTopClass();
    },
    'to-desk': () => goto('negotiate'),
    'back-studio': () => goto('studio'),
    nudge: () => nudge(btn.dataset.nudge),
    term: () => {
      ensureDeal().term = Number(btn.dataset.term);
      state.advice = '';
      patchDesk();
    },
    warranty: () => {
      ensureBuild().single.warranty = btn.dataset.warranty;
      state.advice = '';
      patchDesk();
    },
    ask: () => {
      state.advice = adviceText();
      patchDesk();
    },
    shake: () => shake(),
    tweak: () => goto('negotiate'),
    another: () => {
      state.grade = null;
      goto('lot');
    },
    restart: () => {
      stopSpin();
      const last = state.lastGrade;
      resetAll();
      state.lastGrade = last;
      goto('intro');
    },
  };
  if (run[action]) run[action]();
}

function onKey(event) {
  if (event.key === 'Escape') {
    closeOverlay();
    closeDrawer();
    return;
  }
  if (state.screen === 'studio' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
    stopSpin();
    state.hintSeen = true;
    state.view = (state.view + (event.key === 'ArrowRight' ? 1 : -1) + VIEWS.length) % VIEWS.length;
    patchStudio();
  }
  if (state.screen === 'lot' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
    moveLot(event.key === 'ArrowRight' ? 1 : -1);
  }
}

function onPointerDown(event) {
  if (!event.target.closest('#hero')) return;
  dragX = event.clientX;
}

function onPointerUp(event) {
  if (dragX == null) return;
  const dx = event.clientX - dragX;
  dragX = null;
  if (state.screen !== 'studio' || Math.abs(dx) < 36) return;
  stopSpin();
  state.hintSeen = true;
  state.view = (state.view + (dx < 0 ? 1 : -1) + VIEWS.length) % VIEWS.length;
  patchStudio();
}

document.addEventListener('click', onClick);
document.addEventListener('input', (event) => {
  const el = event.target.closest('[data-lever]');
  if (!el || state.screen !== 'negotiate') return;
  onLever(el);
});
document.addEventListener('keydown', onKey);
document.addEventListener('pointerdown', onPointerDown);
document.addEventListener('pointerup', onPointerUp);

loadLastGrade();
render();
