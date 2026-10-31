/** Bust cards for the pre-game story. Original lot portraits, same people as the small faces. */

export function vinnyStoryArt() {
  return `<svg class="story-svg" viewBox="0 0 360 300" aria-hidden="true">
    <defs>
      <radialGradient id="vinny-spot" cx="50%" cy="22%" r="58%">
        <stop offset="0%" stop-color="#ffb25a" stop-opacity="0.42"/>
        <stop offset="58%" stop-color="#5c1e2c" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#07080d" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="vinny-coat" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3a4048"/>
        <stop offset="100%" stop-color="#1c2026"/>
      </linearGradient>
    </defs>
    <rect width="360" height="300" fill="#100c10"/>
    <rect width="360" height="300" fill="url(#vinny-spot)"/>
    <path d="M40 300c16-40 70-70 140-76 70 6 124 36 140 76z" fill="url(#vinny-coat)"/>
    <path d="M128 198l52-16 52 16v102H128z" fill="#23272d"/>
    <path d="M158 190h44l8 110h-60z" fill="#f4f1ea"/>
    <path d="M174 198l6 16 6-16 8 102h-28z" fill="#6e2434"/>
    <path d="M214 214h18l-2 14h-14z" fill="#f6f1e7"/>
    <path d="M166 156h28v40h-28z" fill="#c9845a"/>
    <path d="M132 118c2-4 8-22 16-28 2 12 4 22 2 32-6 2-14 2-18-4z" fill="#c9845a" stroke="#1a120c" stroke-width="1.6"/>
    <path d="M228 118c-2-4-8-22-16-28-2 12-4 22-2 32 6 2 14 2 18-4z" fill="#c9845a" stroke="#1a120c" stroke-width="1.6"/>
    <path d="M148 92c1-16 12-32 32-34 18-2 32 10 34 28 2 16 2 34-2 50-4 14-14 24-32 26-16 2-30-6-36-20-6-14-8-32-6-48-1-8 4-16 10-2z" fill="#d4926a" stroke="#1a120c" stroke-width="2"/>
    <path d="M156 128c4 16 14 26 24 28 10-2 18-12 22-28-10 6-36 6-46 0z" fill="#b56d48" opacity=".4"/>
    <path d="M136 108c-2-28 8-58 28-70 16-10 36-8 52 4 14 10 24 36 22 64-4 6-14 2-18-10-6-22-18-36-36-34-16 2-26 16-30 36-2 8-10 14-18 10z" fill="#14110f"/>
    <path d="M162 48c10-14 28-16 40-4 4 10-4 14-14 10-8-4-18-4-26-6z" fill="#2c261f"/>
    <path d="M158 78c8-6 18-8 28-2" fill="none" stroke="#3a332c" stroke-width="2" stroke-linecap="round"/>
    <path d="M150 112c10-4 18-3 24 2" fill="none" stroke="#1a120c" stroke-width="3" stroke-linecap="round"/>
    <path d="M186 110c8-5 18-3 26 3" fill="none" stroke="#1a120c" stroke-width="3" stroke-linecap="round"/>
    <path d="M154 118c6 2 14 3 18 0" fill="#8a5a40" opacity=".7"/>
    <path d="M190 118c4-2 12-2 18 1" fill="#8a5a40" opacity=".7"/>
    <ellipse cx="164" cy="122" rx="5" ry="2.6" fill="#1a120c"/>
    <ellipse cx="200" cy="122" rx="5" ry="2.6" fill="#1a120c"/>
    <path d="M176 118c.6 8 .4 14 0 20" fill="none" stroke="#a86b52" stroke-width="2" stroke-linecap="round"/>
    <path d="M168 136c2 1 5 1.4 8 .4" fill="none" stroke="#8d4a3a" stroke-width="1.2"/>
    <path d="M152 150c8-2 16-4 24-2 8 1 16 4 26 8 2 4 0 8-6 10-10 3-28 2-40-2-6-2-8-6-4-14z" fill="#14110f"/>
    <path d="M160 172c8 3 18 3 26 0" fill="none" stroke="#5c3030" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M70 248c28-16 70-22 110-8" fill="none" stroke="#ffb25a" stroke-width="1.2" opacity=".4"/>
  </svg>`;
}

