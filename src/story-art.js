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
        <stop offset="0%" stop-color="#8a3142"/>
        <stop offset="100%" stop-color="#3c101c"/>
      </linearGradient>
    </defs>
    <rect width="360" height="300" fill="#100c10"/>
    <rect width="360" height="300" fill="url(#vinny-spot)"/>
    <path d="M36 300c18-46 62-78 144-86 82 8 126 40 144 86z" fill="url(#vinny-coat)"/>
    <path d="M118 196c6-8 22-14 62-14s56 6 62 14l16 104H102z" fill="#6e2434"/>
    <path d="M166 186h28v114h-28z" fill="#4a1824"/>
    <path d="M148 214c14 6 40 8 56 0" fill="none" stroke="#e6c98a" stroke-width="2.4"/>
    <circle cx="176" cy="216" r="3.2" fill="#f0d7a2" stroke="#1a120c" stroke-width="1"/>
    <path d="M162 168h36v36h-36z" fill="#e8bc9c"/>
    <ellipse cx="146" cy="124" rx="7" ry="11" fill="#e8bc9c" stroke="#1a120c" stroke-width="1.6"/>
    <ellipse cx="214" cy="124" rx="7" ry="11" fill="#e8bc9c" stroke="#1a120c" stroke-width="1.6"/>
    <path d="M150 86c2-18 14-34 30-36 18-2 34 10 38 28 3 16 4 34 0 50-3 12-10 22-22 26-14 6-30 4-40-4-10-8-14-20-14-34-1-12 2-22 8-30z" fill="#f0c4a4" stroke="#1a120c" stroke-width="2"/>
    <path d="M156 124c3 14 10 24 24 28 12-4 20-14 24-28-8 5-40 5-48 0z" fill="#d7a484" opacity=".3"/>
    <path d="M152 96c1-26 16-44 30-44 16 0 30 16 32 40-6 2-12-2-16-12-5-14-16-20-28-18-14 2-20 12-20 26 0 4-4 8 2 8z" fill="#221c18"/>
    <path d="M168 64c8-8 18-8 24 0 2 4-2 6-8 4-6-1-12-1-16-4z" fill="#3a332c"/>
    <path d="M156 104c8-4 16-3 22 1" fill="none" stroke="#2a211c" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M184 103c7-4 15-3 20 2" fill="none" stroke="#2a211c" stroke-width="2.2" stroke-linecap="round"/>
    <ellipse cx="166" cy="114" rx="6" ry="4" fill="#fff"/>
    <ellipse cx="196" cy="114" rx="6" ry="4" fill="#fff"/>
    <ellipse cx="167" cy="114.5" rx="2.6" ry="2.6" fill="#3d2a22"/>
    <ellipse cx="197" cy="114.5" rx="2.6" ry="2.6" fill="#3d2a22"/>
    <circle cx="166" cy="113.4" r=".8" fill="#fff"/>
    <circle cx="196" cy="113.4" r=".8" fill="#fff"/>
    <path d="M178 112c.5 7 .3 12 0 18" fill="none" stroke="#c48a6a" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M172 128c1.6.8 3.2 1 4.6.3" fill="none" stroke="#b57a62" stroke-width="1"/>
    <path d="M166 136c5-.8 10-1 14-.2 4 .6 8 1.6 12 2.6" fill="none" stroke="#5a4036" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M166 146c6 4 16 5 24 0" fill="none" stroke="#8d3b3b" stroke-width="1.7" stroke-linecap="round"/>
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
