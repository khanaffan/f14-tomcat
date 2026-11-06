import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { curve, spow, linspace, lerp, clamp } from './util.js';
import { loft, makeHinge, pivotMesh, T, Tp } from './geom.js';
import { podTopAt } from './body.js';

export const CANOPY = {
  top: curve([
    [3.35, 0.5], [3.6, 0.72], [3.9, 0.93], [4.2, 1.08], [4.45, 1.17], [5.0, 1.26], [5.6, 1.29],
    [6.5, 1.29], [7.2, 1.24], [7.8, 1.12], [8.3, 0.98], [8.6, 0.93],
  ]),
  hw: curve([[3.35, 0.42], [4.0, 0.5], [4.45, 0.53], [5.5, 0.55], [6.5, 0.55], [7.5, 0.53], [8.3, 0.47], [8.6, 0.42]]),
  n: curve([[3.35, 2.2], [4.45, 2.5], [6.0, 2.6], [8.6, 2.4]]),
  hinge: [8.6, 0, 0.85],
  sWind: 4.45,
  sGlass: 8.3,
  sEnd: 8.65,
};

export const sillW = (s) => podTopAt(s, CANOPY.hw(s)) - 0.012;

/** Point on the canopy surface at station s, angle phi in [0, PI] (0 = starboard sill). */
export function canopyPt(s, phi, off = 0) {
  const hw = CANOPY.hw(s) + off;
  const ws = sillW(s);
  const top = CANOPY.top(s) + off;
  const e = 2 / CANOPY.n(s);
  return [s, hw * spow(Math.cos(phi), e), ws + (top - ws) * spow(Math.sin(phi), e)];
}

function canopyRing(s, n, off = 0) {
  return linspace(0, Math.PI, n).map((p) => canopyPt(s, p, off));
}

function phiAtY(s, y) {
  let lo = 0;
  let hi = Math.PI / 2;
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    if (canopyPt(s, m)[1] > y) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}

function tube(points, r, mat, closed = false) {
  const curveP = new THREE.CatmullRomCurve3(points.map((p) => Tp(p)), closed, 'centripetal');
  const g = new THREE.TubeGeometry(curveP, Math.max(8, points.length * 3), r, 8, closed);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  return m;
}

