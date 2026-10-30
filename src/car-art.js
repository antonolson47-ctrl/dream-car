import { hexToRgb, luminance, mix } from './format.js';
import { TOP_COLORS, paintOf } from './data.js';

export const VIEWS = [
  { id: 'side', label: 'Side' },
  { id: 'front', label: 'Front' },
  { id: 'rear', label: 'Rear' },
];

export function visualsFrom(car, build) {
  const paint = paintOf(car, build);
  const breeze = build.multi.breezepack || [];
  const sport = build.multi.sport || [];
  const truck = build.multi.truckt || [];
  let underglow = null;
  if (breeze.includes('glow')) underglow = '#ffb15a';
  else if (breeze.includes('underglow')) underglow = '#67e7ff';
  return {
    paint: paint.hex,
    pearl: !!paint.pearl,
    matte: !!paint.matte,
    wheel: build.single.wheels || 'stock',
    roof: build.single.roof || 'none',
    tint: build.single.tint === 'ceramic' ? 2 : build.single.tint === 'regular' ? 1 : 0,
    spoiler: sport.includes('spoiler'),
    stripes: sport.includes('stripes'),
    exhaust: sport.includes('exhaust') || truck.includes('exhaust'),
    lift: build.single.stance === 'lift' ? 2 : build.single.stance === 'level' ? 1 : 0,
    liner: build.single.liner || 'none',
    cover: build.single.cover || 'none',
    underglow,
    topDown: !!build.topDown,
    topColor: TOP_COLORS[build.single.top] || '#1a1c1f',
    deflector: breeze.includes('deflector'),
    lightbar: truck.includes('lightbar'),
    winch: truck.includes('winch'),
    brakes: sport.includes('brakes'),
    dark: luminance(paint.hex) < 0.4,
  };
}

export function carSVG(carId, view, cfg, prefix = 'car') {
  const art = view === 'front'
    ? frontArt(carId, cfg, prefix)
    : view === 'rear'
      ? rearArt(carId, cfg, prefix)
      : sideArt(carId, cfg, prefix);
  return `<svg class="car${cfg.topDown ? ' is-down' : ''}" viewBox="0 0 840 480" role="img">
    <title>${label(carId)} , ${view} view</title>
    <defs>${defs(prefix, cfg)}</defs>
    ${cfg.underglow ? `<ellipse cx="420" cy="400" rx="250" ry="36" fill="url(#${prefix}-glow)"/>` : ''}
    <ellipse cx="420" cy="424" rx="270" ry="18" fill="rgba(0,0,0,.38)"/>
    <ellipse cx="420" cy="426" rx="160" ry="7" fill="rgba(255,255,255,.06)"/>
    ${art}
  </svg>`;
}

export function jalopySVG() {
  const p = 'jalopy';
  const cfg = {
    paint: '#6d7278',
    pearl: false,
    matte: true,
    wheel: 'steel',
    roof: 'none',
    tint: 0,
    underglow: null,
    dark: true,
    brakes: false,
  };
  return `<svg class="car jalopy" viewBox="0 0 840 480" role="img">
    <title>1998 Cumberland Shadow</title>
    <defs>${defs(p, cfg)}</defs>
    <ellipse cx="420" cy="424" rx="250" ry="16" fill="rgba(0,0,0,.38)"/>
    <g>
      ${bodyWithArches(p, sedanBody(), [[268, 360, 50], [590, 360, 50]], 'body')}
      <path d="M430 168 C470 128 540 124 600 140 L640 188 L560 196 C500 188 450 186 430 196 Z" fill="url(#${p}-glass)" stroke="rgba(180,190,198,.4)" stroke-width="2"/>
      ${sheen('M 470 150 L 530 168')}
      <path d="M250 250 L400 242 L408 330 L246 338 Z" fill="#8c8a80" opacity=".92"/>
      <path d="M400 246 L408 332" stroke="rgba(0,0,0,.45)" stroke-width="2"/>
      <path d="M250 256 L246 336" stroke="rgba(0,0,0,.35)" stroke-width="1.6"/>
      <path d="M300 268 C330 290 328 310 300 324" fill="none" stroke="#4a4e52" stroke-width="3"/>
      ${handle(346, 300, p)}
      <g transform="translate(412 186)">
        <rect x="0" y="8" width="7" height="12" rx="2" fill="#2a2c30"/>
        <rect x="5" y="0" width="24" height="13" rx="2" fill="#1a1c20" stroke="rgba(255,255,255,.4)"/>
        <rect x="8" y="2" width="16" height="8" rx="1" fill="rgba(190,210,224,.55)"/>
      </g>
      <ellipse cx="220" cy="308" rx="16" ry="7" fill="#7a4a32" opacity=".55"/>
      <ellipse cx="640" cy="300" rx="20" ry="8" fill="#6b3e28" opacity=".45"/>
      <ellipse cx="560" cy="250" rx="9" ry="5" fill="#8a5a3c" opacity=".4"/>
      ${sheen('M 490 156 L 540 176')}
      ${grille(148, 268, 36, 28, p)}
      <path d="M150 300 h44 v16 h-40 z" fill="#14120e" stroke="rgba(255,255,255,.2)"/>
      <path d="M154 304 h28 v8 h-26 z" fill="#f2e2b8" opacity=".75"/>
      <path d="M160 304 L176 312 M168 304 L184 312" stroke="rgba(40,40,40,.55)" stroke-width="1"/>
      <rect x="168" y="284" width="22" height="10" rx="2" fill="#c4552a"/>
      <rect x="730" y="250" width="22" height="16" rx="2" fill="#3a1214" stroke="rgba(255,160,150,.25)"/>
      <rect x="734" y="254" width="14" height="8" fill="#8a3030"/>
      ${flare(268, 360, 46)}
      ${flare(590, 360, 46)}
      ${wheel(268, 360, 42, 'steel', p, false)}
      ${wheel(590, 360, 42, 'stock', p, false)}
      <g transform="translate(250,392) rotate(-18)">
        <ellipse cx="0" cy="0" rx="16" ry="7" fill="#cfc8bc" stroke="#888" stroke-width="1"/>
      </g>
      ${plate(455, 318, 'AS-IS', true)}
    </g>
  </svg>`;
}

