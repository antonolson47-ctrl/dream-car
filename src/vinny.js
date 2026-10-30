import {
  insuranceFor,
  paintOf,
  priceBuild,
} from './data.js';
import { aprFloor, floorPrice, openPrice, paymentZone, quote } from './finance.js';
import { money, pct } from './format.js';

export function scoreBand(score) {
  if (score >= 800) return { id: 'excellent', label: 'Excellent', line: 'Cheap money. Do not waste it on a stupid car.' };
  if (score >= 740) return { id: 'verygood', label: 'Very good', line: 'The bank will talk nice. Not charity-nice. Nice.' };
  if (score >= 700) return { id: 'good', label: 'Good', line: 'Respectable. Ricky will still try to fatten the rate. Do not let him.' };
  return { id: 'fair', label: 'Fair', line: 'The rate is going to sting. This is the moment you think about your mother. Carefully.' };
}

export function creditIntro() {
  return 'I am Vinny Caputo. They call me Numbers. Ricky is going to smile. I am here so you do not smile back too fast. First we see what the bank thinks you are worth.';
}

export function creditResult(score) {
  const band = scoreBand(score);
  if (score >= 800) {
    return `${score}. ${band.line} An 800 is rare. Do not celebrate by buying the ceiling of the menu.`;
  }
  if (score < 700) {
    return `${score}. ${band.line} Most people land in the 700s. You caught a thin one. We can still shop. We just will not pretend the money is free.`;
  }
  return `${score}. ${band.line}`;
}

export function cosignLine(boost, effective, original) {
  if (original >= 760) {
    return `Ma co-signed anyway. +${boost}, so the bank sees ${effective}. You did not need her. Now you owe her more than money. Do not miss a payment. Ever.`;
  }
  return `You called Ma. She sighed the sigh. She said yes. +${boost} on the score the bank will use, which puts you at ${effective}. That is a gift. Treat it like one.`;
}

export function studioTip(car, build) {
  const priced = priceBuild(car, build);
  const lines = priced.lines.filter((line) => line.price > 0 && line.group !== 'warranty');
  const jokes = lines.filter((line) => line.tag === 'joke');
  const smart = lines.filter((line) => line.tag === 'smart');
  const fluffSpend = lines.filter((line) => line.tag === 'fluff' || line.tag === 'joke').reduce((sum, line) => sum + line.price, 0);
  const warranty = priced.lines.find((line) => line.group === 'warranty');
  const paint = paintOf(car, build);

  if (jokes.length) {
    const joke = jokes[jokes.length - 1];
    return joke.tip || `${joke.name} is a bit. The payment will not get the joke.`;
  }
  if (paint.joke) {
    return 'Gold flake. Seventy-five hundred so the car can glitter. Your nonna would take the spatula away from you.';
  }
  if (warranty?.id === 'platinum' && car.msrp < 45000) {
    return 'Five grand of platinum on a car this price is how Ricky pays for his weekend. Two grand covers the organs. Start there.';
  }
  if (warranty?.id === 'platinum' && car.msrp >= 70000) {
    return 'Platinum on a Stallion I will at least hear out. Just do not stack it on top of a wing, a turbo, and a concert.';
  }
  if (fluffSpend > car.msrp * 0.12) {
    return `You have ${money(fluffSpend)} in extras that mostly wave at people. The car was already a car. The payment is where it gets heavy.`;
  }
  if (priced.options === 0 && (warranty?.id === 'none' || !warranty)) {
    return 'Bone stock is a negotiating position. I respect it. Add one thing you will touch every week, then stop.';
  }
  if (smart.length >= 2 && fluffSpend < 800) {
    return 'Look at you. Mats, a camera, stuff you will actually use. This is how a grown-up builds a car.';
  }
  if (car.id === 'breeze' && build.topDown) {
    return 'Top down is free. Say it again when they try to charge you for joy. The canvas color is the only part with a price.';
  }
  if (car.id === 'stallion' && priced.options < 2500) {
    return 'I love a Stallion. Your paycheck is less romantic. Build it, sit at the desk, and be ready to walk. A sharp deal on the wrong car is still the wrong car.';
  }
  if (car.id === 'harbor' && fluffSpend > 2500) {
    return 'You took the sensible car and dressed it like the silly one. Pick a lane. The Harbor wins when the build stays quiet.';
  }
  if (car.id === 'ironhorn' && (build.single.stance === 'lift' || build.single.wheels === 'mud')) {
    return 'The truck was already a truck. The lift and the carnival tires are how a work vehicle becomes a hobby you finance.';
  }
  if (warranty?.id === 'basic') {
    return 'Powertrain warranty, two thousand. Covers the expensive stuff. You are not buying the dealership a boat. I like this.';
  }
  return 'Every option has a price because every option lands in the payment. If you will not notice it on a Tuesday, leave it in the rack.';
}

