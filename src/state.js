import {
  CARS,
  PLAYER,
  TRADE,
  carById,
  freshBuild,
} from './data.js';
import { aprFloor, aprOpen, floorPrice, openPrice } from './finance.js';
import { clamp } from './format.js';

export const state = {
  screen: 'intro',
  credit: {
    score: null,
    cosign: false,
    boost: 0,
    rolling: false,
  },
  carId: 'stallion',
  builds: {},
  deals: {},
  category: 'sound',
  view: 0,
  spinning: false,
  hintSeen: false,
  moneyOpen: false,
  sheet: null,
  advice: '',
  grade: null,
  lastGrade: null,
  studioNote: '',
  gradeCue: false,
};

export function effectiveScore() {
  const { score, boost, cosign } = state.credit;
  if (!score) return null;
  return Math.min(820, score + (cosign ? boost : 0));
}

export function getCar() {
  return carById(state.carId) || CARS[0];
}

export function ensureBuild(car = getCar()) {
  if (!state.builds[car.id]) state.builds[car.id] = freshBuild(car);
  return state.builds[car.id];
}

export function ensureDeal(car = getCar()) {
  const build = ensureBuild(car);
  const score = effectiveScore() || 700;
  if (!state.deals[car.id]) {
    const floor = aprFloor(score);
    state.deals[car.id] = {
      carId: car.id,
      price: openPrice(car),
      trade: TRADE.open,
      apr: aprOpen(floor),
      term: 72,
      downChecking: 0,
      downSavings: 0,
      effectiveScore: score,
      pushes: 0,
      celebrated: false,
      warrantyOpened: build.single.warranty,
      bank: { price: 0, trade: 0, apr: 0 },
    };
  }
  const deal = state.deals[car.id];
  deal.effectiveScore = score;
  const floor = aprFloor(score);
  const open = aprOpen(floor);
  deal.apr = clamp(deal.apr, floor, open);
  deal.price = clamp(deal.price, floorPrice(car), openPrice(car));
  deal.trade = clamp(deal.trade, TRADE.min, TRADE.max);
  deal.downChecking = clamp(deal.downChecking, 0, PLAYER.checking);
  deal.downSavings = clamp(deal.downSavings, 0, PLAYER.savings);
  deal.warrantySync = build.single.warranty;
  return deal;
}

export function resetAll() {
  state.credit = { score: null, cosign: false, boost: 0, rolling: false };
  state.carId = 'stallion';
  state.builds = {};
  state.deals = {};
  state.category = 'sound';
  state.view = 0;
  state.spinning = false;
  state.hintSeen = false;
  state.moneyOpen = false;
  state.sheet = null;
  state.advice = '';
  state.grade = null;
  state.studioNote = '';
  state.gradeCue = false;
}

export function loadLastGrade() {
  try {
    const raw = localStorage.getItem('dreamcar-last');
    state.lastGrade = raw ? JSON.parse(raw) : null;
  } catch {
    state.lastGrade = null;
  }
}

export function saveLastGrade(grade, car) {
  const payload = {
    letter: grade.letter,
    title: grade.title,
    car: car.name,
    payment: grade.quote.payment,
  };
  state.lastGrade = payload;
  try {
    localStorage.setItem('dreamcar-last', JSON.stringify(payload));
  } catch {
    /* private mode */
  }
}

export function rollScore() {
  const r = Math.random();
  let min;
  let max;
  if (r < 0.06) {
    min = 675;
    max = 699;
  } else if (r < 0.68) {
    min = 700;
    max = 780;
  } else if (r < 0.94) {
    min = 781;
    max = 809;
  } else {
    min = 810;
    max = 820;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}
