export const PLAYER = {
  checking: 8000,
  savings: 15000,
  salary: 70000,
  weeklyTakeHome: 1010,
};

export const BILLS = [
  { id: 'housing', label: 'Housing', amount: 1450 },
  { id: 'food', label: 'Food', amount: 380 },
  { id: 'phone', label: 'Phone', amount: 85 },
  { id: 'utilities', label: 'Utilities', amount: 160 },
  { id: 'misc', label: 'Misc', amount: 120 },
];

export const BILLS_MONTHLY = BILLS.reduce((sum, bill) => sum + bill.amount, 0);

/** Cash that stays put: about two months of the locked bills. */
export const SAVINGS_RESERVE = BILLS_MONTHLY * 2;

export const FEES = {
  doc: 599,
  title: 385,
  taxRate: 0.06625,
};

export const TRADE = {
  baseline: 4500,
  open: 3600,
  min: 3200,
  max: 5600,
  step: 100,
};

export const JALOPY = {
  name: 'Cumberland Shadow',
  year: 1998,
  trade: 4500,
  line: 'The paint is a suggestion. The heater is a rumor. It runs.',
};

export const CARS = [
  {
    id: 'stallion',
    name: 'Stallion GT',
    maker: 'Vittorio',
    vibe: 'Sports coupe',
    line: 'A low red problem. Fast, loud, and allergic to budgets.',
    msrp: 72000,
    markup: 0.05,
    room: 0.04,
    insurance: 310,
    running: 340,
    hot: true,
    colors: [
      { id: 'rosso', name: 'Rosso Notte', hex: '#8f1d2c', price: 0 },
      { id: 'nero', name: 'Nero Assoluto', hex: '#141414', price: 0 },
      { id: 'bianco', name: 'Bianco Perla', hex: '#f3f0e8', price: 595, pearl: true },
      { id: 'argento', name: 'Argento', hex: '#c5c8ce', price: 0 },
      { id: 'verde', name: 'Verde Bosco', hex: '#1c3d2e', price: 0 },
      { id: 'blu', name: 'Blu Notte', hex: '#152743', price: 0 },
      { id: 'giallo', name: 'Giallo Modena', hex: '#e2b31f', price: 0 },
      { id: 'arancio', name: 'Arancio', hex: '#e06a1f', price: 395 },
      { id: 'matte', name: 'Matte Grafite', hex: '#3c3f44', price: 2400, matte: true },
      { id: 'flake', name: 'Nonna Gold Flake', hex: '#e0b03a', price: 7500, joke: true, pearl: true },
    ],
  },
  {
    id: 'harbor',
    name: 'Harbor Hybrid',
    maker: 'Northline',
    vibe: 'Daily hybrid',
    line: 'Gets you there and home without introducing itself to the whole block.',
    msrp: 29000,
    markup: 0.02,
    room: 0.1,
    insurance: 128,
    running: 115,
    colors: [
      { id: 'glacier', name: 'Glacier White', hex: '#f4f7f8', price: 0 },
      { id: 'silver', name: 'Silver Mist', hex: '#cfd3d6', price: 0 },
      { id: 'harbor', name: 'Harbor Blue', hex: '#3e6f8c', price: 0 },
      { id: 'graphite', name: 'Graphite', hex: '#3a3d40', price: 0 },
      { id: 'signal', name: 'Signal Red', hex: '#b4232c', price: 0 },
      { id: 'sage', name: 'Sage', hex: '#6d7f62', price: 0 },
      { id: 'midnight', name: 'Midnight', hex: '#16181c', price: 0 },
      { id: 'sand', name: 'Sand', hex: '#cbb99a', price: 0 },
      { id: 'teal', name: 'Deep Teal', hex: '#1f4f4a', price: 395 },
      { id: 'fog', name: 'Pearl Fog', hex: '#e7e4dc', price: 595, pearl: true },
    ],
  },
  {
    id: 'ironhorn',
    name: 'Ironhorn 1500',
    maker: 'Cinder',
    vibe: 'Full-size truck',
    line: 'A truck with opinions. The wheels can cost as much as a vacation.',
    msrp: 52000,
    markup: 0.035,
    room: 0.07,
    insurance: 195,
    running: 275,
    colors: [
      { id: 'summit', name: 'Summit White', hex: '#f2f3f4', price: 0 },
      { id: 'black', name: 'Black', hex: '#1a1a1a', price: 0 },
      { id: 'silver', name: 'Billet Silver', hex: '#b7bcc2', price: 0 },
      { id: 'redrock', name: 'Red Rock', hex: '#8e2a24', price: 0 },
      { id: 'patriot', name: 'Work Blue', hex: '#243e66', price: 0 },
      { id: 'olive', name: 'Olive Duty', hex: '#4d5538', price: 0 },
      { id: 'bronze', name: 'Bronze', hex: '#7a5a3a', price: 450 },
      { id: 'concrete', name: 'Concrete', hex: '#8d9094', price: 0 },
      { id: 'orange', name: 'Safety Orange', hex: '#e4571b', price: 650 },
      { id: 'tactical', name: 'Matte Tactical', hex: '#2e3230', price: 2200, matte: true },
    ],
  },
  {
    id: 'breeze',
    name: 'Breeze Convertible',
    maker: 'Marlow',
    vibe: 'Drop-top',
    line: 'Sun on your arms, math in the glovebox. The top is free. The payment is not.',
    msrp: 38000,
    markup: 0.025,
    room: 0.09,
    insurance: 172,
    running: 175,
    colors: [
      { id: 'cloud', name: 'Cloud White', hex: '#f7f4ef', price: 0 },
      { id: 'black', name: 'Black', hex: '#1c1c1c', price: 0 },
      { id: 'aqua', name: 'Aqua', hex: '#3aa8b5', price: 0 },
      { id: 'coral', name: 'Coral', hex: '#e07a62', price: 0 },
      { id: 'lemon', name: 'Lemon', hex: '#e6c84a', price: 0 },
      { id: 'navy', name: 'Navy', hex: '#1c2a4a', price: 0 },
      { id: 'silver', name: 'Silver', hex: '#d5d8dc', price: 0 },
      { id: 'burgundy', name: 'Burgundy', hex: '#6e2434', price: 0 },
      { id: 'mint', name: 'Mint', hex: '#b7d9c6', price: 350 },
      { id: 'skypearl', name: 'Sky Pearl', hex: '#d5e4f2', price: 595, pearl: true },
    ],
  },
];