export function rickyLine(car, deal) {
  const open = openPrice(car);
  const floor = floorPrice(car);
  const priceSpan = Math.max(1, open - floor);
  const pricePush = (open - deal.price) / priceSpan;
  const tradePush = (deal.trade - 3600) / (5600 - 3600);

  if (pricePush > 0.85 && tradePush > 0.7) {
    return 'Alright. Alright. You win on the car. I still have a family. Probably.';
  }
  if (pricePush > 0.55) {
    return 'You are killing me. Let me pretend to call my manager.';
  }
  if (tradePush > 0.65) {
    return 'I have to wholesale that jalopy. My guy is going to laugh at me.';
  }
  if (deal.apr <= aprFloor(deal.effectiveScore) + 0.05) {
    return 'Rates come from the bank, not from me. Today the bank is feeling generous. Apparently.';
  }
  if (pricePush < 0.15 && tradePush < 0.25) {
    return 'This one has been waiting for someone with taste. I can probably come down a little. Probably.';
  }
  return 'I can move a little. Do not make me get emotional. I just had lunch.';
}

export function deskTip(car, deal, q) {
  const floor = floorPrice(car);
  const open = openPrice(car);
  const earned = aprFloor(deal.effectiveScore);
  const zone = paymentZone(q.paymentShare);

  if ((deal.downChecking + deal.downSavings) > q.otd + 1 && q.financed === 0) {
    return 'You brought more cash than the car costs. Put the extra back. A cash deal can still be a bad price.';
  }
  if (q.weeklyLeft < 0) {
    return 'This payment eats the week alive. You would be choosing between the car and groceries. That is not a deal. That is a trap with a steering wheel.';
  }
  if (zone === 'bad') {
    return `The payment is ${pct(q.paymentShare)} of take-home. I start sweating at fifteen. We are past sweating. Stretch the term and it only hides the problem.`;
  }
  if (zone === 'warn') {
    return `You are over that 15% line, at ${pct(q.paymentShare)} of take-home. It works until the first surprise bill. Then it does not. Knock the price or the fluff.`;
  }
  if (deal.downSavings > 0) {
    return 'That savings account is the emergency fund. A car is not an emergency. It is a want with cupholders. Put Ma’s rainy day back.';
  }
  if (deal.downChecking > 7000) {
    return 'You are about to hand Ricky the checking account. Rent does not care how the car smells. Leave yourself a month of life.';
  }
  if (deal.price <= floor + 50 && deal.trade >= 5000 && deal.apr <= earned + 0.05 && zone === 'ok') {
    return 'Now we are talking. Price is at the bone, the jalopy got respect, and the rate matches your score. Shake before he changes his mind.';
  }
  if (deal.price >= open - 50) {
    return 'You are still sitting on his opening number. That number has a markup in it. Slide it toward you. He expects you to.';
  }
  if (deal.trade <= 3800) {
    return 'He lowballed the Cumberland. It is ugly. It is not worthless. Four thousand five hundred is fair. Make him climb.';
  }
  if (deal.apr > earned + 0.25) {
    return `The rate is ${deal.apr.toFixed(2)}%. Your score earned about ${earned.toFixed(2)}%. The gap is Ricky’s quiet little tip. Take it back.`;
  }
  if (deal.term === 84 && q.paymentShare < 0.1) {
    return 'You can afford a shorter term and you are still stretching to eighty-four. That is extra interest for a payment you do not need. Look at sixty.';
  }
  if (deal.term === 84) {
    return 'Eighty-four months is seven years with this car. The payment looks kind. The interest is the unkind part. Only stay here if sixty genuinely breaks the week.';
  }
  if (q.weeklyLeft < 140) {
    return `You can swing it. You just cannot sneeze. About ${money(q.weeklyLeft)} left in the week after bills, insurance, and the car. Tight.`;
  }
  return `The week still has air in it, about ${money(q.weeklyLeft)} after the life you already live. That is how you stay a person, not a payment.`;
}

