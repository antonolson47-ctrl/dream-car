import { audio } from './audio.js';
import { VIEWS } from './car-art.js';
import { addToCart, chooseOne, optionById, removeFromCart } from './cart.js';
import { TRADE } from './data.js';
import { aprFloor, aprOpen, floorPrice, openPrice } from './finance.js';
import { celebrate, clearCelebration, mountFx } from './fx.js';
import { clamp, money } from './format.js';
import { applyPressure, snapshotDeal } from './pressure.js';
import {
  adviceText,
  closeDrawer,
  closeOverlay,
  flashWins,
  flinchRicky,
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
let storyX = null;
let suppressStoryClick = false;

const STORY_LAST = 2;

function advanceStory(dir) {
  const next = state.card + dir;
  if (next < 0) return;
  if (next > STORY_LAST) {
    goto('intro');
    return;
  }
  state.card = next;
  render();
}

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
  if (screen !== 'grade') clearCelebration();
  if (screen === 'negotiate') ensureDeal();
  render();
  const main = document.getElementById('screen');
  if (main) main.scrollTop = 0;
  if (screen === 'lot') bindLot();
  if (screen === 'grade' && state.grade && state.gradeCue) {
    state.gradeCue = false;
    playGrade(state.grade.letter);
  }
}

function playSounds(play) {
  if (state.soundPref === 'off') return;
  const run = () => {
    if (audio.ctx && audio.sfx) play();
  };
  if (audio.ctx && audio.ctx.state === 'running') run();
  else audio.ensure().then(run).catch(() => {});
}

function reactDesk(car, build, deal, before, source) {
  const after = snapshotDeal(deal, build);
  const fx = applyPressure(car, build, deal, before, after, source);
  if (fx.ching) flashWins(fx.axes);
  if (fx.moan) flinchRicky(fx.mood.level);
  if (fx.fireworks) celebrate({ intensity: 3, duo: true });
  playSounds(() => {
    if (fx.fireworks) {
      audio.fanfare(1);
      audio.chaChing();
      return;
    }
    if (fx.ching) audio.chaChing();
    if (fx.moan) audio.moan(fx.mood.level);
  });
}

function playGrade(letter) {
  const intensity = letter === 'A+' ? 3 : letter === 'A' ? 2 : letter === 'B' ? 1 : 0;
  // The duo stays in the grade page itself. The overlay is for the desk fireworks.
  if (intensity) celebrate({ intensity, duo: false });
  playSounds(() => {
    if (letter === 'A+' || letter === 'A') audio.fanfare(letter === 'A+' ? 1 : 0.75);
    else if (letter === 'B') audio.cheer();
    else if (letter === 'C') audio.spark();
    else if (letter === 'D') audio.wah(1);
    else audio.wah(2);
  });
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
  state.studioNote = '';
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
  const build = ensureBuild(car);
  const deal = ensureDeal(car);
  const before = snapshotDeal(deal, build);
  if (name === 'price') deal.price = clamp(deal.price - 500, floorPrice(car), openPrice(car));
  if (name === 'trade') deal.trade = clamp(deal.trade + 200, TRADE.min, TRADE.max);
  if (name === 'apr') {
    const floor = aprFloor(effectiveScore() || deal.effectiveScore);
    deal.apr = clamp(Math.round((deal.apr - 0.1) * 100) / 100, floor, aprOpen(floor));
  }
  state.advice = '';
  reactDesk(car, build, deal, before, 'nudge');
  patchDesk({ sliders: true });
}

function onLever(el) {
  const car = getCar();
  const build = ensureBuild(car);
  const deal = ensureDeal(car);
  const before = snapshotDeal(deal, build);
  const value = Number(el.value);
  const name = el.dataset.lever;
  if (name === 'price') deal.price = value;
  if (name === 'trade') deal.trade = value;
  if (name === 'apr') deal.apr = value;
  if (name === 'checking') deal.downChecking = value;
  if (name === 'savings') deal.downSavings = value;
  state.advice = '';
  reactDesk(car, build, deal, before, 'slider');
  patchDesk();
}

function noteAdded(option) {
  if (!option) return;
  state.studioNote = option.tip || `${option.name} is on the car. It shows up in the build price.`;
}

function noteRemoved(option) {
  if (!option) return;
  const cost = option.price ? ` ${money(option.price)} comes off the build.` : '';
  state.studioNote = `${option.name} is off the car.${cost}`;
}

