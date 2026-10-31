import rickyStoryUrl from './assets/ricky-story.jpg';
import vinnyStoryUrl from './assets/vinny-story.jpg';

/** Bust cards for the pre-game story. Vinny and Ricky are the approved portraits. The job stays drawn. */

export function vinnyStoryArt() {
  return `<img class="story-photo" src="${vinnyStoryUrl}" alt="">`;
}

export function rickyStoryArt() {
  return `<img class="story-photo ricky-story" src="${rickyStoryUrl}" alt="">`;
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
