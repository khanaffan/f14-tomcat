import { curve, sstep, lerp, clamp, smax, spow, resample, linspace } from './util.js';
import { loft, mirrorY, ellipseRing } from './geom.js';
import { WING, wingEnvelopeAt } from './dims.js';

/* ------------------------------------------------------------------ */
/* Centre pod: radome, forward fuselage, cockpit deck and dorsal spine */
/* ------------------------------------------------------------------ */

const PK = [
  // s,    a,     top,    bot,    wMax,  nTop, nBot
  [1.8, 0.476, 0.219, -0.757, -0.31, 2.0, 2.1],
  [2.1, 0.535, 0.295, -0.787, -0.28, 2.0, 2.1],
  [2.45, 0.6, 0.38, -0.82, -0.25, 2.0, 2.2],
  [3.35, 0.7, 0.53, -0.9, -0.2, 2.5, 2.5],
  [4.2, 0.76, 0.55, -0.95, -0.15, 3.2, 2.8],
  [5.5, 0.78, 0.55, -0.97, -0.12, 3.6, 3.0],
  [6.5, 0.78, 0.55, -0.95, -0.08, 3.6, 3.0],
  [7.6, 0.72, 0.62, -0.78, 0.0, 3.2, 3.0],
  [8.5, 0.62, 0.92, -0.6, 0.1, 2.6, 2.5],
  [9.5, 0.56, 0.88, -0.45, 0.16, 2.4, 2.5],
  [11.0, 0.54, 0.8, -0.45, 0.16, 2.4, 2.5],
  [13.5, 0.5, 0.62, -0.45, 0.16, 2.3, 2.5],
  [15.5, 0.48, 0.45, -0.47, 0.1, 2.2, 2.5],
  [16.8, 0.5, 0.15, -0.52, -0.15, 2.4, 2.5],
  [17.6, 0.45, -0.2, -0.52, -0.36, 2.6, 2.5],
  [18.0, 0.3, -0.3, -0.48, -0.4, 2.6, 2.5],
];
const pc = (k) => curve(PK.map((r) => [r[0], r[k]]));
const P_A = pc(1);
const P_TOP = pc(2);
const P_BOT = pc(3);
const P_WMAX = pc(4);
const P_NT = pc(5);
const P_NB = pc(6);

export function podParams(s) {
  if (s < 1.8) {
    const u = Math.max(s, 0) / 2.45;
    return {
      a: 0.6 * Math.pow(u, 0.75),
      top: -0.45 + 0.83 * Math.pow(u, 0.7),
      bot: -0.45 - 0.37 * Math.pow(u, 0.6),
      wMax: -0.45 + 0.2 * Math.pow(u, 0.7),
      nTop: 2.0,
      nBot: 2.1,
    };
  }
  return { a: P_A(s), top: P_TOP(s), bot: P_BOT(s), wMax: P_WMAX(s), nTop: P_NT(s), nBot: P_NB(s) };
}

/** Height of the pod's upper surface at lateral offset y (for canopy sills etc). */
export function podTopAt(s, y) {
  const p = podParams(s);
  const u = Math.min(Math.abs(y) / p.a, 1);
  return p.wMax + (p.top - p.wMax) * Math.pow(1 - Math.pow(u, p.nTop), 1 / p.nTop);
}
export function podBotAt(s, y) {
  const p = podParams(s);
  const u = Math.min(Math.abs(y) / p.a, 1);
  return p.wMax - (p.wMax - p.bot) * Math.pow(1 - Math.pow(u, p.nBot), 1 / p.nBot);
}

function podRing(s, count) {
  const p = podParams(s);
  const dense = [];
  const N = 240;
  for (let i = 0; i <= N; i++) {
    const th = (i / N) * Math.PI * 2;
    const c = Math.cos(th);
    const sn = Math.sin(th);
    const n = c >= 0 ? p.nTop : p.nBot;
    const y = -p.a * spow(sn, 2 / n);
    const w = c >= 0 ? p.wMax + (p.top - p.wMax) * spow(c, 2 / n) : p.wMax + (p.wMax - p.bot) * spow(c, 2 / n);
    dense.push([y, w]);
  }
  const r = resample(dense, count + 1, 0.25);
  r.pop();
  return r.map(([y, w]) => [s, y, w]);
}

