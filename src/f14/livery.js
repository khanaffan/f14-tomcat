import * as THREE from 'three';
import { WING, wingPoint, FIN, finLE, finBase } from './dims.js';
import { yEdge, GA, GC, GD } from './body.js';
import { CANOPY, sillW } from './cockpit.js';
import { lerp, clamp } from './util.js';

/* Projection ranges shared with the livery shader. */
export const RANGES = {
  body: { s0: -0.2, S: 19.6, y0: -5.1, Y: 10.2, w0: -2.4, Wr: 5.2 },
  wing: { s0: 9.8, S: 4.8, y0: -9.9, Y: 19.8 },
};

const SIZES = { top: [2048, 4096], side: [4096, 2048], wing: [4096, 1024] };

export const SCHEMES = {
  lowvis: {
    name: 'Low-vis TPS (1980s-2000s)',
    upper: '#737b84',
    lower: '#9ca3a9',
    side: '#7c838b',
    radome: '#6a7076',
    antiglare: '#4d5258',
    mark: '#565c63',
    markLight: '#a9afb4',
    interior: '#33383d',
    walkway: '#626970',
    control: null,
    weather: 1.0,
    lowvis: true,
  },
  highvis: {
    name: 'Gull gray / white (1970s)',
    upper: '#a8a9a3',
    lower: '#eeeeea',
    side: '#a8a9a3',
    radome: '#a5a69f',
    antiglare: '#2a2c2e',
    mark: '#1d1d1d',
    markLight: '#ffffff',
    interior: '#33383d',
    walkway: '#5c5e5c',
    control: '#efefeb',
    weather: 0.45,
    lowvis: false,
  },
};

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

/* A "view" maps design coordinates (a, b) to canvas pixels with viewer-oriented axes. */
function makeView(ctx, kind, R, side = 1) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  if (kind === 'top' || kind === 'bottom') {
    const kx = W / R.Y;
    const ky = H / R.S;
    const flip = kind === 'bottom';
    return {
      ctx, kx, ky, kind,
      P: (s, y) => [(flip ? 1 - (y - R.y0) / R.Y : (y - R.y0) / R.Y) * W, ((s - R.s0) / R.S) * H],
    };
  }
  // side: starboard in the upper half (u flipped), port in the lower half
  const kx = W / R.S;
  const ky = H / 2 / R.Wr;
  return {
    ctx, kx, ky, kind, side,
    P: (s, w) => [
      (side === 1 ? 1 - (s - R.s0) / R.S : (s - R.s0) / R.S) * W,
      (side === 1 ? 0 : H / 2) + (1 - (w - R.w0) / R.Wr) * (H / 2),
    ],
  };
}