export function buildQuoteInput(car, build, deal) {
  const priced = priceBuild(car, build);
  return {
    priced,
    quote: quote({
      price: deal.price,
      options: priced.options,
      warranty: priced.warranty,
      trade: deal.trade,
      down: deal.downChecking + deal.downSavings,
      apr: deal.apr,
      term: deal.term,
      insurance: insuranceFor(car, build),
    }),
  };
}

const LETTERS = [
  { min: 93, letter: 'A+', title: 'He never saw you coming' },
  { min: 86, letter: 'A', title: 'That is a grown-up deal' },
  { min: 78, letter: 'B', title: 'You held your own' },
  { min: 70, letter: 'C', title: 'You left money on the desk' },
  { min: 60, letter: 'D', title: 'Ricky is buying dinner tonight' },
  { min: 0, letter: 'F', title: 'They ate you alive' },
];

function scale(value, from, to, start, end) {
  if (to === from) return end;
  const t = Math.min(1, Math.max(0, (value - from) / (to - from)));
  return start + (end - start) * t;
}

export function gradeDeal(car, build, deal) {
  const { priced, quote: q } = buildQuoteInput(car, build, deal);
  const earned = aprFloor(deal.effectiveScore);
  const floor = floorPrice(car);
  const open = openPrice(car);
  const notes = [];
  let score = 0;

  const pricePts = scale(deal.price, open, floor, 0, 22);
  score += pricePts;
  if (deal.price >= car.msrp * 1.02) {
    notes.push({ tone: 'bad', text: `You paid ${money(deal.price)} on a ${money(car.msrp)} car. That is a markup, and you thanked him for it.` });
  } else if (deal.price <= floor + 80) {
    notes.push({ tone: 'good', text: `You walked the ${car.name} down to ${money(deal.price)}. That is the bone. Ricky felt that.` });
  } else if (deal.price < car.msrp) {
    notes.push({ tone: 'mid', text: `Under sticker, at ${money(deal.price)}. Respectable. There was still a little meat on it.` });
  } else {
    notes.push({ tone: 'bad', text: `You paid sticker, ${money(deal.price)}. On this lot, sticker is where the conversation starts, not where it ends.` });
  }

  const tradePts = scale(deal.trade, 3400, 5300, 1, 14);
  score += Math.max(0, Math.min(14, tradePts));
  if (deal.trade < 4000) {
    notes.push({ tone: 'bad', text: `The trade came in at ${money(deal.trade)}. The jalopy is ugly. It is still a ${money(4500)} car. You let him steal it.` });
  } else if (deal.trade >= 5000) {
    notes.push({ tone: 'good', text: `He paid ${money(deal.trade)} for a car he does not want to look at. That is found money off the loan.` });
  } else {
    notes.push({ tone: 'mid', text: `Trade at ${money(deal.trade)}. Fair lives around $4,500. You are in the neighborhood.` });
  }

  const gap = deal.apr - earned;
  const aprPts = gap <= 0.05 ? 16 : gap <= 0.2 ? 12 : gap <= 0.4 ? 7 : 2;
  score += aprPts;
  if (gap <= 0.05) {
    notes.push({ tone: 'good', text: `The rate is ${deal.apr.toFixed(2)}%. That matches a ${deal.effectiveScore} score. This is the whole ballgame.` });
  } else {
    notes.push({ tone: 'bad', text: `You are paying ${gap.toFixed(2)} points more than your score earned. On this loan that tip goes to the bank, quietly, for years.` });
  }

  let termPts = deal.term === 60 ? 10 : deal.term === 72 ? 6 : 2;
  if (deal.term === 84 && q.paymentShare > 0.12 && quote({ ...q, term: 60, price: deal.price, options: priced.options, warranty: priced.warranty, trade: deal.trade, down: q.down, apr: deal.apr, insurance: q.insurance }).paymentShare > 0.18) {
    termPts = 5;
  }
  score += termPts;
  if (deal.term === 84) {
    notes.push({ tone: 'bad', text: `Eighty-four months. You will pay ${money(q.interest)} in interest. A shorter term costs more a month and a lot less of your life.` });
  } else if (deal.term === 60) {
    notes.push({ tone: 'good', text: 'Five years, not seven. You refused the long, pretty payment. I respect that.' });
  } else {
    notes.push({ tone: 'mid', text: 'Six years is the middle chair. Not a crime. Not a victory.' });
  }

  const wId = priced.warrantyId;
  let warrantyPts = 4;
  if (wId === 'basic') warrantyPts = car.msrp >= 60000 ? 7 : 8;
  else if (wId === 'bumper') warrantyPts = 6;
  else if (wId === 'platinum') warrantyPts = car.msrp >= 60000 ? 5 : 2;
  else if (wId === 'none') warrantyPts = car.msrp >= 60000 ? 3 : 5;
  score += warrantyPts;
  if (wId === 'platinum' && car.msrp < 50000) {
    notes.push({ tone: 'bad', text: 'Platinum warranty, five thousand, on a car that did not need a concierge. Read the exclusions before you frame the brochure.' });
  } else if (wId === 'basic') {
    notes.push({ tone: 'good', text: 'Powertrain coverage for two thousand. The expensive organs, not the spa package.' });
  } else if (wId === 'none') {
    notes.push({ tone: 'mid', text: 'No extra warranty. Brave if you have cash for a surprise. Reckless if you do not.' });
  }

  let budgetPts = 22;
  if (q.paymentShare <= 0.1) budgetPts = 22;
  else if (q.paymentShare <= 0.15) budgetPts = 16;
  else if (q.paymentShare <= 0.2) budgetPts = 7;
  else budgetPts = 0;
  score += budgetPts;

  let hardCap = 100;
  if (q.weeklyLeft < 0) {
    notes.push({ tone: 'bad', text: `After bills, insurance, and this payment, the week is ${money(q.weeklyLeft)}. Negative. You cannot live in a negative week.` });
    hardCap = 36;
  } else if (q.paymentShare > 0.15) {
    notes.push({ tone: 'bad', text: `The payment is ${pct(q.paymentShare)} of take-home, past the 15% line, at ${money(q.payment, true)} a month.` });
  } else if (q.weeklyLeft < 120) {
    notes.push({ tone: 'mid', text: `About ${money(q.weeklyLeft)} left in the week. You can swing it. You cannot sneeze.` });
    hardCap = Math.min(hardCap, 74);
  } else {
    notes.push({ tone: 'good', text: `The week still breathes. About ${money(q.weeklyLeft)} left after housing, food, the phone, insurance, and the car.` });
  }

  if (deal.downChecking >= 7000) {
    notes.push({ tone: 'bad', text: 'You drained checking to look like a hero at the desk. The car is pretty. The rent is prettier, because it always shows up.' });
    score -= 8;
  }
  if (deal.downSavings > 0) {
    notes.push({ tone: 'bad', text: `You pulled ${money(deal.downSavings)} out of savings. That pile was the emergency. A stallion is not an emergency.` });
    score -= 10;
  }

  const jokeSpend = priced.lines.filter((line) => line.tag === 'joke').reduce((sum, line) => sum + line.price, 0);
  const optionRatio = priced.options / car.msrp;
  if (jokeSpend > 0) {
    notes.push({ tone: 'bad', text: `${money(jokeSpend)} of this build is a bit with a price tag. The bank does not have a sense of humor.` });
    score -= Math.min(10, 4 + jokeSpend / 4000);
  } else if (optionRatio > 0.15) {
    notes.push({ tone: 'mid', text: `Options added ${money(priced.options)}, more than 15% of the car. Some of that you will touch. Some of it you will only see on the statement.` });
    score -= 5;
  } else if (priced.options > 0 && priced.options < 1800) {
    notes.push({ tone: 'good', text: `The build stayed modest, ${money(priced.options)} in options. You bought a car, not a catalog.` });
    score += 3;
  }

  if (q.interest > 8000) {
    notes.push({ tone: 'mid', text: `Interest alone is ${money(q.interest)}. That is another used car sitting on the curb, except you do not get to drive it.` });
  }

  const sharp = deal.price <= floor + 250
    && deal.trade >= 4700
    && gap <= 0.11
    && jokeSpend === 0
    && deal.downSavings === 0
    && deal.downChecking <= 4000;
  const unaffordable = q.paymentShare > 0.15 || q.weeklyLeft < 120;
  if (sharp && unaffordable) {
    notes.unshift({
      tone: 'good',
      text: `You worked the desk. Price, trade, and rate are clean. A ${car.name} still does not fit a $1,010 week. The smart move is a different car, not a longer marriage to the bank.`,
    });
    score = Math.max(score, 76);
    hardCap = Math.max(hardCap, 84);
  }

  score = Math.max(0, Math.min(hardCap, Math.round(score)));
  const band = LETTERS.find((item) => score >= item.min) || LETTERS[LETTERS.length - 1];
  const goods = notes.filter((note) => note.tone === 'good');
  const bads = notes.filter((note) => note.tone === 'bad');
  const narrative = narrativeFor(band.letter, goods, bads, car, q);

  return {
    score,
    letter: band.letter,
    title: band.title,
    notes,
    narrative,
    quote: q,
    priced,
    earnedApr: earned,
  };
}