export function buildPod() {
  const stations = [];
  for (let i = 0; i <= 34; i++) stations.push(2.45 * Math.pow(i / 34, 1.7));
  for (const s of linspace(2.45, 18.0, 112).slice(1)) stations.push(s);
  const rings = stations.map((s) => podRing(s, 88));
  return loft(rings, { closed: true, capEnd: true });
}

/* ------------------------------------------------------------------ */
/* Side block: intake, nacelle, wing glove, aft shelf (starboard side) */
/* ------------------------------------------------------------------ */

export const GA = [6.1, 1.74];
export const GC = [10.82, 3.5];
export const GD = [12.25, 2.33];
export const S_NAC_END = 17.0;

export const duct = {
  yc: curve([[6.1, 1.32], [7.5, 1.33], [11, 1.45], [17, 1.45]]),
  ay: curve([[6.1, 0.42], [7.5, 0.44], [11, 0.66], [15.5, 0.66], [17, 0.6]]),
  wc: curve([[6.1, -0.6], [7.5, -0.58], [11, -0.42], [17, -0.42]]),
  awT: curve([[6.1, 0.5], [7.5, 0.52], [11, 0.55], [13.5, 0.72], [15.5, 0.72], [17, 0.6]]),
  awB: curve([[6.1, 0.5], [7.5, 0.52], [11, 0.75], [15.5, 0.75], [17, 0.62]]),
  n: curve([[6.1, 6], [7.5, 5], [11, 2.6], [14, 2.2], [17, 2.0]]),
};

export function ductPoint(s, phi, inset = 0) {
  const yc = duct.yc(s);
  const ay = duct.ay(s) - inset;
  const wc = duct.wc(s);
  const n = duct.n(s);
  const c = Math.cos(phi);
  const sn = Math.sin(phi);
  const e = 2 / n;
  return [yc + ay * spow(c, e), wc + (sn >= 0 ? duct.awT(s) - inset : duct.awB(s) - inset) * spow(sn, e)];
}

function nacTop(s, y) {
  const yc = duct.yc(s);
  const ay = duct.ay(s);
  const n = duct.n(s);
  const u = Math.abs((y - yc) / ay);
  if (u >= 1) return -10;
  return duct.wc(s) + duct.awT(s) * Math.pow(1 - Math.pow(u, n), 1 / n);
}

export function yEdge(s) {
  if (s <= GC[0]) return GA[1] + ((s - GA[0]) * (GC[1] - GA[1])) / (GC[0] - GA[0]);
  if (s <= GD[0]) return GC[1] + ((s - GC[0]) * (GD[1] - GC[1])) / (GD[0] - GC[0]);
  const yo = duct.yc(s) + duct.ay(s);
  return lerp(2.33, yo, sstep(16.0, 17.0, s));
}

const wE = curve([[6.1, -0.1], [10.82, 0.0], [12.25, -0.03], [16, -0.08], [17, -0.42]]);
const Wf = curve([[6.1, 0.6], [10.82, 1.0], [12.25, 0.6], [16, 0.4], [17, 0.05]]);
const deckIn = curve([[6.1, -0.1], [7.0, -0.08], [9.0, 0.18], [14.0, 0.18], [15.5, 0.1], [16.8, -0.1], [17.0, -0.2]]);
const deckOut = curve([[6.1, -0.1], [7.0, -0.08], [9.0, 0.18], [12.5, 0.18], [15.0, 0.08], [16.5, -0.05], [17.0, -0.42]]);
const dBot = curve([[6.1, -0.1], [7.0, -0.13], [9.0, -0.22], [16.0, -0.24], [17.0, -0.42]]);
const yIT = curve([[6.1, 0.9], [7.0, 0.9], [8.5, 0.3], [17, 0.3]]);
const wRoof = curve([[6.1, -0.15], [7.3, -0.2], [8.3, -0.5], [15, -0.5], [17, -0.55]]);

