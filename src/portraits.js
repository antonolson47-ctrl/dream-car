import rickyStoryUrl from './assets/ricky-story.jpg';

export function vinnyFace() {
  return `
    <svg class="face vinny-face" viewBox="0 0 80 96" aria-hidden="true">
      <rect width="80" height="96" rx="8" fill="#14181e"/>
      <path d="M2 76c8-16 20-24 38-24s30 8 38 24v20H2z" fill="#2c3340"/>
      <path d="M22 70l14 14 8-8 14-6v20H22z" fill="#243044"/>
      <path d="M30 68l10 16 10-16h6v28H24z" fill="#f7f4ee"/>
      <path d="M36 74l4 8 4-8 3 22h-14z" fill="#6b1d32"/>
      <path d="M54 72h7l-1 6h-5z" fill="#f6f1e7"/>
      <path d="M33 56h14v14H33z" fill="#c9845a"/>
      <path d="M20 44c2-10 6-16 10-14 1 8 0 16-2 22-3 1-7 0-8-8z" fill="#c9845a"/>
      <path d="M60 44c-2-10-6-16-10-14-1 8 0 16 2 22 3 1 7 0 8-8z" fill="#c9845a"/>
      <path d="M24 34c1-12 7-20 16-21 9-1 15 7 16 21 1 8 0 16-2 24-4 7-8 11-14 11s-10-4-14-11c-2-8-3-16-2-24z" fill="#d4926a"/>
      <path d="M27 46c3 8 8 13 13 14 5-1 10-6 13-14-7 3-19 3-26 0z" fill="#b56b45" opacity=".38"/>
      <path d="M18 46C16 26 22 8 34 4C44 0 56 6 62 16C68 28 66 42 62 48L54 44C52 30 46 24 40 26C32 28 26 34 24 44Z" fill="#120f0d"/>
      <path d="M28 22C36 12 48 12 56 22" fill="none" stroke="#3d342c" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M26 38c6-2 11-1 14 1.5" fill="none" stroke="#1a120c" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M42 37.5c4-2.4 9-1.2 12 2" fill="none" stroke="#1a120c" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M27 43c4 1.2 9 1.6 12 0" fill="#7a4e38" opacity=".65"/>
      <path d="M43 43c3-1.4 8-1 12 .4" fill="#7a4e38" opacity=".65"/>
      <ellipse cx="33" cy="45.5" rx="2.6" ry="1.8" fill="#1a120c"/>
      <ellipse cx="49" cy="45.5" rx="2.6" ry="1.8" fill="#1a120c"/>
      <path d="M39.2 44c.5 4.5.3 8-.3 11.5" fill="none" stroke="#a86b52" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M30 56.5c3.2-1.2 6.4-2 10-1.2 3.4.6 6.6 1.6 10 3 .8 1.8 0 3.6-2.2 4.4-4.2 1.2-11.2 1-16-.4-2.2-.8-2.8-2.4-1.8-5.8z" fill="#14110f"/>
      <path d="M34 65.5c4 1.6 8 1.6 12 0" fill="none" stroke="#6a3030" stroke-width="1.15" stroke-linecap="round"/>
    </svg>`;
}

export function rickyFace() {
  return `<img class="face" src="${rickyStoryUrl}" alt="">`;
}