function label(id) {
  return {
    stallion: 'Stallion GT',
    harbor: 'Harbor Hybrid',
    ironhorn: 'Ironhorn 1500',
    breeze: 'Breeze Convertible',
  }[id] || 'Car';
}

function defs(prefix, cfg) {
  const hi = cfg.matte ? mix(cfg.paint, '#ffffff', 0.1) : mix(cfg.paint, '#ffffff', cfg.pearl ? 0.62 : 0.4);
  const lo = mix(cfg.paint, '#000000', cfg.matte ? 0.22 : 0.48);
  const glassTop = cfg.tint > 1 ? 0.35 : cfg.tint === 1 ? 0.55 : 0.82;
  const chrome = cfg.wheel === 'forged' || cfg.wheel === 'carbonw';
  const rimA = chrome ? '#3a3a3a' : '#f5f5f3';
  const rimB = chrome ? '#111' : (cfg.wheel === 'chrome' || cfg.wheel === 'chrome20' || cfg.wheel === 'wire' ? '#aeb4ba' : '#7b8086');
  const glow = cfg.underglow || '#ffffff';
  return `
    <linearGradient id="${prefix}-paint" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="${hi}"/>
      <stop offset="40%" stop-color="${cfg.paint}"/>
      <stop offset="100%" stop-color="${lo}"/>
    </linearGradient>
    <linearGradient id="${prefix}-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e7f1f8" stop-opacity="${glassTop}"/>
      <stop offset="48%" stop-color="#1a2836" stop-opacity="${0.5 + cfg.tint * 0.18}"/>
      <stop offset="100%" stop-color="#0d141c" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="${prefix}-rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${rimA}"/>
      <stop offset="50%" stop-color="${rimB}"/>
      <stop offset="100%" stop-color="${rimA}"/>
    </linearGradient>
    <linearGradient id="${prefix}-metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbfbfa"/>
      <stop offset="48%" stop-color="#8e949b"/>
      <stop offset="100%" stop-color="#deded8"/>
    </linearGradient>
    <radialGradient id="${prefix}-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${glow}" stop-opacity="0.75"/>
      <stop offset="70%" stop-color="${glow}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${prefix}-tire" cx="42%" cy="38%" r="68%">
      <stop offset="0%" stop-color="#3a3e44"/>
      <stop offset="58%" stop-color="#17191c"/>
      <stop offset="100%" stop-color="#07080a"/>
    </radialGradient>
    <linearGradient id="${prefix}-lampglass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
      <stop offset="42%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="${prefix}-mesh" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#12151a"/>
      <path d="M0 8 L8 0 M-2 2 L2 -2 M6 10 L10 6" stroke="#6a7380" stroke-width="0.7"/>
    </pattern>`;
}

function bodyWithArches(prefix, body, holes, key) {
  const id = `${prefix}-${key}`;
  const circles = holes.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#000"/>`).join('');
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="840" height="480">
      <path d="${body}" fill="#fff"/>${circles}
    </mask>
    <path d="${body}" fill="url(#${prefix}-paint)" mask="url(#${id})"/>`;
}

function sedanBody() {
  return `M 150 338
    C 146 292 176 250 250 232
    L 360 220
    C 410 210 440 162 510 146
    L 620 140
    C 690 140 730 168 748 206
    L 770 250
    C 786 286 784 330 752 348
    L 190 352
    C 160 352 148 346 150 338 Z`;
}

function wheel(cx, cy, r, style, prefix, brakes) {
  const chunky = style === 'offroad' || style === 'mud' || style === 'steel';
  const rim = r * (chunky ? 0.5 : style === 'aero' ? 0.74 : 0.62);
  const ring = style === 'runflat' ? `<circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="none" stroke="#d6b15e" stroke-width="2.4"/>` : '';
  const sidewall = Math.max(4, r * 0.16);
  return `
    <g class="wheel">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${prefix}-tire)"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 1.2}" fill="none" stroke="#0a0a0c" stroke-width="2"/>
      ${tread(cx, cy, r)}
      <circle cx="${cx}" cy="${cy}" r="${r - sidewall * 0.55}" fill="none" stroke="#4e545c" stroke-width="${sidewall.toFixed(1)}"/>
      <circle cx="${cx}" cy="${cy}" r="${r - sidewall}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/>
      ${ring}
      <circle cx="${cx}" cy="${cy}" r="${rim + 3.5}" fill="#0c0d10" stroke="rgba(255,255,255,.38)" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="${rim}" fill="url(#${prefix}-rim)"/>
      <circle cx="${cx}" cy="${cy}" r="${rim * 0.9}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>
      <circle cx="${cx}" cy="${cy}" r="${rim * 0.72}" fill="#1c1e22"/>
      ${brakes ? `<circle cx="${cx}" cy="${cy}" r="${rim * 0.7}" fill="none" stroke="#d23b32" stroke-width="5"/>` : `<circle cx="${cx}" cy="${cy}" r="${rim * 0.66}" fill="none" stroke="#3a3e44" stroke-width="3"/>`}
      ${spokes(cx, cy, rim * 0.86, style)}
      <circle cx="${cx}" cy="${cy}" r="${Math.max(5, rim * 0.2)}" fill="url(#${prefix}-metal)" stroke="#1a120c" stroke-width="1"/>
      <circle cx="${cx}" cy="${cy}" r="${Math.max(2, rim * 0.07)}" fill="#1a1a1a"/>
      <ellipse cx="${cx - r * 0.12}" cy="${cy - r * 0.46}" rx="${r * 0.34}" ry="${r * 0.1}" fill="#fff" opacity=".22"/>
    </g>`;
}

function tread(cx, cy, r) {
  let marks = '';
  const n = 16;
  for (let i = 0; i < n; i += 1) {
    const a = (Math.PI * 2 * i) / n;
    const x = cx + Math.cos(a) * (r * 0.9);
    const y = cy + Math.sin(a) * (r * 0.9);
    const deg = (a * 180) / Math.PI;
    marks += `<rect x="${(x - 2.4).toFixed(1)}" y="${(y - r * 0.07).toFixed(1)}" width="4.8" height="${(r * 0.15).toFixed(1)}" rx="1" fill="#050506" transform="rotate(${deg.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  return marks;
}