// Edge half-thickness: sharp glove leading edge, then a slot just thicker than the wing
// (over the full sweep range) along C-D, then a constant shelf lip that fades into the nacelle.
const shelfE = curve([[12.6, 0.15], [16.0, 0.15], [17.0, 0.0]]);
const E_S0 = 6.1;
const E_S1 = 12.9;
const E_STEP = 0.01;
let needTable = null;

function buildNeedTable() {
  const n = Math.round((E_S1 - E_S0) / E_STEP) + 1;
  const raw = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const s = E_S0 + i * E_STEP;
    const we = wE(s);
    const env = wingEnvelopeAt(s, yEdge(s), 0.5);
    raw[i] = env ? Math.max(env[0] - we, we - env[1], 0) + 0.014 : 0;
  }
  // running max over a small window keeps the slot smooth
  const out = new Float32Array(n);
  const R = 6;
  for (let i = 0; i < n; i++) {
    let m = 0;
    for (let k = Math.max(0, i - R); k <= Math.min(n - 1, i + R); k++) m = Math.max(m, raw[k]);
    out[i] = m;
  }
  needTable = out;
}

function needAt(s) {
  if (!needTable) buildNeedTable();
  const f = (s - E_S0) / E_STEP;
  if (f <= 0 || f >= needTable.length - 1) return 0;
  const i = Math.floor(f);
  return lerp(needTable[i], needTable[i + 1], f - i);
}

export function edgeHalf(s) {
  const need = needAt(s);
  if (s < 12.3) return need;
  return Math.max(lerp(need, shelfE(s), sstep(12.3, 12.6, s)), s < 12.9 ? need : 0);
}

export const glove = { wE, Wf, dBot };

function deck(s, y) {
  const yc = duct.yc(s);
  return lerp(deckIn(s), deckOut(s), sstep(yc - 0.4, yc + 0.4, y));
}

export function upperSurface(s, y) {
  const e = edgeHalf(s);
  const y0 = yEdge(s) - 0.8 * e;
  const Dt = smax(deck(s, y), nacTop(s, y), 0.05);
  const rho = clamp((y0 - y) / Wf(s), 0, 1);
  const g = 1 - (1 - rho) * (1 - rho);
  const top0 = wE(s) + e;
  return top0 + (Dt - top0) * g;
}

export function lowerSurface(s, y) {
  const e = edgeHalf(s);
  const y0 = yEdge(s) - 0.8 * e;
  const rho = clamp((y0 - y) / Wf(s), 0, 1);
  const g = 1 - (1 - rho) * (1 - rho);
  const bot0 = wE(s) - e;
  return bot0 + (dBot(s) - bot0) * g;
}

function phiInner(s, w) {
  const wc = duct.wc(s);
  const n = duct.n(s);
  const t = clamp((w - wc) / (w >= wc ? duct.awT(s) : duct.awB(s)), -1, 1);
  return Math.PI - Math.asin(clamp(spow(t, n / 2), -1, 1));
}

function solveOT(s) {
  const f = (phi) => {
    const [y, w] = ductPoint(s, phi);
    return w - lowerSurface(s, y);
  };
  const N = 120;
  let prev = -Math.PI / 2;
  for (let i = 1; i <= N; i++) {
    const phi = -Math.PI / 2 + (i / N) * Math.PI;
    if (f(phi) >= -0.002) {
      let lo = prev;
      let hi = phi;
      for (let k = 0; k < 30; k++) {
        const mid = 0.5 * (lo + hi);
        if (f(mid) >= -0.002) hi = mid;
        else lo = mid;
      }
      return hi;
    }
    prev = phi;
  }
  return Math.PI / 2;
}

const rakeAt = (sig, w) => clamp((-0.1 - w) * 0.65, 0, 0.65) * (1 - sstep(6.1, 7.4, sig));

