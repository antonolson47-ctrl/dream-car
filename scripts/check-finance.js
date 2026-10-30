import { BILLS_MONTHLY, CARS, GLOSSARY, GROUPS, JALOPY, PLAYER, freshBuild, groupsFor, priceBuild } from '../src/data.js';
import { aprFloor, floorPrice, monthlyPayment, openPrice, quote } from '../src/finance.js';
import { carSVG, jalopySVG } from '../src/car-art.js';
import { gradeDeal } from '../src/vinny.js';
import { rollScore } from '../src/state.js';

function assert(cond, message) {
  if (!cond) throw new Error(message);
}

const payment = monthlyPayment(10000, 6, 36);
assert(Math.abs(payment - 304.22) < 0.02, `expected ~304.22, got ${payment}`);
assert(monthlyPayment(0, 7, 60) === 0, 'zero principal');
assert(monthlyPayment(1000, 0, 10) === 100, 'zero apr');

assert(aprFloor(820) === 6, '820 should be 6%');
assert(aprFloor(675) === 8, '675 should be 8%');
assert(Math.abs(aprFloor(747.5) - 7) < 0.02, 'mid score should be ~7%');

assert(BILLS_MONTHLY === 2195, `bills ${BILLS_MONTHLY}`);
assert(PLAYER.checking === 8000 && PLAYER.savings === 15000, 'cash');
assert(PLAYER.weeklyTakeHome === 1010 && PLAYER.salary === 70000, 'pay');
assert(JALOPY.trade === 4500, 'jalopy');

const ids = CARS.map((car) => car.id).sort().join(',');
assert(ids === 'breeze,harbor,ironhorn,stallion', ids);
for (const car of CARS) {
  assert(car.colors.length >= 8, `${car.name} colors`);
  assert(floorPrice(car) < car.msrp && car.msrp < openPrice(car), `${car.name} price band`);
  const build = freshBuild(car);
  const priced = priceBuild(car, build);
  assert(priced.options === 0 && priced.warranty === 0 && priced.total === car.msrp, `${car.name} stock price`);
  for (const view of ['side', 'front', 'rear']) {
    const svg = carSVG(car.id, view, {
      paint: car.colors[0].hex,
      pearl: false,
      matte: false,
      wheel: 'stock',
      roof: 'none',
      tint: 0,
      spoiler: false,
      stripes: false,
      exhaust: false,
      lift: 0,
      liner: 'none',
      cover: 'none',
      underglow: null,
      topDown: view === 'side' && car.id === 'breeze',
      topColor: '#111',
      deflector: false,
      lightbar: false,
      winch: false,
      brakes: false,
      dark: true,
    }, `${car.id}${view}`);
    assert(svg.includes('<svg'), `${car.name} ${view} svg`);
    assert(svg.includes(`${car.id}${view}-paint`), `${car.name} ${view} paint id`);
  }
}
assert(jalopySVG().includes('Cumberland'), 'jalopy title');

const sound = GROUPS.find((group) => group.id === 'sound');
assert(sound.options.length >= 6, 'sound options');
const warranty = GROUPS.find((group) => group.id === 'warranty');
const prices = Object.fromEntries(warranty.options.map((option) => [option.id, option.price]));
assert(prices.basic === 2000 && prices.bumper === 3500 && prices.platinum === 5000, 'warranty prices');

const truck = groupsFor('ironhorn').flatMap((group) => group.options.map((option) => option.name.toLowerCase()));
for (const word of ['bed', 'tonneau', 'winch', 'lift', 'exhaust']) {
  assert(truck.some((name) => name.includes(word === 'bed' ? 'bed' : word === 'tonneau' ? 'tonneau' : word)), `truck missing ${word}`);
}
const sport = groupsFor('stallion').flatMap((group) => group.options.map((option) => option.id));
for (const id of ['launch', 'spoiler', 'track', 'exhaust', 'turbo']) {
  assert(sport.includes(id), `sport missing ${id}`);
}
const breeze = groupsFor('breeze').flatMap((group) => group.options.map((option) => option.id));
assert(breeze.includes('black') && breeze.includes('underglow') && breeze.includes('deflector'), 'breeze packs');
const harbor = groupsFor('harbor').flatMap((group) => group.options.map((option) => option.id));
for (const id of ['cargo', 'rack', 'ppf', 'eff']) assert(harbor.includes(id), `harbor missing ${id}`);

for (const term of ['apr', 'principal', 'term', 'trade', 'negative', 'otd', 'payment', 'warranty', 'cosigner', 'credit', 'down', 'interest', 'amortization', 'msrp', 'tax', 'takehome', 'financed']) {
  assert(GLOSSARY[term] && GLOSSARY[term].body.split('.').length >= 2, `glossary ${term}`);
}

const sheet = quote({
  price: 26100,
  options: 220,
  warranty: 2000,
  trade: 4500,
  down: 1000,
  apr: 6.5,
  term: 60,
  insurance: 128,
});
assert(sheet.financed > 0 && sheet.payment > 0, 'quote payment');
assert(Math.abs((sheet.otd - 1000) - sheet.financed) < 0.02, 'financed identity');
assert(sheet.payment < sheet.monthlyTake * 0.15, `harbor-like deal should clear 15% (${sheet.payment})`);

const stallion = CARS[0];
const heavy = quote({
  price: openPrice(stallion),
  options: 0,
  warranty: 0,
  trade: 3600,
  down: 0,
  apr: 7,
  term: 72,
  insurance: 310,
});
assert(heavy.paymentShare > 0.15, 'stallion opening should pressure the budget');

let low = 0;
let mid = 0;
let high = 0;
for (let i = 0; i < 4000; i += 1) {
  const score = rollScore();
  assert(score >= 675 && score <= 820, 'score range');
  if (score < 700) low += 1;
  else if (score <= 780) mid += 1;
  else high += 1;
}
assert(mid > 2000, `mid band too rare ${mid}`);
assert(low < 500, `low band too common ${low}`);
assert(high < 1800, `high band too common ${high}`);

const harborCar = CARS.find((car) => car.id === 'harbor');
const build = freshBuild(harborCar);
build.single.mats = 'weather';
const deal = {
  price: floorPrice(harborCar),
  trade: 5200,
  apr: aprFloor(760),
  term: 60,
  downChecking: 1000,
  downSavings: 0,
  effectiveScore: 760,
};
const grade = gradeDeal(harborCar, build, deal);
assert(['A+', 'A', 'B'].includes(grade.letter), `expected a strong harbor grade, got ${grade.letter} (${grade.score})`);

console.log('finance, catalog, and art checks passed');
console.log(`sample harbor payment $${sheet.payment.toFixed(2)} · grade ${grade.letter}`);
