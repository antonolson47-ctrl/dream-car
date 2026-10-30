import { BILLS_MONTHLY, FEES, PLAYER } from './data.js';
import { clamp, roundTo } from './format.js';

export function monthlyPayment(principal, aprPercent, months) {
  const p = Math.max(0, principal);
  const n = Math.max(1, months);
  if (p === 0) return 0;
  const r = aprPercent / 100 / 12;
  if (r === 0) return roundCents(p / n);
  const growth = (1 + r) ** n;
  return roundCents((p * r * growth) / (growth - 1));
}

export function roundCents(value) {
  return Math.round(value * 100) / 100;
}

export function aprFloor(score) {
  const s = clamp(score, 675, 820);
  const t = (820 - s) / (820 - 675);
  return roundCents(6 + t * 2);
}

export function aprOpen(floor) {
  return clamp(roundCents(floor + 0.7), floor, 8);
}

export function openPrice(car) {
  return roundTo(car.msrp * (1 + car.markup), 50);
}

export function floorPrice(car) {
  return roundTo(car.msrp * (1 - car.room), 50);
}

export function weeklyFromMonthly(amount) {
  return (amount * 12) / 52;
}

export function monthlyTakeHome() {
  return (PLAYER.weeklyTakeHome * 52) / 12;
}

/**
 * One deal worksheet. `price` is the negotiated vehicle price (base MSRP fight),
 * not including options or warranty.
 */
export function quote({
  price,
  options = 0,
  warranty = 0,
  trade = 0,
  down = 0,
  apr = 6,
  term = 72,
  insurance = 0,
}) {
  const selling = price + options;
  const taxable = Math.max(0, selling + warranty - trade);
  const tax = roundCents(taxable * FEES.taxRate);
  const doc = FEES.doc;
  const title = FEES.title;
  const subtotal = roundCents(selling + warranty + doc + title + tax);
  const otd = roundCents(subtotal - trade);
  const cashDown = Math.max(0, down);
  const financed = roundCents(Math.max(0, otd - cashDown));
  const payment = monthlyPayment(financed, apr, term);
  const totalOfPayments = roundCents(payment * term);
  const interest = roundCents(Math.max(0, totalOfPayments - financed));
  const monthlyTake = monthlyTakeHome();
  const weeklyBills = weeklyFromMonthly(BILLS_MONTHLY);
  const weeklyIns = weeklyFromMonthly(insurance);
  const weeklyPay = weeklyFromMonthly(payment);
  const weeklyLeft = PLAYER.weeklyTakeHome - weeklyBills - weeklyIns - weeklyPay;
  const paymentShare = monthlyTake > 0 ? payment / monthlyTake : 0;

  return {
    selling,
    options,
    warranty,
    taxable,
    tax,
    doc,
    title,
    subtotal,
    trade,
    otd,
    down: cashDown,
    financed,
    apr,
    term,
    payment,
    totalOfPayments,
    interest,
    insurance,
    monthlyTake,
    weeklyBills,
    weeklyIns,
    weeklyPay,
    weeklyLeft,
    paymentShare,
  };
}

/**
 * What it costs to live with the car for the whole term.
 * Payments already include the warranty, tax, and fees.
 * Insurance and upkeep are Vinny’s estimates, not a second loan.
 */
export function ownershipCost(car, q) {
  const months = q.term;
  const runningMonthly = car.running ?? 160;
  const note = q.totalOfPayments;
  const insurance = roundCents((q.insurance || 0) * months);
  const upkeep = roundCents(runningMonthly * months);
  const down = q.down || 0;
  const total = roundCents(note + down + insurance + upkeep);
  return {
    months,
    note,
    interest: q.interest,
    insurance,
    upkeep,
    runningMonthly,
    down,
    warranty: q.warranty || 0,
    total,
  };
}

export function paymentZone(share) {
  if (share > 0.2 || !Number.isFinite(share)) return 'bad';
  if (share > 0.15) return 'warn';
  return 'ok';
}