export const SIDE_COUNTS = { top: 40, hidden: 4, roof: 6, duct: 48, under: 18, edge: 7 };

/** Starboard side-block ring at station s (CCW in the y-w plane). */
export function sideRing(s) {
  const C = SIDE_COUNTS;
  const e = edgeHalf(s);
  const we = wE(s);
  const y0 = yEdge(s) - 0.8 * e;
  const yit = yIT(s);
  const wr = wRoof(s);
  const phiRW = phiInner(s, wr);
  const [yRW, wRW] = ductPoint(s, phiRW);
  const yRI = lerp(yRW, 0.0, sstep(7.3, 8.3, s));
  const phiOT = solveOT(s);
  const [yOT, wOT] = ductPoint(s, phiOT);

  const pts = [];
  // 1. top surface, edge -> inner
  const dense = [];
  for (let i = 0; i <= 260; i++) {
    const y = y0 + (yit - y0) * (i / 260);
    dense.push([y, upperSurface(s, y)]);
  }
  pts.push(...resample(dense, C.top, 6));
  // 2. hidden wall IT -> RI
  const IT = pts[pts.length - 1];
  for (let i = 0; i < C.hidden; i++) {
    const f = i / (C.hidden - 1);
    pts.push([lerp(IT[0], yRI, f), lerp(IT[1], wr, f)]);
  }
  // 3. tunnel roof RI -> RW
  for (let i = 0; i < C.roof; i++) {
    const f = i / (C.roof - 1);
    pts.push([lerp(yRI, yRW, f), lerp(wr, wRW, f)]);
  }
  // 4. duct lower contour RW -> OT (CCW: inner wall, bottom, outer wall)
  const dd = [];
  const phiEnd = phiOT + Math.PI * 2;
  for (let i = 0; i <= 300; i++) dd.push(ductPoint(s, lerp(phiRW, phiEnd, i / 300)));
  pts.push(...resample(dd, C.duct, 1.5));
  // 5. glove underside OT -> edge
  const yEndU = Math.max(y0, yOT);
  const du = [];
  for (let i = 0; i <= 160; i++) {
    const y = yOT + (yEndU - yOT) * (i / 160);
    du.push([y, i === 0 ? wOT : lowerSurface(s, y)]);
  }
  pts.push(...resample(du, C.under, 6));
  // 6. rounded edge (interior points only; ring closes onto the first top point)
  for (let i = 1; i <= C.edge; i++) {
    const th = -Math.PI / 2 + (i / (C.edge + 1)) * Math.PI;
    pts.push([y0 + 0.8 * e * Math.cos(th), we + e * Math.sin(th)]);
  }
  return pts.map(([y, w]) => [s + rakeAt(s, w), y, w]);
}

export function sideStations() {
  const st = [];
  const add = (a, b, n) => {
    const l = linspace(a, b, n);
    for (const v of l) if (!st.length || v > st[st.length - 1] + 1e-6) st.push(v);
  };
  add(6.1, 7.4, 22);
  add(7.4, GC[0], 44);
  add(GC[0], GD[0], 22);
  add(GD[0], S_NAC_END, 60);
  return st;
}

export function buildSideBlock() {
  const st = sideStations();
  const rings = st.map((s) => sideRing(s));
  const starboard = loft(rings, { closed: true, capEnd: true });
  return { starboard, port: mirrorY(starboard), frontRing: rings[0] };
}

/* ---------------------------- Intake duct ---------------------------- */

const LIP = 0.035;

function ductInnerRing(sig, count) {
  const dense = [];
  for (let i = 0; i <= 300; i++) dense.push(ductPoint(sig, -Math.PI / 2 + (i / 300) * Math.PI * 2, LIP));
  const r = resample(dense, count + 1, 1.2);
  r.pop();
  return r.map(([y, w]) => [sig + rakeAt(sig, w), y, w]);
}