const ALL = 'all';

function opt(partial) {
  return { cars: ALL, tag: 'fluff', tip: '', ...partial };
}

export const GROUPS = [
  {
    id: 'sound',
    category: 'sound',
    label: 'Sound',
    mode: 'single',
    cars: ALL,
    options: [
      opt({ id: 'base', name: 'Lot radio', price: 0, tag: 'included', blurb: 'Four speakers and the road. Already in the car.', tip: 'Leave it. You can hear the engine. That was the idea.' }),
      opt({ id: 'premium', name: 'Premium 8-speaker', price: 890, tag: 'smart', blurb: 'A real amp and clearer highs. You will actually notice this one.', tip: 'Eight hundred and ninety. If you listen to music every day, this is the one I allow.' }),
      opt({ id: 'bass', name: 'Booming bass package', price: 1450, tag: 'fluff', blurb: 'A sealed sub behind the seat. The block will know your chorus.', tip: 'Bass is fun for a week. Then it is a rattle you financed.' }),
      opt({ id: 'thumper', name: 'Trunk-thumper 12"', price: 2200, tag: 'fluff', blurb: 'One big sub, zero trunk. Groceries ride in the back seat.', tip: 'Twenty-two hundred so the trunk can thump. Where do the groceries go, genius?' }),
      opt({ id: 'hall', name: 'Concert hall', price: 3800, tag: 'fluff', blurb: 'Fourteen speakers and a tuning session. Priced like a used motorcycle.', tip: 'Concert hall money on a daily driver. The orchestra is not coming. You are going to work.' }),
      opt({ id: 'scala', name: 'La Scala in the trunk', price: 9500, tag: 'joke', blurb: 'Opera horns, a velvet grille, and a tenor who does not exist.', tip: 'Nine and a half grand so the trunk can sing. Your neighbors will call the cops and the bank.' }),
    ],
  },
  {
    id: 'mats',
    category: 'interior',
    label: 'Floor mats',
    mode: 'single',
    cars: ALL,
    options: [
      opt({ id: 'paper', name: 'Dealer paper mats', price: 0, tag: 'included', blurb: 'Thin, slippery, and in the trash by November.', tip: 'Paper mats are a suggestion. Spend the two hundred.' }),
      opt({ id: 'weather', name: 'All-weather mats', price: 220, tag: 'smart', blurb: 'Rubber trays that catch the slush, the coffee, the whole winter.', tip: 'Two hundred bucks. You will use them every time it rains. This is the good kind of spending.' }),
      opt({ id: 'carpet', name: 'Carpet logo mats', price: 185, tag: 'fluff', blurb: 'Plush, embroidered, and afraid of a puddle.', tip: 'Carpet mats look nice in the brochure. One rainstorm and they look like a crime scene.' }),
      opt({ id: 'luxury', name: 'Luxury leather mats', price: 640, tag: 'fluff', blurb: 'Stitched hides for the floor. The floor does not appreciate art.', tip: 'Six hundred dollars of leather where your boots go. I love you, but no.' }),
    ],
  },
  {
    id: 'leather',
    category: 'interior',
    label: 'Seats',
    mode: 'single',
    cars: ALL,
    options: [
      opt({ id: 'std', name: 'Standard seats', price: 0, tag: 'included', blurb: 'What the car comes with. Cloth on the daily drivers, leather on the Stallion.', tip: 'Standard seats hold you up. That is the job.' }),
      opt({ id: 'leather', name: 'Leather seating', price: 1900, tag: 'fluff', cars: ['harbor', 'breeze', 'ironhorn'], blurb: 'Hides instead of cloth. Smells like a new wallet for a month.', tip: 'Nineteen hundred to change the upholstery. Nice. Not necessary. Do not pretend it is necessary.' }),
      opt({ id: 'quilt', name: 'Diamond-stitch leather', price: 2400, tag: 'fluff', cars: ['stallion'], blurb: 'The GT is already leather. This is the quilted, show-off version.', tip: 'The car already has leather. You are paying for diamonds in the stitch. Ricky loves this one.' }),
      opt({ id: 'quilt2', name: 'Quilted leather upgrade', price: 2800, tag: 'fluff', cars: ['harbor', 'breeze'], blurb: 'Diamond stitching on a car that also hauls groceries.', tip: 'Quilted leather on a commuter. You are dressing the car for a party it does not attend.' }),
    ],
  },
  {
    id: 'comfort',
    category: 'interior',
    label: 'Cabin',
    mode: 'multi',
    cars: ALL,
    options: [
      opt({ id: 'heat', name: 'Seat heaters', price: 480, tag: 'smart', blurb: 'Warm seats on a cold morning. They earn their keep in January.', tip: 'Seat heaters in this climate are not a toy. Four eighty. I will allow it.' }),
      opt({ id: 'vent', name: 'Ventilated seats', price: 1150, tag: 'fluff', blurb: 'A little air through the leather when the summer sits on you.', tip: 'Ventilated seats are lovely. They are also a thousand dollars of fan.' }),
      opt({ id: 'wheel', name: 'Heated steering wheel', price: 275, tag: 'smart', blurb: 'Your hands stop suffering at red lights.', tip: 'Two seventy-five so your hands work in February. Small money, real life. Fine.' }),
      opt({ id: 'ambient', name: 'Ambient lighting', price: 395, tag: 'fluff', blurb: 'A glow in the footwells. Sixty-four colors. None of them pay the note.', tip: 'Mood lighting. The bank does not have a mood. It has a due date.' }),
      opt({ id: 'memory', name: 'Memory seats', price: 820, tag: 'fluff', blurb: 'The seat remembers you. Useful if two people share the car.', tip: 'Memory seats matter if somebody else drives. If it is just you, the seat already remembers.' }),
    ],
  },
  {
    id: 'roof',
    category: 'roof',
    label: 'Roof',
    mode: 'single',
    cars: ['stallion', 'harbor', 'ironhorn'],
    options: [
      opt({ id: 'none', name: 'Solid roof', price: 0, tag: 'included', blurb: 'Metal, quiet, and it does not leak. A roof’s original job.', tip: 'A solid roof is not a compromise. It is a roof.' }),
      opt({ id: 'moon', name: 'Power moonroof', price: 1250, tag: 'fluff', blurb: 'A slice of sky over the front seats. Nice in October.', tip: 'A moonroof is a nice thing you use in October. It is not an investment. It is a sunroof.' }),
      opt({ id: 'pano', name: 'Panoramic sunroof', price: 1950, tag: 'fluff', blurb: 'Glass over almost the whole cabin. Brighter, hotter, more expensive.', tip: 'Panoramic glass is gorgeous until July, when you are financing a greenhouse.' }),
      opt({ id: 'carbon', name: 'Carbon roof panel', price: 4200, tag: 'joke', cars: ['stallion'], blurb: 'A lighter roof, mostly so you can tell people the roof is lighter.', tip: 'Four grand so the roof can be a conversation. The car is already light enough to get you in trouble.' }),
    ],
  },
  {
    id: 'top',
    category: 'roof',
    label: 'Soft top',
    mode: 'single',
    cars: ['breeze'],
    options: [
      opt({ id: 'black', name: 'Black canvas top', price: 0, tag: 'included', blurb: 'The classic lid. Goes up, goes down, costs nothing extra.', tip: 'Black top, no charge. The joy is included. Remember that.' }),
      opt({ id: 'tan', name: 'Tan canvas top', price: 420, tag: 'fluff', blurb: 'A lighter lid. Looks like a weekend even on a Tuesday.', tip: 'Tan top is a look. Four twenty. If it makes you happy every time you walk up, fine. Once.' }),
      opt({ id: 'burgundy', name: 'Burgundy canvas top', price: 480, tag: 'fluff', blurb: 'Wine-colored canvas. Dramatic in a good parking lot.', tip: 'Burgundy lid. Pretty. Do not let a pretty lid talk you into a ugly loan.' }),
      opt({ id: 'navy', name: 'Navy canvas top', price: 450, tag: 'fluff', blurb: 'Deep blue canvas. Quiet, and it hides the dust a little.', tip: 'Navy top. Respectable. Still just a color.' }),
    ],
  },
  {
    id: 'wheels',
    category: 'wheels',
    label: 'Wheels & tires',
    mode: 'single',
    cars: ALL,
    options: [
      opt({ id: 'stock', name: 'Stock wheels', price: 0, tag: 'included', blurb: 'The ones the car was designed around. They work.', tip: 'Stock wheels are not sad. They are engineered. Leave them if you are watching the payment.' }),
      opt({ id: 'sport', name: '19" sport alloys', price: 1650, tag: 'fluff', cars: ['stallion', 'harbor', 'breeze'], blurb: 'Lighter look, thinner tire, a little more road in the cabin.', tip: 'Sport alloys look sharp and ride firmer. Sixteen fifty. Know why you want them.' }),
      opt({ id: 'chrome', name: 'Chrome 22s', price: 2450, tag: 'fluff', cars: ['stallion', 'breeze', 'harbor'], blurb: 'Mirror-bright and impossible to keep clean.', tip: 'Chrome is a part-time job. You will wash them more than you drive them.' }),
      opt({ id: 'forged', name: 'Forged black 20s', price: 3350, tag: 'fluff', cars: ['stallion', 'breeze'], blurb: 'Dark, expensive, and lighter than they look.', tip: 'Forged wheels are real hardware. They are also three grand of jewelry.' }),
      opt({ id: 'runflat', name: 'Run-flat all-seasons', price: 1150, tag: 'smart', cars: ['stallion', 'harbor', 'breeze'], blurb: 'Keep rolling after a puncture. No spare to sit on.', tip: 'Run-flats are the rare wheel upgrade that solves a problem. I can live with it.' }),
      opt({ id: 'aero', name: 'Aero efficiency wheels', price: 380, tag: 'smart', cars: ['harbor'], blurb: 'Smoother covers, a little less drag, a calmer look.', tip: 'Three eighty for wheels that help the hybrid be a hybrid. That is a coherent sentence.' }),
      opt({ id: 'carbonw', name: 'Carbon-barrel track wheels', price: 5600, tag: 'joke', cars: ['stallion'], blurb: 'Race-day hardware for a road that has a speed limit.', tip: 'Fifty-six hundred in carbon barrels. The track is not on your commute.' }),
      opt({ id: 'wire', name: 'Wire-look chromes', price: 2100, tag: 'fluff', cars: ['breeze'], blurb: 'Old-glamour spokes. They sparkle when the top is down.', tip: 'Wire wheels are a mood. They are also a car wash’s villain origin story.' }),
      opt({ id: 'chrome20', name: '20" factory chrome', price: 1800, tag: 'fluff', cars: ['ironhorn'], blurb: 'Bright truck wheels. They shine until the first job site.', tip: 'Chrome on a truck is a choice. Mud is also a choice. They will meet.' }),
      opt({ id: 'offroad', name: '35" all-terrains', price: 4750, tag: 'fluff', cars: ['ironhorn'], blurb: 'Tall, loud, and thirsty. They change the whole truck.', tip: 'Those tires do not just cost forty-seven fifty. They cost you gas, bearings, and a car wash that cries.' }),
      opt({ id: 'mud', name: '37" Swamp Royalty', price: 8900, tag: 'joke', cars: ['ironhorn'], blurb: 'Bog-sized mud tires with a name that should have been a warning.', tip: 'Swamp Royalty. Eighty-nine hundred. You are financing a parade float that hates parking garages.' }),
    ],
  },
  {
    id: 'stance',
    category: 'packs',
    label: 'Stance',
    mode: 'single',
    cars: ['ironhorn'],
    options: [
      opt({ id: 'stock', name: 'Stock height', price: 0, tag: 'included', blurb: 'The truck sits where the engineers put it.', tip: 'Stock height gets into parking garages. I am a fan of parking garages.' }),
      opt({ id: 'level', name: '2" leveling kit', price: 1480, tag: 'fluff', blurb: 'Lifts the nose so the truck looks level, not eager.', tip: 'A leveling kit is the modest version of this mistake. Still fourteen eighty.' }),
      opt({ id: 'lift', name: '6" lift kit', price: 6650, tag: 'joke', blurb: 'The truck stands up and announces itself to aircraft.', tip: 'Six inches and sixty-six fifty. You will need a step stool and a new budget.' }),
    ],
  },
  {
    id: 'liner',
    category: 'packs',
    label: 'Bed liner',
    mode: 'single',
    cars: ['ironhorn'],
    options: [
      opt({ id: 'none', name: 'Bare bed', price: 0, tag: 'included', blurb: 'Painted steel. The first fridge you haul will sign it.', tip: 'A bare bed is how a new truck starts looking old. Liner is the grown-up move.' }),
      opt({ id: 'spray', name: 'Spray-in bed liner', price: 695, tag: 'smart', blurb: 'A thick coat locked to the metal. The right answer for a working bed.', tip: 'Spray-in liner, six ninety-five. Protects the thing you bought. This is how you spend.' }),
      opt({ id: 'dropin', name: 'Drop-in bed liner', price: 349, tag: 'smart', blurb: 'A plastic shell you can pull out. Cheaper, a little rattly.', tip: 'Drop-in is the budget liner. It works. It also drums when it is empty.' }),
    ],
  },
  {
    id: 'cover',
    category: 'packs',
    label: 'Tonneau cover',
    mode: 'single',
    cars: ['ironhorn'],
    options: [
      opt({ id: 'none', name: 'Open bed', price: 0, tag: 'included', blurb: 'Nothing over the bed. Easy to load, easy to soak.', tip: 'Open bed is honest. Just do not leave tools in the rain and then act surprised.' }),
      opt({ id: 'soft', name: 'Soft roll-up tonneau', price: 545, tag: 'smart', blurb: 'Vinyl cover, rolls up when you need the whole bed.', tip: 'Soft cover keeps the rakes dry. Five forty-five. Reasonable.' }),
      opt({ id: 'hard', name: 'Hard folding tonneau', price: 1375, tag: 'fluff', blurb: 'A rigid lid that locks. Looks finished. Costs more than the liner.', tip: 'Hard cover is nice if you actually lock gear back there. Otherwise it is a very expensive hat.' }),
    ],
  },
  {
    id: 'truckt',
    category: 'packs',
    label: 'Truck kit',
    mode: 'multi',
    cars: ['ironhorn'],
    options: [
      opt({ id: 'lights', name: 'Bed LED rails', price: 295, tag: 'smart', blurb: 'Light in the bed so you are not loading by phone flashlight.', tip: 'Bed lights are cheap and you will use them. I like cheap and useful.' }),
      opt({ id: 'winch', name: '12,000 lb winch', price: 1920, tag: 'fluff', blurb: 'A hook and a motor on the nose. Heroic, until you never need it.', tip: 'A winch is for people who get stuck on purpose. Do you?' }),
      opt({ id: 'exhaust', name: 'Dual exhaust', price: 1560, tag: 'fluff', blurb: 'Two tips, more noise, the same truck underneath.', tip: 'Dual exhaust so a truck can be louder. The neighbors already know it is a truck.' }),
      opt({ id: 'box', name: 'Bed toolbox', price: 780, tag: 'smart', blurb: 'A locking chest at the cab. Tools stay put.', tip: 'A toolbox is for a person who works. If that is you, buy it. If it is a costume, skip it.' }),
      opt({ id: 'flaps', name: 'Heavy mud flaps', price: 210, tag: 'smart', blurb: 'They keep the rocks off the car behind you. Manners, basically.', tip: 'Mud flaps are manners. Two ten. Your mother would approve, and she is not even on the loan.' }),
      opt({ id: 'lightbar', name: 'Parade light bar', price: 2240, tag: 'joke', blurb: 'A roof full of lamps. Visible from the next county, and from space.', tip: 'A light bar for the suburbs. Twenty-two forty so you can see a deer that is not there.' }),
    ],
  },
  {
    id: 'sport',
    category: 'packs',
    label: 'Stallion pack',
    mode: 'multi',
    cars: ['stallion'],
    options: [
      opt({ id: 'launch', name: 'Launch control', price: 2200, tag: 'fluff', blurb: 'A computer that helps you leave a light like a poster.', tip: 'Launch control is a story you tell once. The price you pay every month.' }),
      opt({ id: 'spoiler', name: 'Carbon spoiler', price: 3400, tag: 'fluff', blurb: 'A wing on the tail. It looks fast even when you are not.', tip: 'Carbon spoiler. Three thousand four hundred dollars of wind costume.' }),
      opt({ id: 'track', name: 'Track tire set', price: 2800, tag: 'fluff', blurb: 'Sticky rubber that hates cold mornings and long highway slogs.', tip: 'Track tires on a street car wear out like gossip. Fast, and then they are gone.' }),
      opt({ id: 'exhaust', name: 'Roaring exhaust', price: 2650, tag: 'fluff', blurb: 'Opens the pipes. The Stallion already had a voice. This is a shout.', tip: 'A roaring exhaust is how you introduce yourself to people who did not ask.' }),
      opt({ id: 'brakes', name: 'Carbon-ceramic brakes', price: 8900, tag: 'joke', blurb: 'Race brakes. Astonishing, and allergic to short cold trips.', tip: 'Eighty-nine hundred in brakes. Unless you are late to a racetrack, this is jewelry that gets hot.' }),
      opt({ id: 'stripes', name: 'Racing stripes', price: 750, tag: 'fluff', blurb: 'A painted stripe down the spine. Loud in the quietest way.', tip: 'Stripes are seven fifty. Cheap trouble. I will not lose sleep. Do not add three more kinds of trouble.' }),
      opt({ id: 'turbo', name: "Nonna's Prayer turbo", price: 14500, tag: 'joke', blurb: 'A fantastical booster named like a blessing. It is not a blessing. It is $14,500.', tip: 'Nonna’s Prayer. Fourteen thousand five hundred. Your grandmother would tell you to put it back.' }),
    ],
  },
  {
    id: 'hybrid',
    category: 'packs',
    label: 'Harbor pack',
    mode: 'multi',
    cars: ['harbor'],
    options: [
      opt({ id: 'cargo', name: 'Cargo organizer', price: 240, tag: 'smart', blurb: 'Dividers in the hatch so the groceries stop auditioning for a chase scene.', tip: 'Cargo organizer. Two forty. Your oranges stay put. This is a yes.' }),
      opt({ id: 'rack', name: 'Roof rack', price: 680, tag: 'smart', blurb: 'Crossbars for a bike, a box, a life that does not fit in the hatch.', tip: 'A rack is worth it the first time you would have otherwise rented a truck. Six eighty.' }),
      opt({ id: 'ppf', name: 'Paint protection film', price: 1950, tag: 'smart', blurb: 'A clear skin on the nose and the hood. Rocks are free. Paint is not.', tip: 'Paint protection on a daily driver is one of the few add-ons I do not heckle. Rocks are free. Paint is not.' }),
      opt({ id: 'eff', name: 'Efficiency display pack', price: 420, tag: 'smart', blurb: 'A clearer picture of what the hybrid is actually doing.', tip: 'You bought a hybrid to watch the numbers. Four twenty to see them better. Coherent.' }),
      opt({ id: 'filter', name: 'Deluxe cabin filter', price: 180, tag: 'smart', blurb: 'Better air on the parkway. Small, boring, useful.', tip: 'A cabin filter is the most adult thing on this menu. Buy it and do not tell anyone. It is not glamorous enough.' }),
    ],
  },
  {
    id: 'breezepack',
    category: 'packs',
    label: 'Breeze pack',
    mode: 'multi',
    cars: ['breeze'],
    options: [
      opt({ id: 'deflector', name: 'Wind deflector', price: 320, tag: 'smart', blurb: 'A little screen so the top-down air does not slap you at 50.', tip: 'Wind deflector makes the top-down actually usable. Three twenty. Buy the joy, then make it comfortable.' }),
      opt({ id: 'latch', name: 'Premium top package', price: 890, tag: 'fluff', blurb: 'Softer latches, a tighter fit, one less thing to fight at a red light.', tip: 'The top already goes down. Eight ninety for a fancier way is optional. The down part is free.' }),
      opt({ id: 'underglow', name: 'Underglow', price: 680, tag: 'fluff', blurb: 'A cool light under the rockers. The pavement gets a costume.', tip: 'Underglow. The road does not need a nightlight. You do not need this payment.' }),
      opt({ id: 'glow', name: 'San Gennaro glow', price: 4400, tag: 'joke', blurb: 'Festival lights, sparkler tips, and a glow that can be seen from the rectory.', tip: 'The Feast of San Gennaro, but it is your car, and it is four thousand four hundred dollars. I am lighting a candle for your budget.' }),
    ],
  },
  {
    id: 'tint',
    category: 'extras',
    label: 'Window tint',
    mode: 'single',
    cars: ALL,
    options: [
      opt({ id: 'none', name: 'No tint', price: 0, tag: 'included', blurb: 'Clear glass. Honest, bright, a little hot.', tip: 'Clear glass is free. In August you may wish it was not.' }),
      opt({ id: 'regular', name: 'Window tint', price: 450, tag: 'smart', blurb: 'A normal shade. Cooler cabin, less of your life on display.', tip: 'Tint for four fifty is comfort and a little privacy. I do not fight this.' }),
      opt({ id: 'ceramic', name: 'Ceramic tint', price: 890, tag: 'smart', blurb: 'Rejects more heat, less mirror-look, costs more than regular dye.', tip: 'Ceramic tint actually knocks the heat back. Eight ninety. If you park in the sun, it is a tool.' }),
    ],
  },
  {
    id: 'extras',
    category: 'extras',
    label: 'Everyday kit',
    mode: 'multi',
    cars: ALL,
    options: [
      opt({ id: 'mud', name: 'Mud guards', price: 160, tag: 'smart', blurb: 'Small shields behind the wheels. They save the rockers.', tip: 'Mud guards. One sixty. Boring and correct.' }),
      opt({ id: 'net', name: 'Cargo net', price: 75, tag: 'smart', blurb: 'A net so the trunk stops rearranging itself.', tip: 'Seventy-five dollars. If this is the wildest thing you add, I am proud of you.' }),
      opt({ id: 'keyless', name: 'Keyless entry upgrade', price: 350, tag: 'fluff', blurb: 'Walk up, get in. The key can stay in your pocket.', tip: 'Keyless is convenience. Three fifty. Fine if the rest of the build is calm.' }),
      opt({ id: 'remote', name: 'Remote start', price: 495, tag: 'smart', blurb: 'Start it from the kitchen. The cabin is human by the time you sit down.', tip: 'Jersey in January. Remote start earns its keep. I will not fight you.' }),
      opt({ id: 'dash', name: 'Dash cam', price: 320, tag: 'smart', blurb: 'A witness on the windshield. Cheap insurance for arguments.', tip: 'Dash cam. Three twenty. The one gadget that can save you money. Buy it.' }),
      opt({ id: 'seal', name: 'Paint sealant', price: 799, tag: 'fluff', blurb: 'A shiny coat and a speech about beads of water.', tip: 'Sealant is a car-wash sermon. Seven ninety-nine. Wash the car yourself and buy a better lunch.' }),
      opt({ id: 'edge', name: 'Door edge guards', price: 140, tag: 'smart', blurb: 'Little strips so parking-lot doors do not chip the paint.', tip: 'Edge guards are a small kindness to the paint. One forty. Yes.' }),
      opt({ id: 'trunk', name: 'Trunk liner', price: 180, tag: 'smart', cars: ['stallion', 'harbor', 'breeze'], blurb: 'A tray for the wet, the sandy, the leaking.', tip: 'Trunk liner. One eighty. Your future self, holding a spilled plant, thanks you.' }),
    ],
  },
  {
    id: 'warranty',
    category: 'warranty',
    label: 'Warranty',
    mode: 'single',
    cars: ALL,
    options: [
      opt({ id: 'none', name: 'Factory coverage only', price: 0, tag: 'value', blurb: 'The maker’s promise, already on a new car. A big reason you buy new.', tip: 'You are buying new. The factory already covers the bumper and the powertrain. That is the point. Do not pay for the same promise twice.' }),
      opt({ id: 'tech', name: 'Electronics, 4 years', price: 650, tag: 'smart', blurb: 'Screens, cameras, infotainment. The stuff that fails and costs real money to fix.', tip: 'Electronics. Screens, cameras, the big display. That stuff dies and the bill is ugly. A few hundred, I understand. The engine and the bumper, the factory already has.' }),
      opt({ id: 'basic', name: 'Powertrain, 5 years', price: 2000, tag: 'fluff', blurb: 'Engine and transmission past the factory window. On a new car you already bought that window.', tip: 'Two thousand for a powertrain warranty on a car that just came with one. Buying new was that coverage. I would not pay for it twice.' }),
      opt({ id: 'bumper', name: 'Bumper-to-bumper, 6 years', price: 3500, tag: 'fluff', blurb: 'A full wrap for six years. On a new car it mostly repeats the factory promise.', tip: 'Bumper-to-bumper, thirty-five hundred, on a new car. You already bought that when you bought new. If you add one thing, make it the electronics. Not this.' }),
      opt({ id: 'platinum', name: 'Platinum concierge, 8 years', price: 5000, tag: 'joke', blurb: 'The long hug. Loaner cars, a binder, and a lot of adjectives.', tip: 'Five thousand for the platinum hug. The car is new. Factory coverage is the hug you already paid for. This binder buys Ricky a boat.' }),
    ],
  },
];

