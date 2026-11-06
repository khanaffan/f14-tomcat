export const DEG = Math.PI / 180;

export const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
export const lerp = (a, b, t) => a + (b - a) * t;
export const spow = (x, p) => (x < 0 ? -Math.pow(-x, p) : Math.pow(x, p));

export function sstep(a, b, x) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Polynomial smooth maximum. */
export function smax(a, b, k) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.max(a, b) + h * h * k * 0.25;
}

/** Monotone cubic (Fritsch–Carlson) interpolation through [[x, y], ...]. */
export function curve(pts) {
  const n = pts.length;
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  if (n === 1) return () => ys[0];
  const d = [];
  for (let i = 0; i < n - 1; i++) d.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  const m = new Array(n);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const a = m[i] / d[i];
    const b = m[i + 1] / d[i];
    const h = a * a + b * b;
    if (h > 9) {
      const t = 3 / Math.sqrt(h);
      m[i] = t * a * d[i];
      m[i + 1] = t * b * d[i];
    }
  }
  return (x) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let lo = 0;
    let hi = n - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (xs[mid] <= x) lo = mid;
      else hi = mid;
    }
    const h = xs[hi] - xs[lo];
    const t = (x - xs[lo]) / h;
    const t2 = t * t;
    const t3 = t2 * t;
    return (
      (2 * t3 - 3 * t2 + 1) * ys[lo] +
      (t3 - 2 * t2 + t) * h * m[lo] +
      (-2 * t3 + 3 * t2) * ys[hi] +
      (t3 - t2) * h * m[hi]
    );
  };
}

/**
 * Resample a polyline to n points, evenly spaced by arc length plus an optional
 * curvature weight so tight bends receive more points.
 */
export function resample(pts, n, curvWeight = 0) {
  const dims = pts[0].length;
  const cnt = pts.length;
  const segLen = [];
  for (let i = 1; i < cnt; i++) {
    let d2 = 0;
    for (let k = 0; k < dims; k++) {
      const dd = pts[i][k] - pts[i - 1][k];
      d2 += dd * dd;
    }
    segLen.push(Math.sqrt(d2));
  }
  const segW = segLen.slice();
  if (curvWeight > 0) {
    for (let i = 1; i < cnt - 1; i++) {
      if (segLen[i - 1] < 1e-9 || segLen[i] < 1e-9) continue;
      let dot = 0;
      for (let k = 0; k < dims; k++) {
        dot += ((pts[i][k] - pts[i - 1][k]) / segLen[i - 1]) * ((pts[i + 1][k] - pts[i][k]) / segLen[i]);
      }
      const ang = Math.acos(clamp(dot, -1, 1));
      segW[i - 1] += 0.5 * curvWeight * ang;
      segW[i] += 0.5 * curvWeight * ang;
    }
  }
  const acc = [0];
  for (let i = 0; i < segW.length; i++) acc.push(acc[i] + segW[i]);
  const total = acc[acc.length - 1];
  const out = [];
  if (total < 1e-12) {
    for (let i = 0; i < n; i++) out.push(pts[0].slice());
    return out;
  }
  let j = 0;
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0 : (i / (n - 1)) * total;
    while (j < acc.length - 2 && acc[j + 1] < t) j++;
    const seg = acc[j + 1] - acc[j];
    const f = seg > 1e-12 ? clamp((t - acc[j]) / seg, 0, 1) : 0;
    const p = [];
    for (let k = 0; k < dims; k++) p.push(pts[j][k] + (pts[j + 1][k] - pts[j][k]) * f);
    out.push(p);
  }
  return out;
}

/** Cosine spacing 0..1 (dense at both ends). */
export function cosspace(n) {
  const a = [];
  for (let i = 0; i < n; i++) a.push(0.5 - 0.5 * Math.cos((Math.PI * i) / (n - 1)));
  return a;
}

/** Half-cosine spacing 0..1 (dense near 0). */
export function halfcos(n) {
  const a = [];
  for (let i = 0; i < n; i++) a.push(1 - Math.cos((0.5 * Math.PI * i) / (n - 1)));
  return a;
}

export function linspace(a, b, n) {
  const r = [];
  for (let i = 0; i < n; i++) r.push(n === 1 ? a : a + ((b - a) * i) / (n - 1));
  return r;
}

/** Approach target at a maximum rate (units/s). */
export function approach(cur, target, rate, dt) {
  const d = target - cur;
  const step = rate * dt;
  if (Math.abs(d) <= step) return target;
  return cur + Math.sign(d) * step;
}
