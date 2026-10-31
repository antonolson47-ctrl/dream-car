import { TRADE, warrantyPrice } from './data.js';
import { aprFloor, aprOpen, floorPrice, openPrice } from './finance.js';

function clamp01(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function ensurePressure(deal) {
  if (!deal.bank) deal.bank = { price: 0, trade: 0, apr: 0 };
  if (!Number.isFinite(deal.pushes)) deal.pushes = 0;
  if (deal.celebrated == null) deal.celebrated = false;
}

/**
 * How far the live deal has walked toward the player.
 * Price, trade, and rate do the heavy lifting. Term and warranty only count
 * once the player actually moves them off Ricky's opening stance.
 */
export function concessionHeat(car, deal, build) {
  const open = openPrice(car);
  const floor = floorPrice(car);
  const price = clamp01((open - deal.price) / Math.max(1, open - floor));
  const trade = clamp01((deal.trade - TRADE.open) / Math.max(1, TRADE.max - TRADE.open));
  const earned = aprFloor(deal.effectiveScore || 700);
  const hi = aprOpen(earned);
  const apr = clamp01((hi - deal.apr) / Math.max(0.01, hi - earned));
  const term = deal.term < 72 ? clamp01((72 - deal.term) / 12) : 0;
  const warrantyId = build?.single?.warranty || deal.warrantySync || 'none';
  const opened = deal.warrantyOpened || warrantyId;
  const warranty = clamp01((warrantyPrice(opened) - warrantyPrice(warrantyId)) / 5000);
  const heat = price * 0.4 + trade * 0.28 + apr * 0.24 + term * 0.05 + warranty * 0.03;
  const stacks = [
    price >= 0.55,
    trade >= 0.5,
    apr >= 0.55,
    term >= 0.8,
    warranty >= 0.4,
  ].filter(Boolean).length;
  return { price, trade, apr, term, warranty, heat, stacks };
}

export function stressLevel(heat, pushes, stacks) {
  const push = Math.min(1.2, (pushes || 0) / 5);
  const stack = Math.min(1, (stacks || 0) / 3);
  const score = heat * 0.9 + push * 0.7 + stack * 0.45;
  if (score >= 1.65) return 4;
  if (score >= 1.15) return 3;
  if (score >= 0.7) return 2;
  if (score >= 0.3) return 1;
  return 0;
}

export function salesmanMood(car, deal, build) {
  const heat = concessionHeat(car, deal, build);
  return {
    ...heat,
    level: stressLevel(heat.heat, deal.pushes || 0, heat.stacks),
  };
}

/** Price at the bone, trade respected, rate matching the score. Vinny's "shake" moment. */
export function isStrongDeal(car, deal) {
  const floor = floorPrice(car);
  const earned = aprFloor(deal.effectiveScore || 700);
  return deal.price <= floor + 50
    && deal.trade >= 5000
    && deal.apr <= earned + 0.05;
}

export function snapshotDeal(deal, build) {
  return {
    price: deal.price,
    trade: deal.trade,
    apr: deal.apr,
    term: deal.term,
    warranty: build?.single?.warranty || deal.warrantySync || 'none',
  };
}

/** Axes where this change saves the player money. Down payment is the player's cash, not a concession. */
export function winAxes(before, after) {
  const axes = [];
  if (after.price < before.price - 0.01) axes.push('price');
  if (after.trade > before.trade + 0.01) axes.push('trade');
  if (after.apr < before.apr - 0.0001) axes.push('apr');
  if (after.term < before.term) axes.push('term');
  if (warrantyPrice(after.warranty) < warrantyPrice(before.warranty) - 0.01) axes.push('warranty');
  return axes;
}

const STEP = { price: 250, trade: 200, apr: 0.12 };

function consumeBanks(deal) {
  let steps = 0;
  while (deal.bank.price >= STEP.price && steps < 6) {
    deal.bank.price -= STEP.price;
    steps += 1;
  }
  while (deal.bank.trade >= STEP.trade && steps < 8) {
    deal.bank.trade -= STEP.trade;
    steps += 1;
  }
  while (deal.bank.apr >= STEP.apr && steps < 8) {
    deal.bank.apr -= STEP.apr;
    steps += 1;
  }
  return steps;
}

/**
 * Record a desk move. Slider drags bank up and count a push every meaningful step.
 * Buttons count as one ask. Fireworks arm once when the deal first becomes strong.
 */
export function applyPressure(car, build, deal, before, after, source) {
  ensurePressure(deal);
  if (source === 'slider') {
    if (after.price > before.price) deal.bank.price = Math.max(0, deal.bank.price - (after.price - before.price));
    if (after.trade < before.trade) deal.bank.trade = Math.max(0, deal.bank.trade - (before.trade - after.trade));
    if (after.apr > before.apr) deal.bank.apr = Math.max(0, deal.bank.apr - (after.apr - before.apr));
  }
  const axes = winAxes(before, after);
  let counted = false;
  if (axes.length && source === 'slider') {
    if (axes.includes('price')) deal.bank.price += before.price - after.price;
    if (axes.includes('trade')) deal.bank.trade += after.trade - before.trade;
    if (axes.includes('apr')) deal.bank.apr += before.apr - after.apr;
    const steps = consumeBanks(deal);
    if (axes.includes('term') || axes.includes('warranty')) {
      deal.pushes += 1;
      counted = true;
    }
    if (steps) {
      deal.pushes += steps;
      counted = true;
    }
  } else if (axes.length) {
    deal.pushes += 1;
    counted = true;
  }

  const mood = salesmanMood(car, deal, build);
  const strong = isStrongDeal(car, deal);
  let fireworks = false;
  if (strong && !deal.celebrated) {
    deal.celebrated = true;
    fireworks = true;
  } else if (!strong) {
    deal.celebrated = false;
  }

  return {
    axes,
    ching: axes.length > 0,
    moan: counted && !fireworks && mood.level >= 2,
    fireworks,
    mood,
  };
}
