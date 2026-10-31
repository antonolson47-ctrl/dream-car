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
  }, 3600);
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

function duoCard() {
  return `<div class="duo-card">
    <p class="duo-kicker">Skree &amp; Dumpling</p>
    ${duoSVG()}
    <p class="duo-yell">He folded!</p>
  </div>`;
}

/** Original cartoon duo. Exaggerated, not a likeness of any named character. */
function duoSVG() {
  return `<svg class="duo-art" viewBox="0 0 360 148" aria-hidden="true">
    <g class="duo-skree">
      <path d="M48 118c8-28 10-46 14-58" fill="none" stroke="#1a120c" stroke-width="4" stroke-linecap="round"/>
      <path d="M92 116c-6-30-4-48-2-60" fill="none" stroke="#1a120c" stroke-width="4" stroke-linecap="round"/>
      <path d="M40 78c-16 8-22 2-18-10" fill="none" stroke="#1a120c" stroke-width="4" stroke-linecap="round"/>
      <path d="M98 76c18 6 24-2 16-14" fill="none" stroke="#1a120c" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="70" cy="58" rx="36" ry="34" fill="#d6ef7a" stroke="#1a120c" stroke-width="3"/>
      <path d="M52 28c6-14 18-16 20-4" fill="none" stroke="#1a120c" stroke-width="3" stroke-linecap="round"/>
      <circle cx="58" cy="16" r="4" fill="#1a120c"/>
      <ellipse cx="56" cy="56" rx="14" ry="16" fill="#fffdf6" stroke="#1a120c" stroke-width="2.4"/>
      <ellipse cx="86" cy="58" rx="8" ry="11" fill="#fffdf6" stroke="#1a120c" stroke-width="2.4"/>
      <rect x="52" y="58" width="5" height="7" fill="#1a120c"/>
      <rect x="84" y="60" width="4" height="5" fill="#1a120c"/>
      <path d="M50 76c8 10 22 12 34 2" fill="none" stroke="#1a120c" stroke-width="2.4" stroke-linecap="round"/>
      <rect x="60" y="74" width="7" height="9" rx="1" fill="#fffdf6" stroke="#1a120c" stroke-width="1.6"/>
      <rect x="70" y="75" width="6" height="8" rx="1" fill="#fffdf6" stroke="#1a120c" stroke-width="1.6"/>
      <path d="M58 96l12 8 12-8-6 16H64z" fill="#ff8a3d" stroke="#1a120c" stroke-width="2"/>
    </g>
    <g class="duo-dump">
      <polygon points="248,18 262,58 234,58" fill="#7d5cff" stroke="#1a120c" stroke-width="3"/>
      <circle cx="248" cy="16" r="4" fill="#ffe07a" stroke="#1a120c" stroke-width="2"/>
      <ellipse cx="230" cy="118" rx="10" ry="6" fill="#f2c14d" stroke="#1a120c" stroke-width="2.4"/>
      <ellipse cx="274" cy="118" rx="10" ry="6" fill="#f2c14d" stroke="#1a120c" stroke-width="2.4"/>
      <circle cx="252" cy="84" r="46" fill="#f2c14d" stroke="#1a120c" stroke-width="3"/>
      <path d="M214 70l10 8-10 6z" fill="#1a120c"/>
      <path d="M292 74l-12 6 10 8z" fill="#1a120c"/>
      <polygon points="230,78 238,70 246,80 238,88" fill="#fffdf6" stroke="#1a120c" stroke-width="2"/>
      <polygon points="268,76 278,70 284,80 274,88" fill="#fffdf6" stroke="#1a120c" stroke-width="2"/>
      <circle cx="238" cy="78" r="2.2" fill="#1a120c"/>
      <circle cx="276" cy="78" r="2.2" fill="#1a120c"/>
      <path d="M228 98c10 16 36 16 48 0" fill="#fffdf6" stroke="#1a120c" stroke-width="2.4"/>
      <rect x="246" y="100" width="8" height="8" fill="#fffdf6" stroke="#1a120c" stroke-width="1.5"/>
      <path d="M210 96c-6 8-2 14 6 12" fill="#ff8f88" stroke="#1a120c" stroke-width="2"/>
      <path d="M294 98c6 8 2 12-6 10" fill="#ff8f88" stroke="#1a120c" stroke-width="2"/>
    </g>
  </svg>`;
}
