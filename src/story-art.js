import vinnyStoryUrl from './assets/vinny-story.jpg';

/** Bust cards for the pre-game story. Vinny is the approved portrait. Ricky and the job stay drawn. */

export function vinnyStoryArt() {
  return `<img class="story-photo" src="${vinnyStoryUrl}" alt="">`;
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