export const CATEGORIES = [
  { id: 'sound', label: 'Sound' },
  { id: 'interior', label: 'Interior' },
  { id: 'roof', label: 'Roof' },
  { id: 'wheels', label: 'Wheels' },
  { id: 'packs', label: 'Packs' },
  { id: 'extras', label: 'Extras' },
  { id: 'warranty', label: 'Warranty' },
];

export const TOP_COLORS = {
  black: '#1a1c1f',
  tan: '#c2a57a',
  burgundy: '#6e2434',
  navy: '#1c2a4a',
};

export function carById(id) {
  return CARS.find((car) => car.id === id) || null;
}

export function appliesTo(cars, carId) {
  return cars === ALL || (Array.isArray(cars) && cars.includes(carId));
}

export function groupsFor(carId, categoryId) {
  return GROUPS.filter((group) => (
    appliesTo(group.cars, carId)
    && (!categoryId || group.category === categoryId)
  )).map((group) => ({
    ...group,
    options: group.options.filter((option) => appliesTo(option.cars, carId)),
  })).filter((group) => group.options.length > 0);
}

export function freshBuild(car) {
  const single = {};
  const multi = {};
  for (const group of groupsFor(car.id)) {
    if (group.mode === 'single') single[group.id] = group.options[0].id;
    else multi[group.id] = [];
  }
  return {
    paint: car.colors[0].id,
    topDown: false,
    single,
    multi,
  };
}