export function rickyStoryArt() {
  return `<svg class="story-svg" viewBox="0 0 360 300" aria-hidden="true">
    <defs>
      <radialGradient id="ricky-spot" cx="48%" cy="24%" r="60%">
        <stop offset="0%" stop-color="#9ec4ff" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#07080d" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="ricky-suit" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e7f0f8"/>
        <stop offset="100%" stop-color="#8ea4b8"/>
      </linearGradient>
    </defs>
    <rect width="360" height="300" fill="#0c121c"/>
    <rect width="360" height="300" fill="url(#ricky-spot)"/>
    <g opacity=".55" stroke="#ffb25a" stroke-width="2" fill="none">
      <path d="M28 70h18M36 62v18M310 54h16M318 46v16M64 40h12M70 34v12"/>
    </g>
    <path d="M46 300c18-78 58-118 134-128 78 8 122 52 140 128z" fill="url(#ricky-suit)"/>
    <path d="M150 176h60l10 124h-80z" fill="#1a3a52"/>
    <path d="M176 176l-8 124h24l-6-124z" fill="#c9a24a"/>
    <path d="M128 170c12 24 20 40 16 78h-30c0-30 4-52 14-78z" fill="#f0c39a"/>
    <path d="M232 170c-12 24-20 40-16 78h30c0-30-4-52-14-78z" fill="#f0c39a"/>
    <ellipse cx="180" cy="128" rx="56" ry="62" fill="#f4c9a4"/>
    <path d="M118 112c6-46 26-70 62-70s54 22 60 68c-18-20-40-28-62-28s-44 8-60 30z" fill="#141311"/>
    <path d="M132 78c20-16 40-16 52-4" fill="#2a2824" opacity=".9"/>
    <ellipse cx="168" cy="86" rx="18" ry="7" fill="#fff" opacity=".18"/>
    <path d="M136 124c8-8 20-6 26 2" fill="none" stroke="#2a211c" stroke-width="3" stroke-linecap="round"/>
    <path d="M198 122c10-8 22-4 28 4" fill="none" stroke="#2a211c" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="152" cy="140" rx="9" ry="6.5" fill="#2a211c"/>
    <ellipse cx="210" cy="140" rx="9" ry="6.5" fill="#2a211c"/>
    <ellipse cx="154" cy="139" rx="2.6" ry="1.8" fill="#fff"/>
    <ellipse cx="212" cy="139" rx="2.6" ry="1.8" fill="#fff"/>
    <path d="M174 148c3 14 2 22-1 30" fill="none" stroke="#d7a784" stroke-width="2.2"/>
    <path d="M150 186c12 14 46 14 60-2" fill="#fff" stroke="#9a3d3d" stroke-width="2.6"/>
    <path d="M168 184c4 6 10 8 16 4" fill="#fff"/>
    <path d="M178 188c2 4 6 4 8 1" fill="none" stroke="#e7e4dc" stroke-width="1.4"/>
    <path d="M250 64c28 10 40 28 36 48" fill="none" stroke="#ffb25a" stroke-width="1.4" opacity=".7"/>
  </svg>`;
}

export function goalStoryArt() {
  return `<svg class="story-svg" viewBox="0 0 360 300" aria-hidden="true">
    <defs>
      <linearGradient id="goal-desk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3a2a1c"/>
        <stop offset="100%" stop-color="#1a120c"/>
      </linearGradient>
    </defs>
    <rect width="360" height="300" fill="#07080d"/>
    <ellipse cx="180" cy="40" rx="120" ry="28" fill="#ffb25a" opacity=".16"/>
    <path d="M36 168h288l28 112H8z" fill="url(#goal-desk)"/>
    <path d="M36 168h288" stroke="#e6c98a" stroke-width="2" opacity=".7"/>
    <rect x="78" y="78" width="110" height="78" rx="6" fill="#f6f1e7" transform="rotate(-8 133 117)"/>
    <path d="M96 104h62M96 118h48M96 132h40" stroke="#8a8378" stroke-width="3" stroke-linecap="round" transform="rotate(-8 133 117)"/>
    <path d="M168 96c10 8 14 18 8 28" fill="none" stroke="#1f6b45" stroke-width="4" stroke-linecap="round" transform="rotate(-8 172 110)"/>
    <g transform="translate(228 78) rotate(28)" fill="none" stroke="#f0d7a2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="18" r="14"/>
      <circle cx="18" cy="18" r="5" fill="#0c1016" stroke-width="3"/>
      <path d="M30 26l62 48"/>
      <path d="M70 56l12 4M80 64l12 4M90 72l10 6"/>
    </g>
    <rect x="70" y="196" width="220" height="14" rx="7" fill="#1c2230" stroke="#f6f1e7" stroke-width="1.4"/>
    <rect x="74" y="200" width="92" height="6" rx="3" fill="#9ddec0"/>
    <path d="M168 190v26" stroke="#fff" stroke-width="2"/>
    <text x="70" y="232" fill="#f0d7a2" font-family="Georgia, serif" font-size="13" letter-spacing="1.5">UNDER THE LINE</text>
    <path d="M250 214c22 8 36 6 48-6" fill="none" stroke="#ffb25a" stroke-width="1.5" opacity=".8"/>
  </svg>`;
}