function narrativeFor(letter, goods, bads, car, q) {
  const good = goods[0]?.text;
  const bad = bads[0]?.text;
  const closes = {
    'A+': 'I am proud of you. You walked in with a beater and you did not leave married to a bad note. Ricky is going to tell his wife the wifi was down. That is how you know.',
    A: 'That is a deal you can say out loud at Sunday dinner. Not perfect. Honest. Take the keys and do not add a single thing in the finance office.',
    B: 'You held your own. He did not rob you, and you did not rob him, which is fine, because robbing him was never the job. Living with the payment is the job.',
    C: 'You survived. Survival is not the same as a good deal. There is money still sitting on his side of the desk, and it answers to your name.',
    D: 'Ricky eats tonight. You will be eating around this payment for years. We can run it again. I am not mad. I am annoyed. There is a difference.',
    F: 'They saw you coming from the parking lot. The week cannot carry this car. I do not care how it looks under the lights. We are not signing this. We are learning it, and then we are doing it over.',
  };
  if (letter === 'A+' || letter === 'A') {
    return `${good || `The ${car.name} fits the week.`} ${bad || 'I do not have a real complaint. Do not make me find one.'} ${closes[letter]}`;
  }
  if (letter === 'F' || letter === 'D') {
    return `${bad || `The payment is ${money(q.payment, true)}, and the week felt that.`} ${good || 'You showed up. That is step one, not the whole walk.'} ${closes[letter]}`;
  }
  return `${good || 'There is something in here I can defend.'} ${bad || 'And there is something I would still push.'} ${closes[letter]}`;
}

export function askVinny(car) {
  const floor = floorPrice(car);
  return `Here is the whole sermon, short. Knock the ${car.name} toward ${money(floor)}, not his opening number. Get the jalopy to at least $4,500. Take the rate your score earned, not the one with his fingerprint on it. Keep the payment under 15% of take-home, and leave the savings alone. Warranty: two thousand if you want to sleep. Not five. Then shake his hand like you mean to leave.`;
}