export function paintOf(car, build) {
  return car.colors.find((color) => color.id === build.paint) || car.colors[0];
}

export function selectedOptions(car, build) {
  const lines = [];
  const paint = paintOf(car, build);
  if (paint.price) {
    lines.push({
      id: paint.id,
      name: paint.name,
      price: paint.price,
      tag: paint.joke ? 'joke' : 'fluff',
      group: 'paint',
      tip: paint.joke
        ? 'Gold flake. Seventy-five hundred so the car can glitter like a bakery tray. I am begging you.'
        : `${paint.name} is a special paint. Pretty. It does not make the car worth more when you sell it.`,
    });
  }
  for (const group of groupsFor(car.id)) {
    if (group.mode === 'single') {
      const chosen = group.options.find((option) => option.id === build.single[group.id]);
      if (chosen) lines.push({ ...chosen, group: group.id });
    } else {
      for (const id of build.multi[group.id] || []) {
        const chosen = group.options.find((option) => option.id === id);
        if (chosen) lines.push({ ...chosen, group: group.id });
      }
    }
  }
  return lines;
}

export function warrantyPrice(id) {
  const group = GROUPS.find((item) => item.id === 'warranty');
  return group?.options.find((item) => item.id === id)?.price || 0;
}

export function priceBuild(car, build) {
  const lines = selectedOptions(car, build);
  const warrantyLine = lines.find((line) => line.group === 'warranty');
  const warranty = warrantyLine?.price || 0;
  const options = lines
    .filter((line) => line.group !== 'warranty')
    .reduce((sum, line) => sum + line.price, 0);
  return {
    msrp: car.msrp,
    options,
    warranty,
    warrantyId: warrantyLine?.id || 'none',
    total: car.msrp + options + warranty,
    lines,
  };
}