function spokes(cx, cy, rim, style) {
  if (style === 'aero') {
    return `<circle cx="${cx}" cy="${cy}" r="${rim * 0.86}" fill="#dfe3e6"/>
      <circle cx="${cx}" cy="${cy}" r="${rim * 0.22}" fill="#222"/>
      <circle cx="${cx - rim * 0.28}" cy="${cy}" r="${rim * 0.08}" fill="#222"/>
      <circle cx="${cx + rim * 0.28}" cy="${cy}" r="${rim * 0.08}" fill="#222"/>`;
  }
  if (style === 'steel') {
    return `<circle cx="${cx}" cy="${cy}" r="${rim * 0.9}" fill="#5c6166"/>
      ${[0, 60, 120, 180, 240, 300].map((deg) => {
        const a = (deg * Math.PI) / 180;
        const x = cx + Math.cos(a) * rim * 0.48;
        const y = cy + Math.sin(a) * rim * 0.48;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rim * 0.16}" fill="#2a2c2e"/>`;
      }).join('')}`;
  }
  const count = {
    stock: 5, sport: 12, chrome: 8, forged: 5, runflat: 5, carbonw: 8, wire: 18, offroad: 6, mud: 6, chrome20: 8,
  }[style] || 5;
  const dark = style === 'forged' || style === 'carbonw';
  const bright = style === 'chrome' || style === 'chrome20' || style === 'wire';
  const stroke = dark ? '#141414' : bright ? '#f7f7f5' : '#c5c8cc';
  const width = style === 'sport' || style === 'wire' || style === 'carbonw' ? 1.5 : style === 'forged' ? 5 : 3.4;
  let lines = '';
  for (let i = 0; i < count; i += 1) {
    const a = (Math.PI * 2 * i) / count - Math.PI / 2;
    const x2 = cx + Math.cos(a) * rim * 0.9;
    const y2 = cy + Math.sin(a) * rim * 0.9;
    lines += `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round"/>`;
  }
  if (style === 'carbonw') {
    lines += `<circle cx="${cx}" cy="${cy}" r="${rim * 0.92}" fill="none" stroke="#8f1d2c" stroke-width="2"/>`;
  }
  return lines;
}

function plate(x, y, text, small = false) {
  const w = small ? 78 : 92;
  const h = small ? 32 : 40;
  return `<g transform="translate(${x} ${y})">
    <rect width="${w}" height="${h}" rx="3" fill="#123a78" stroke="#d7c27a" stroke-width="1.5"/>
    <text x="${w / 2}" y="${small ? 21 : 26}" text-anchor="middle" fill="#f4efe2" font-family="Outfit, sans-serif" font-size="${small ? 13 : 16}" font-weight="700" letter-spacing="1">${text}</text>
  </g>`;
}

function lamp(x, y, w, h, color, rx = 3) {
  const tail = isTailColor(color);
  const housing = tail ? '#2a090c' : '#14120e';
  const bulb = tail ? '#ffd2cc' : '#fff6dd';
  const inset = 1.6;
  const iw = Math.max(2, w - inset * 2);
  const ih = Math.max(2, h - inset * 2);
  const br = Math.max(1.6, Math.min(w, h) * 0.22);
  const bx = x + w * (tail ? 0.7 : 0.66);
  const by = y + h * 0.52;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${housing}" stroke="rgba(255,255,255,.32)" stroke-width="1.1"/>
    <rect x="${(x + inset).toFixed(1)}" y="${(y + inset).toFixed(1)}" width="${iw.toFixed(1)}" height="${ih.toFixed(1)}" rx="${Math.max(1, rx - 1)}" fill="${color}"/>
    <rect x="${(x + inset).toFixed(1)}" y="${(y + inset).toFixed(1)}" width="${(iw * 0.46).toFixed(1)}" height="${ih.toFixed(1)}" rx="${Math.max(1, rx - 1)}" fill="${bulb}" opacity=".38"/>
    <circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${br.toFixed(1)}" fill="${bulb}" opacity=".82"/>
    <circle cx="${(bx - br * 0.2).toFixed(1)}" cy="${(by - br * 0.25).toFixed(1)}" r="${(br * 0.35).toFixed(1)}" fill="#fff" opacity=".8"/>`;
}

function isTailColor(color) {
  if (!color || color[0] !== '#') return false;
  const [r, g, b] = hexToRgb(color);
  return r > 150 && r > g + 30 && r > b + 30;
}

function sheen(d) {
  return `<path d="${d}" fill="none" stroke="rgba(255,255,255,.62)" stroke-width="2.2" stroke-linecap="round"/>`;
}

function mirror(x, y, prefix, flip = 1) {
  return `<g transform="translate(${x} ${y}) scale(${flip} 1)">
    <path d="M0 4 h16 c8 0 14 -2 18 -10 h-8 c-6 3 -12 6 -20 7 z" fill="#16181c" stroke="rgba(255,255,255,.38)" stroke-width="1"/>
    <path d="M2 3 h12 c4 0 8 -1 10 -5 h-6 z" fill="rgba(214,228,238,.6)"/>
  </g>`;
}

function handle(x, y, prefix) {
  return `<g transform="translate(${x} ${y})">
    <rect width="22" height="7" rx="2" fill="rgba(0,0,0,.5)"/>
    <rect x="1.2" y="1.3" width="15" height="3" rx="1.2" fill="url(#${prefix}-metal)"/>
  </g>`;
}

function emblem(x, y, prefix) {
  return `<g transform="translate(${x} ${y})">
    <circle r="11" fill="url(#${prefix}-metal)" stroke="#1a120c" stroke-width="1.2"/>
    <circle r="6.2" fill="none" stroke="#1a120c" stroke-width="1.15"/>
    <path d="M -3.2 3.2 L 0 -4 L 3.2 3.2" fill="none" stroke="#1a120c" stroke-width="1.3" stroke-linejoin="round"/>
  </g>`;
}

function grille(x, y, w, h, prefix) {
  const innerW = Math.max(4, w - 8);
  const innerH = Math.max(4, h - 8);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#0c0e12" stroke="url(#${prefix}-metal)" stroke-width="3"/>
    <rect x="${x + 4}" y="${y + 4}" width="${innerW}" height="${innerH}" fill="url(#${prefix}-mesh)"/>
    <path d="M ${x + 8} ${y + h * 0.32} H ${x + w - 8} M ${x + 8} ${y + h * 0.54} H ${x + w - 8} M ${x + 8} ${y + h * 0.76} H ${x + w - 8}" stroke="rgba(232,236,242,.32)" stroke-width="1.5"/>`;
}

