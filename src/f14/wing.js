import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { WING, wingFrame, wingPoint } from './dims.js';
import { loft, mirrorY, sectionRing, nacaHalf, camberLine, makeHinge, pivotMesh, mirrorPt, Tp } from './geom.js';
import { linspace } from './util.js';

function piece(eta0, eta1, x0, x1, nSpan, nChord) {
  const rings = linspace(eta0, eta1, nSpan).map((eta) => sectionRing(wingFrame(eta), x0, x1, nChord));
  return loft(rings, { closed: true, capStart: true, capEnd: true });
}

/** Point on the wing surface (side +1 upper / -1 lower) with an extra normal offset. */
export function wingSurfPt(eta, x, side, extra = 0) {
  const f = wingFrame(eta);
  const c = Math.hypot(f.te[0] - f.le[0], f.te[1] - f.le[1]);
  const h = nacaHalf(x, f.t) * c;
  const m = camberLine(x, f.m) * c;
  const [s, y] = wingPoint(eta, x);
  return [s, y, m + side * h + extra];
}

function spoilerGeo(eta0, eta1, x0, x1) {
  const rings = linspace(eta0, eta1, 5).map((eta) => {
    const xs = linspace(x0, x1, 7);
    const top = xs.map((x) => wingSurfPt(eta, x, 1, 0.004));
    const bot = xs
      .slice()
      .reverse()
      .map((x) => wingSurfPt(eta, x, 1, -0.012));
    return [...top, top[top.length - 1], bot[0], ...bot, bot[bot.length - 1], top[0]];
  });
  return loft(rings, { closed: true, capStart: true, capEnd: true });
}

const mir = (g, side) => (side === 1 ? g : mirrorY(g));
const mp = (p, side) => (side === 1 ? p : mirrorPt(p));

/**
 * Build one wing (side = 1 starboard, -1 port). Returns the pivot group plus hinge handles.
 * The group is positioned at the wing pivot and should be rotated about +Y for sweep.
 */
export function buildWing(side, mats) {
  const W = WING;
  const pivot = mp(W.pivot, side);
  const group = new THREE.Group();
  group.name = side === 1 ? 'wingR' : 'wingL';
  group.position.copy(Tp(pivot));

  const fixed = mergeGeometries([
    piece(0, 1, 0.14, W.flap.x0, 30, 22),
    piece(0, W.slat.segs[0][0], 0, 0.14, 6, 14),
    piece(W.slat.segs[1][1], 1, 0, 0.14, 3, 14),
    piece(0, W.flap.segs[0][0], W.flap.x0, 1, 4, 12),
    piece(W.flap.segs[1][1], 1, W.flap.x0, 1, 5, 12),
  ]);
  group.add(pivotMesh(mir(fixed, side), mats.wing, pivot, 'wingFixed'));

  const hinges = { slats: [], flaps: [], spoilers: [] };

  for (const [e0, e1] of W.slat.segs) {
    const h0 = wingSurfPt(e0, 0.24, -1, -0.05);
    const h1 = wingSurfPt(e1, 0.24, -1, -0.05);
    const hp = mp(h0, side);
    const ax = mp([h1[0] - h0[0], h1[1] - h0[1], h1[2] - h0[2]], side);
    const hinge = makeHinge(group, hp, ax, pivot, side);
    hinge.add(pivotMesh(mir(piece(e0, e1, 0, 0.14, 10, 14), side), mats.wing, hp, 'slat'));
    hinges.slats.push(hinge);
  }

  for (const [e0, e1] of W.flap.segs) {
    const h0 = wingSurfPt(e0, 0.775, -1, -0.09);
    const h1 = wingSurfPt(e1, 0.775, -1, -0.09);
    const hp = mp(h0, side);
    const ax = mp([h1[0] - h0[0], h1[1] - h0[1], h1[2] - h0[2]], side);
    const hinge = makeHinge(group, hp, ax, pivot, side);
    hinge.add(pivotMesh(mir(piece(e0, e1, W.flap.x0, 1, 10, 12), side), mats.wing, hp, 'flap'));
    hinges.flaps.push(hinge);
  }

  for (const [e0, e1] of W.spoiler.segs) {
    const h0 = wingSurfPt(e0, W.spoiler.x0, 1, 0);
    const h1 = wingSurfPt(e1, W.spoiler.x0, 1, 0);
    const hp = mp(h0, side);
    const ax = mp([h1[0] - h0[0], h1[1] - h0[1], h1[2] - h0[2]], side);
    const hinge = makeHinge(group, hp, ax, pivot, side);
    const m = pivotMesh(mir(spoilerGeo(e0, e1, W.spoiler.x0, W.spoiler.x1), side), mats.wing, hp, 'spoiler');
    hinge.add(m);
    hinge.visible = false;
    hinges.spoilers.push(hinge);
  }

  // wingtip position light (starboard green, port red)
  const tip = wingSurfPt(0.995, 0.35, 1, -0.02);
  const lightPos = Tp(mp(tip, side)).sub(Tp(pivot));
  const navMat = side === 1 ? mats.navGreen : mats.navRed;
  const nav = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 8), navMat);
  nav.position.copy(lightPos).add(new THREE.Vector3(0, 0, 0.05 * side));
  nav.scale.set(1.6, 0.8, 1);
  group.add(nav);

  return { group, hinges, side };
}