export function insuranceFor(car, build) {
  let amount = car.insurance;
  const sport = build.multi.sport || [];
  const truck = build.multi.truckt || [];
  const breeze = build.multi.breezepack || [];
  if (sport.includes('turbo')) amount += 65;
  if (sport.includes('brakes')) amount += 22;
  if (build.single.wheels === 'mud') amount += 48;
  if (build.single.wheels === 'offroad') amount += 30;
  if (build.single.stance === 'lift') amount += 24;
  if (truck.includes('lightbar')) amount += 12;
  if (breeze.includes('glow')) amount += 18;
  return amount;
}

export const GLOSSARY = {
  credit: {
    title: 'Credit score',
    body: 'Your credit score is a three-digit rumor the bank believes about you. Higher means cheaper money. This is not a moral score. It is a price tag on a loan. We rolled it. Now we live with the number, or we ask your mother.',
  },
  cosigner: {
    title: 'Co-signer',
    body: 'A co-signer tells the bank they will pay if you do not. Your mother, in this case. It can knock the rate down. It also puts Ma on the hook for the whole note. You only ask her if the rate is ugly, and you never miss a payment. That is family.',
  },
  apr: {
    title: 'APR',
    body: 'APR is the yearly price of borrowing, written like a percent. A six instead of an eight does not look like much on a sticker. On a long loan it is thousands. You are not just buying the car. You are renting the money.',
  },
  principal: {
    title: 'Principal',
    body: 'Principal is the chunk you still owe, before the bank’s cut. Every payment takes a bite of principal and a bite of interest. Early on, the bank eats first. That is the game. Borrow less and the bites get smaller.',
  },
  interest: {
    title: 'Interest',
    body: 'Interest is the bank’s fee for fronting you the money. It is not a one-time tip. It gets calculated on what is left, every month. That is why the rate and the term matter as much as the sticker.',
  },
  term: {
    title: 'Term',
    body: 'Term is how many months you are married to this payment. Sixty is five years. Eighty-four is seven. The longer one looks cheaper every month and pays the bank a longer tip. Do not stretch a note so the car dies before it does.',
  },
  amortization: {
    title: 'Amortization',
    body: 'Amortizing means the payment stays the same while the mix changes. The first years you are mostly paying interest. Later you finally hit principal. Longer terms keep you in the interest years. That is why they feel affordable.',
  },
  payment: {
    title: 'Payment',
    body: 'The payment is principal and interest chopped into months. A pretty payment can hide an ugly loan: long term, fat rate, extra junk. We look at the payment and at what it costs you to have it. Both. Always both.',
  },
  down: {
    title: 'Down payment',
    body: 'A down payment is cash you put in up front so you borrow less. Less principal, less interest, and you are not upside down the second the tires hit the street. With about fifteen thousand in savings, a chunk of that pile is often for exactly this. Leave roughly two months of bills as backup, and it is fine to use some of the rest. Better real money down than zero down and a loan that is already underwater. Do not empty checking to impress a man at a desk. Rent is still due.',
  },
  trade: {
    title: 'Trade equity',
    body: 'Trade equity is what your old car is worth minus whatever you still owe on it. Your jalopy is paid off, so every dollar we squeeze out of Ricky comes straight off the new loan. That is found money. Treat it like it.',
  },
  negative: {
    title: 'Negative equity',
    body: 'Negative equity is when you owe more on a car than it is worth. Upside down. Roll that into a new loan and you are paying for a ghost. Your beater is clear, so we are not starting in a hole. Do not dig one with a long term.',
  },
  otd: {
    title: 'Out the door',
    body: 'Out the door is the real number: price, plus tax, title, doc fees, and warranty, minus the trade. Salesmen love talking monthly so you forget it. I do not. Ask for the out-the-door out loud, then decide.',
  },
  warranty: {
    title: 'Warranty',
    body: 'A warranty is a paid promise to fix certain things for a while. You are buying new, so factory bumper-to-bumper and powertrain coverage is already a big reason the car costs what it costs. Paying again for that full wrap is often money you do not need. Electronics are the exception. Screens, cameras, the infotainment. That stuff fails, and it is expensive. A small policy for the tech can be the smart one. Read what is actually covered. The brochure is not the contract.',
  },
  tco: {
    title: 'Total cost of ownership',
    body: 'Total cost of ownership is what the car costs to live with, not the number on the windshield. It rolls up the payments, the interest hiding inside them, insurance, a straight guess at gas and maintenance, and the warranty you actually picked. The sticker is the invitation. Ownership is the whole night. One number, so it does not turn into homework.',
  },
  msrp: {
    title: 'MSRP',
    body: 'MSRP is the manufacturer’s suggested price. A suggestion, like when your aunt says have more lasagna. On a hot car they pretend it is sacred. It is not. We negotiate off it, and we do not pay a markup for the privilege.',
  },
  docfee: {
    title: 'Doc fee',
    body: 'The doc fee is the charge for paperwork they were going to do anyway. Some states cap it. Some lots pad it. I will not die on a few hundred if the price of the car is right. I will always see it on the sheet.',
  },
  tax: {
    title: 'Sales tax',
    body: 'Tax is the state’s cut. On this lot we tax the selling price plus warranty, after the trade comes off, the way a lot of states do it. It is not negotiable. A lower selling price saves you twice: on the car, and on the tax.',
  },
  takehome: {
    title: 'Take-home pay',
    body: 'Take-home is what actually lands after a plain tax estimate, not the salary in the job offer. Yours is about $1,010 a week on a $70,000 year. The car payment has to live inside that week, next to rent and food. The salary is a rumor. The week is the truth.',
  },
  financed: {
    title: 'Amount financed',
    body: 'Amount financed is what the bank actually lends after the trade and your cash come off. This is the principal. Not the sticker, not the monthly. Every point of interest applies to this number. Make it smaller and the whole loan gets quieter.',
  },
  insurance: {
    title: 'Insurance estimate',
    body: 'Insurance is what you pay so a bad afternoon does not own you. It is not in the car payment, which is how people fool themselves. I put an estimate in the week so the Stallion cannot pretend it costs the same to own as the Harbor.',
  },
};