function rotateToBottom(ring) {
  let best = 0;
  let bw = Infinity;
  const yc = ring.reduce((a, p) => a + p[1], 0) / ring.length;
  for (let i = 0; i < ring.length; i++) {
    const score = ring[i][2] + Math.abs(ring[i][1] - yc) * 0.5;
    if (score < bw) {
      bw = score;
      best = i;
    }
  }
  return ring.slice(best).concat(ring.slice(0, best));
}

export function buildIntake(frontRing) {
  const N = 96;
  const stations = linspace(6.1, 10.2, 34);
  const inner = stations.map((s) => ductInnerRing(s, N));
  const shade = (i) => {
    const f = Math.pow(i / (stations.length - 1), 0.55);
    const v = lerp(0.82, 0.05, f);
    return [v, v, v * 1.02];
  };
  const duct = loft(inner, { closed: true, flip: true, capEnd: true, color: (i) => shade(i) });

  // lip: outer ring (side block front) -> rounded nose -> inner ring
  const outerClosed = frontRing.concat([frontRing[0]]);
  const outer = resample(outerClosed, N + 1, 0.5);
  outer.pop();
  const o = rotateToBottom(outer);
  const inn = rotateToBottom(inner[0]);
  const mid = o.map((p, i) => {
    const q = inn[i];
    return [Math.min(p[0], q[0]) - 0.018, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2];
  });
  const lip = loft([o, mid, inn], { closed: true, flip: true });
  return { duct, lip };
}

/* ------------------------- Aft-body details ------------------------- */

const BEAVER_K = [
  [16.6, 0.82, 0.28],
  [17.2, 0.74, 0.2],
  [18.0, 0.6, 0.12],
  [18.7, 0.42, 0.07],
  [19.0, 0.25, 0.045],
  [19.1, 0.06, 0.02],
];
export const beaver = {
  hw: curve(BEAVER_K.map((k) => [k[0], k[1]])),
  ht: curve(BEAVER_K.map((k) => [k[0], k[2]])),
  wc: -0.4,
  n: 3.2,
};

/** Beaver-tail half height above/below its centre line at (s, y); 0 outside. */
export function beaverHalfAt(s, y) {
  const u = Math.min(Math.abs(y) / beaver.hw(s), 1);
  return beaver.ht(s) * Math.pow(1 - Math.pow(u, beaver.n), 1 / beaver.n);
}

export function buildBeaverTail() {
  const B = beaver;
  const rings = linspace(16.6, 19.1, 40).map((s) => ellipseRing(s, 0, B.wc, B.hw(s), B.ht(s), B.ht(s), B.n, 48));
  return loft(rings, { closed: true, capStart: true, capEnd: true });
}

export function buildBoom() {
  const hw = curve([[14.6, 0.02], [15.2, 0.13], [17.4, 0.13], [18.0, 0.08], [18.15, 0.02]]);
  const hh = curve([[14.6, 0.03], [15.2, 0.19], [17.4, 0.19], [18.0, 0.12], [18.15, 0.03]]);
  const rings = linspace(14.6, 18.15, 36).map((s) => ellipseRing(s, 2.22, -0.25, hw(s), hh(s), hh(s), 2.2, 32));
  const g = loft(rings, { closed: true, capStart: true, capEnd: true });
  return { starboard: g, port: mirrorY(g) };
}

export const FIN_Y = 1.6;

export function buildFinFairing() {
  const hw = curve([[13.9, 0.02], [14.8, 0.12], [15.4, 0.15], [18.2, 0.13], [18.55, 0.03]]);
  const top = curve([[13.9, 0.2], [15.0, 0.33], [15.4, 0.41], [18.4, 0.41], [18.55, 0.3]]);
  const bot = 0.02;
  const rings = linspace(13.9, 18.55, 44).map((s) => {
    const t = top(s);
    return ellipseRing(s, FIN_Y, (t + bot) / 2, hw(s), (t - bot) / 2, (t - bot) / 2, 2.6, 28);
  });
  const g = loft(rings, { closed: true, capStart: true, capEnd: true });
  return { starboard: g, port: mirrorY(g) };
}

export { WING };
