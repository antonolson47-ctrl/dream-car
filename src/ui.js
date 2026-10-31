import { carSVG, jalopySVG, visualsFrom, VIEWS } from './car-art.js';
import {
  BILLS,
  BILLS_MONTHLY,
  CATEGORIES,
  CARS,
  GLOSSARY,
  JALOPY,
  PLAYER,
  SAVINGS_RESERVE,
  TRADE,
  groupsFor,
  insuranceFor,
  paintOf,
  priceBuild,
} from './data.js';
import { aprFloor, aprOpen, floorPrice, monthlyTakeHome, openPrice, ownershipCost, paymentZone, weeklyFromMonthly } from './finance.js';
import { esc, money, moneyExact, pct } from './format.js';
import { vinnyFace, rickyFace } from './portraits.js';
import { goalStoryArt, rickyStoryArt, vinnyStoryArt } from './story-art.js';
import { effectiveScore, ensureBuild, ensureDeal, getCar, state } from './state.js';
import { celebrationCard } from './fx.js';
import { salesmanMood } from './pressure.js';
import { askVinny, buildQuoteInput, cosignLine, creditIntro, creditResult, deskTip, rickyLine, scoreBand, studioTip, tcoLine } from './vinny.js';
import { audio } from './audio.js';

const WHINE = ['', '', 'getting misty', 'openly suffering', 'tragic little noises'];

const STEPS = [
  { id: 'credit', label: 'Credit' },
  { id: 'lot', label: 'Cars' },
  { id: 'studio', label: 'Studio' },
  { id: 'negotiate', label: 'Desk' },
  { id: 'grade', label: 'Deal' },
];

export function render() {
  const app = document.getElementById('app');
  const locked = state.screen === 'studio' || state.screen === 'negotiate';
  app.classList.toggle('is-lock', locked);
  const hud = document.getElementById('hud');
  const bare = state.screen === 'intro' || state.screen === 'story';
  hud.hidden = bare;
  if (!bare) renderHud();
  else document.getElementById('drawer').hidden = true;
  const screen = document.getElementById('screen');
  const views = {
    story: storyScreen,
    intro: introScreen,
    credit: creditScreen,
    lot: lotScreen,
    studio: studioScreen,
    negotiate: deskScreen,
    grade: gradeScreen,
  };
  screen.innerHTML = (views[state.screen] || introScreen)();
}

export function renderHud() {
  const score = effectiveScore();
  const showCash = state.screen === 'negotiate' || state.screen === 'grade';
  const deal = showCash ? state.deals[state.carId] : null;
  const checking = PLAYER.checking - (deal?.downChecking || 0);
  const savings = PLAYER.savings - (deal?.downSavings || 0);
  const stepIndex = STEPS.findIndex((step) => step.id === state.screen);
  document.getElementById('hud').innerHTML = `
    <div class="hud-row">
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">Checking</span>
        <span class="v">${money(checking)}</span>
      </button>
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">Savings</span>
        <span class="v">${money(savings)}</span>
      </button>
      <button type="button" class="hud-chip" data-action="money">
        <span class="k">${score ? (state.credit.cosign ? 'With Ma' : 'Credit') : 'Pay'}</span>
        <span class="v">${score ? score : '$1,010'}</span>
      </button>
      <button type="button" class="icon-btn ${audio.on ? 'is-on' : ''}" data-action="audio" aria-label="${audio.on ? 'Mute sounds' : 'Play sounds'}" aria-pressed="${audio.on}">
        ${noteIcon()}
      </button>
    </div>
    <ol class="steps">
      ${STEPS.map((step, index) => `<li class="${index === stepIndex ? 'is-on' : index < stepIndex ? 'is-done' : ''}">${step.label}</li>`).join('')}
    </ol>`;
  document.getElementById('drawer').innerHTML = drawerHTML();
}

export function syncAudioButton() {
  const btn = document.querySelector('[data-action="audio"]');
  if (!btn) return;
  btn.classList.toggle('is-on', audio.on);
  btn.setAttribute('aria-pressed', String(audio.on));
  btn.setAttribute('aria-label', audio.on ? 'Mute sounds' : 'Play sounds');
}

export function toggleDrawer() {
  const drawer = document.getElementById('drawer');
  state.moneyOpen = !state.moneyOpen;
  drawer.hidden = !state.moneyOpen;
}

export function openGlossary(term) {
  const item = GLOSSARY[term];
  if (!item) return;
  const overlay = document.getElementById('overlay');
  overlay.hidden = false;
  overlay.innerHTML = `
    <div class="sheet-back">
      <div class="scrim" data-action="close-sheet"></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <header class="sheet-head">
          <p class="eyebrow">What is this?</p>
          <h2 id="sheet-title">${esc(item.title)}</h2>
          <button type="button" class="icon-btn sheet-x" data-action="close-sheet" aria-label="Close">×</button>
        </header>
        ${bubble(item.body)}
      </div>
    </div>`;
  overlay.querySelector('.sheet-x')?.focus();
}

export function closeOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.hidden = true;
  overlay.innerHTML = '';
}

export function closeDrawer() {
  state.moneyOpen = false;
  const drawer = document.getElementById('drawer');
  if (drawer) drawer.hidden = true;
}