function sideArt(id, cfg, prefix) {
  if (id === 'harbor') return sideHarbor(cfg, prefix);
  if (id === 'ironhorn') return sideIronhorn(cfg, prefix);
  if (id === 'breeze') return sideBreeze(cfg, prefix);
  return sideStallion(cfg, prefix);
}

function frontArt(id, cfg, prefix) {
  if (id === 'harbor') return frontHarbor(cfg, prefix);
  if (id === 'ironhorn') return frontIronhorn(cfg, prefix);
  if (id === 'breeze') return frontBreeze(cfg, prefix);
  return frontStallion(cfg, prefix);
}

function rearArt(id, cfg, prefix) {
  if (id === 'harbor') return rearHarbor(cfg, prefix);
  if (id === 'ironhorn') return rearIronhorn(cfg, prefix);
  if (id === 'breeze') return rearBreeze(cfg, prefix);
  return rearStallion(cfg, prefix);
}

function stripe(d, cfg) {
  if (!cfg.stripes) return '';
  const color = cfg.dark ? 'rgba(244,239,230,.88)' : 'rgba(18,18,18,.82)';
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"/>`;
}

function roofGlass(x, y, w, h, prefix, roof) {
  if (roof === 'none') return '';
  const width = roof === 'pano' ? w : w * 0.55;
  const fill = roof === 'carbon' ? '#1a1c1f' : `url(#${prefix}-glass)`;
  return `<rect x="${x}" y="${y}" width="${width}" height="${h}" rx="6" fill="${fill}" stroke="rgba(255,255,255,.25)" stroke-width="1"/>`;
}

function sideStallion(cfg, prefix) {
  const r = 60;
  const body = `M 46 312
    C 40 268 78 228 150 208
    L 330 192
    C 392 186 418 148 478 128
    L 590 114
    C 680 104 748 128 792 168
    L 824 214
    C 840 252 836 308 798 332
    L 748 346
    L 150 352
    C 86 352 50 338 46 312 Z`;
  return `
    ${bodyWithArches(prefix, body, [[214, 340, r + 10], [648, 342, r + 12]], 'body')}
    <path d="M 455 186 C 492 140 548 118 630 114 L 760 152 L 742 176 C 660 164 520 172 468 198 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.55)" stroke-width="2.4"/>
    ${sheen('M 500 154 C 560 136 640 132 730 150')}
    ${mirror(470, 162, prefix)}
    <path d="M 150 214 C 250 198 340 194 420 202" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3"/>
    <path d="M 168 252 C 250 236 340 232 430 244" fill="none" stroke="rgba(0,0,0,.32)" stroke-width="8" stroke-linecap="round"/>
    <path d="M 168 248 C 250 232 340 228 430 240" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="3" stroke-linecap="round"/>
    <path d="M 500 198 L 496 338" stroke="rgba(0,0,0,.45)" stroke-width="2"/>
    <path d="M 636 164 L 630 332" stroke="rgba(0,0,0,.32)" stroke-width="1.7"/>
    ${handle(430, 246, prefix)}
    ${handle(560, 232, prefix)}
    ${emblem(188, 270, prefix)}
    <path d="M 78 286 h46 l10 16 h-48 z" fill="#14120e" stroke="rgba(255,255,255,.35)"/>
    <path d="M 84 290 h32 l6 8 h-34 z" fill="#f4f1e2"/>
    <path d="M 84 290 h12 l2 8 h-13 z" fill="#fff" opacity=".55"/>
    <path d="M 86 274 h18 v7 h-14 z" fill="#2a140c" stroke="#f08a3a"/>
    <path d="M 88 276 h10 v3 h-9 z" fill="#ffb15a"/>
    <path d="M 786 228 h32 v16 h-24 z" fill="#2a090c" stroke="rgba(255,180,160,.4)"/>
    <path d="M 790 231 h18 v10 h-16 z" fill="#e23b3b"/>
    <path d="M 790 231 h6 v10 h-6 z" fill="#fff" opacity=".4"/>
    <path d="M 120 328 C 280 338 560 336 760 324" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="8" stroke-linecap="round"/>
    ${flare(214, 340, r + 6)}
    ${flare(648, 342, r + 8)}
    ${roofGlass(560, 108, 160, 20, prefix, cfg.roof === 'none' ? 'none' : cfg.roof)}
    ${stripe('M 130 286 C 320 270 540 274 790 236', cfg)}
    ${cfg.spoiler ? '<path d="M690 132 h110 l8 12 h-100 z" fill="#141414"/><path d="M734 144 v26 M790 138 v22" stroke="#141414" stroke-width="4"/>' : ''}
    ${cfg.exhaust ? `<circle cx="786" cy="338" r="7" fill="url(#${prefix}-metal)"/><circle cx="806" cy="338" r="7" fill="url(#${prefix}-metal)"/>` : '<circle cx="800" cy="336" r="5" fill="#9a9a9a"/>'}
    ${wheel(214, 340, r, cfg.wheel, prefix, cfg.brakes)}
    ${wheel(648, 342, r + 2, cfg.wheel, prefix, cfg.brakes)}`;
}

