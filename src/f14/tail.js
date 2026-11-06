import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { STAB, FIN, finLE, finBase } from './dims.js';
import { loft, mirrorY, sectionRing, makeHinge, pivotMesh, mirrorPt, Tp } from './geom.js';
import { linspace, lerp, DEG } from './util.js';

const mir = (g, side) => (side === 1 ? g : mirrorY(g));
const mp = (p, side) => (side === 1 ? p : mirrorPt(p));

/* ----------------------------- Stabilators ----------------------------- */

function stabFrame(y) {
  const S = STAB;
  const f = (y - S.root.y) / (S.tip.y - S.root.y);
  return {
    le: [lerp(S.root.le, S.tip.le, f), y, S.w],
    te: [lerp(S.root.te, S.tip.te, f), y, S.w],
    up: [0, 0, 1],
    t: lerp(S.tRoot, S.tTip, f),
    m: 0,
  };
}

export function buildStab(side, parent, mats) {
  const S = STAB;
  const rings = linspace(S.root.y, S.tip.y, 14).map((y) => sectionRing(stabFrame(y), 0, 1, 18));
  const geo = loft(rings, { closed: true, capStart: true, capEnd: true });
  const pivot = mp([S.pivot[0], S.root.y, S.pivot[2]], side);
  const hinge = makeHinge(parent, pivot, mp([0, 1, 0], side), null, side);
  hinge.add(pivotMesh(mir(geo, side), mats.body, pivot, 'stab'));
  // pivot fairing on the boom
  const fair = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 20), mats.metalDark);
  fair.rotation.x = Math.PI / 2;
  fair.position.set(0, 0, -0.02 * side);
  hinge.add(fair);
  return hinge;
}

/* ---------------------------- Vertical fins ---------------------------- */

const finUp = [0, -Math.cos(FIN.cant), Math.sin(FIN.cant)];

function finFrame(h) {
  const [le, te] = finLE(h);
  const [yb, wb] = finBase(h);
  const f = Math.max(0, Math.min(1, h / 2.23));
  return { le: [le, yb, wb], te: [te, yb, wb], up: finUp, t: lerp(FIN.tRoot, FIN.tTip, f), m: 0 };
}

function finPiece(hs, x0, x1, nChord) {
  const rings = hs.map((h) => sectionRing(finFrame(h), x0, x1, nChord));
  return loft(rings, { closed: true, capStart: true, capEnd: true });
}

export function buildFin(side, parent, mats) {
  const R = FIN.rudder;
  const lower = linspace(-0.12, 0.3, 8).concat([R.h0]);
  const mid = linspace(R.h0, R.h1, 14);
  const top = linspace(R.h1, 2.23, 4);
  const fixed = mergeGeometries([
    finPiece(lower, 0, 1, 22),
    finPiece(mid, 0, R.x0, 20),
    finPiece(top, 0, 1, 22),
  ]);
  const group = new THREE.Group();
  parent.add(group);
  group.add(pivotMesh(mir(fixed, side), mats.body, null, 'fin'));

  // rudder hinge along x0 line
  const hp0 = finPoint(R.h0, R.x0);
  const hp1 = finPoint(R.h1, R.x0);
  const hp = mp(hp0, side);
  const ax = mp([hp1[0] - hp0[0], hp1[1] - hp0[1], hp1[2] - hp0[2]], side);
  const hinge = makeHinge(group, hp, ax, null, side);
  hinge.add(pivotMesh(mir(finPiece(mid, R.x0, 1, 10), side), mats.body, hp, 'rudder'));

  // fin-tip cap light/antenna fairing
  const tipH = 2.23;
  const [le, te] = finLE(tipH);
  const [yb, wb] = finBase(tipH);
  const cap = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, te - le - 0.3, 4, 10), mats.body);
  cap.rotation.z = Math.PI / 2;
  cap.position.copy(Tp([(le + te) / 2 + 0.06, side * yb, wb + 0.005]));
  cap.castShadow = true;
  group.add(cap);
  const light = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), mats.navWhite);
  light.position.copy(Tp([te + 0.02, side * yb, wb - 0.05]));
  group.add(light);
  return { group, rudder: hinge };
}

function finPoint(h, x) {
  const [le, te] = finLE(h);
  const [yb, wb] = finBase(h);
  return [lerp(le, te, x), yb, wb];
}

/* ---------------------------- Ventral fins ----------------------------- */

export function buildVentral(side, parent, mats) {
  const root = { le: 13.77, te: 16.9, y: 1.43, w: -1.0 };
  const tip = { le: 15.8, te: 16.9, y: 1.66, w: -1.55 };
  const L = [0, tip.y - root.y, tip.w - root.w];
  const len = Math.hypot(L[1], L[2]);
  const Ln = [0, L[1] / len, L[2] / len];
  // first-half surface normal = s x L
  const up = [0, -Ln[2], Ln[1]];
  const rings = linspace(0, 1, 6).map((f) => {
    const y = lerp(root.y, tip.y, f);
    const w = lerp(root.w, tip.w, f);
    const le = lerp(root.le, tip.le, f);
    const te = lerp(root.te, tip.te, f);
    const t = 0.05 / (te - le);
    return sectionRing({ le: [le, y, w], te: [te, y, w], up, t: Math.min(t * 1.6, 0.06), m: 0 }, 0, 1, 12);
  });
  const geo = loft(rings, { closed: true, capStart: true, capEnd: true });
  const m = pivotMesh(mir(geo, side), mats.body, null, 'ventral');
  parent.add(m);
  return m;
}

export { DEG };