export function patchStudio({ options = false } = {}) {
  const car = getCar();
  const build = ensureBuild(car);
  const priced = priceBuild(car, build);
  const paint = paintOf(car, build);
  const host = document.getElementById('hero-art');
  if (host) {
    const cfg = visualsFrom(car, build);
    host.innerHTML = carSVG(car.id, VIEWS[state.view].id, cfg, `hero${state.view}`);
  }
  document.querySelectorAll('.swatch').forEach((btn) => {
    const on = btn.dataset.paint === build.paint;
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  setText('paint-label', paint.price ? `${paint.name} · +${money(paint.price)}` : paint.name);
  syncViewDots();
  setText('dock-price', money(priced.total));
  setText('dock-sub', dockSub(priced));
  setText('vinny-tip-text', state.studioNote || studioTip(car, build));
  if (options) {
    const mount = document.getElementById('options');
    if (mount) mount.innerHTML = optionsHTML(car, build);
    const cart = document.getElementById('build-cart');
    if (cart) cart.innerHTML = cartInner(car, build);
  }
  const hero = document.getElementById('hero');
  hero?.classList.toggle('is-spinning', state.spinning);
  const spin = document.querySelector('[data-action="spin"]');
  if (spin) spin.textContent = state.spinning ? 'Stop' : 'Spin';
  const hint = document.getElementById('swipe-hint');
  if (hint) hint.hidden = state.hintSeen;
  const top = document.querySelector('[data-action="top"]');
  if (top) top.textContent = build.topDown ? 'Raise the top' : 'Drop the top';
}

export function patchCategory() {
  const car = getCar();
  const mount = document.getElementById('options');
  if (mount) mount.innerHTML = optionsHTML(car, ensureBuild(car));
  document.querySelectorAll('.cat').forEach((btn) => {
    btn.classList.toggle('is-on', btn.dataset.cat === state.category);
  });
  document.getElementById('studio-scroll')?.scrollTo(0, 0);
  setText('vinny-tip-text', state.studioNote || studioTip(car, ensureBuild(car)));
}

export function toggleTopClass() {
  const build = ensureBuild();
  const svg = document.querySelector('#hero-art .car');
  svg?.classList.toggle('is-down', build.topDown);
  const top = document.querySelector('[data-action="top"]');
  if (top) top.textContent = build.topDown ? 'Raise the top' : 'Drop the top';
  setText('vinny-tip-text', state.studioNote || studioTip(getCar(), build));
}

export function patchDesk({ sliders = false } = {}) {
  const car = getCar();
  const build = ensureBuild(car);
  const deal = ensureDeal(car);
  const { quote: q, priced } = buildQuoteInput(car, build, deal);
  setText('price-readout', money(deal.price));
  setText('trade-readout', money(deal.trade));
  setText('apr-readout', `${deal.apr.toFixed(2)}%`);
  setText('check-readout', `${money(deal.downChecking)} down · ${money(PLAYER.checking - deal.downChecking)} left`);
  setText('save-readout', savingsReadout(deal.downSavings));
  setText('ricky-line', rickyLine(car, deal, build));
  syncRicky(car, build, deal);
  setText('vinny-desk-text', state.advice || deskTip(car, deal, q));
  setText('dock-pay', money(q.payment, true));
  const zone = paymentZone(q.paymentShare);
  const left = q.weeklyLeft;
  setText('dock-sub', `${deal.term} mo · ${deal.apr.toFixed(2)}% · ${money(left)} left this week`);
  const payEl = document.getElementById('dock-pay');
  payEl?.classList.remove('zone-ok', 'zone-warn', 'zone-bad');
  payEl?.classList.add(`zone-${left < 0 ? 'bad' : zone}`);
  const pressure = document.getElementById('pressure');
  if (pressure) pressure.innerHTML = pressureBanner(q);
  const budget = document.getElementById('budget-mount');
  if (budget) budget.innerHTML = budgetHTML(q);
  const tco = document.getElementById('tco-mount');
  if (tco) tco.innerHTML = tcoHTML(car, q);
  document.querySelector('[data-lever="savings"]')?.closest('.lever')?.classList.toggle('warn', savingsThin(deal.downSavings));
  const sheet = document.getElementById('sheet-mount');
  if (sheet) sheet.innerHTML = worksheetHTML(car, deal, priced, q);
  document.querySelectorAll('[data-term]').forEach((btn) => {
    const on = Number(btn.dataset.term) === deal.term;
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  document.querySelectorAll('[data-warranty]').forEach((btn) => {
    const on = btn.dataset.warranty === build.single.warranty;
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  if (sliders) {
    setSlider('price', deal.price);
    setSlider('trade', deal.trade);
    setSlider('apr', deal.apr);
    setSlider('checking', deal.downChecking);
    setSlider('savings', deal.downSavings);
  }
  renderHud();
}

export function setOdo(value) {
  const text = String(value).padStart(3, '0');
  text.split('').forEach((digit, index) => {
    const el = document.getElementById(`d${index}`);
    if (el) el.textContent = digit;
  });
}

function setSlider(name, value) {
  const el = document.querySelector(`[data-lever="${name}"]`);
  if (el) el.value = String(value);
}

function savingsReadout(downSavings) {
  const left = PLAYER.savings - downSavings;
  if (downSavings <= 0) return 'None down yet';
  if (left < SAVINGS_RESERVE) return `${money(downSavings)} · backup thin`;
  return `${money(downSavings)} down · ${money(left)} left`;
}

function savingsThin(downSavings) {
  return downSavings > 0 && PLAYER.savings - downSavings < SAVINGS_RESERVE;
}

function tcoHTML(car, q) {
  const own = ownershipCost(car, q);
  return `<section class="tco">
    <div class="tco-top">
      <span>Total cost of ownership ${what('tco')}</span>
      <strong>${money(own.total)}</strong>
    </div>
    <p>${esc(tcoLine(car, own))}</p>
  </section>`;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (!el || el.textContent === text) return;
  el.textContent = text;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

function syncRicky(car, build, deal) {
  const mood = salesmanMood(car, deal, build);
  const ricky = document.getElementById('ricky');
  if (ricky) ricky.dataset.stress = String(mood.level);
  const fill = document.getElementById('margin-fill');
  if (fill) fill.style.width = `${Math.max(8, Math.round((1 - Math.min(1, mood.heat)) * 100))}%`;
  const whine = document.getElementById('ricky-whine');
  if (whine) {
    const label = WHINE[mood.level] || '';
    whine.textContent = label;
    whine.hidden = !label;
  }
}

export function flinchRicky(level) {
  const el = document.getElementById('ricky');
  if (!el) return;
  el.classList.remove('is-wailing');
  void el.offsetWidth;
  el.classList.add('is-wailing');
  const yelp = document.getElementById('ricky-yelp');
  if (!yelp) return;
  const words = ['nnngh', 'augh', 'my margin', 'wahhh', 'nooo'];
  yelp.textContent = words[Math.min(words.length - 1, Math.max(0, (level || 2) - 1))];
  clearTimeout(flinchRicky.timer);
  flinchRicky.timer = setTimeout(() => {
    yelp.textContent = '';
    el.classList.remove('is-wailing');
  }, 900);
}

export function flashWins(axes) {
  for (const axis of axes) {
    const seed = axis === 'term'
      ? document.querySelector('[data-action="term"]')
      : axis === 'warranty'
        ? document.querySelector('[data-warranty]')
        : document.querySelector(`[data-lever="${axis}"]`);
    const el = seed?.closest('.lever');
    if (!el) continue;
    el.classList.remove('is-win');
    void el.offsetWidth;
    el.classList.add('is-win');
  }
}

function syncViewDots() {
  document.querySelectorAll('.view-dot').forEach((btn) => {
    btn.classList.toggle('is-on', Number(btn.dataset.view) === state.view);
  });
}

function what(term, compact = false) {
  if (compact) {
    return `<button type="button" class="what mini" data-action="glossary" data-term="${term}" aria-label="What is this?">?</button>`;
  }
  return `<button type="button" class="what" data-action="glossary" data-term="${term}">What is this?</button>`;
}

function bubble(text, who = 'Vinny “Numbers” Caputo') {
  return `<div class="vinny">
    ${vinnyFace()}
    <div class="bubble">
      <span class="who">${who}</span>
      <p>${esc(text)}</p>
    </div>
  </div>`;
}

function noteIcon() {
  return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M9 18a3 3 0 1 1-2-2.83V5.7l10-2v8.47A3 3 0 1 1 15 14V6.1l-6 1.2V18z"/></svg>`;
}

function drawerHTML() {
  const score = state.credit.score;
  const effective = effectiveScore();
  const weeklyBills = weeklyFromMonthly(BILLS_MONTHLY);
  return `<div class="drawer-card">
    <div class="drawer-head">
      <h2>The week you actually have</h2>
      <button type="button" class="icon-btn" data-action="money" aria-label="Close money">×</button>
    </div>
    <p class="lead">Salary ${money(PLAYER.salary)} a year. Take-home about <strong>${money(PLAYER.weeklyTakeHome)} a week</strong> after a plain tax estimate. ${what('takehome')}</p>
    <p class="fine">That is about ${money(monthlyTakeHome())} a month. The salary is the rumor. The week is the truth.</p>
    <ul class="bills">
      ${BILLS.map((bill) => `<li><span>${esc(bill.label)}</span><b>${money(bill.amount)}</b></li>`).join('')}
      <li class="total"><span>Locked bills</span><b>${money(BILLS_MONTHLY)} / mo</b></li>
    </ul>
    <p class="fine">About ${money(weeklyBills)} of every paycheck is already spoken for. The car has to live in what’s left, next to gas, insurance, and a life.</p>
    <ul class="bills">
      <li><span>Checking</span><b>${money(PLAYER.checking)}</b></li>
      <li><span>Savings</span><b>${money(PLAYER.savings)}</b></li>
      ${score ? `<li><span>Credit ${what('credit')}</span><b>${score}${state.credit.cosign ? ` → ${effective} with Ma` : ''}</b></li>` : ''}
    </ul>
    <p class="fine">About ${money(PLAYER.savings)} in savings. A chunk of it can be the down payment. Leave roughly ${money(SAVINGS_RESERVE)} — two months of bills — and do not blow the pile on a spoiler.</p>
  </div>`;
}

const STORY = [
  {
    eyebrow: 'In your corner',
    kicker: 'Vinny “Numbers” Caputo',
    title: 'Your buddy at the desk',
    body: 'He counts out loud so you do not have to smile on cue. Warm, loud, Jersey to the bone. He is on your side of the table.',
    art: vinnyStoryArt,
  },
  {
    eyebrow: 'Across the table',
    kicker: 'Ricky Falco',
    title: 'The smile comes first',
    body: 'Falco Motors. He will call you pal and talk monthly until the price disappears. A little sleazy. Very good at the part you came here to win.',
    art: rickyStoryArt,
  },
  {
    eyebrow: 'Why you came',
    kicker: 'The job',
    title: 'Beat the desk',
    body: 'Knock the price down. Get a fair trade. Take the rate your score earned. Leave the week able to breathe, then take the keys.',
    art: goalStoryArt,
  },
];

function storyScreen() {
  const card = STORY[state.card] || STORY[0];
  const last = state.card >= STORY.length - 1;
  const replay = !!state.lastGrade;
  return `<section class="story">
    <p class="eyebrow">${esc(card.eyebrow)} · ${state.card + 1} of ${STORY.length}</p>
    <button type="button" class="story-card" data-action="story-next" aria-label="${esc(card.title)}">
      <div class="story-art">${card.art()}</div>
      <div class="story-copy">
        <span class="story-kicker">${esc(card.kicker)}</span>
        <h1>${esc(card.title)}</h1>
        <p>${esc(card.body)}</p>
      </div>
    </button>
    <div class="story-foot">
      <div class="story-dots" aria-hidden="true">${STORY.map((_, i) => `<i class="${i === state.card ? 'is-on' : ''}"></i>`).join('')}</div>
      <button type="button" class="btn primary xl" data-action="story-next">${last ? 'Continue' : 'Next'}</button>
      ${replay ? '<button type="button" class="btn ghost" data-action="story-skip">Skip</button>' : ''}
    </div>
  </section>`;
}

function introScreen() {
  const last = state.lastGrade;
  return `<section class="intro">
    <div class="sky">
      <p class="eyebrow">Route 17 · after the rain</p>
      <div class="neon" aria-hidden="true"><span>Dream</span> <span>Car</span></div>
    </div>
    <div class="stage">
      <div class="asphalt"></div>
      <div class="jalopy-drive">${jalopySVG()}</div>
      <div class="hangtag"><span>Your trade</span><strong>${money(JALOPY.trade)}</strong><em>${JALOPY.year} ${esc(JALOPY.name)}</em></div>
    </div>
    <div class="intro-copy">
      <h1>Let's go car shopping!</h1>
      <p>${esc(JALOPY.line)} Checking ${money(PLAYER.checking)}. Savings ${money(PLAYER.savings)}. A ${money(PLAYER.salary)} salary that shows up as about ${money(PLAYER.weeklyTakeHome)} a week.</p>
      ${last ? `<p class="last-deal">Last time Vinny called it a ${esc(last.letter)} on the ${esc(last.car)}.</p>` : ''}
      <button type="button" class="btn primary xl" data-action="start">Step onto the lot</button>
      <button type="button" class="btn text" data-action="audio">${audio.on ? 'Violin’s on' : 'A little violin, if you want it'}</button>
    </div>
  </section>`;
}

function creditScreen() {
  const { score, cosign, boost, rolling } = state.credit;
  const effective = effectiveScore();
  const shown = cosign ? effective : score;
  const band = score ? scoreBand(effective) : null;
  const earned = score ? aprFloor(effective) : null;
  return `<section class="credit">
    <p class="eyebrow">Before the shiny things</p>
    <h1>${score ? band.label : 'Roll your credit.'}</h1>
    <div class="odo ${rolling ? 'is-rolling' : ''}" aria-hidden="true">
      <span id="d0">${shown ? String(shown)[0] : '–'}</span>
      <span id="d1">${shown ? String(shown)[1] : '–'}</span>
      <span id="d2">${shown ? String(shown)[2] : '–'}</span>
    </div>
    ${score && cosign ? `<p class="cosign-note">Your roll was ${score}. With Ma, the bank sees <strong>${effective}</strong>.</p>` : ''}
    <div class="what-row">${what('credit')}</div>
    ${bubble(score ? (cosign ? cosignLine(boost, effective, score) : creditResult(score)) : creditIntro())}
    ${score ? `<p class="rate-preview">Money like yours starts near <strong>${earned.toFixed(2)}% APR</strong> before anybody marks it up. ${what('apr')}</p>` : `<p class="fine center">The reel is weighted like life. Most people land in the 700s. A 675 and an 820 are both rare.</p>`}
    ${score ? cosignCard() : ''}
    <div class="stack">
      ${score ? '' : `<button type="button" class="btn primary xl" data-action="roll" ${rolling ? 'disabled' : ''}>Roll the dice</button>`}
      <button type="button" class="btn ${score ? 'primary xl' : 'ghost'}" data-action="to-lot" ${score ? '' : 'disabled'}>See the cars</button>
    </div>
  </section>`;
}

function cosignCard() {
  if (state.credit.cosign) {
    return `<article class="card cosign done">
      <h2>Ma’s on the note.</h2>
      <p>The rate moves. So does the family obligation. ${what('cosigner')}</p>
    </article>`;
  }
  const poor = state.credit.score < 720;
  return `<article class="card cosign ${poor ? 'hot' : ''}">
    <h2>${poor ? 'The rate is going to bite.' : 'You can leave Ma out of this.'}</h2>
    <p>${poor
      ? 'Ask her to co-sign and the bank will pretend you are 50 to 75 points prettier. She is on the hook if you are not.'
      : 'A co-signer helps a thin score. Yours is not thin. Asking anyway puts her name on a car she does not drive.'}</p>
    <button type="button" class="btn ${poor ? 'primary' : 'ghost'}" data-action="cosign">Ask Mom to co-sign</button>
    <div class="what-row">${what('cosigner')}</div>
  </article>`;
}

function lotScreen() {
  const score = effectiveScore();
  const needsMom = state.credit.score < 720 && !state.credit.cosign;
  return `<section class="lot">
    <header class="lot-head">
      <p class="eyebrow">Falco Motors · the row</p>
      <h1>Four cars. One paycheck.</h1>
      <p>Don’t fall in love before the number. Credit the bank will use: <strong>${score}</strong>.</p>
      ${needsMom ? `<button type="button" class="btn tiny" data-action="back-credit">Still time to ask Ma</button>` : ''}
    </header>
    <div class="lot-scroller" id="lot-scroller">
      ${CARS.map((car) => lotSlide(car)).join('')}
    </div>
    <div class="lot-nav">
      <button type="button" class="icon-btn" data-action="lot-prev" aria-label="Previous car">‹</button>
      <div class="lot-dots" id="lot-dots">
        ${CARS.map((car, index) => `<span class="lot-dot ${index === 0 ? 'is-on' : ''}" data-dot="${car.id}"></span>`).join('')}
      </div>
      <button type="button" class="icon-btn" data-action="lot-next" aria-label="Next car">›</button>
    </div>
  </section>`;
}

function lotSlide(car) {
  const build = state.builds[car.id] || { paint: car.colors[0].id, topDown: false, single: { wheels: 'stock', roof: 'none', tint: 'none', top: 'black', liner: 'none', cover: 'none', stance: 'stock' }, multi: {} };
  const cfg = visualsFrom(car, normalizePreview(build));
  return `<article class="lot-slide">
    <div class="lot-art">${carSVG(car.id, 'side', cfg, `lot${car.id}`)}</div>
    <p class="eyebrow">${esc(car.maker)} · ${esc(car.vibe)}</p>
    <h2>${esc(car.name)}</h2>
    <p class="msrp">${money(car.msrp)} <span>MSRP</span> ${what('msrp')}</p>
    <p class="lot-line">${esc(car.line)}</p>
    <p class="insure">Vinny’s insurance guess: ${money(car.insurance)}/mo. ${what('insurance')}</p>
    <button type="button" class="btn primary" data-action="pick" data-car="${car.id}">Build this one</button>
  </article>`;
}

function normalizePreview(build) {
  return {
    paint: build.paint,
    topDown: !!build.topDown,
    single: {
      wheels: 'stock',
      roof: 'none',
      tint: 'none',
      top: 'black',
      liner: 'none',
      cover: 'none',
      stance: 'stock',
      ...build.single,
    },
    multi: {
      sport: [],
      truckt: [],
      breezepack: [],
      ...build.multi,
    },
  };
}

function studioScreen() {
  const car = getCar();
  const build = ensureBuild(car);
  const priced = priceBuild(car, build);
  const paint = paintOf(car, build);
  const cfg = visualsFrom(car, build);
  return `<section class="studio">
    <div class="studio-fixed">
      <div class="studio-title">
        <button type="button" class="btn tiny" data-action="back-lot">Lot</button>
        <div>
          <p class="eyebrow">${esc(car.maker)}</p>
          <h1>${esc(car.name)}</h1>
        </div>
      </div>
      <div class="hero" id="hero">
        <div class="plinth"></div>
        <div class="spotlight"></div>
        <div class="hero-art" id="hero-art">${carSVG(car.id, VIEWS[state.view].id, cfg, 'hero0')}</div>
        <div class="hero-tools">
          <button type="button" class="btn tiny" data-action="spin">Spin</button>
          ${car.id === 'breeze' ? `<button type="button" class="btn tiny" data-action="top">${build.topDown ? 'Raise the top' : 'Drop the top'}</button>` : ''}
        </div>
        <p class="swipe-hint" id="swipe-hint" ${state.hintSeen ? 'hidden' : ''}>Swipe to turn it</p>
      </div>
      <div class="swatches" role="listbox" aria-label="Paint">
        ${car.colors.map((color) => `<button type="button" class="swatch ${build.paint === color.id ? 'is-on' : ''}" style="--c:${color.hex}" data-action="paint" data-paint="${color.id}" role="option" aria-label="${esc(color.name)}" aria-pressed="${build.paint === color.id}"></button>`).join('')}
      </div>
      <p class="paint-label" id="paint-label">${esc(paint.name)}${paint.price ? ` · +${money(paint.price)}` : ''}</p>
      <div class="view-dots">
        ${VIEWS.map((view, index) => `<button type="button" class="view-dot ${index === state.view ? 'is-on' : ''}" data-action="view" data-view="${index}" aria-label="${view.label}"></button>`).join('')}
      </div>
      <div class="cats">
        ${CATEGORIES.filter((cat) => groupsFor(car.id, cat.id).length).map((cat) => `<button type="button" class="cat ${state.category === cat.id ? 'is-on' : ''}" data-action="cat" data-cat="${cat.id}">${esc(cat.label)}</button>`).join('')}
      </div>
    </div>
    <div class="studio-scroll" id="studio-scroll">
      <section class="cart" id="build-cart">${cartInner(car, build)}</section>
      <div id="options">${optionsHTML(car, build)}</div>
      <div class="vinny studio-vinny">
        ${vinnyFace()}
        <div class="bubble">
          <span class="who">Vinny, in your ear</span>
          <p id="vinny-tip-text">${esc(studioTip(car, build))}</p>
        </div>
      </div>
    </div>
    <div class="dock">
      <div>
        <span class="k">Build price</span>
        <strong id="dock-price">${money(priced.total)}</strong>
        <small id="dock-sub">${dockSub(priced)}</small>
      </div>
      <button type="button" class="btn primary" data-action="to-desk">See Ricky</button>
    </div>
  </section>`;
}

function optionsHTML(car, build) {
  const groups = groupsFor(car.id, state.category);
  if (!groups.length) return `<p class="empty">Nothing in this rack for the ${esc(car.name)}.</p>`;
  return groups.map((group) => `
    <section class="group">
      <h3>${esc(group.label)}</h3>
      <p class="fine">${group.mode === 'multi' ? 'Add more than one. They stack, and every one lands in the price.' : 'Pick one. This part of the car only wears a single choice.'}</p>
      <div class="opts">
        ${group.options.map((option) => optionRow(group, option, build)).join('')}
      </div>
    </section>`).join('');
}

function dockSub(priced) {
  const cartCount = priced.lines.filter((line) => line.price > 0).length;
  const cart = cartCount ? ` · ${cartCount} in the cart` : '';
  return `${money(priced.msrp)} car · ${money(priced.options)} options · ${money(priced.warranty)} warranty${cart}`;
}

function cartInner(car, build) {
  const priced = priceBuild(car, build);
  const items = priced.lines.filter((line) => line.price > 0);
  const added = items.reduce((sum, line) => sum + line.price, 0);
  if (!items.length) {
    return `<p class="cart-empty">Nothing extra on the car yet. Some racks stack. A roof, a set of wheels, a warranty: one each.</p>`;
  }
  return `<header class="cart-top">
      <h3>On the car</h3>
      <strong id="cart-total">${money(added)}</strong>
    </header>
    <ul class="cart-list">
      ${items.map((line) => `<li>
        <span>${esc(line.name)}</span>
        <b>${money(line.price)}</b>
        <button type="button" class="trash" data-action="cart-remove" data-group="${esc(line.group)}" data-id="${esc(line.id)}" aria-label="Remove ${esc(line.name)} from cart" title="Remove from cart">${trashIcon()}</button>
      </li>`).join('')}
    </ul>
    <p class="fine">Options ${money(priced.options)} · warranty ${money(priced.warranty)}. Same numbers as the dock.</p>`;
}

function optionRow(group, option, build) {
  const on = group.mode === 'single'
    ? build.single[group.id] === option.id
    : (build.multi[group.id] || []).includes(option.id);
  const isDefault = group.mode === 'single' && option.id === group.options[0].id;
  const price = option.price === 0 ? 'Included' : `+${money(option.price)}`;
  let action = '';
  if (group.mode === 'multi') {
    action = on
      ? `${trashButton(group.id, option)}<span class="on-car">In the cart</span>`
      : `<button type="button" class="btn tiny cart" data-action="cart-add" data-group="${group.id}" data-id="${option.id}">Add to cart</button>`;
  } else if (on && isDefault) {
    action = '<span class="on-car">On the car</span>';
  } else if (on) {
    action = `${trashButton(group.id, option)}<span class="on-car">On the car</span>`;
  } else {
    action = `<button type="button" class="btn tiny" data-action="choose" data-group="${group.id}" data-id="${option.id}">Choose</button>`;
  }
  return `<article class="opt ${group.mode} ${on ? 'is-on' : ''}">
    <div class="opt-copy">
      <span class="opt-name">${esc(option.name)}</span>
      <span class="opt-blurb">${esc(option.blurb)}</span>
    </div>
    <span class="opt-price">${price}</span>
    <div class="opt-actions">${action}</div>
  </article>`;
}

function trashButton(groupId, option) {
  return `<button type="button" class="trash" data-action="cart-remove" data-group="${groupId}" data-id="${option.id}" aria-label="Remove ${esc(option.name)} from cart" title="Remove from cart">${trashIcon()}</button>`;
}

function trashIcon() {
  return `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M9 3h6l1 2h5v2H3V5h5l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"/><path fill="currentColor" d="M6 7h12l-1 13H7L6 7z" opacity=".35"/></svg>`;
}

function deskScreen() {
  const car = getCar();
  const build = ensureBuild(car);
  const deal = ensureDeal(car);
  const { quote: q, priced } = buildQuoteInput(car, build, deal);
  const floor = floorPrice(car);
  const open = openPrice(car);
  const earned = aprFloor(deal.effectiveScore);
  const aprMax = aprOpen(earned);
  const warranty = groupsFor(car.id).find((group) => group.id === 'warranty');
  const mood = salesmanMood(car, deal, build);
  const margin = Math.max(8, Math.round((1 - Math.min(1, mood.heat)) * 100));
  const whine = WHINE[mood.level] || '';
  return `<section class="desk">
    <div class="ricky" id="ricky" data-stress="${mood.level}">
      <div class="ricky-face">
        ${rickyFace()}
        <span class="sweat" aria-hidden="true"></span>
        <span class="sweat b" aria-hidden="true"></span>
      </div>
      <div>
        <span class="who">Ricky Falco · Falco Motors</span>
        <p id="ricky-line" aria-live="polite">${esc(rickyLine(car, deal, build))}</p>
        <p id="ricky-whine" class="whine" ${whine ? '' : 'hidden'}>${esc(whine)}</p>
        <p id="ricky-yelp" class="yelp" aria-hidden="true"></p>
      </div>
      <div class="margin-meter">
        <span>His margin</span>
        <div class="margin-track"><i id="margin-fill" style="width:${margin}%"></i></div>
      </div>
    </div>
    <div class="desk-scroll">
      <p class="desk-car">${esc(car.name)} · build ${money(priced.total)} before tax</p>
      <div id="pressure">${pressureBanner(q)}</div>
      <div id="budget-mount">${budgetHTML(q)}</div>
      <div id="tco-mount">${tcoHTML(car, q)}</div>

      ${lever({
        label: 'Car price',
        term: 'msrp',
        readoutId: 'price-readout',
        readout: money(deal.price),
        name: 'price',
        min: floor,
        max: open,
        step: 50,
        value: deal.price,
        left: `Strong ${money(floor)}`,
        right: `His open ${money(open)}`,
        nudge: 'Knock it down',
      })}
      ${lever({
        label: 'Trade for the jalopy',
        term: 'trade',
        readoutId: 'trade-readout',
        readout: money(deal.trade),
        name: 'trade',
        min: TRADE.min,
        max: TRADE.max,
        step: 100,
        value: deal.trade,
        left: `Lowball ${money(TRADE.min)}`,
        right: `Heroic ${money(TRADE.max)}`,
        nudge: 'Make him pay',
        note: `Fair lives around ${money(TRADE.baseline)}. He opened at ${money(TRADE.open)}.`,
      })}
      ${lever({
        label: 'APR',
        term: 'apr',
        readoutId: 'apr-readout',
        readout: `${deal.apr.toFixed(2)}%`,
        name: 'apr',
        min: earned,
        max: aprMax,
        step: 0.01,
        value: deal.apr,
        left: `You earned ${earned.toFixed(2)}%`,
        right: `His quote ${aprMax.toFixed(2)}%`,
        nudge: 'Take your rate',
        note: earned === aprMax ? 'You are already at the top of the 6–8% band. That is the score talking.' : 'The gap between these two numbers is the quiet tip.',
      })}

      <div class="lever">
        <div class="lever-top">
          <span>Term ${what('term')}</span>
        </div>
        <div class="seg">
          ${[60, 72, 84].map((months) => `<button type="button" class="${deal.term === months ? 'is-on' : ''}" data-action="term" data-term="${months}" aria-pressed="${deal.term === months}">${months / 12} yr<span>${months} mo</span></button>`).join('')}
        </div>
        <p class="fine">Shorter costs more each month and less interest in total. ${what('amortization')}</p>
      </div>

      <div class="lever">
        <div class="lever-top">
          <span>Warranty ${what('warranty')}</span>
        </div>
        <div class="seg wrap">
          ${warranty.options.map((option) => `<button type="button" class="${build.single.warranty === option.id ? 'is-on' : ''}" data-action="warranty" data-warranty="${option.id}" aria-pressed="${build.single.warranty === option.id}">${esc(option.name.replace(', ', ' · '))}<span>${option.price ? money(option.price) : 'Included'}</span></button>`).join('')}
        </div>
      </div>

      ${lever({
        label: 'Down from checking',
        term: 'down',
        readoutId: 'check-readout',
        readout: `${money(deal.downChecking)} down · ${money(PLAYER.checking - deal.downChecking)} left`,
        name: 'checking',
        min: 0,
        max: PLAYER.checking,
        step: 500,
        value: deal.downChecking,
        left: '$0',
        right: money(PLAYER.checking),
        nudge: '',
      })}
      ${lever({
        label: 'Down from savings',
        term: 'down',
        readoutId: 'save-readout',
        readout: savingsReadout(deal.downSavings),
        name: 'savings',
        min: 0,
        max: PLAYER.savings,
        step: 500,
        value: deal.downSavings,
        left: 'None yet',
        right: money(PLAYER.savings),
        nudge: '',
        warn: savingsThin(deal.downSavings),
        note: `Leave about ${money(SAVINGS_RESERVE)}, two months of bills. The rest can go on the hood.`,
      })}

      <div id="sheet-mount">${worksheetHTML(car, deal, priced, q)}</div>
      <div class="vinny">
        ${vinnyFace()}
        <div class="bubble">
          <span class="who">Vinny “Numbers” Caputo</span>
          <p id="vinny-desk-text">${esc(state.advice || deskTip(car, deal, q))}</p>
        </div>
      </div>
      <button type="button" class="btn ghost wide" data-action="ask">Ask Vinny what he’d do</button>
      <button type="button" class="btn text" data-action="back-studio">Back to the studio</button>
    </div>
    <div class="dock">
      <div>
        <span class="k">Monthly ${what('payment')}</span>
        <strong id="dock-pay" class="zone-${q.weeklyLeft < 0 ? 'bad' : paymentZone(q.paymentShare)}">${money(q.payment, true)}</strong>
        <small id="dock-sub">${deal.term} mo · ${deal.apr.toFixed(2)}% · ${money(q.weeklyLeft)} left this week</small>
      </div>
      <button type="button" class="btn primary" data-action="shake">Shake on it</button>
    </div>
  </section>`;
}

function lever(spec) {
  return `<div class="lever ${spec.warn ? 'warn' : ''}">
    <div class="lever-top">
      <span>${spec.label} ${what(spec.term)}</span>
      <strong id="${spec.readoutId}">${spec.readout}</strong>
    </div>
    <input type="range" data-lever="${spec.name}" min="${spec.min}" max="${spec.max}" step="${spec.step}" value="${spec.value}" aria-label="${esc(spec.label)}">
    <div class="lever-scale"><span>${spec.left}</span><span>${spec.right}</span></div>
    ${spec.note ? `<p class="fine">${spec.note}</p>` : ''}
    ${spec.nudge ? `<button type="button" class="btn tiny" data-action="nudge" data-nudge="${spec.name}">${spec.nudge}</button>` : ''}
  </div>`;
}

function pressureBanner(q) {
  if (q.weeklyLeft < 0) return `<p class="banner bad">This wrecks the week. Vinny will not clap.</p>`;
  if (q.paymentShare > 0.15) return `<p class="banner warn">Over the 15% line. Pretty payment, heavy life.</p>`;
  return `<p class="banner ok">Under the line. The week still has air in it.</p>`;
}

function budgetHTML(q) {
  const zone = q.weeklyLeft < 0 ? 'bad' : paymentZone(q.paymentShare);
  const cap = 0.4;
  const width = Math.max(0, Math.min(100, (q.paymentShare / cap) * 100));
  const mark = (0.15 / cap) * 100;
  return `<div class="budget">
    <div class="budget-top">
      <span>Payment vs take-home</span>
      <strong class="zone-${zone}">${pct(q.paymentShare)} of ${money(q.monthlyTake)}/mo</strong>
    </div>
    <div class="meter" data-zone="${zone}" style="--p:${width.toFixed(1)}%; --mark:${mark}%"><span></span></div>
    <p class="fine">White mark is 15% of take-home. Stay left of it. Insurance is not inside that mark — it is in the week, below.</p>
    <ul class="week">
      <li><span>This week’s pay</span><b>${money(PLAYER.weeklyTakeHome)}</b></li>
      <li><span>Bills, already locked</span><b>−${money(q.weeklyBills)}</b></li>
      <li><span>Insurance, estimated</span><b>−${money(q.weeklyIns)}</b></li>
      <li><span>This car, per week</span><b>−${money(q.weeklyPay)}</b></li>
      <li class="left zone-${q.weeklyLeft < 80 ? 'bad' : q.weeklyLeft < 160 ? 'warn' : 'ok'}"><span>Left for everything else</span><b>${money(q.weeklyLeft)}</b></li>
    </ul>
  </div>`;
}

function worksheetHTML(car, deal, priced, q) {
  const pricedLines = priced.lines.filter((line) => line.price > 0);
  const rows = [
    ['MSRP', money(car.msrp), 'msrp'],
    ['Your price', money(deal.price), 'msrp'],
    ['Options', money(priced.options), null],
    ['Warranty', money(priced.warranty), 'warranty'],
    ['Doc fee', money(q.doc), 'docfee'],
    ['Title & plates', money(q.title), null],
    ['Sales tax', moneyExact(q.tax), 'tax'],
    ['Trade equity', `−${money(q.trade)}`, 'trade'],
    ['Out the door', moneyExact(q.otd), 'otd'],
    ['Down payment', `−${money(q.down)}`, 'down'],
    ['Amount financed', moneyExact(q.financed), 'financed', true],
    ['Interest, whole term', moneyExact(q.interest), 'interest'],
  ];
  return `<section class="sheet-card">
    <header>
      <h3>The real sheet</h3>
      ${what('otd')}
    </header>
    <p class="fine">Tax here is ${pct(0.06625, 3)} of the price plus warranty, after the trade comes off. ${what('negative')}</p>
    <ul class="rows">
      ${rows.map(([label, value, term, strong]) => `<li class="${strong ? 'strong' : ''}"><span>${esc(label)}${term ? ` ${what(term, true)}` : ''}</span><b>${value}</b></li>`).join('')}
    </ul>
    ${pricedLines.length ? `<details>
      <summary>${pricedLines.length} priced ${pricedLines.length === 1 ? 'choice' : 'choices'}</summary>
      <ul class="rows slim">
        ${pricedLines.map((line) => `<li><span>${esc(line.name)}</span><b>${money(line.price)}</b></li>`).join('')}
      </ul>
    </details>` : '<p class="fine">No priced options. Bone stock is a position.</p>'}
    <p class="fine">Insurance estimate ${money(insuranceFor(car, ensureBuild(car)))}/mo is in the week, not in the loan. ${what('principal')}</p>
  </section>`;
}

function gradeScreen() {
  const grade = state.grade;
  const car = getCar();
  if (!grade) {
    return `<section class="grade"><p>No deal on the table.</p><button type="button" class="btn primary" data-action="another">Back to the lot</button></section>`;
  }
  const q = grade.quote;
  const weak = grade.score < 80;
  const tone = grade.letter.startsWith('A') || grade.letter === 'B' ? 'good' : grade.letter === 'C' ? 'mid' : 'bad';
  const moodClass = grade.letter === 'A+' ? 'win-max'
    : grade.letter === 'A' ? 'win-high'
      : grade.letter === 'B' ? 'win-mid'
        : grade.letter === 'C' ? 'win-low'
          : grade.letter === 'D' ? 'fail-low' : 'fail-max';
  const bits = grade.letter === 'A+' ? 26 : grade.letter === 'A' ? 18 : grade.letter === 'B' ? 12 : grade.letter === 'C' ? 5 : 0;
  const confetti = bits
    ? `<div class="confetti" aria-hidden="true">${Array.from({ length: bits }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>`
    : '';
  const stamp = grade.letter === 'A+' || grade.letter === 'A'
    ? '<p class="cameo-note">Skree &amp; Dumpling heard.</p>'
    : grade.letter === 'B'
      ? '<p class="grade-note">A modest cheer.</p>'
      : grade.letter === 'C'
        ? '<p class="grade-note">A small clap.</p>'
        : grade.letter === 'F'
          ? '<p class="wah-label">Wah-wah-wah.</p>'
          : grade.letter === 'D'
            ? '<p class="wah-label">Wah-wah.</p>'
            : '';
  return `<section class="grade ${moodClass}">
    ${confetti}
    <p class="eyebrow">${esc(car.name)} · Falco Motors</p>
    <div class="letter tone-${tone}">${esc(grade.letter)}</div>
    <h1>${esc(grade.title)}</h1>
    ${stamp}
    ${grade.letter === 'A+' || grade.letter === 'A' ? `<div class="grade-duo">${celebrationCard()}</div>` : ''}
    <p class="score-num">${grade.score} out of 100</p>
    ${bubble(grade.narrative)}
    <ul class="recap recap-lead">
      <li><span>Out the door</span><b>${moneyExact(q.otd)}</b></li>
    </ul>
    ${tcoHTML(car, q)}
    <ul class="recap">
      <li><span>Payment</span><b>${money(q.payment, true)}/mo</b></li>
      <li><span>Financed</span><b>${moneyExact(q.financed)}</b></li>
      <li><span>Interest</span><b>${moneyExact(q.interest)}</b></li>
      <li><span>Term</span><b>${q.term} mo @ ${q.apr.toFixed(2)}%</b></li>
      <li><span>Left this week</span><b class="zone-${q.weeklyLeft < 80 ? 'bad' : 'ok'}">${money(q.weeklyLeft)}</b></li>
    </ul>
    <ul class="notes">
      ${grade.notes.map((note) => `<li class="${note.tone}">${esc(note.text)}</li>`).join('')}
    </ul>
    <div class="stack">
      <button type="button" class="btn ${weak ? 'primary' : 'ghost'}" data-action="tweak">Tweak this deal</button>
      <button type="button" class="btn ${weak ? 'ghost' : 'primary'}" data-action="another">Shop another car</button>
      <p class="fine">This session is done.</p>
      <button type="button" class="btn ghost" data-action="restart">Start again</button>
    </div>
  </section>`;
}

export function adviceText() {
  return askVinny(getCar());
}