function flare(cx, cy, r) {
  return `<path d="M ${cx - r - 2} ${cy + 8} A ${r + 5} ${r + 3} 0 0 1 ${cx + r + 2} ${cy + 8}" fill="none" stroke="rgba(0,0,0,.62)" stroke-width="12" stroke-linecap="butt"/>
    <path d="M ${cx - r + 1} ${cy + 4} A ${r} ${r * 0.9} 0 0 1 ${cx + r - 1} ${cy + 4}" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="2"/>`;
}

function sideHarbor(cfg, prefix) {
  const body = `M 118 330
    C 112 286 150 246 230 230
    L 330 218
    C 378 208 402 156 470 132
    L 590 124
    L 668 124
    L 700 168
    L 724 230
    C 742 280 734 332 690 344
    L 168 350
    C 132 350 116 342 118 330 Z`;
  return `
    ${bodyWithArches(prefix, body, [[250, 348, 52], [600, 348, 52]], 'body')}
    <path d="M 400 214 C 430 156 478 132 548 126 L 640 126 L 688 168 L 676 196 L 520 204 C 460 202 420 210 400 226 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2.4"/>
    ${sheen('M 450 168 C 520 146 600 142 660 156')}
    ${mirror(430, 176, prefix)}
    <path d="M 668 126 L 724 230" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="3"/>
    <path d="M 220 236 C 300 222 350 220 400 230" fill="none" stroke="rgba(255,255,255,.38)" stroke-width="3"/>
    <path d="M 230 258 C 310 246 360 246 410 256" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="7" stroke-linecap="round"/>
    <path d="M 500 198 L 494 332" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
    <path d="M 600 168 L 594 328" stroke="rgba(0,0,0,.28)" stroke-width="1.6"/>
    ${handle(455, 250, prefix)}
    ${handle(545, 246, prefix)}
    ${emblem(196, 258, prefix)}
    ${flare(250, 348, 48)}
    ${flare(600, 348, 48)}
    <rect x="150" y="274" width="42" height="18" rx="3" fill="#14120e" stroke="rgba(255,255,255,.3)"/>
    <rect x="154" y="278" width="28" height="10" rx="2" fill="#f4f0e4"/>
    <rect x="154" y="278" width="10" height="10" rx="2" fill="#fff" opacity=".5"/>
    <rect x="156" y="260" width="18" height="10" rx="2" fill="#123044" stroke="#7ec8ff"/>
    <rect x="158" y="262" width="6" height="6" rx="1" fill="#dff6ff"/>
    <rect x="688" y="244" width="22" height="32" rx="3" fill="#2a090c" stroke="rgba(255,180,160,.35)"/>
    <rect x="692" y="248" width="14" height="24" rx="2" fill="#d23b32"/>
    <rect x="692" y="248" width="5" height="24" fill="#fff" opacity=".28"/>
    <rect x="646" y="284" width="26" height="16" rx="4" fill="#0e3b34" stroke="#9be7c4"/>
    <path d="M 160 332 C 320 340 520 340 690 328" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="7" stroke-linecap="round"/>
    ${roofGlass(500, 112, 150, 16, prefix, cfg.roof)}
    ${stripe('M 190 292 C 360 284 540 292 690 276', cfg)}
    ${wheel(250, 348, 44, cfg.wheel, prefix, false)}
    ${wheel(600, 348, 44, cfg.wheel, prefix, false)}`;
}

function sideIronhorn(cfg, prefix) {
  const extra = cfg.wheel === 'mud' ? 14 : cfg.wheel === 'offroad' ? 8 : 0;
  const lift = cfg.lift === 2 ? 28 : cfg.lift === 1 ? 14 : 0;
  const r = 60 + extra + (cfg.lift === 2 ? 8 : cfg.lift === 1 ? 4 : 0);
  const cy = 346 - lift * 0.2;
  const body = `M 40 292
    L 70 230
    L 150 196
    L 300 186
    L 340 150
    L 390 112
    L 520 104
    L 560 150
    L 560 186
    L 800 174
    L 828 210
    L 828 330
    L 70 342
    L 40 318 Z`;
  const bedColor = cfg.liner === 'spray' ? '#2a2c2e' : cfg.liner === 'dropin' ? '#4a5560' : 'rgba(0,0,0,.18)';
  let cover = '';
  if (cfg.cover === 'soft') cover = `<path d="M570 196 L800 184 L802 214 L572 220 Z" fill="#1b1d20"/>`;
  if (cfg.cover === 'hard') cover = `<path d="M568 188 L806 174 L808 208 L570 216 Z" fill="#2c3136" stroke="rgba(255,255,255,.2)"/>`;
  return `
    <g transform="translate(0 ${(-lift).toFixed(1)})">
      ${bodyWithArches(prefix, body, [[230, cy + lift, r + 10], [650, cy + lift, r + 12]], 'body')}
      <path d="M 360 176 C 386 132 424 114 470 112 L 530 112 L 548 150 L 430 168 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2.2"/>
      ${sheen('M 400 150 C 450 128 500 124 530 132')}
      ${mirror(400, 150, prefix)}
      <path d="M 572 192 L 800 180 L 806 268 L 574 276 Z" fill="${bedColor}"/>
      <path d="M 580 206 L 792 196" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
      <path d="M 580 248 L 796 236" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
      <rect x="760" y="214" width="16" height="8" rx="1" fill="url(#${prefix}-metal)"/>
      <path d="M 560 150 L 560 330" stroke="rgba(0,0,0,.45)" stroke-width="4"/>
      ${cover}
      <path d="M 210 186 C 280 176 330 176 360 184" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="3"/>
      <path d="M 200 210 C 280 200 340 200 380 210" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="7" stroke-linecap="round"/>
      <path d="M 430 168 L 426 300" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
      ${handle(390, 220, prefix)}
      ${emblem(250, 230, prefix)}
      <rect x="90" y="226" width="52" height="22" rx="3" fill="#14120e" stroke="rgba(255,255,255,.3)"/>
      <rect x="94" y="230" width="36" height="14" rx="2" fill="#f6f3ea"/>
      <rect x="94" y="230" width="12" height="14" fill="#fff" opacity=".45"/>
      <rect x="148" y="234" width="26" height="14" rx="2" fill="#14120e" stroke="rgba(255,255,255,.25)"/>
      <rect x="152" y="237" width="16" height="8" rx="1" fill="#f6f3ea"/>
      <rect x="780" y="208" width="24" height="34" rx="3" fill="#2a090c" stroke="rgba(255,180,160,.35)"/>
      <rect x="784" y="212" width="16" height="26" rx="2" fill="#c42828"/>
      <rect x="784" y="212" width="5" height="26" fill="#fff" opacity=".3"/>
      ${cfg.lightbar ? '<rect x="430" y="86" width="120" height="14" rx="3" fill="#222"/><rect x="438" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="466" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="494" y="89" width="22" height="8" fill="#f4f1c8"/><rect x="522" y="89" width="22" height="8" fill="#f4f1c8"/>' : ''}
      ${cfg.winch ? `<rect x="70" y="300" width="54" height="16" rx="2" fill="url(#${prefix}-metal)"/>` : ''}
      ${cfg.exhaust ? `<circle cx="40" cy="300" r="8" fill="url(#${prefix}-metal)"/><circle cx="40" cy="278" r="8" fill="url(#${prefix}-metal)"/>` : ''}
      <path d="M 120 286 h80 v8 h-80z" fill="url(#${prefix}-metal)"/>
    </g>
    ${flare(230, cy, r + 2)}
    ${flare(650, cy, r + 4)}
    ${wheel(230, cy, r, cfg.wheel, prefix, false)}
    ${wheel(650, cy, r + 2, cfg.wheel, prefix, false)}`;
}