function poly(V, pts, fill, stroke = null, lw = 2) {
  const { ctx } = V;
  ctx.beginPath();
  pts.forEach((p, i) => {
    const [x, y] = V.P(p[0], p[1]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}

function line(V, pts, stroke, lw = 2, dash = null) {
  const { ctx } = V;
  ctx.beginPath();
  pts.forEach((p, i) => {
    const [x, y] = V.P(p[0], p[1]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lw;
  ctx.setLineDash(dash || []);
  ctx.stroke();
  ctx.setLineDash([]);
}

function rect(V, a0, b0, a1, b1, fill, stroke = null, lw = 2) {
  poly(V, [[a0, b0], [a1, b0], [a1, b1], [a0, b1]], fill, stroke, lw);
}

/** Run fn in a local frame centred at design point (a, b), units in metres, x = viewer right, y = down. */
function local(V, a, b, fn) {
  const { ctx } = V;
  const [cx, cy] = V.P(a, b);
  ctx.save();
  ctx.setTransform(V.kx, 0, 0, V.ky, cx, cy);
  fn(ctx);
  ctx.restore();
}

function text(V, a, b, str, size, color, opts = {}) {
  const { ctx } = V;
  const [cx, cy] = V.P(a, b);
  ctx.save();
  ctx.setTransform(V.kx / V.ky, 0, 0, 1, cx, cy);
  if (opts.rot) ctx.rotate(opts.rot);
  const px = size * V.ky;
  ctx.font = `${opts.weight || 700} ${px}px ${opts.font || "'DIN Condensed','Arial Narrow','Roboto Condensed','Helvetica Neue',Arial,sans-serif"}`;
  ctx.textAlign = opts.align || 'center';
  ctx.textBaseline = 'middle';
  if (opts.stretch) ctx.scale(opts.stretch, 1);
  if (opts.outline) {
    ctx.lineWidth = px * 0.08;
    ctx.strokeStyle = opts.outline;
    ctx.strokeText(str, 0, 0);
  }
  if (opts.strokeOnly) {
    ctx.lineWidth = px * 0.05;
    ctx.strokeStyle = color;
    ctx.strokeText(str, 0, 0);
  } else {
    ctx.fillStyle = color;
    ctx.fillText(str, 0, 0);
  }
  ctx.restore();
}

function starPath(ctx, R, cx = 0, cy = 0) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? R : R * 0.382;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

/** US national insignia (star-and-bar), radius R metres, centred at (a, b). */
function insignia(V, a, b, R, scheme) {
  local(V, a, b, (ctx) => {
    const barTop = -0.309 * R;
    const barH = 0.5 * R;
    const barX = 2 * R;
    const outline = () => {
      ctx.beginPath();
      ctx.moveTo(-barX, barTop);
      ctx.lineTo(-R * 0.95, barTop);
      ctx.arc(0, 0, R, Math.PI + 0.31, -0.31 + Math.PI * 2, false);
      ctx.lineTo(barX, barTop);
      ctx.lineTo(barX, barTop + barH);
      ctx.lineTo(R * 0.95, barTop + barH);
      ctx.arc(0, 0, R, 0.2, Math.PI - 0.2, false);
      ctx.lineTo(-barX, barTop + barH);
      ctx.closePath();
    };
    if (scheme.lowvis) {
      ctx.lineWidth = R * 0.05;
      ctx.strokeStyle = scheme.mark;
      outline();
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(-barX + R * 0.12, barTop + barH * 0.38, barX * 2 - R * 0.24, barH * 0.24);
      ctx.stroke();
      starPath(ctx, R * 0.97);
      ctx.fillStyle = scheme.mark;
      ctx.globalAlpha = 0.25;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.stroke();
      return;
    }
    const pad = R * 0.12;
    ctx.fillStyle = '#1f2f5f';
    ctx.beginPath();
    ctx.arc(0, 0, R + pad, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-barX - pad, barTop - pad, barX * 2 + pad * 2, barH + pad * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-barX, barTop, barX * 2, barH);
    ctx.fillStyle = '#1f2f5f';
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#b3242c';
    ctx.fillRect(-barX + R * 0.1, barTop + barH * 0.36, barX * 2 - R * 0.2, barH * 0.28);
    ctx.fillStyle = '#ffffff';
    starPath(ctx, R);
    ctx.fill();
  });
}

function weather(V, r, count, a0, a1, b0, b1, scheme, sizeA = [0.15, 0.9], sizeB = [0.1, 0.5]) {
  const { ctx } = V;
  const amt = scheme.weather;
  if (amt <= 0) return;
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  // Soft low-frequency mottling. Painted at 1/4 resolution into an *opaque* mid-grey canvas (faint
  // strokes on a transparent canvas lose most of their precision to premultiplied alpha and upscale
  // into visible blocks), blurred, then soft-light blended so 50% grey leaves the paint unchanged.
  const q = 4;
  const lw = Math.ceil(W / q);
  const lh = Math.ceil(H / q);
  const low = canvas(lw, lh);
  const lc = low.getContext('2d');
  lc.fillStyle = 'rgb(128,128,128)';
  lc.fillRect(0, 0, lw, lh);
  for (let i = 0; i < count; i++) {
    const [x, y] = V.P(lerp(a0, a1, r()), lerp(b0, b1, r()));
    const rad = Math.max(3, (lerp(sizeA[0], sizeA[1], r()) * Math.abs(V.kx)) / q);
    const v = r() < 0.5 ? 255 : 0;
    const g = lc.createRadialGradient(x / q, y / q, 0, x / q, y / q, rad);
    g.addColorStop(0, `rgba(${v},${v},${v},${0.09 * amt})`);
    g.addColorStop(1, `rgba(${v},${v},${v},0)`);
    lc.fillStyle = g;
    lc.fillRect(x / q - rad, y / q - rad, rad * 2, rad * 2);
  }
  const soft = canvas(lw, lh);
  const sc = soft.getContext('2d');
  sc.filter = 'blur(1.5px)';
  sc.drawImage(low, 0, 0);
  ctx.save();
  ctx.globalCompositeOperation = 'soft-light';
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sc.filter === 'none' ? low : soft, 0, 0, W, H);
  ctx.restore();
  // sparse, crisp touch-up patches in a slightly different grey, typical of TPS-painted jets
  for (let i = 0; i < count / 10; i++) {
    const a = lerp(a0, a1, r());
    const b = lerp(b0, b1, r());
    const da = lerp(sizeA[0], sizeA[1], r()) * 0.7;
    const db = lerp(sizeB[0], sizeB[1], r()) * 0.7;
    const light = r() < 0.4;
    const v = light ? 235 : 40;
    ctx.fillStyle = `rgba(${v},${v + (light ? 0 : 3)},${v + (light ? 0 : 6)},${(0.02 + r() * 0.03) * amt})`;
    const [x0, y0] = V.P(a, b);
    const [x1, y1] = V.P(a + da, b + db);
    ctx.fillRect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0));
  }
}

function grime(V, r, count, amt, a0, a1, b0, b1, streak = 0) {
  const { ctx } = V;
  for (let i = 0; i < count; i++) {
    const [x, y] = V.P(lerp(a0, a1, r()), lerp(b0, b1, r()));
    const rad = (6 + r() * 30) * (V.kx / 200);
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, `rgba(25,25,22,${0.06 * amt})`);
    g.addColorStop(1, 'rgba(25,25,22,0)');
    ctx.fillStyle = g;
    if (streak) ctx.fillRect(x - rad, y - rad, rad * 2 + streak * V.kx * r(), rad * 2);
    else ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
}

function soot(V, a, b, ra, rb, alpha) {
  const { ctx } = V;
  const [x, y] = V.P(a, b);
  const rx = ra * V.kx;
  const ry = rb * V.ky;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1, ry / rx);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
  g.addColorStop(0, `rgba(28,24,20,${alpha})`);
  g.addColorStop(0.6, `rgba(28,24,20,${alpha * 0.45})`);
  g.addColorStop(1, 'rgba(28,24,20,0)');
  ctx.fillStyle = g;
  ctx.fillRect(-rx, -rx, rx * 2, rx * 2);
  ctx.restore();
}

function rivets(V, pts, spacing, color) {
  const { ctx } = V;
  ctx.fillStyle = color;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = V.P(pts[i][0], pts[i][1]);
    const [x1, y1] = V.P(pts[i + 1][0], pts[i + 1][1]);
    const len = Math.hypot(x1 - x0, y1 - y0);
    const n = Math.floor(len / spacing);
    for (let k = 0; k <= n; k++) {
      const f = n ? k / n : 0;
      ctx.fillRect(x0 + (x1 - x0) * f - 0.6, y0 + (y1 - y0) * f - 0.6, 1.3, 1.3);
    }
  }
}

const PL = 'rgba(20,22,26,0.42)';
const PL_LIGHT = 'rgba(20,22,26,0.25)';
const RIV = 'rgba(25,28,32,0.22)';

/* ------------------------------ Body top ------------------------------ */

function paintTop(scheme) {
  const [W, H] = SIZES.top;
  const c = canvas(W, H);
  const ctx = c.getContext('2d');
  const R = RANGES.body;
  const V = makeView(ctx, 'top', R);
  const r = rng(11);
  ctx.fillStyle = scheme.upper;
  ctx.fillRect(0, 0, W, H);

  // radome & anti-glare
  rect(V, -0.3, -1, 2.45, 1, scheme.radome);
  poly(V, [[2.45, -0.46], [3.42, -0.42], [3.42, 0.42], [2.45, 0.46]], scheme.antiglare);
  poly(V, [[1.2, -0.12], [2.45, -0.46], [2.45, 0.46], [1.2, 0.12]], scheme.lowvis ? null : scheme.antiglare);
  line(V, [[2.45, -0.62], [2.45, 0.62]], PL, 3);

  // cockpit interior visible through the canopy
  const sill = [];
  for (let s = 3.3; s <= CANOPY.sGlass + 0.02; s += 0.05) sill.push([s, CANOPY.hw(s) - 0.01]);
  const outline = sill.concat(sill.slice().reverse().map(([s, y]) => [s, -y]));
  poly(V, outline, scheme.interior);
  rect(V, 3.3, -0.45, 4.6, 0.45, '#202326');

  weather(V, r, 900, 2.4, 19.2, -3.6, 3.6, scheme);

  // spine & deck panels
  const frames = [9.2, 10.0, 10.8, 11.6, 12.4, 13.3, 14.2, 15.1, 15.9, 16.6];
  for (const s of frames) {
    line(V, [[s, -0.5], [s, 0.5]], PL, 2);
    const ye = yEdge(s) - 0.06;
    line(V, [[s + 0.05, 0.55], [s + 0.05, ye]], PL_LIGHT, 2);
    line(V, [[s + 0.05, -0.55], [s + 0.05, -ye]], PL_LIGHT, 2);
  }
  for (const y of [0.28, 0.55, 0.95, 1.35, 1.85]) {
    for (const sg of [-1, 1]) {
      line(V, [[8.7, sg * y], [16.6, sg * y]], y === 0.28 ? PL_LIGHT : PL, 2);
      rivets(V, [[8.7, sg * (y + 0.025)], [16.6, sg * (y + 0.025)]], 9, RIV);
    }
  }
  // glove leading edge panel & outline
  for (const sg of [-1, 1]) {
    const off = 0.28;
    line(V, [[GA[0] + 0.25, sg * (GA[1] - off * 0.8)], [GC[0] - 0.05, sg * (GC[1] - off)]], PL, 2.5);
    line(V, [[GC[0] - 0.05, sg * (GC[1] - off)], [GD[0] - 0.2, sg * (GD[1] - 0.15)]], PL, 2);
    rivets(V, [[GA[0] + 0.3, sg * (GA[1] - off * 0.8 - 0.03)], [GC[0] - 0.1, sg * (GC[1] - off - 0.03)]], 8, RIV);
    // walkway (non-skid) on the upper deck
    poly(V, [[8.9, sg * 0.6], [10.9, sg * 0.6], [10.9, sg * 1.3], [8.9, sg * 1.15]], scheme.walkway, PL, 2);
    // fuel / access doors
    for (let k = 0; k < 7; k++) {
      const s = 11.8 + k * 0.62;
      const y = sg * (0.65 + (k % 3) * 0.32);
      rect(V, s, y, s + 0.36, y + sg * 0.22, null, PL, 2);
    }
    // shelf edge stripe and stab
    line(V, [[12.4, sg * 2.22], [16.0, sg * 2.22]], PL, 2);
    line(V, [[15.6, sg * 2.6], [18.4, sg * 4.7]], PL_LIGHT, 2);
    line(V, [[16.9, sg * 2.5], [18.9, sg * 4.85]], PL_LIGHT, 2);
    // soot above the nozzles
    soot(V, 18.6, sg * 1.45, 1.4, 0.75, 0.28 * scheme.weather + 0.08);
  }
  // upper speed brake outline (matches the hinged panel)
  rect(V, 16.9, -0.42, 18.0, 0.42, null, PL, 2.5);
  line(V, [[16.9, 0], [18.0, 0]], PL_LIGHT, 1.5);
  soot(V, 18.9, 0, 0.6, 0.5, 0.25);
  grime(V, r, 380, scheme.weather, 6, 18, -2.5, 2.5);

  // high-vis: anti-collision and stab markings
  if (!scheme.lowvis) {
    text(V, 13.5, 0, 'NO STEP', 0.08, '#202020');
  }
  return c;
}

/* ----------------------------- Body bottom ---------------------------- */

function paintBottom(scheme) {
  const [W, H] = SIZES.top;
  const c = canvas(W, H);
  const ctx = c.getContext('2d');
  const R = RANGES.body;
  const V = makeView(ctx, 'bottom', R);
  const r = rng(23);
  ctx.fillStyle = scheme.lower;
  ctx.fillRect(0, 0, W, H);
  rect(V, -0.3, -1, 2.45, 1, scheme.lowvis ? scheme.radome : scheme.lower);
  line(V, [[2.45, -0.62], [2.45, 0.62]], PL, 3);
  weather(V, r, 900, 2.4, 19.2, -3.6, 3.6, scheme);

  // nose gear doors
  rect(V, 3.47, -0.19, 4.53, 0.19, null, PL, 2.5);
  line(V, [[3.47, 0], [4.53, 0]], PL, 2);
  for (const sg of [-1, 1]) {
    // main gear doors
    rect(V, 10.13, sg * 2.15, 11.38, sg * 2.66, null, PL, 2.5);
    // nacelle panels
    for (let k = 0; k < 9; k++) {
      const s = 7.4 + k * 1.05;
      line(V, [[s, sg * 0.95], [s, sg * 2.0]], PL_LIGHT, 2);
    }
    line(V, [[6.8, sg * 1.45], [16.8, sg * 1.45]], PL, 2);
    rivets(V, [[6.8, sg * 1.42], [16.8, sg * 1.42]], 9, RIV);
    // lower speed brakes
    rect(V, 17.0, sg * 0.13, 17.95, sg * 0.56, null, PL, 2.5);
    soot(V, 18.7, sg * 1.45, 1.5, 0.8, 0.3 * scheme.weather + 0.08);
    soot(V, 17.6, sg * 0.5, 1.2, 0.5, 0.18);
    // glove underside panel lines
    line(V, [[GA[0] + 0.3, sg * (GA[1] - 0.2)], [GC[0] - 0.1, sg * (GC[1] - 0.25)]], PL, 2);
  }
  // Phoenix pallets in the tunnel
  for (const s of [9.0, 12.6]) {
    for (const sg of [-1, 1]) rect(V, s, sg * 0.12, s + 1.2, sg * 0.42, null, PL, 2);
  }
  // gun gas soot (port side, forward)
  soot(V, 6.0, -0.75, 1.2, 0.35, 0.22);
  grime(V, r, 420, scheme.weather, 3, 18, -2.6, 2.6, 0.3);
  return c;
}

/* ------------------------------ Body sides ----------------------------- */

function paintSides(scheme, opts) {
  const [W, H] = SIZES.side;
  const c = canvas(W, H);
  const ctx = c.getContext('2d');
  const R = RANGES.body;
  for (const side of [1, -1]) {
    const V = makeView(ctx, 'side', R, side);
    const r = rng(side === 1 ? 37 : 41);
    const [, yTop] = V.P(0, R.w0 + R.Wr);
    const [, yBot] = V.P(0, R.w0);
    // vertical gradient: side colour above, lower colour below
    const g = ctx.createLinearGradient(0, yTop, 0, yBot);
    const stop = (w) => clamp((R.w0 + R.Wr - w) / R.Wr, 0, 1);
    g.addColorStop(0, scheme.side);
    g.addColorStop(stop(-0.05), scheme.side);
    g.addColorStop(stop(-0.75), scheme.lower);
    g.addColorStop(1, scheme.lower);
    ctx.fillStyle = g;
    ctx.fillRect(0, Math.min(yTop, yBot), W, Math.abs(yBot - yTop));

    // radome
    rect(V, -0.3, -1.2, 2.45, 1.0, scheme.radome);
    line(V, [[2.45, -1.0], [2.45, 0.6]], PL, 3);
    // anti-glare strip on top of the nose
    poly(V, [[2.45, 0.3], [3.42, 0.48], [3.42, 0.7], [2.45, 0.7]], scheme.antiglare);

    // cockpit interior (above the sill)
    const sillPts = [];
    for (let s = 3.3; s <= 8.62; s += 0.05) sillPts.push([s, sillW(s) + 0.005]);
    poly(V, [...sillPts, [8.62, 1.6], [3.3, 1.6]], scheme.interior);

    weather(V, r, 1100, 2.4, 19.4, -1.5, 2.6, scheme, [0.15, 0.9], [0.08, 0.4]);

    // fuselage frames & longerons
    for (const s of [3.42, 4.6, 5.9, 7.1, 8.3, 9.4, 10.5, 11.6, 12.7, 13.8, 14.9, 16.0]) {
      line(V, [[s, -1.1], [s, s < 8.6 ? sillW(s) - 0.03 : 0.25]], PL_LIGHT, 2);
    }
    line(V, [[2.45, -0.18], [6.1, -0.18]], PL, 2);
    line(V, [[2.45, 0.22], [8.6, 0.32]], PL_LIGHT, 2);
    rivets(V, [[2.5, -0.15], [6.0, -0.15]], 9, RIV);
    // intake lip edge & ramp doors
    line(V, [[6.1, -0.1], [6.75, -1.1]], PL, 3);
    line(V, [[6.6, -0.12], [7.25, -1.08]], PL_LIGHT, 2);
    line(V, [[7.3, -0.15], [16.8, -0.15]], PL, 2);
    line(V, [[7.4, -0.75], [16.8, -0.75]], PL_LIGHT, 2);
    rivets(V, [[7.3, -0.18], [16.8, -0.18]], 9, RIV);
    for (let k = 0; k < 5; k++) rect(V, 9.6 + k * 1.3, -0.62, 10.3 + k * 1.3, -0.3, null, PL_LIGHT, 2);

    // canopy-side kick steps & boarding ladder door (port side only)
    if (side === -1) {
      rect(V, 6.9, -0.65, 7.25, -0.05, null, PL, 2);
      for (const w of [0.12, -0.25]) rect(V, 7.55, w, 7.75, w + 0.1, '#30353a');
      // M61 gun port and gas vents
      ctx.save();
      for (let k = 0; k < 4; k++) rect(V, 4.95 + k * 0.12, -0.62, 5.03 + k * 0.12, -0.5, '#202224');
      local(V, 4.78, -0.56, (cx) => {
        cx.fillStyle = '#1b1c1e';
        cx.beginPath();
        cx.ellipse(0, 0, 0.11, 0.07, 0, 0, Math.PI * 2);
        cx.fill();
      });
      ctx.restore();
      soot(V, 5.6, -0.6, 1.1, 0.22, 0.35);
      rect(V, 4.6, -0.82, 5.95, -0.3, null, PL, 2);
    } else {
      // refuelling probe door (starboard)
      rect(V, 4.5, 0.12, 5.7, 0.3, null, PL, 2.5);
    }

    // national insignia on the intake
    insignia(V, 8.75, -0.62, 0.36, scheme);
    // NAVY on the nacelle
    text(V, 14.1, -0.5, 'NAVY', 0.26, scheme.mark, { stretch: 1.25 });
    // modex on the nose
    text(V, 3.05, -0.3, opts.modex, 0.3, scheme.lowvis ? scheme.mark : '#111', { stretch: 1.0 });
    // rescue arrow & ejection warning triangle
    const arrowC = scheme.lowvis ? scheme.mark : '#e8b31c';
    line(V, [[4.25, 0.05], [5.15, 0.05]], arrowC, 6);
    poly(V, [[4.12, 0.05], [4.3, 0.12], [4.3, -0.02]], arrowC);
    text(V, 4.75, -0.06, 'RESCUE', 0.07, arrowC);
    for (const s of [4.1, 7.6]) {
      local(V, s, 0.3, (cx) => {
        cx.beginPath();
        cx.moveTo(0, -0.11);
        cx.lineTo(0.1, 0.07);
        cx.lineTo(-0.1, 0.07);
        cx.closePath();
        cx.fillStyle = scheme.lowvis ? scheme.mark : '#d22d22';
        cx.fill();
        cx.fillStyle = scheme.lowvis ? scheme.upper : '#ffffff';
        cx.beginPath();
        cx.moveTo(0, -0.05);
        cx.lineTo(0.05, 0.04);
        cx.lineTo(-0.05, 0.04);
        cx.closePath();
        cx.fill();
      });
    }
    // intake warning
    if (!scheme.lowvis) {
      poly(V, [[6.5, -0.2], [6.9, -0.2], [7.3, -0.95], [6.9, -0.95]], '#c8282a');
      text(V, 7.3, -0.15, 'DANGER', 0.06, '#c8282a', { align: 'left' });
    }
    // formation light strips
    const slime = 'rgba(205,215,170,0.85)';
    rect(V, 3.75, -0.05, 4.45, 0.0, slime);
    rect(V, 13.0, -0.02, 13.8, 0.03, slime);

    // fins (tail art) - fin spans w 0.4..2.62
    paintFin(V, scheme, opts, side, r);

    // exhaust soot
    soot(V, 18.7, -0.42, 1.6, 0.75, 0.3 * scheme.weather + 0.08);
    grime(V, r, 300, scheme.weather, 7, 18, -1.2, 0.3, 0.5);
  }
  return c;
}

function finPt(h, x) {
  const [le, te] = finLE(h);
  const [, wb] = finBase(h);
  return [lerp(le, te, x), wb];
}

function paintFin(V, scheme, opts, side, r) {
  const hs = [0.32, 0.6, 1.0, 1.4, 1.8, 2.0];
  // rudder outline
  const R0 = FIN.rudder;
  const rud = [finPt(R0.h0, R0.x0), finPt(R0.h1, R0.x0), finPt(R0.h1, 1.02), finPt(R0.h0, 1.02)];
  if (scheme.control) poly(V, rud, scheme.control);
  line(V, [rud[0], rud[1]], PL, 2.5);
  line(V, [finPt(R0.h0, R0.x0), finPt(R0.h0, 1.0)], PL, 2.5);
  line(V, [finPt(R0.h1, R0.x0), finPt(R0.h1, 1.0)], PL, 2.5);
  // leading-edge panel and tip cap
  line(V, hs.map((h) => finPt(h, 0.08)), PL_LIGHT, 2);
  line(V, [finPt(2.05, 0), finPt(2.05, 1)], PL, 2);
  if (!scheme.lowvis) {
    // squadron colours: dark fin with a bright band
    const fin = [finPt(0.42, -0.02), finPt(2.3, -0.02), finPt(2.3, 0.72), finPt(0.42, 0.72)];
    poly(V, fin, '#15181c');
    const band = [finPt(1.55, -0.02), finPt(1.8, -0.02), finPt(1.8, 0.72), finPt(1.55, 0.72)];
    poly(V, band, '#f2c230');
    local(V, ...finPt(1.0, 0.42), (cx) => {
      cx.fillStyle = '#f2c230';
      starPath(cx, 0.32);
      cx.fill();
    });
  } else {
    local(V, ...finPt(1.02, 0.42), (cx) => {
      cx.lineWidth = 0.03;
      cx.strokeStyle = scheme.mark;
      cx.beginPath();
      cx.arc(0, 0, 0.34, 0, Math.PI * 2);
      cx.stroke();
      starPath(cx, 0.26);
      cx.stroke();
    });
  }
  const code = scheme.lowvis ? scheme.mark : '#f5f5f5';
  text(V, ...finPt(1.95, 0.4), opts.tailCode, 0.42, code, { stretch: 1.05 });
  text(V, ...finPt(0.62, 0.52), opts.modex, 0.16, code);
  text(V, ...finPt(0.45, 0.3), 'NAVY', 0.08, code);
  weather(V, r, 60, 15.6, 18.8, 0.6, 2.4, scheme, [0.1, 0.4], [0.1, 0.4]);
}

/* -------------------------------- Wings -------------------------------- */

function wingLine(V, sign, x0, x1, eta0, eta1, mode = 'x', color = PL, lw = 2.5) {
  const pts = [];
  for (let i = 0; i <= 12; i++) {
    const f = i / 12;
    const eta = mode === 'x' ? lerp(eta0, eta1, f) : eta0;
    const x = mode === 'x' ? x0 : lerp(x0, x1, f);
    const [s, y] = wingPoint(eta, x);
    pts.push([s, sign * y]);
  }
  line(V, pts, color, lw);
}

function paintWing(scheme, bottom) {
  const [W, H] = SIZES.wing;
  const c = canvas(W, H);
  const ctx = c.getContext('2d');
  const R = RANGES.wing;
  const V = makeView(ctx, bottom ? 'bottom' : 'top', R);
  const r = rng(bottom ? 53 : 59);
  ctx.fillStyle = bottom ? scheme.lower : scheme.upper;
  ctx.fillRect(0, 0, W, H);
  weather(V, r, 700, 9.8, 14.6, -9.9, 9.9, scheme, [0.1, 0.5], [0.2, 1.2]);
  const Wg = WING;
  for (const sg of [-1, 1]) {
    if (scheme.control) {
      // white control surfaces in the high-vis scheme
      const flap = [];
      for (const [e0, e1] of Wg.flap.segs) {
        const q = [wingPoint(e0, Wg.flap.x0), wingPoint(e1, Wg.flap.x0), wingPoint(e1, 1.02), wingPoint(e0, 1.02)];
        poly(V, q.map(([s, y]) => [s, sg * y]), bottom ? scheme.lower : scheme.control);
        flap.push(q);
      }
      for (const [e0, e1] of Wg.slat.segs) {
        const q = [wingPoint(e0, -0.02), wingPoint(e1, -0.02), wingPoint(e1, 0.14), wingPoint(e0, 0.14)];
        poly(V, q.map(([s, y]) => [s, sg * y]), bottom ? scheme.lower : scheme.control);
      }
    }
    // slat & flap boundaries
    wingLine(V, sg, 0.14, 0, Wg.slat.segs[0][0], Wg.slat.segs[1][1]);
    wingLine(V, sg, Wg.flap.x0, 0, Wg.flap.segs[0][0], Wg.flap.segs[1][1]);
    for (const e of [Wg.slat.segs[0][0], Wg.slat.segs[0][1], Wg.slat.segs[1][1]]) wingLine(V, sg, 0, 0.14, e, e, 'eta');
    for (const e of [Wg.flap.segs[0][0], Wg.flap.segs[0][1], Wg.flap.segs[1][1]]) wingLine(V, sg, Wg.flap.x0, 1, e, e, 'eta');
    // spars (rivet lines) and ribs
    for (const x of [0.2, 0.66]) {
      const pts = [];
      for (let i = 0; i <= 12; i++) {
        const [s, y] = wingPoint(lerp(0.12, 0.98, i / 12), x);
        pts.push([s, sg * y]);
      }
      rivets(V, pts, 7, RIV);
      line(V, pts, PL_LIGHT, 1.5);
    }
    for (let k = 0; k < 6; k++) {
      const e = 0.22 + k * 0.13;
      wingLine(V, sg, 0.2, 0.66, e, e, 'eta', PL_LIGHT, 1.5);
    }
    if (!bottom) {
      for (const [e0, e1] of Wg.spoiler.segs) {
        const q = [wingPoint(e0, Wg.spoiler.x0), wingPoint(e1, Wg.spoiler.x0), wingPoint(e1, Wg.spoiler.x1), wingPoint(e0, Wg.spoiler.x1)];
        poly(V, q.map(([s, y]) => [s, sg * y]), null, PL, 2.5);
      }
    } else {
      // access panels
      for (let k = 0; k < 5; k++) {
        const [s, y] = wingPoint(0.25 + k * 0.14, 0.35);
        rect(V, s - 0.12, sg * (y - 0.18), s + 0.12, sg * (y + 0.18), null, PL, 2);
      }
    }
    // tip
    wingLine(V, sg, 0, 1, 0.975, 0.975, 'eta', PL_LIGHT, 2);
  }
  // national insignia: upper port wing, lower starboard wing
  const [is, iy] = wingPoint(0.66, 0.4);
  insignia(V, is, bottom ? iy : -iy, 0.42, scheme);
  if (bottom && !scheme.lowvis) {
    const [ns, ny] = wingPoint(0.62, 0.42);
    text(V, ns, -ny, 'NAVY', 0.55, '#1a1a1a', { stretch: 1.2 });
  }
  grime(V, r, 160, scheme.weather, 10, 14.4, -9.5, 9.5);
  return c;
}

/* ------------------------------------------------------------------------ */

function tex(c, aniso) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

export function paintLivery(schemeKey, aniso = 8, opts = {}) {
  const scheme = SCHEMES[schemeKey] || SCHEMES.lowvis;
  const o = { modex: opts.modex || '101', tailCode: opts.tailCode || 'AJ' };
  return {
    scheme,
    body: {
      top: tex(paintTop(scheme), aniso),
      bottom: tex(paintBottom(scheme), aniso),
      side: tex(paintSides(scheme, o), aniso),
    },
    wing: {
      top: tex(paintWing(scheme, false), aniso),
      bottom: tex(paintWing(scheme, true), aniso),
    },
  };
}