function cartAdd(btn) {
  const car = getCar();
  const build = ensureBuild(car);
  if (!addToCart(build, btn.dataset.group, btn.dataset.id)) return;
  noteAdded(optionById(car, btn.dataset.group, btn.dataset.id));
  patchStudio({ options: true });
}

function cartRemove(btn) {
  const car = getCar();
  const build = ensureBuild(car);
  const removed = removeFromCart(car, build, btn.dataset.group, btn.dataset.id);
  if (!removed) return;
  noteRemoved(removed);
  patchStudio({ options: true });
}

function chooseOpt(btn) {
  const car = getCar();
  const build = ensureBuild(car);
  if (!chooseOne(build, btn.dataset.group, btn.dataset.id)) return;
  noteAdded(optionById(car, btn.dataset.group, btn.dataset.id));
  patchStudio({ options: true });
}

function shake() {
  const car = getCar();
  const grade = gradeDeal(car, ensureBuild(car), ensureDeal(car));
  state.grade = grade;
  state.gradeCue = true;
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
      state.studioNote = '';
      patchCategory();
    },
    'cart-add': () => cartAdd(btn),
    'cart-remove': () => cartRemove(btn),
    choose: () => chooseOpt(btn),
    paint: () => {
      const car = getCar();
      const build = ensureBuild(car);
      build.paint = btn.dataset.paint;
      const color = car.colors.find((item) => item.id === build.paint);
      if (color?.joke) {
        state.studioNote = 'Gold flake. Seventy-five hundred so the car can glitter. Your nonna would take the spatula away from you.';
      } else if (color?.price) {
        state.studioNote = `${color.name} is a special paint. Pretty. It does not make the car worth more when you sell it.`;
      } else if (color) {
        state.studioNote = `${color.name} is included. The payment did not even look up.`;
      }
      patchStudio({ options: true });
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
      state.studioNote = '';
      toggleTopClass();
    },
    'to-desk': () => goto('negotiate'),
    'back-studio': () => goto('studio'),
    nudge: () => nudge(btn.dataset.nudge),
    term: () => {
      const car = getCar();
      const build = ensureBuild(car);
      const deal = ensureDeal(car);
      const before = snapshotDeal(deal, build);
      deal.term = Number(btn.dataset.term);
      state.advice = '';
      reactDesk(car, build, deal, before, 'term');
      patchDesk();
    },
    warranty: () => {
      const car = getCar();
      const build = ensureBuild(car);
      const deal = ensureDeal(car);
      const before = snapshotDeal(deal, build);
      build.single.warranty = btn.dataset.warranty;
      deal.warrantySync = btn.dataset.warranty;
      state.advice = '';
      reactDesk(car, build, deal, before, 'warranty');
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
    'story-next': () => {
      if (suppressStoryClick) {
        suppressStoryClick = false;
        return;
      }
      advanceStory(1);
    },
    'story-skip': () => goto('intro'),
    restart: () => {
      stopSpin();
      const last = state.lastGrade;
      resetAll();
      state.lastGrade = last;
      state.card = 0;
      goto('story');
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
  if (state.screen === 'story' && (event.key === 'ArrowRight' || event.key === 'Enter')) advanceStory(1);
  if (state.screen === 'story' && event.key === 'ArrowLeft') advanceStory(-1);
}

function onPointerDown(event) {
  if (event.target.closest('#hero')) dragX = event.clientX;
  if (state.screen === 'story' && event.target.closest('.story') && !event.target.closest('[data-action="story-skip"]')) {
    storyX = event.clientX;
  }
}

function onPointerUp(event) {
  if (dragX != null) {
    const dx = event.clientX - dragX;
    dragX = null;
    if (state.screen === 'studio' && Math.abs(dx) >= 36) {
      stopSpin();
      state.hintSeen = true;
      state.view = (state.view + (dx < 0 ? 1 : -1) + VIEWS.length) % VIEWS.length;
      patchStudio();
    }
  }
  if (storyX != null && state.screen === 'story') {
    const dx = event.clientX - storyX;
    storyX = null;
    if (Math.abs(dx) >= 42) {
      suppressStoryClick = true;
      advanceStory(dx < 0 ? 1 : -1);
      setTimeout(() => { suppressStoryClick = false; }, 0);
    }
  }
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
mountFx();
render();