function sideBreeze(cfg, prefix) {
  const body = `M 120 328
    C 114 286 150 250 220 234
    L 360 220
    L 470 216
    L 620 228
    C 700 240 748 270 760 304
    C 770 330 750 348 710 350
    L 180 354
    C 140 354 118 344 120 328 Z`;
  const top = `<path class="top-canvas" d="M 468 214
      C 510 168 590 158 660 176
      C 710 190 734 220 742 252
      L 700 258
      C 680 220 580 210 500 236 Z" fill="${cfg.topColor}" stroke="rgba(255,255,255,.2)"/>
    <path class="top-canvas" d="M 520 196 C 580 180 650 184 710 208" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2"/>`;
  const glass = `<path d="M 400 220 C 430 168 490 150 560 156 L 590 214 C 520 206 450 210 408 232 Z" fill="url(#${prefix}-glass)"/>`;
  const cockpit = `<g class="cockpit">
      <path d="M 470 236 C 520 214 620 214 680 240 L 690 280 L 470 286 Z" fill="#2a221c"/>
      <path d="M 530 236 C 560 220 610 220 640 240 L 636 268 L 524 270 Z" fill="#4a3b32"/>
      <rect x="600" y="228" width="28" height="14" rx="5" fill="#241c18"/>
      ${cfg.deflector ? '<path d="M 455 196 h10 l18 78 h-10 z" fill="rgba(190,220,235,.4)" stroke="rgba(255,255,255,.45)"/>' : ''}
    </g>`;
  return `
    ${bodyWithArches(prefix, body, [[268, 346, 54], [590, 346, 54]], 'body')}
    ${cockpit}
    ${top}
    ${glass.replace('fill="url(#', 'stroke="rgba(186,206,220,.55)" stroke-width="2.2" fill="url(#')}
    ${sheen('M 430 190 C 480 168 540 164 580 176')}
    ${mirror(455, 188, prefix)}
    <path d="M 210 240 C 300 224 380 220 460 228" fill="none" stroke="rgba(255,255,255,.36)" stroke-width="3"/>
    <path d="M 220 262 C 310 248 390 246 460 254" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="7" stroke-linecap="round"/>
    <path d="M 470 228 L 466 336" stroke="rgba(0,0,0,.4)" stroke-width="2"/>
    ${handle(400, 268, prefix)}
    ${handle(530, 276, prefix)}
    ${emblem(210, 268, prefix)}
    ${flare(268, 346, 50)}
    ${flare(590, 346, 50)}
    <rect x="160" y="282" width="42" height="16" rx="6" fill="#14120e" stroke="rgba(255,255,255,.3)"/>
    <rect x="164" y="285" width="28" height="10" rx="4" fill="#f7f3ea"/>
    <rect x="164" y="285" width="10" height="10" rx="4" fill="#fff" opacity=".5"/>
    <rect x="718" y="280" width="24" height="28" rx="6" fill="#2a090c" stroke="rgba(255,180,160,.35)"/>
    <rect x="722" y="284" width="16" height="20" rx="4" fill="#d23b32"/>
    <rect x="722" y="284" width="6" height="20" rx="2" fill="#fff" opacity=".3"/>
    <path d="M 180 334 C 340 342 520 342 700 332" fill="none" stroke="rgba(0,0,0,.32)" stroke-width="7" stroke-linecap="round"/>
    ${stripe('M 190 300 C 360 290 540 300 720 292', cfg)}
    ${wheel(268, 346, 46, cfg.wheel, prefix, false)}
    ${wheel(590, 346, 46, cfg.wheel, prefix, false)}`;
}

function wheelSize(cfg, base) {
  return { r: base, arch: base + 10 };
}