function box(size, pos, mat, rot = null) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mat);
  m.position.copy(pos);
  if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function rbox(size, pos, mat, r = 0.02) {
  const rad = Math.min(r, ...size.map((v) => v / 2 - 1e-3));
  const m = new THREE.Mesh(new RoundedBoxGeometry(size[0], size[1], size[2], 2, rad), mat);
  m.position.copy(pos);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** Arch-shaped pull handle in the seat's y-z plane (striped yellow/black). */
function pullHandle(r, pos, mats) {
  const h = new THREE.Mesh(new THREE.TorusGeometry(r, 0.011, 6, 18, Math.PI), mats.yellowBlack);
  h.position.copy(pos);
  h.rotation.y = Math.PI / 2;
  return h;
}

const V3 = (x, y, z = 0) => new THREE.Vector3(x, y, z);

/**
 * Martin-Baker GRU-7A ejection seat. Local frame: +x forward, +y up the reclined back, z lateral.
 * Heights are kept below the RIO's descending canopy line (checked in the sanity script).
 */
function seat(s, mats) {
  const g = new THREE.Group();
  g.position.copy(T(s, 0, 0.42));
  g.rotation.z = 0.22; // seat back reclined (top aft)
  const dark = mats.seat;
  g.add(rbox([0.12, 0.7, 0.46], V3(-0.14, 0.25), dark, 0.025)); // back structure / parachute
  g.add(rbox([0.11, 0.5, 0.38], V3(-0.025, 0.25), mats.seatPad, 0.035)); // back cushion
  g.add(rbox([0.22, 0.22, 0.4], V3(-0.11, 0.61), dark, 0.05)); // headbox
  g.add(rbox([0.035, 0.15, 0.24], V3(-0.0025, 0.58), mats.seatPad, 0.015)); // head pad
  g.add(pullHandle(0.05, V3(-0.04, 0.72), mats)); // face-curtain handle
  g.add(rbox([0.46, 0.1, 0.44], V3(0.15, -0.07), dark, 0.025)); // survival kit
  g.add(rbox([0.42, 0.045, 0.38], V3(0.15, 0.0), mats.seatPad, 0.02)); // seat cushion
  g.add(pullHandle(0.04, V3(0.36, 0.0), mats)); // lower ejection handle
  for (const z of [-0.235, 0.235]) {
    g.add(rbox([0.38, 0.3, 0.03], V3(0.11, 0.03, z), dark, 0.012)); // bucket sides
    g.add(rbox([0.05, 0.05, 0.03], V3(0.24, 0.2, z), mats.metalDark, 0.01)); // arm-restraint fittings
  }
  for (const z of [-0.15, 0.15]) g.add(rbox([0.035, 0.8, 0.035], V3(-0.23, 0.3, z), mats.metalDark, 0.008)); // guide rails
  return g;
}

/** Instrument panel face (aft-facing at station s) with display screens and a scatter of gauges. */
function panelFace(sFace, wC, width, height, items, mats) {
  const g = new THREE.Group();
  g.position.copy(T(sFace, 0, wC));
  g.rotation.y = -Math.PI / 2; // +z (plane normal) -> aft
  const face = new THREE.Mesh(new THREE.PlaneGeometry(width, height), mats.cockpit);
  g.add(face);
  for (const it of items) {
    let m;
    if (it.round) m = new THREE.Mesh(new THREE.CircleGeometry(it.r, 32), it.mat || mats.display);
    else m = new THREE.Mesh(new THREE.PlaneGeometry(it.w, it.h), it.mat || mats.display);
    m.position.set(it.y, it.z, 0.002);
    g.add(m);
    if (it.bezel) {
      const b = it.round
        ? new THREE.Mesh(new THREE.RingGeometry(it.r, it.r + 0.018, 32), mats.coaming)
        : new THREE.Mesh(new THREE.PlaneGeometry(it.w + 0.03, it.h + 0.03), mats.coaming);
      b.position.set(it.y, it.z, it.round ? 0.002 : 0.001);
      g.add(b);
    }
  }
  return g;
}

/** Deterministic little gauge cluster for a panel. */
function gauges(y0, y1, z0, z1, n, seed, mats) {
  const out = [];
  let x = seed;
  const rnd = () => ((x = (x * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    out.push({ round: true, r: 0.018 + rnd() * 0.012, y: lerp(y0, y1, rnd()), z: lerp(z0, z1, rnd()), mat: mats.gauge });
  }
  return out;
}

function crewman(s, mats, visorColor) {
  const g = new THREE.Group();
  g.position.copy(T(s - 0.15, 0, 0.42));
  g.rotation.z = 0.22;
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.25, 4, 12), mats.suit);
  torso.scale.set(0.75, 1, 1.25);
  torso.position.set(0.02, 0.18, 0);
  const vest = new THREE.Mesh(new THREE.CapsuleGeometry(0.175, 0.18, 4, 12), mats.harness);
  vest.scale.set(0.78, 1, 1.27);
  vest.position.set(0.02, 0.24, 0);
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.135, 20, 16), mats.helmet);
  helmet.scale.set(1.08, 1, 0.95);
  helmet.position.set(0.03, 0.56, 0);
  const visor = new THREE.Mesh(
    new THREE.SphereGeometry(0.138, 20, 10, -Math.PI * 0.42, Math.PI * 0.84, Math.PI * 0.3, Math.PI * 0.25),
    visorColor,
  );
  visor.scale.set(1.08, 1, 0.96);
  visor.position.copy(helmet.position);
  visor.rotation.y = Math.PI;
  const mask = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), mats.mask);
  mask.scale.set(1, 0.9, 0.8);
  mask.position.set(0.13, 0.49, 0);
  for (const m of [torso, vest, helmet, visor, mask]) {
    m.castShadow = true;
    g.add(m);
  }
  return g;
}

/**
 * Canopy, windscreen and cockpit interior. Returns { canopyHinge, crew } handles.
 */
