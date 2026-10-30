# Dream Car

A phone-first game about shopping for a car. You roll your credit, pick one of four fictional cars, build it in a design studio, and sit down with Ricky Falco while Vinny “Numbers” Caputo counts out loud.

The fun is the lot and the options. The lesson is hiding in the payment.

## Play

1. **The lot.** Your trade is a 1998 Cumberland Shadow, worth about **$4,500**. Checking is **$8,000**, savings **$15,000**, salary **$70,000** — about **$1,010 a week** after a plain tax estimate.
2. **Credit.** Roll a score from 675 to 820. Most rolls land in the 700s. A thin score can ask Mom to co-sign (+50 to +75 on the rate quote). Tap **What is this?** any time Vinny should explain a word.
3. **Four cars.** Stallion GT ($72,000), Harbor Hybrid ($29,000), Ironhorn 1500 ($52,000), Breeze Convertible ($38,000). No real brands.
4. **Studio.** Spin or swipe the car. Paint, sound, mats, roof, wheels, packs, and a warranty all hit the build price. Factory coverage is already on a new car. Electronics coverage is $650. Powertrain is $2,000, bumper-to-bumper is $3,500, platinum is $5,000. The Breeze top goes up and down. Vinny comments while you spend.
5. **The desk.** Ricky opens high. Slide the price, the trade, and the APR (about 6–8% from your score). Pick 60, 72, or 84 months. The monthly number is a normal amortizing payment. The white mark on the meter is 15% of take-home. Stay left of it. A banner adds up the total cost of ownership: payments, the interest inside them, insurance, a guess at gas and upkeep, and the warranty you picked.
6. **The grade.** Vinny scores the deal and will say so if the car simply does not fit the week. Shop another car or start over.

Locked bills, every month: housing $1,450, food $380, phone $85, utilities $160, misc $120. **$2,195.** About $507 of each paycheck is already gone before the car or its insurance.

## The worksheet

Out-the-door, on this lot:

- Selling price is the negotiated car price plus the options you actually picked.
- Tax is **6.625%** of (selling price + warranty − trade). Doc fee is $599. Title and plates are $385.
- Trade equity comes off after tax. Your jalopy is paid off, so the whole allowance is equity.
- Down payment comes out of checking and, if you want, out of savings. About two months of bills ($4,390) stays as backup. The rest of the $15,000 can go on the hood. Amount financed is what’s left. Zero down leaves you upside down the moment you drive off.
- Payment uses the standard loan formula: principal × monthly rate × (1 + rate)^months / ((1 + rate)^months − 1).

Insurance is Vinny’s estimate, not a binder. It is not inside the car payment. It is inside the week.

## Run it

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123). The dev server is already the way to play on a phone on the same network, or in a narrow browser window.

```bash
npm run check    # payment math, catalog, and a sample grade
npm run build    # static site in dist/
npm run preview  # serve that build
```

`base` is `./`, so `dist/` can sit on GitHub Pages or any static host, including a project subpath. Serve the folder. Don’t open `dist/index.html` as a bare file — the script is a module.

The violin is an original loop synthesized in the browser (Web Audio). Nothing on the soundtrack is a recording or a film theme. First tap starts it. The note button hushes it.

No account, no server, no save except the last letter grade in `localStorage`.