function frontStallion(cfg, prefix) {
  return `
    <path d="M250 150 L590 150 L640 210 L670 300 L640 360 L200 360 L170 300 L200 210 Z" fill="url(#${prefix}-paint)"/>
    <path d="M280 158 L560 158 L600 206 L240 206 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
    ${sheen('M 310 170 H 430')}
    ${mirror(196, 168, prefix)}
    ${mirror(644, 168, prefix, -1)}
    <path d="M300 210 C 360 236 480 236 540 210" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
    <path d="M250 228 H 590" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
    ${lamp(214, 250, 78, 22, '#f4f1e2', 3)}
    ${lamp(548, 250, 78, 22, '#f4f1e2', 3)}
    ${grille(348, 246, 144, 78, prefix)}
    ${emblem(420, 284, prefix)}
    <path d="M200 322 h78 v22 h-78 z" fill="#111" stroke="rgba(255,255,255,.12)"/>
    <path d="M562 322 h78 v22 h-78 z" fill="#111" stroke="rgba(255,255,255,.12)"/>
    ${cfg.spoiler ? '<path d="M230 118 h380 v16 h-380 z" fill="#161616"/>' : ''}
    ${stripe('M 420 210 V 340', cfg)}
    ${wheel(188, 332, 52, cfg.wheel, prefix, cfg.brakes)}
    ${wheel(652, 332, 52, cfg.wheel, prefix, cfg.brakes)}
    ${plate(376, 326, 'VITT', true)}`;
}

function frontHarbor(cfg, prefix) {
  return `
    <path d="M250 120 L590 120 L650 190 L670 250 L650 360 L190 360 L170 250 L190 190 Z" fill="url(#${prefix}-paint)"/>
    <path d="M290 128 L550 128 L590 186 L250 186 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
    ${sheen('M 320 146 H 460')}
    ${mirror(210, 150, prefix)}
    ${mirror(630, 150, prefix, -1)}
    <path d="M280 196 C 350 220 490 220 560 196" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    ${lamp(210, 228, 70, 30, '#f7f4ea', 8)}
    ${lamp(560, 228, 70, 30, '#f7f4ea', 8)}
    ${grille(360, 232, 120, 54, prefix)}
    <rect x="384" y="246" width="72" height="22" rx="4" fill="#9be7c4"/>
    <text x="420" y="261" text-anchor="middle" font-size="11" font-family="Outfit, sans-serif" fill="#0e3b34" font-weight="700">HYBRID</text>
    <path d="M300 304 h240 v8 h-240 z" fill="#143044" stroke="#67c7ff" stroke-width="2"/>
    ${roofGlass(360, 112, 120, 16, prefix, cfg.roof)}
    ${wheel(200, 338, 46, cfg.wheel, prefix, false)}
    ${wheel(640, 338, 46, cfg.wheel, prefix, false)}
    ${plate(374, 318, 'HRBR', true)}`;
}

function frontIronhorn(cfg, prefix) {
  const lift = cfg.lift === 2 ? 28 : cfg.lift === 1 ? 12 : 0;
  const r = 58 + (cfg.wheel === 'mud' ? 12 : cfg.wheel === 'offroad' ? 8 : 0) + (cfg.lift === 2 ? 8 : 0);
  return `
    <g transform="translate(0 ${-lift})">
      <path d="M200 70 L640 70 L690 150 L710 250 L680 360 L160 360 L130 250 L150 150 Z" fill="url(#${prefix}-paint)"/>
      <path d="M250 78 L590 78 L630 146 L210 146 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
      ${sheen('M 280 100 H 480')}
      ${mirror(188, 96, prefix)}
      ${mirror(652, 96, prefix, -1)}
      <path d="M240 156 C 330 178 510 178 600 156" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
      ${lamp(188, 176, 90, 38, '#f4f1e4', 4)}
      ${lamp(562, 176, 90, 38, '#f4f1e4', 4)}
      <rect x="300" y="186" width="240" height="112" rx="4" fill="url(#${prefix}-metal)" stroke="#5c656e" stroke-width="3"/>
      <rect x="308" y="194" width="224" height="96" fill="url(#${prefix}-mesh)"/>
      <path d="M316 210 h208 M316 232 h208 M316 254 h208 M316 276 h208" stroke="rgba(255,255,255,.35)" stroke-width="5"/>
      ${emblem(420, 242, prefix)}
      ${cfg.winch ? `<rect x="360" y="308" width="120" height="28" rx="4" fill="url(#${prefix}-metal)"/><circle cx="420" cy="322" r="10" fill="#222"/>` : ''}
      ${cfg.lightbar ? '<rect x="300" y="46" width="240" height="18" rx="3" fill="#1a1a1a"/><rect x="312" y="50" width="36" height="10" fill="#fff6c8"/><rect x="356" y="50" width="36" height="10" fill="#fff6c8"/><rect x="400" y="50" width="36" height="10" fill="#fff6c8"/><rect x="444" y="50" width="36" height="10" fill="#fff6c8"/><rect x="488" y="50" width="36" height="10" fill="#fff6c8"/>' : ''}
      <path d="M160 330 h120 v16 h-120 z" fill="url(#${prefix}-metal)"/>
      <path d="M560 330 h120 v16 h-120 z" fill="url(#${prefix}-metal)"/>
    </g>
    ${wheel(176, 340, r * 0.92, cfg.wheel, prefix, false)}
    ${wheel(664, 340, r * 0.92, cfg.wheel, prefix, false)}`;
}

function frontBreeze(cfg, prefix) {
  return `
    <path d="M230 190 L610 190 L660 250 L670 340 L620 370 L220 370 L170 340 L180 250 Z" fill="url(#${prefix}-paint)"/>
    <path class="top-canvas" d="M300 120 L540 120 L590 190 L250 190 Z" fill="${cfg.topColor}" stroke="rgba(255,255,255,.2)"/>
    <path d="M270 150 L570 150 L600 196 L240 196 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.5)" stroke-width="2"/>
    ${sheen('M 310 164 H 470')}
    ${mirror(214, 168, prefix)}
    ${mirror(626, 168, prefix, -1)}
    <path d="M260 210 C 340 228 500 228 580 210" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="2"/>
    ${lamp(210, 258, 64, 38, '#f7f4ea', 16)}
    ${lamp(566, 258, 64, 38, '#f7f4ea', 16)}
    ${grille(372, 262, 96, 52, prefix)}
    ${emblem(420, 288, prefix)}
    ${stripe('M 420 200 V 340', cfg)}
    ${wheel(196, 340, 50, cfg.wheel, prefix, false)}
    ${wheel(644, 340, 50, cfg.wheel, prefix, false)}
    ${plate(374, 322, 'BRZ', true)}`;
}

