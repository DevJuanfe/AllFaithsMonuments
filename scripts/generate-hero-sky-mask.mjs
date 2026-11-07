// DC-051: extract a soft (feathered) sky matte from the original photograph.
// Only the mask is generated: the photograph and its product details are untouched.
// The matte only drives colour/light layers, so a feathered edge reads as light
// spilling through the foliage instead of a cut-out halo.
// Run with BROWSER_PATH if Chrome/Edge is installed in a nonstandard location.
import { chromium } from 'playwright-core';
import { readFile, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const source = new URL('../public/assets/img/Photo1-graveyard.webp', import.meta.url);
const destination = new URL('../public/assets/hero-sky-mask.webp', import.meta.url);
const candidates = [process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean);
let executablePath;
for (const candidate of candidates) {
  try { await access(candidate); executablePath = candidate; break; } catch { /* Try next browser. */ }
}
const photograph = await readFile(source);
const browser = await chromium.launch({ executablePath, headless: true });
try {
  const page = await browser.newPage();
  const dataUrl = await page.evaluate(async (base64) => {
    const photo = new Image();
    photo.src = `data:image/webp;base64,${base64}`;
    await photo.decode();
    const width = photo.naturalWidth;
    const height = photo.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(photo, 0, 0);
    const { data } = context.getImageData(0, 0, width, height);
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const horizonEnd = Math.min(520, height);

    // 1. Continuous sky alpha (blue sky and pale neutral clouds).
    let alpha = new Float32Array(width * height);
    for (let y = 0; y < horizonEnd; y++) {
      const horizon = clamp((horizonEnd - y) / 60);
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const cloud = clamp((Math.min(r, g, b) - 135) / 30) * clamp((40 - (Math.max(r, g, b) - Math.min(r, g, b))) / 20);
        const blue = Math.min(clamp((b - r + 6) / 24), clamp((b - g + 6) / 24), clamp((b - 40) / 50));
        alpha[y * width + x] = Math.max(cloud, blue) * horizon;
      }
    }

    // 2. Slight dilation so the tint reaches into the fringe of the leaves.
    const dilate = (input, radius) => {
      const out = new Float32Array(input.length);
      const tmp = new Float32Array(input.length);
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        let m = 0;
        for (let d = -radius; d <= radius; d++) { const xx = x + d; if (xx >= 0 && xx < width) m = Math.max(m, input[y * width + xx]); }
        tmp[y * width + x] = m;
      }
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        let m = 0;
        for (let d = -radius; d <= radius; d++) { const yy = y + d; if (yy >= 0 && yy < height) m = Math.max(m, tmp[yy * width + x]); }
        out[y * width + x] = m;
      }
      return out;
    };

    // 3. Separable box blur, three passes ≈ gaussian feather.
    const blur = (input, radius) => {
      const tmp = new Float32Array(input.length);
      const out = new Float32Array(input.length);
      const size = radius * 2 + 1;
      for (let y = 0; y < height; y++) {
        let sum = 0;
        for (let d = -radius; d <= radius; d++) sum += input[y * width + Math.min(width - 1, Math.max(0, d))];
        for (let x = 0; x < width; x++) {
          tmp[y * width + x] = sum / size;
          sum += input[y * width + Math.min(width - 1, x + radius + 1)] - input[y * width + Math.max(0, x - radius)];
        }
      }
      for (let x = 0; x < width; x++) {
        let sum = 0;
        for (let d = -radius; d <= radius; d++) sum += tmp[Math.min(height - 1, Math.max(0, d)) * width + x];
        for (let y = 0; y < height; y++) {
          out[y * width + x] = sum / size;
          sum += tmp[Math.min(height - 1, y + radius + 1) * width + x] - tmp[Math.max(0, y - radius) * width + x];
        }
      }
      return out;
    };

    alpha = dilate(alpha, 3);
    for (let pass = 0; pass < 3; pass++) alpha = blur(alpha, 4);

    const output = context.createImageData(width, height);
    for (let p = 0; p < alpha.length; p++) {
      output.data[p * 4] = 255;
      output.data[p * 4 + 1] = 255;
      output.data[p * 4 + 2] = 255;
      output.data[p * 4 + 3] = Math.round(clamp(alpha[p]) * 255);
    }
    context.putImageData(output, 0, 0);
    return canvas.toDataURL('image/webp', 0.9);
  }, photograph.toString('base64'));
  const mask = Buffer.from(dataUrl.split(',')[1], 'base64');
  await writeFile(destination, mask);
  const hash = createHash('sha256').update(photograph).digest('hex');
  console.log(`Soft sky matte generated (${mask.length} bytes); source SHA-256 ${hash}.`);
} finally {
  await browser.close();
}
