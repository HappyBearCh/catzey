import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');

mkdirSync(iconsDir, { recursive: true });

// Catzye icon: purple background, white cat-eye "C" lettermark
// The eye slit runs through the C to evoke a cat's eye
function makeSvg(size, maskable = false) {
  const pad = maskable ? size * 0.1 : size * 0.04;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - pad;

  // Arc dimensions for the C shape
  const cRadius = r * 0.52;
  const strokeWidth = r * 0.22;
  const gap = r * 0.28; // horizontal gap on the right side

  // C arc: large arc from top-right to bottom-right leaving a gap
  const startAngle = -40; // degrees from right
  const endAngle = 40;
  const toRad = (d) => (d * Math.PI) / 180;

  const x1 = cx + cRadius * Math.cos(toRad(startAngle));
  const y1 = cy + cRadius * Math.sin(toRad(startAngle));
  const x2 = cx + cRadius * Math.cos(toRad(endAngle));
  const y2 = cy + cRadius * Math.sin(toRad(endAngle));

  // Eye slit: horizontal ellipse through the C centre
  const slitRx = cRadius * 0.82;
  const slitRy = cRadius * 0.16;

  // Pupil
  const pupilR = cRadius * 0.11;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="bg" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#9f5ff7"/>
      <stop offset="100%" stop-color="#4c1d95"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e879f9" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#e879f9" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="url(#bg)"/>

  <!-- Subtle glow overlay -->
  <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.75}" ry="${r * 0.65}" fill="url(#glow)"/>

  <!-- C lettermark -->
  <path
    d="M ${x1} ${y1} A ${cRadius} ${cRadius} 0 1 0 ${x2} ${y2}"
    fill="none"
    stroke="white"
    stroke-width="${strokeWidth}"
    stroke-linecap="round"
  />

  <!-- Eye slit (cat eye through the C) -->
  <ellipse cx="${cx}" cy="${cy}" rx="${slitRx}" ry="${slitRy}" fill="white" opacity="0.92"/>

  <!-- Pupil -->
  <ellipse cx="${cx}" cy="${cy}" rx="${pupilR}" ry="${slitRy * 0.72}" fill="#4c1d95"/>
</svg>`;
}

async function generate(filename, size, maskable = false) {
  const svg = makeSvg(size, maskable);
  const svgBuffer = Buffer.from(svg);
  await sharp(svgBuffer)
    .png()
    .toFile(join(iconsDir, filename));
  console.log(`✓ ${filename} (${size}×${size})`);
}

await generate('icon-192.png', 192);
await generate('icon-512.png', 512);
await generate('icon-maskable.png', 512, true);

console.log('\nDone — icons written to public/icons/');