function rearStallion(cfg, prefix) {
  return `
    <path d="M230 150 L610 150 L660 230 L680 340 L640 372 L200 372 L160 340 L180 230 Z" fill="url(#${prefix}-paint)"/>
    <path d="M280 158 L560 158 L520 210 L320 210 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
    ${sheen('M 340 176 H 470')}
    <path d="M250 214 H 590" stroke="rgba(0,0,0,.35)" stroke-width="2"/>
    <path d="M240 228 H 600" stroke="rgba(255,255,255,.12)" stroke-width="2"/>
    ${lamp(196, 248, 92, 26, '#e23b3b', 3)}
    ${lamp(552, 248, 92, 26, '#e23b3b', 3)}
    ${emblem(420, 236, prefix)}
    <path d="M220 332 h400 v18 h-400 z" fill="rgba(0,0,0,.35)" stroke="rgba(255,255,255,.08)"/>
    ${cfg.spoiler ? '<path d="M180 112 h480 v18 h-480 z" fill="#141414"/><path d="M230 130 v24 M610 130 v24" stroke="#141414" stroke-width="6"/>' : ''}
    ${cfg.exhaust ? `<circle cx="250" cy="348" r="10" fill="url(#${prefix}-metal)"/><circle cx="590" cy="348" r="10" fill="url(#${prefix}-metal)"/>` : `<circle cx="270" cy="346" r="7" fill="#777"/>`}
    ${stripe('M 420 210 V 330', cfg)}
    ${wheel(190, 366, 48, cfg.wheel, prefix, cfg.brakes)}
    ${wheel(650, 366, 48, cfg.wheel, prefix, cfg.brakes)}
    ${plate(374, 296, 'VITT', true)}`;
}

function rearHarbor(cfg, prefix) {
  return `
    <path d="M230 130 L610 130 L660 200 L670 360 L180 360 L170 200 Z" fill="url(#${prefix}-paint)"/>
    <path d="M300 140 L540 140 L500 200 L340 200 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
    ${sheen('M 350 158 H 490')}
    <path d="M250 206 H 590" stroke="rgba(0,0,0,.32)" stroke-width="2"/>
    ${lamp(200, 226, 84, 38, '#d23b32', 4)}
    ${lamp(556, 226, 84, 38, '#d23b32', 4)}
    ${emblem(420, 218, prefix)}
    <path d="M360 250 h120 v70 h-120 z" fill="rgba(0,0,0,.25)" stroke="rgba(255,255,255,.2)"/>
    <path d="M372 262 h96 M360 286 h120 M372 308 h96" stroke="rgba(255,255,255,.16)" stroke-width="1.5"/>
    <rect x="404" y="274" width="32" height="10" rx="2" fill="url(#${prefix}-metal)"/>
    ${wheel(200, 364, 42, cfg.wheel, prefix, false)}
    ${wheel(640, 364, 42, cfg.wheel, prefix, false)}
    ${plate(374, 292, 'HRBR')}`;
}

function rearIronhorn(cfg, prefix) {
  const lift = cfg.lift === 2 ? 26 : cfg.lift === 1 ? 12 : 0;
  const r = 58 + (cfg.wheel === 'mud' ? 10 : 0);
  const tail = cfg.cover === 'hard' ? '#2c3136' : cfg.cover === 'soft' ? '#1b1d20' : `url(#${prefix}-paint)`;
  return `
    <g transform="translate(0 ${-lift})">
      <path d="M170 90 L670 90 L710 170 L720 250 L690 360 L150 360 L120 250 L130 170 Z" fill="url(#${prefix}-paint)"/>
      <path d="M250 100 L590 100 L560 160 L280 160 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
      ${sheen('M 310 118 H 520')}
      <path d="M230 168 H 610" stroke="rgba(0,0,0,.32)" stroke-width="2"/>
      ${lamp(175, 196, 104, 36, '#d23b32', 3)}
      ${lamp(561, 196, 104, 36, '#d23b32', 3)}
      ${emblem(420, 178, prefix)}
      <rect x="300" y="210" width="240" height="120" fill="${tail}" stroke="rgba(255,255,255,.2)"/>
      <path d="M312 232 h216 M300 268 h240 M312 304 h216" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
      <rect x="404" y="252" width="32" height="12" rx="2" fill="url(#${prefix}-metal)"/>
      ${cfg.exhaust ? `<circle cx="150" cy="340" r="9" fill="url(#${prefix}-metal)"/><circle cx="690" cy="340" r="9" fill="url(#${prefix}-metal)"/>` : ''}
    </g>
    ${wheel(160, 370, r, cfg.wheel, prefix, false)}
    ${wheel(680, 370, r, cfg.wheel, prefix, false)}
    ${plate(374, 276, '1500', true)}`;
}

function rearBreeze(cfg, prefix) {
  return `
    <path d="M230 180 L610 180 L660 250 L670 360 L170 360 L180 250 Z" fill="url(#${prefix}-paint)"/>
    <path class="top-canvas" d="M300 120 L540 120 L590 180 L250 180 Z" fill="${cfg.topColor}" stroke="rgba(255,255,255,.18)"/>
    <path d="M320 150 L520 150 L490 196 L350 196 Z" fill="url(#${prefix}-glass)" stroke="rgba(186,206,220,.45)" stroke-width="2"/>
    ${sheen('M 360 164 H 480')}
    <path d="M250 206 H 590" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
    ${lamp(200, 246, 74, 32, '#d23b32', 8)}
    ${lamp(566, 246, 74, 32, '#d23b32', 8)}
    ${emblem(420, 228, prefix)}
    <path d="M230 332 h380 v16 h-380 z" fill="rgba(0,0,0,.32)"/>
    ${wheel(196, 366, 46, cfg.wheel, prefix, false)}
    ${wheel(644, 366, 46, cfg.wheel, prefix, false)}
    ${plate(374, 292, 'BRZ')}`;
}
