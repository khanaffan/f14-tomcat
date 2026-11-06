import * as THREE from 'three';
import { clamp, cosspace } from './util.js';

/*
 * Design frame used for all airframe geometry:
 *   s = metres aft of the nose tip, y = metres to starboard, w = metres up
 *   (w = 0 is the wing-pivot plane).
 * Three.js frame: x = -s (nose towards +X), y = w, z = y.
 */
export const T = (s, y, w) => new THREE.Vector3(-s, w, y);
export const Tp = (p) => new THREE.Vector3(-p[0], p[2], p[1]);

/**
 * Loft a list of rings (arrays of [s, y, w]) into an indexed geometry.
 * Rings must have equal point counts. Repeated points create sharp creases.
 * With rings counter-clockwise around the loft direction, normals face outwards.
 */
export function loft(rings, opt = {}) {
  const { closed = true, capStart = false, capEnd = false, flip = false, color = null } = opt;
  const nr = rings.length;
  const np = rings[0].length;
  const pos = [];
  const col = [];
  const idx = [];
  for (let i = 0; i < nr; i++) {
    const r = rings[i];
    if (r.length !== np) throw new Error(`loft: ring ${i} has ${r.length} points, expected ${np}`);
    for (let j = 0; j < np; j++) {
      pos.push(r[j][0], r[j][1], r[j][2]);
      if (color) {
        const c = color(i, j, r[j]);
        col.push(c[0], c[1], c[2]);
      }
    }
  }
  const segs = closed ? np : np - 1;
  for (let i = 0; i < nr - 1; i++) {
    for (let j = 0; j < segs; j++) {
      const j2 = (j + 1) % np;
      const a = i * np + j;
      const b = i * np + j2;
      const c = (i + 1) * np + j2;
      const d = (i + 1) * np + j;
      if (flip) idx.push(a, c, b, a, d, c);
      else idx.push(a, b, c, a, c, d);
    }
  }
  const cap = (ri, atEnd) => {
    const r = rings[ri];
    const base = pos.length / 3;
    let cx = 0;
    let cy = 0;
    let cz = 0;
    for (const p of r) {
      cx += p[0];
      cy += p[1];
      cz += p[2];
    }
    cx /= np;
    cy /= np;
    cz /= np;
    for (const p of r) {
      pos.push(p[0], p[1], p[2]);
      if (color) {
        const c = color(ri, 0, p);
        col.push(c[0], c[1], c[2]);
      }
    }
    pos.push(cx, cy, cz);
    if (color) {
      const c = color(ri, 0, [cx, cy, cz]);
      col.push(c[0], c[1], c[2]);
    }
    const ctr = base + np;
    const fwd = atEnd !== flip;
    for (let j = 0; j < segs; j++) {
      const a = base + j;
      const b = base + ((j + 1) % np);
      if (fwd) idx.push(ctr, a, b);
      else idx.push(ctr, b, a);
    }
  };
  if (capStart) cap(0, false);
  if (capEnd) cap(nr - 1, true);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  if (color) g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  return g;
}

/** Mirror a design-frame geometry across the centreline (y -> -y). */
export function mirrorY(geo) {
  const g = geo.clone();
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, -p.getY(i));
  const idx = g.index.array;
  for (let i = 0; i < idx.length; i += 3) {
    const t = idx[i + 1];
    idx[i + 1] = idx[i + 2];
    idx[i + 2] = t;
  }
  return g;
}

/**
 * Convert design-frame geometry into Three.js space relative to an optional pivot.
 * The untransformed design position is kept in `aRef` for livery projection.
 */
export function finalize(geo, pivot = null) {
  const p = geo.attributes.position;
  const ref = new Float32Array(p.count * 3);
  const ps = pivot ? pivot[0] : 0;
  const py = pivot ? pivot[1] : 0;
  const pw = pivot ? pivot[2] : 0;
  for (let i = 0; i < p.count; i++) {
    const s = p.getX(i);
    const y = p.getY(i);
    const w = p.getZ(i);
    ref[3 * i] = s;
    ref[3 * i + 1] = y;
    ref[3 * i + 2] = w;
    p.setXYZ(i, -(s - ps), w - pw, y - py);
  }
  geo.setAttribute('aRef', new THREE.BufferAttribute(ref, 3));
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  geo.computeBoundingBox();
  return geo;
}

/** Symmetric NACA 4-digit half thickness (closed trailing edge), as a fraction of chord. */
export function nacaHalf(x, t) {
  const xc = clamp(x, 0, 1);
  return 5 * t * (0.2969 * Math.sqrt(xc) - 0.126 * xc - 0.3516 * xc * xc + 0.2843 * xc ** 3 - 0.1036 * xc ** 4);
}

