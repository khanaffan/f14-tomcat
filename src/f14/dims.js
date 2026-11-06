import { lerp, clamp, DEG } from './util.js';
import { nacaHalf, camberLine } from './geom.js';

/** Sweep limits (degrees). */
export const SWEEP = { min: 20, max: 68, over: 75, bomb: 55, ref: 20 };

/** Overall reference figures (metres). */
export const DIM = {
  length: 19.1,
  height: 4.88,
  groundW: -2.25,
  centerS: 9.55,
};

/*
 * Wing planform in the reference pose (20 deg sweep), design frame [s, y].
 * Leading and trailing edges are straight lines; root (eta=0) is hidden inside the glove.
 */
export const WING = {
  pivot: [11.2, 2.71, 0],
  L0: [10.44, 2.45],
  T0: [13.03, 1.9],
  LT: [12.93, 9.29],
  TT: [14.15, 9.77],
  tRoot: 0.09,
  tTip: 0.075,
  camber: 0.008,
  slat: { x1: 0.14, segs: [[0.168, 0.57], [0.57, 0.975]] },
  flap: { x0: 0.73, segs: [[0.07, 0.48], [0.48, 0.9]] },
  spoiler: { x0: 0.58, x1: 0.72, segs: [[0.2, 0.33], [0.33, 0.46], [0.46, 0.6], [0.6, 0.73]] },
};

export function wingFrame(eta) {
  const W = WING;
  return {
    le: [lerp(W.L0[0], W.LT[0], eta), lerp(W.L0[1], W.LT[1], eta), 0],
    te: [lerp(W.T0[0], W.TT[0], eta), lerp(W.T0[1], W.TT[1], eta), 0],
    up: [0, 0, 1],
    t: lerp(W.tRoot, W.tTip, eta),
    m: W.camber,
  };
}

/** Point on the wing chord plane for (eta, x) in the reference pose. */
export function wingPoint(eta, x) {
  const f = wingFrame(eta);
  return [lerp(f.le[0], f.te[0], x), lerp(f.le[1], f.te[1], x)];
}

/** Invert the bilinear planform map: reference-pose (s, y) -> [eta, x]. */
export function wingParam(s, y) {
  const W = WING;
  const dL = [W.LT[0] - W.L0[0], W.LT[1] - W.L0[1]];
  const dT = [W.TT[0] - W.T0[0], W.TT[1] - W.T0[1]];
  let eta = (y - W.L0[1]) / dL[1];
  let x = 0.5;
  for (let k = 0; k < 25; k++) {
    const le = [W.L0[0] + eta * dL[0], W.L0[1] + eta * dL[1]];
    const te = [W.T0[0] + eta * dT[0], W.T0[1] + eta * dT[1]];
    const fs = le[0] + x * (te[0] - le[0]) - s;
    const fy = le[1] + x * (te[1] - le[1]) - y;
    const j00 = dL[0] + x * (dT[0] - dL[0]);
    const j01 = te[0] - le[0];
    const j10 = dL[1] + x * (dT[1] - dL[1]);
    const j11 = te[1] - le[1];
    const det = j00 * j11 - j01 * j10;
    const de = (fs * j11 - j01 * fy) / det;
    const dx = (j00 * fy - j10 * fs) / det;
    eta -= de;
    x -= dx;
    if (Math.abs(de) + Math.abs(dx) < 1e-10) break;
  }
  return [eta, x];
}

/** Rotate an airframe point at wing sweep `sweep` back into the reference pose. */
export function toWingRef(s, y, sweep, side = 1) {
  const P = WING.pivot;
  const d = (sweep - SWEEP.ref) * DEG;
  const ds = s - P[0];
  const dy = side * y - P[1];
  const c = Math.cos(d);
  const sn = Math.sin(d);
  return [P[0] + ds * c - dy * sn, P[1] + ds * sn + dy * c];
}

/** Reference-pose -> airframe at a given sweep (starboard). */
export function fromWingRef(s, y, sweep) {
  const P = WING.pivot;
  const d = (sweep - SWEEP.ref) * DEG;
  const ds = s - P[0];
  const dy = y - P[1];
  const c = Math.cos(d);
  const sn = Math.sin(d);
  return [P[0] + ds * c + dy * sn, P[1] - ds * sn + dy * c];
}

/** Upper/lower wing surface heights at a reference-pose planform point, or null outside the wing. */
export function wingSurfaceRef(s, y) {
  const [eta, x] = wingParam(s, y);
  if (eta < 0 || eta > 1 || x < 0 || x > 1) return null;
  const f = wingFrame(eta);
  const c = Math.hypot(f.te[0] - f.le[0], f.te[1] - f.le[1]);
  const h = nacaHalf(x, f.t) * c;
  const m = camberLine(x, f.m) * c;
  return [m + h, m - h];
}

/** Envelope [maxUpper, minLower] of the wing at airframe point (s, y) over all sweep angles. */
export function wingEnvelopeAt(s, y, step = 0.5) {
  let up = -Infinity;
  let lo = Infinity;
  for (let a = SWEEP.min; a <= SWEEP.over + 1e-9; a += step) {
    const [rs, ry] = toWingRef(s, y, a);
    const r = wingSurfaceRef(rs, ry);
    if (!r) continue;
    up = Math.max(up, r[0]);
    lo = Math.min(lo, r[1]);
  }
  return up === -Infinity ? null : [up, lo];
}

/* Horizontal stabilator (starboard, reference = 0 deg) */
export const STAB = {
  root: { y: 2.36, le: 15.416, te: 17.975 },
  tip: { y: 4.985, le: 18.3, te: 19.05 },
  w: -0.38,
  pivot: [16.65, 0, -0.38],
  tRoot: 0.055,
  tTip: 0.04,
};

/* Vertical fins (starboard): root on y = 1.60, canted outward. h measured from w = 0.40. */
export const FIN = {
  y: 1.6,
  baseW: 0.4,
  cant: 5 * DEG,
  sections: [
    // h, le, te
    [-0.12, 14.9, 18.4],
    [0.0, 15.1, 18.42],
    [0.3, 15.6, 18.47],
    [2.23, 17.81, 18.89],
  ],
  rudder: { x0: 0.72, h0: 0.32, h1: 2.0 },
  tRoot: 0.05,
  tTip: 0.04,
};

export function finLE(h) {
  const S = FIN.sections;
  for (let i = 0; i < S.length - 1; i++) {
    if (h <= S[i + 1][0] || i === S.length - 2) {
      const f = (h - S[i][0]) / (S[i + 1][0] - S[i][0]);
      return [lerp(S[i][1], S[i + 1][1], f), lerp(S[i][2], S[i + 1][2], f)];
    }
  }
  return [S[0][1], S[0][2]];
}

/** Fin point at height h, lateral offset along the canted span direction. */
export function finBase(h) {
  return [FIN.y + Math.sin(FIN.cant) * h, FIN.baseW + Math.cos(FIN.cant) * h];
}

export const GEAR = {
  nose: { trunnion: [4.3, 0, -0.8], axle: [4.18, 0, -1.97], wheelR: 0.28, wheelW: 0.17, track: 0.13 },
  main: { trunnion: [11.05, 2.2, -0.3], axle: [11.2, 2.5, -1.775], wheelR: 0.475, wheelW: 0.28 },
};

export const NOZZLE = { s0: 16.95, s1: 17.6, s2: 18.4, y: 1.45, w: -0.42, r: 0.6, exitDry: 0.5, exitAB: 0.58 };

export { clamp };
