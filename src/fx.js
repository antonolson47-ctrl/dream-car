const COLORS = ['#ffb25a', '#f6f1e7', '#ff8f88', '#9ddec0', '#f0d7a2', '#8eb6ff', '#ffe07a'];

let raf = 0;
let rockets = [];
let sparks = [];
let hideTimer = 0;
let running = false;

export function mountFx() {
  if (document.getElementById('fx')) return;
  const layer = document.createElement('div');
  layer.id = 'fx';
  layer.innerHTML = `
    <canvas id="fx-canvas" aria-hidden="true"></canvas>
    <div id="fx-flash" hidden></div>
    <div id="fx-duo" hidden></div>`;
  document.body.appendChild(layer);
}

export function clearCelebration() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  running = false;
  rockets = [];
  sparks = [];
  clearTimeout(hideTimer);
  const canvas = document.getElementById('fx-canvas');
  const ctx = canvas?.getContext('2d');
  if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  const duo = document.getElementById('fx-duo');
  if (duo) {
    duo.hidden = true;
    duo.innerHTML = '';
  }
  const flash = document.getElementById('fx-flash');
  if (flash) flash.hidden = true;
}

function fitCanvas() {
  const canvas = document.getElementById('fx-canvas');
  if (!canvas) return null;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function showDuo(on) {
  const duo = document.getElementById('fx-duo');
  if (!duo) return;
  clearTimeout(hideTimer);
  if (!on) {
    duo.hidden = true;
    duo.innerHTML = '';
    return;
  }
  duo.hidden = false;
  duo.innerHTML = duoCard();
  hideTimer = setTimeout(() => {
    duo.hidden = true;
    duo.innerHTML = '';
  }, 9000);
}

function flash() {
  const el = document.getElementById('fx-flash');
  if (!el) return;
  el.hidden = false;
  el.classList.remove('is-on');
  void el.offsetWidth;
  el.classList.add('is-on');
  setTimeout(() => {
    el.hidden = true;
    el.classList.remove('is-on');
  }, 700);
}

export function celebrate({ intensity = 1, duo = false } = {}) {
  mountFx();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  showDuo(duo);
  if (reduced) {
    flash();
    return;
  }
  const size = fitCanvas();
  if (!size) return;
  const bursts = intensity >= 3 ? 8 : intensity >= 2 ? 5 : 3;
  for (let i = 0; i < bursts; i += 1) {
    rockets.push({
      x: size.width * (0.12 + Math.random() * 0.76),
      y: size.height + 8,
      vx: (Math.random() - 0.5) * 1.4,
      vy: -(7.2 + Math.random() * 3.4),
      color: COLORS[i % COLORS.length],
      wait: i * 90,
      age: 0,
    });
  }
  if (!running) loop();
}

function burst(x, y, color) {
  const count = 22 + Math.floor(Math.random() * 14);
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
    const speed = 1.4 + Math.random() * 3.2;
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.012 + Math.random() * 0.018,
      color: Math.random() < 0.25 ? '#fff6e4' : color,
      r: 1.4 + Math.random() * 2.1,
    });
  }
}

function loop() {
  running = true;
  const size = fitCanvas();
  if (!size) {
    running = false;
    return;
  }
  const { ctx, width, height } = size;
  ctx.clearRect(0, 0, width, height);
  const now = performance.now();
  rockets = rockets.filter((rocket) => {
    if (now < (rocket.born || (rocket.born = now + rocket.wait))) return true;
    rocket.age += 1;
    rocket.vy += 0.08;
    rocket.x += rocket.vx;
    rocket.y += rocket.vy;
    ctx.fillStyle = rocket.color;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(rocket.x, rocket.y, 3, 8);
    const popped = rocket.vy >= -1.2 || rocket.age > 70;
    if (popped) burst(rocket.x, rocket.y, rocket.color);
    return !popped;
  });
  sparks = sparks.filter((spark) => {
    spark.vy += 0.045;
    spark.x += spark.vx;
    spark.y += spark.vy;
    spark.life -= spark.decay;
    if (spark.life <= 0) return false;
    ctx.globalAlpha = Math.max(0, spark.life);
    ctx.fillStyle = spark.color;
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.r, 0, Math.PI * 2);
    ctx.fill();
    return spark.y < height + 20;
  });
  ctx.globalAlpha = 1;
  if (rockets.length || sparks.length) {
    raf = requestAnimationFrame(loop);
    return;
  }
  running = false;
  ctx.clearRect(0, 0, width, height);
}