/** Simple camber line, fraction of chord. */
export const camberLine = (x, m) => 4 * m * x * (1 - x);

/**
 * Lifting-surface section ring for chord range [x0, x1].
 * frame: { le:[s,y,w], te:[s,y,w], up:[s,y,w] unit normal to chord plane, t:thickness ratio, m:camber, thick:min abs thickness }
 * Ring order: upper surface x0->x1, aft face, lower x1->x0, fore face (CCW around span direction).
 * Returns array of [s,y,w].
 */
export function sectionRing(frame, x0, x1, nChord, opts = {}) {
  const { le, te, up, t, m = 0, minThick = 0.004 } = frame;
  const hasFore = x0 > 1e-6;
  const hasAft = x1 < 1 - 1e-6;
  const faceN = hasAft ? (opts.faceN ?? 3) : 1;
  const chord = Math.hypot(te[0] - le[0], te[1] - le[1], te[2] - le[2]);
  const P = (x, side) => {
    const half = Math.max(nacaHalf(x, t) * chord, x > 0.999 ? minThick * 0.5 : 0);
    const off = camberLine(x, m) * chord + side * half;
    return [
      le[0] + (te[0] - le[0]) * x + up[0] * off,
      le[1] + (te[1] - le[1]) * x + up[1] * off,
      le[2] + (te[2] - le[2]) * x + up[2] * off,
    ];
  };
  const face = (pts, a, b, n) => {
    for (let k = 1; k < n; k++) {
      const f = k / n;
      pts.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]);
    }
  };
  const xs = cosspace(nChord).map((u) => x0 + (x1 - x0) * u);
  const pts = [];
  for (let i = 0; i < xs.length; i++) pts.push(P(xs[i], 1));
  // aft face (or thin trailing-edge face); duplicated corners make sharp creases
  const ua = P(x1, 1);
  const la = P(x1, -1);
  pts.push(ua);
  face(pts, ua, la, faceN);
  pts.push(la);
  pts.push(la.slice());
  for (let i = xs.length - 2; i >= (hasFore ? 0 : 1); i--) pts.push(P(xs[i], -1));
  if (hasFore) {
    const lf = P(x0, -1);
    const uf = P(x0, 1);
    pts.push(lf);
    face(pts, lf, uf, opts.faceN ?? 3);
    pts.push(uf);
  }
  return pts;
}

/** Circle/superellipse ring around an s-axis centre (CCW in the y-w plane). */
export function ellipseRing(s, yc, wc, ry, rwTop, rwBot, n, count, start = -Math.PI / 2) {
  const pts = [];
  const e = 2 / n;
  for (let i = 0; i < count; i++) {
    const a = start + (i / count) * Math.PI * 2;
    const c = Math.cos(a);
    const sn = Math.sin(a);
    const y = yc + ry * Math.sign(c) * Math.pow(Math.abs(c), e);
    const w = wc + (sn >= 0 ? rwTop : rwBot) * Math.sign(sn) * Math.pow(Math.abs(sn), e);
    pts.push([s, y, w]);
  }
  return pts;
}

/** Build a mesh from design-frame geometry with an optional pivot (for moving parts). */
export function makeMesh(geo, material, pivot = null, name = '') {
  finalize(geo, pivot);
  const mesh = new THREE.Mesh(geo, material);
  if (pivot) mesh.position.copy(Tp(pivot));
  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * Hinged group for a moving surface. `pivot`/`axis` are design-frame; `parentPivot` is the
 * design point the parent group is centred on. Port-side hinges (side = -1) take the mirrored
 * pivot/axis and negate the angle so equal inputs give mirror-symmetric deflection.
 */
export function makeHinge(parent, pivot, axis, parentPivot = null, side = 1) {
  const obj = new THREE.Group();
  const p = Tp(pivot);
  if (parentPivot) p.sub(Tp(parentPivot));
  obj.position.copy(p);
  const ax = new THREE.Vector3(-axis[0], axis[2], axis[1]).normalize();
  obj.userData.axis = ax;
  obj.userData.side = side;
  obj.userData.set = (a) => obj.quaternion.setFromAxisAngle(ax, side === 1 ? a : -a);
  parent.add(obj);
  return obj;
}

/** Mesh whose geometry is expressed relative to `pivot` (placed at the parent's origin). */
export function pivotMesh(geo, material, pivot = null, name = '') {
  finalize(geo, pivot);
  const m = new THREE.Mesh(geo, material);
  m.name = name;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** Concatenate polylines that share end points, keeping duplicates so junctions crease. */
export const creaseJoin = (...segs) => segs.flat();

export const mirrorPt = (p) => [p[0], -p[1], p[2]];