export function buildCockpit(parent, mats) {
  const C = CANOPY;
  const N = 34;

  // windscreen glass (fixed)
  const wsSt = linspace(3.3, C.sWind, 14);
  const wsGeo = loft(wsSt.map((s) => canopyRing(s, N)), { closed: false });
  parent.add(glassPair(wsGeo, null, mats));

  // windscreen arch + posts
  const arch = canopyRing(C.sWind, 24, 0.012);
  const archM = tube(arch, 0.03, mats.frame);
  parent.add(archM);
  for (const sgn of [-1, 1]) {
    const post = linspace(3.42, C.sWind, 10).map((s) => {
      const phi = phiAtY(s, 0.27 * (C.hw(s) / 0.53));
      const p = canopyPt(s, sgn > 0 ? phi : Math.PI - phi, 0.008);
      return p;
    });
    parent.add(tube(post, 0.016, mats.frame));
    // windscreen sill rail
    const rail = linspace(3.4, C.sWind, 8).map((s) => [s, sgn * (C.hw(s) + 0.005), sillW(s) + 0.01]);
    parent.add(tube(rail, 0.018, mats.frame));
  }
  // rear-view mirrors
  for (const sgn of [-1, 1]) {
    const p = canopyPt(C.sWind - 0.02, sgn > 0 ? 0.95 : Math.PI - 0.95, -0.02);
    parent.add(box([0.03, 0.05, 0.12], Tp(p), mats.frame));
  }

  // canopy (hinged at the rear)
  const hinge = makeHinge(parent, C.hinge, [0, 1, 0]);
  const glassSt = linspace(C.sWind, C.sGlass, 30);
  const glassGeo = loft(glassSt.map((s) => canopyRing(s, N)), { closed: false });
  hinge.add(glassPair(glassGeo, C.hinge, mats));
  // aft opaque fairing (painted)
  const aftSt = linspace(C.sGlass, C.sEnd, 6);
  const aftRings = aftSt.map((s) => canopyRing(s, N, 0.002));
  const aft = loft(aftRings, { closed: false, capEnd: false });
  const aftMesh = pivotMesh(aft, mats.body, C.hinge, 'canopyAft');
  aftMesh.material = mats.bodyDouble;
  hinge.add(aftMesh);
  // canopy frame: front bow, sills, aft bow
  const relTube = (pts, r) => {
    const m = tube(pts, r, mats.frame);
    m.position.sub(Tp(C.hinge));
    return m;
  };
  hinge.add(relTube(canopyRing(C.sWind + 0.02, 24, 0.008), 0.022));
  hinge.add(relTube(canopyRing(C.sGlass, 24, 0.008), 0.026));
  for (const sgn of [-1, 1]) {
    const rail = linspace(C.sWind, C.sEnd, 12).map((s) => [s, sgn * (C.hw(s) + 0.008), sillW(s) + 0.015]);
    hinge.add(relTube(rail, 0.022));
  }

  // interior
  const interior = new THREE.Group();
  parent.add(interior);
  // pilot coaming + HUD
  interior.add(rbox([0.38, 0.22, 0.8], T(4.93, 0, 0.7), mats.cockpit, 0.03));
  interior.add(rbox([0.4, 0.035, 0.84], T(4.92, 0, 0.82), mats.coaming, 0.015));
  const hud = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.14), mats.hud);
  hud.position.copy(T(4.88, 0, 0.92));
  hud.rotation.set(0, Math.PI / 2, 0);
  hud.rotateX(-0.45);
  interior.add(hud);
  interior.add(box([0.12, 0.06, 0.18], T(4.92, 0, 0.84), mats.cockpit));
  // pilot's panel: VDI over HSD, flanked by engine and flight instruments
  interior.add(panelFace(5.122, 0.68, 0.76, 0.2, [
    { w: 0.13, h: 0.12, y: 0, z: 0.03, bezel: true },
    { w: 0.11, h: 0.07, y: 0, z: -0.068, bezel: true },
    ...gauges(-0.34, -0.12, -0.08, 0.08, 7, 11, mats),
    ...gauges(0.12, 0.34, -0.08, 0.08, 7, 29, mats),
  ], mats));
  // RIO coaming with the round Tactical Information Display
  interior.add(rbox([0.3, 0.2, 0.76], T(6.62, 0, 0.66), mats.cockpit, 0.03));
  interior.add(rbox([0.32, 0.035, 0.8], T(6.61, 0, 0.765), mats.coaming, 0.015));
  interior.add(panelFace(6.772, 0.655, 0.72, 0.18, [
    { round: true, r: 0.075, y: 0, z: -0.005, bezel: true },
    { w: 0.12, h: 0.08, y: -0.22, z: 0.0, bezel: true },
    ...gauges(0.13, 0.33, -0.07, 0.07, 6, 47, mats),
  ], mats));
  // side consoles with lighter panel tops
  for (const sgn of [-1, 1]) {
    for (const [sc, len] of [[5.85, 1.1], [7.45, 1.0]]) {
      interior.add(rbox([len, 0.08, 0.16], T(sc, sgn * 0.42, 0.56), mats.cockpit, 0.015));
      const top = new THREE.Mesh(new THREE.PlaneGeometry(len - 0.06, 0.12), mats.consoleTop);
      top.position.copy(T(sc, sgn * 0.42, 0.601));
      top.rotation.x = -Math.PI / 2;
      interior.add(top);
    }
  }
  interior.add(seat(5.75, mats));
  interior.add(seat(7.25, mats));
  const crew = new THREE.Group();
  crew.add(crewman(5.75, mats, mats.visorGold));
  crew.add(crewman(7.25, mats, mats.visorDark));
  interior.add(crew);
  // bulkhead behind the RIO, cut to the canopy section
  const bh = new THREE.Shape();
  const sB = 8.0;
  for (let k = 0; k <= 24; k++) {
    const p = canopyPt(sB, (k / 24) * Math.PI, -0.035);
    if (k === 0) bh.moveTo(p[1], p[2]);
    else bh.lineTo(p[1], p[2]);
  }
  bh.lineTo(-0.4, 0.45);
  bh.lineTo(0.4, 0.45);
  const bhGeo = new THREE.ExtrudeGeometry(bh, { depth: 0.05, bevelEnabled: false, curveSegments: 1 });
  const bulk = new THREE.Mesh(bhGeo, mats.cockpit);
  bulk.rotation.y = Math.PI / 2; // shape x -> lateral, extrusion -> forward
  bulk.position.copy(T(sB + 0.05, 0, 0));
  bulk.castShadow = bulk.receiveShadow = true;
  interior.add(bulk);

  return { canopyHinge: hinge, crew, interior };
}

function glassPair(geo, pivot, mats) {
  const g = new THREE.Group();
  const tint = pivotMesh(geo, mats.glassTint, pivot, 'glass');
  tint.castShadow = false;
  tint.receiveShadow = false;
  tint.renderOrder = 2;
  const refl = new THREE.Mesh(tint.geometry, mats.glassReflect);
  refl.renderOrder = 3;
  g.add(tint, refl);
  return g;
}

export { clamp, lerp };