export function celebrationCard() {
  return duoCard();
}

function duoCard() {
  return `<div class="duo-card">
    <p class="duo-kicker">Skree &amp; Dumpling</p>
    ${duoSVG()}
    <p class="duo-yell">He folded!</p>
  </div>`;
}

/**
 * Skree and Dumpling: an original manic little dog and a blissed-out cat.
 * 1990s exaggerated-cartoon energy. Not a likeness of any named character.
 */
function duoSVG() {
  return `<svg class="duo-art" viewBox="0 0 440 250" aria-hidden="true">
    <g class="duo-skree">
      <path d="M78 176c-16 10-30 28-18 40" fill="none" stroke="#1a120c" stroke-width="7" stroke-linecap="round"/>
      <path d="M78 178c-12 8-22 22-12 32" fill="none" stroke="#c5d86a" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M96 168c-2 22 2 40 12 46h12c0-16-2-32 2-46z" fill="#d7e88a" stroke="#1a120c" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="M108 188c4 8 6 16 4 22" fill="none" stroke="#7f9838" stroke-width="1.3"/>
      <ellipse cx="108" cy="214" rx="9" ry="5" fill="#f4f7dc" stroke="#1a120c" stroke-width="2.4"/>
      <path d="M102 212h3M108 211h3M114 212h3" stroke="#1a120c" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M118 112c-22 10-34 34-26 58 6 16 26 22 44 14 12-6 18-12 20-24 4-24-8-42-38-48z" fill="#e4f2a6" stroke="#1a120c" stroke-width="3.6" stroke-linejoin="round"/>
      <path d="M108 146c10 18 32 24 46 12-4-12-16-22-30-24-6 2-12 6-16 12z" fill="#a9c45a"/>
      <path d="M124 138c12 2 16 1 20-3M120 148c14 2 18 1 22-4M126 158c10 2 14 0 16-3" fill="none" stroke="#6d882c" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M112 128c-22-4-40 2-46 16-4 10 4 16 14 12 10-4 22-12 28-20z" fill="#d5e68a" stroke="#1a120c" stroke-width="3.2" stroke-linejoin="round"/>
      <ellipse cx="74" cy="152" rx="11" ry="8" fill="#f7fbe4" stroke="#1a120c" stroke-width="2.8"/>
      <path d="M66 150h4M74 148h4M82 150h4" stroke="#1a120c" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M156 126c18-12 40-6 46 10 4 12-4 18-14 14-12-4-24-12-30-20z" fill="#c3d468" stroke="#1a120c" stroke-width="3.2" stroke-linejoin="round"/>
      <ellipse cx="198" cy="146" rx="10" ry="7" fill="#f7fbe4" stroke="#1a120c" stroke-width="2.6"/>
      <path d="M120 118c8 12 10 22 6 34h26c2-14-4-26-10-38z" fill="#f3f8d4" stroke="#1a120c" stroke-width="3"/>
      <path d="M96 104c-6-36 14-64 46-66 34-2 58 22 56 56-2 28-20 48-50 50-32 2-52-12-52-40z" fill="#e7f3ae" stroke="#1a120c" stroke-width="3.8"/>
      <path d="M118 78c-8 10-6 22 2 28 6-12 8-22 6-30z" fill="#f7fbe6" opacity=".7"/>
      <path d="M104 70c-36-6-58 14-54 36-2 16 12 22 24 12 10-10 20-28 30-42z" fill="#d6e78c" stroke="#1a120c" stroke-width="3.4" stroke-linejoin="round"/>
      <path d="M92 78c-22 4-34 16-32 28 8-2 18-12 28-22z" fill="#f4b7c6"/>
      <path d="M112 52c4-14 12-18 14-8" fill="none" stroke="#1a120c" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M158 58c28-22 58-2 52 20 0 14-12 18-22 10-8-12-18-24-30-30z" fill="#d6e78c" stroke="#1a120c" stroke-width="3.4" stroke-linejoin="round"/>
      <path d="M176 62c16-6 30 2 32 14-10 0-20-6-28-10z" fill="#f4b7c6"/>
      <path d="M168 48c6-8 10-6 8 2" fill="#6d882c" stroke="#1a120c" stroke-width="1.6"/>
      <path d="M100 86c12-10 28-8 36 0" fill="none" stroke="#1a120c" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M150 80c14-10 30-4 36 6" fill="none" stroke="#1a120c" stroke-width="2.6" stroke-linecap="round"/>
      <ellipse cx="122" cy="104" rx="18" ry="20" fill="#fffdf8" stroke="#1a120c" stroke-width="3"/>
      <ellipse cx="164" cy="100" rx="14" ry="18" fill="#fffdf8" stroke="#1a120c" stroke-width="3"/>
      <ellipse cx="124" cy="106" rx="8" ry="10" fill="#e2b13a"/>
      <ellipse cx="166" cy="102" rx="6.5" ry="9" fill="#e2b13a"/>
      <ellipse cx="125" cy="108" rx="3.4" ry="5" fill="#1a120c"/>
      <ellipse cx="167" cy="104" rx="3" ry="4.4" fill="#1a120c"/>
      <circle cx="120" cy="100" r="2.2" fill="#fff"/>
      <circle cx="163" cy="97" r="1.8" fill="#fff"/>
      <path d="M106 92c10-6 22-4 28 2" fill="none" stroke="#1a120c" stroke-width="2.2" stroke-linecap="round"/>
      <ellipse cx="142" cy="124" rx="18" ry="12" fill="#f6fbe0" stroke="#1a120c" stroke-width="2.8"/>
      <ellipse cx="142" cy="120" rx="7" ry="5" fill="#241c18" stroke="#1a120c" stroke-width="1.4"/>
      <ellipse cx="140" cy="119" rx="2.2" ry="1.3" fill="#fff" opacity=".55"/>
      <path d="M124 124h-20M160 124h20M126 130h-16M158 130h16" stroke="#1a120c" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M122 134c10 12 28 14 40 2" fill="#7a2432" stroke="#1a120c" stroke-width="2.6" stroke-linejoin="round"/>
      <rect x="132" y="130" width="8" height="12" rx="1" fill="#fffdf8" stroke="#1a120c" stroke-width="1.7"/>
      <rect x="142" y="130" width="7" height="11" rx="1" fill="#fffdf8" stroke="#1a120c" stroke-width="1.7"/>
      <rect x="140" y="131" width="3.2" height="6" fill="#e6c36a"/>
      <path d="M116 146c12 8 32 10 46 0" fill="none" stroke="#6e2434" stroke-width="5" stroke-linecap="round"/>
      <circle cx="136" cy="150" r="4.5" fill="#e6c36a" stroke="#1a120c" stroke-width="1.4"/>
      <path d="M148 78c6 6 4 10-2 8" fill="none" stroke="#7eb6e0" stroke-width="2" stroke-linecap="round"/>
    </g>
    <g class="duo-dump">
      <path d="M300 168c28 6 48 2 62-16" fill="none" stroke="#1a120c" stroke-width="8" stroke-linecap="round"/>
      <path d="M304 166c24 4 40 0 52-12" fill="none" stroke="#f0c56a" stroke-width="4" stroke-linecap="round"/>
      <path d="M332 150c8 4 14 2 16-4" fill="none" stroke="#c4843a" stroke-width="2"/>
      <path d="M248 198c-2 18 4 32 16 34h16c4-14 2-28-2-40-8 4-20 6-30 6z" fill="#f0c56a" stroke="#1a120c" stroke-width="3.2"/>
      <path d="M300 200c2 16 8 30 18 32h14c2-14-2-28-8-40-8 4-18 6-24 8z" fill="#e7b45a" stroke="#1a120c" stroke-width="3.2"/>
      <ellipse cx="262" cy="232" rx="14" ry="7" fill="#f8e7c4" stroke="#1a120c" stroke-width="2.6"/>
      <ellipse cx="324" cy="232" rx="14" ry="7" fill="#f8e7c4" stroke="#1a120c" stroke-width="2.6"/>
      <circle cx="254" cy="232" r="2.2" fill="#e07a8a"/>
      <circle cx="262" cy="233" r="2.2" fill="#e07a8a"/>
      <circle cx="270" cy="232" r="2.2" fill="#e07a8a"/>
      <circle cx="316" cy="232" r="2.2" fill="#e07a8a"/>
      <circle cx="324" cy="233" r="2.2" fill="#e07a8a"/>
      <circle cx="332" cy="232" r="2.2" fill="#e07a8a"/>
      <path d="M250 118c-8 36-2 78 28 96 34 20 78 8 96-24 16-30 10-70-10-92-22-24-86-22-114 20z" fill="#f6d48a" stroke="#1a120c" stroke-width="3.8" stroke-linejoin="round"/>
      <path d="M268 168c16 28 48 36 74 16 4-16-10-34-28-44-16-8-36 4-46 28z" fill="#f3e2b8"/>
      <path d="M286 150c6 14 8 20 4 28M304 146c8 16 10 24 4 32M322 150c6 12 8 18 2 26" fill="none" stroke="#c4843a" stroke-width="2" stroke-linecap="round"/>
      <path d="M236 150c-16 4-28 16-26 28 10-2 20-10 24-20z" fill="#f0c56a" stroke="#1a120c" stroke-width="3"/>
      <ellipse cx="214" cy="176" rx="12" ry="9" fill="#f8e7c4" stroke="#1a120c" stroke-width="2.6"/>
      <path d="M360 148c18 6 28 18 24 30-12-2-22-12-24-24z" fill="#e7b45a" stroke="#1a120c" stroke-width="3"/>
      <ellipse cx="386" cy="176" rx="12" ry="9" fill="#f8e7c4" stroke="#1a120c" stroke-width="2.6"/>
      <path d="M268 78c-6-28 8-46 22-44 6 18 4 34-4 46z" fill="#f6d48a" stroke="#1a120c" stroke-width="3.2"/>
      <path d="M274 58c-2-12 4-18 10-12 0 6-2 10-6 14z" fill="#f4b7c6"/>
      <path d="M330 74c8-30 28-42 40-28 2 20-8 36-18 46z" fill="#f0c56a" stroke="#1a120c" stroke-width="3.2"/>
      <path d="M352 52c6-10 14-8 12 2-4 2-8 2-12 0z" fill="#f4b7c6"/>
      <path d="M262 70c2-12 10-16 12-6" fill="#c4843a" stroke="#1a120c" stroke-width="1.5"/>
      <path d="M348 64c4-10 10-8 8 2" fill="#c4843a" stroke="#1a120c" stroke-width="1.5"/>
      <path d="M286 112c8-14 28-16 40-4" fill="none" stroke="#1a120c" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M332 108c10-8 24-4 30 6" fill="none" stroke="#1a120c" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="292" cy="128" rx="20" ry="18" fill="#fffdf8" stroke="#1a120c" stroke-width="3"/>
      <ellipse cx="340" cy="126" rx="20" ry="18" fill="#fffdf8" stroke="#1a120c" stroke-width="3"/>
      <path d="M274 122c8 10 28 12 36 2" fill="#f6d48a"/>
      <path d="M322 120c8 10 28 12 36 2" fill="#f6d48a"/>
      <ellipse cx="294" cy="132" rx="8" ry="9" fill="#3e8f62"/>
      <ellipse cx="342" cy="130" rx="8" ry="9" fill="#3e8f62"/>
      <ellipse cx="294" cy="133" rx="3.2" ry="4.2" fill="#1a120c"/>
      <ellipse cx="342" cy="131" rx="3.2" ry="4.2" fill="#1a120c"/>
      <circle cx="290" cy="128" r="2" fill="#fff"/>
      <circle cx="338" cy="126" r="2" fill="#fff"/>
      <ellipse cx="318" cy="152" rx="8" ry="5.5" fill="#e89aaa" stroke="#1a120c" stroke-width="2"/>
      <path d="M314 150c2-2 6-2 8 0" fill="none" stroke="#fff" stroke-width="1"/>
      <path d="M292 154h-22M292 160h-18M344 154h22M344 160h18" stroke="#1a120c" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M292 168c10 8 28 10 40 2" fill="#7a2432" stroke="#1a120c" stroke-width="2.6"/>
      <path d="M332 166c6 10 2 16-6 12-6-2-10-8-8-14z" fill="#e07a8a" stroke="#1a120c" stroke-width="2"/>
      <rect x="306" y="166" width="7" height="8" rx="1" fill="#fffdf8" stroke="#1a120c" stroke-width="1.4"/>
      <path d="M300 96c8-28 20-36 24-18 2 8-2 14-8 16-6-2-12-4-16 2z" fill="#7d5cff" stroke="#1a120c" stroke-width="2.4"/>
      <circle cx="324" cy="74" r="4" fill="#ffe07a" stroke="#1a120c" stroke-width="1.5"/>
    </g>
  </svg>`;
}
