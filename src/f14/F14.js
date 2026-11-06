import * as THREE from 'three';
import { DEG, clamp, lerp, sstep, approach, linspace, curve } from './util.js';
import { Tp, loft, mirrorY, makeMesh, pivotMesh, ellipseRing } from './geom.js';
import { SWEEP, DIM } from './dims.js';
import {
  buildPod, buildSideBlock, buildIntake, buildBeaverTail, buildBoom, buildFinFairing,
  podTopAt, podBotAt, podParams, beaver, beaverHalfAt, duct,
} from './body.js';
import { buildWing } from './wing.js';
import { buildStab, buildFin, buildVentral } from './tail.js';
import { buildNoseGear, buildMainGear } from './gear.js';
import { buildCockpit } from './cockpit.js';
import { buildEngines } from './engine.js';
import { createMaterials, isLiveryMaterial } from './materials.js';

/** CADC-style automatic sweep schedule (degrees) as a function of Mach. */
export function autoSweep(mach) {
  const S = [[0.0, 20], [0.7, 20], [0.8, 35], [0.9, 55], [1.0, 68]];
  if (mach >= 1) return 68;
  for (let i = 0; i < S.length - 1; i++) {
    if (mach <= S[i + 1][0]) return lerp(S[i][1], S[i + 1][1], (mach - S[i][0]) / (S[i + 1][0] - S[i][0]));
  }
  return 68;
}

/* ------------------------------- Helpers ------------------------------- */

function topSurf(s, y) {
  let w = -Infinity;
  if (s <= 18.0 && Math.abs(y) < podParams(s).a) w = podTopAt(s, y);
  if (s >= 16.6 && s <= 19.1 && Math.abs(y) < beaver.hw(s)) w = Math.max(w, beaver.wc + beaverHalfAt(s, y));
  return w;
}

function botSurf(s, y) {
  let w = Infinity;
  if (s <= 18.0 && Math.abs(y) < podParams(s).a) w = podBotAt(s, y);
  if (s >= 16.6 && s <= 19.1 && Math.abs(y) < beaver.hw(s)) w = Math.min(w, beaver.wc - beaverHalfAt(s, y));
  return w;
}

/** Thin panel conforming to a surface. dir = +1 outer face up, -1 outer face down. */
function conformPanel(s0, s1, y0, y1, surf, dir, ns = 10, ny = 12) {
  // outer skin sits just proud of the surface, the inner face a little below it
  const up = dir > 0 ? 0.006 : 0.018;
  const dn = dir > 0 ? 0.018 : 0.006;
  const rings = linspace(s0, s1, ns).map((s) => {
    const ys = linspace(y0, y1, ny);
    const top = ys.slice().reverse().map((y) => [s, y, surf(s, y) + up]);
    const bot = ys.map((y) => [s, y, surf(s, y) - dn]);
    return [...top, top[top.length - 1], bot[0], ...bot, bot[bot.length - 1], top[0]];
  });
  return loft(rings, { closed: true, capStart: true, capEnd: true });
}

function revolve(s0, s1, n, rFn, yc, wc, seg = 32) {
  const rings = linspace(s0, s1, n).map((s) => {
    const r = Math.max(rFn(s), 0.004);
    return ellipseRing(s, yc, wc, r, r, r, 2, seg);
  });
  return loft(rings, { closed: true, capStart: true, capEnd: true });
}

/** Give primitive meshes that use livery materials an aRef attribute (design coords at the reference pose). */
function bakeRefs(root) {
  root.updateMatrixWorld(true);
  const inv = root.matrixWorld.clone().invert();
  const v = new THREE.Vector3();
  root.traverse((o) => {
    if (!o.isMesh || !isLiveryMaterial(o.material) || o.geometry.attributes.aRef) return;
    const g = o.geometry.clone();
    g.applyMatrix4(o.matrix);
    o.position.set(0, 0, 0);
    o.quaternion.identity();
    o.scale.set(1, 1, 1);
    o.updateMatrix();
    o.updateMatrixWorld(true);
    const M = inv.clone().multiply(o.parent.matrixWorld);
    const p = g.attributes.position;
    const ref = new Float32Array(p.count * 3);
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyMatrix4(M);
      ref[3 * i] = -v.x;
      ref[3 * i + 1] = v.z;
      ref[3 * i + 2] = v.y;
    }
    g.setAttribute('aRef', new THREE.BufferAttribute(ref, 3));
    g.computeVertexNormals();
    o.geometry = g;
  });
}

function shadowAll(obj, cast = true, receive = true) {
  obj.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = cast;
      o.receiveShadow = receive;
    }
  });
}

/* -------------------------------- Model -------------------------------- */

export class F14 {
  constructor(renderer, opts = {}) {
    const mats = (this.mats = createMaterials(renderer, opts.livery || 'lowvis'));
    this.root = new THREE.Group();
    this.root.name = 'F-14 Tomcat';
    const af = (this.airframe = new THREE.Group());
    af.name = 'airframe';
    af.position.set(DIM.centerS, -DIM.groundW, 0);
    this.root.add(af);

    const add = (geo, mat, name, parent = af) => {
      const m = makeMesh(geo, mat, null, name);
      parent.add(m);
      return m;
    };

    /* ---- fixed structure ---- */
    add(buildPod(), mats.body, 'fuselage');
    const sb = buildSideBlock();
    add(sb.starboard, mats.body, 'nacelleGloveR');
    add(sb.port, mats.body, 'nacelleGloveL');
    const intake = buildIntake(sb.frontRing);
    const ductL = mirrorY(intake.duct);
    const lipL = mirrorY(intake.lip);
    add(intake.duct, mats.duct, 'intakeDuctR').castShadow = false;
    add(ductL, mats.duct, 'intakeDuctL').castShadow = false;
    add(intake.lip, mats.body, 'intakeLipR');
    add(lipL, mats.body, 'intakeLipL');
    add(buildBeaverTail(), mats.body, 'beaverTail');
    const boom = buildBoom();
    add(boom.starboard, mats.body, 'boomR');
    add(boom.port, mats.body, 'boomL');
    const ff = buildFinFairing();
    add(ff.starboard, mats.body, 'finFairingR');
    add(ff.port, mats.body, 'finFairingL');
    for (const side of [1, -1]) buildVentral(side, af, mats);
    this.buildTCS(af);
    this.buildDetails(af);

    /* ---- moving parts ---- */
    this.wings = [buildWing(1, mats), buildWing(-1, mats)];
    for (const w of this.wings) af.add(w.group);
    this.stabs = [buildStab(1, af, mats), buildStab(-1, af, mats)];
    this.fins = [buildFin(1, af, mats), buildFin(-1, af, mats)];
    this.engines = buildEngines(af, mats);
    this.noseGear = buildNoseGear(af, mats);
    this.mainGear = [buildMainGear(af, 1, mats), buildMainGear(af, -1, mats)];
    this.cockpit = buildCockpit(af, mats);
    this.buildSpeedBrakes(af);
    this.buildHook(af);
    this.stores = this.buildStores(af);

    bakeRefs(af);

    this.state = {
      sweepMode: 'auto', // auto | manual | bomb | oversweep
      mach: 0.4,
      manualSweep: 20,
      flaps: 'up', // up | maneuver | full
      gearDown: true,
      canopyOpen: false,
      hookDown: false,
      speedBrake: false,
      throttle: 0.3,
      afterburner: 0, // 0..1
      pitch: 0,
      roll: 0,
      yaw: 0,
      tanks: true,
      lights: true,
    };
    this.pos = {
      sweep: 20,
      flap: 0,
      aux: 0,
      slat: 0,
      gear: 1,
      canopy: 0,
      hook: 0,
      speedBrake: 0,
      ab: 0,
      throttle: 0.3,
      stabR: 0,
      stabL: 0,
      rudder: 0,
      spoilerR: 0,
      spoilerL: 0,
    };
    this.info = { sweepTarget: 20, maxSweep: SWEEP.over, notes: [] };
    this.time = 0;
    this.setTanks(true);
    this.update(0, true);
  }

  /* ---------------------------- Extra parts ---------------------------- */

  buildTCS(af) {
    // Television Camera Set chin pod: flat sensor window at the front
    const hw = curve([[2.6, 0.1], [2.63, 0.112], [2.75, 0.115], [3.1, 0.115], [3.35, 0.06], [3.45, 0.01]]);
    const wc = -0.92;
    const rings = linspace(2.6, 3.45, 18).map((s) => {
      const r = hw(s);
      return ellipseRing(s, 0, wc, r, r * 0.9, r * 0.85, 2.3, 28);
    });
    af.add(makeMesh(loft(rings, { closed: true, capStart: true, capEnd: true }), this.mats.body, null, 'tcsPod'));
    const win = new THREE.Mesh(new THREE.CircleGeometry(0.075, 24), this.mats.sensorGlass);
    win.position.copy(Tp([2.597, 0, wc]));
    win.rotation.y = Math.PI / 2;
    win.scale.set(1, 0.85, 1);
    af.add(win);
  }

  buildDetails(af) {
    const mats = this.mats;
    // anti-collision beacons (top of the spine, belly)
    const bGeo = new THREE.SphereGeometry(0.055, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    const top = new THREE.Mesh(bGeo, mats.beacon);
    top.position.copy(Tp([13.4, 0, podTopAt(13.4, 0) - 0.01]));
    const bot = new THREE.Mesh(bGeo, mats.beacon);
    bot.position.copy(Tp([9.3, 0, podBotAt(9.3, 0) + 0.01]));
    bot.rotation.x = Math.PI;
    af.add(top, bot);
    this.beacons = [top, bot];
    // pitot / AOA probes on the nose sides
    for (const side of [1, -1]) {
      const p = podParams(2.75);
      const base = [2.75, side * (p.a - 0.01), p.wMax + 0.05];
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.011, 0.11, 8), mats.metal);
      stem.rotation.x = Math.PI / 2;
      stem.position.copy(Tp([base[0], base[1] + side * 0.05, base[2]]));
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.22, 8), mats.metal);
      tube.rotation.z = Math.PI / 2;
      tube.position.copy(Tp([base[0] - 0.1, base[1] + side * 0.1, base[2]]));
      af.add(stem, tube);
    }
    // IFF / UHF blade antennas on the spine and belly
    const blade = (s, w, h, down) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(0.22, 0);
      shape.lineTo(0.1, h);
      shape.lineTo(0.04, h);
      shape.closePath();
      const g = new THREE.ExtrudeGeometry(shape, { depth: 0.012, bevelEnabled: false });
      g.translate(-0.11, 0, -0.006);
      const m = new THREE.Mesh(g, mats.metalDark);
      m.position.copy(Tp([s, 0, w]));
      if (down) m.rotation.x = Math.PI;
      m.castShadow = true;
      af.add(m);
    };
    blade(11.2, podTopAt(11.2, 0) - 0.01, 0.16, false);
    blade(7.2, podBotAt(7.2, 0) + 0.01, 0.14, true);
    blade(13.0, podBotAt(13.0, 0) + 0.01, 0.12, true);
  }

  buildSpeedBrakes(af) {
    const mats = this.mats;
    const sbs = [];
    // upper panel on top of the aft fuselage, hinged at its leading edge
    const uS0 = 16.9;
    const uGeo = conformPanel(uS0, 18.0, -0.42, 0.42, topSurf, 1, 12, 16);
    const uPivot = [uS0, 0, topSurf(uS0, 0) - 0.01];
    const uh = new THREE.Group();
    uh.position.copy(Tp(uPivot));
    uh.add(pivotMesh(uGeo, mats.body, uPivot, 'speedBrakeUpper'));
    af.add(uh);
    sbs.push({ obj: uh, dir: -1, max: 60 * DEG });
    // lower panels either side of the hook
    for (const side of [1, -1]) {
      const lS0 = 17.0;
      let g = conformPanel(lS0, 17.95, 0.13, 0.56, botSurf, -1, 10, 10);
      if (side === -1) g = mirrorY(g);
      const pv = [lS0, side * 0.35, botSurf(lS0, 0.35) + 0.012];
      const lh = new THREE.Group();
      lh.position.copy(Tp(pv));
      lh.add(pivotMesh(g, mats.body, pv, 'speedBrakeLower'));
      af.add(lh);
      sbs.push({ obj: lh, dir: 1, max: 60 * DEG });
    }
    this.speedBrakes = sbs;
  }

  buildHook(af) {
    const mats = this.mats;
    const P0 = [16.3, 0, -0.74];
    const P1 = [18.75, 0, -0.56];
    const hook = new THREE.Group();
    hook.position.copy(Tp(P0));
    af.add(hook);
    const a = new THREE.Vector3();
    const b = Tp(P1).sub(Tp(P0));
    const len = b.length();
    const dirV = b.clone().normalize();
    const stripes = 7;
    for (let i = 0; i < stripes; i++) {
      const f0 = i / stripes;
      const f1 = (i + 1) / stripes;
      const r0 = lerp(0.045, 0.034, f0);
      const r1 = lerp(0.045, 0.034, f1);
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, len / stripes, 12), i % 2 ? mats.coaming : mats.gear);
      seg.position.copy(a).addScaledVector(dirV, ((f0 + f1) / 2) * len);
      seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirV);
      hook.add(seg);
    }
    const point = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.028, 8, 16, Math.PI * 1.1), mats.metal);
    point.position.copy(b).add(new THREE.Vector3(-0.02, -0.03, 0));
    point.rotation.z = Math.PI * 0.62;
    hook.add(point);
    // mounting fairing
    const mount = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.16), mats.body);
    mount.position.copy(Tp([16.35, 0, -0.64]));
    af.add(mount);
    shadowAll(hook);
    this.hook = hook;
  }

  buildStores(af) {
    const mats = this.mats;
    const group = new THREE.Group();
    group.name = 'stores';
    af.add(group);
    // 267 US gal drop tanks under the intake ducts
    const s0 = 9.0;
    const L = 4.3;
    const R = 0.3;
    const prof = (s) => {
      const u = (s - s0) / L;
      if (u < 0.3) return R * Math.pow(1 - Math.pow(1 - u / 0.3, 2), 0.62);
      if (u > 0.68) return R * (1 - 0.86 * Math.pow((u - 0.68) / 0.32, 1.7));
      return R;
    };
    const ys = duct.yc(11);
    const nacBot = duct.wc(11) - duct.awB(11);
    const wc = nacBot - 0.13 - R;
    const st = [];
    for (let i = 0; i <= 40; i++) st.push(s0 + L * (0.5 - 0.5 * Math.cos((Math.PI * i) / 40)));
    const tankGeo = () =>
      loft(
        st.map((s) => {
          const r = Math.max(prof(s), 0.003);
          return ellipseRing(s, ys, wc, r, r, r, 2, 36);
        }),
        { closed: true, capStart: true, capEnd: true },
      );
    // pylon
    const pylonGeo = () => {
      const rings = linspace(wc + R - 0.03, nacBot + 0.08, 4).map((w) => {
        const pts = [];
        const sA = 9.9;
        const sB = 11.9;
        const n = 12;
        for (let i = 0; i <= n; i++) {
          const x = i / n;
          const half = 0.035 * Math.sqrt(Math.max(0, 1 - Math.pow(2 * x - 1, 2))) + 0.004;
          pts.push([lerp(sA, sB, x), ys - half, w]);
        }
        for (let i = n; i >= 0; i--) {
          const x = i / n;
          const half = 0.035 * Math.sqrt(Math.max(0, 1 - Math.pow(2 * x - 1, 2))) + 0.004;
          pts.push([lerp(sA, sB, x), ys + half, w]);
        }
        return pts;
      });
      // rings are stacked along +w; the first half (inboard side) then faces -y, i.e. outward
      return loft(rings, { closed: true, capStart: true, capEnd: true });
    };
    const tR = tankGeo();
    const tL = mirrorY(tR);
    const pR = pylonGeo();
    const pL = mirrorY(pR);
    group.add(makeMesh(tR, mats.store, null, 'tankR'));
    group.add(makeMesh(tL, mats.store, null, 'tankL'));
    group.add(makeMesh(pR, mats.store, null, 'pylonR'));
    group.add(makeMesh(pL, mats.store, null, 'pylonL'));
    return { tanks: group };
  }

  setTanks(on) {
    this.state.tanks = on;
    this.stores.tanks.visible = on;
  }

  setLivery(key, opts) {
    return this.mats.setLivery(key, opts);
  }

  /* ------------------------------ Systems ------------------------------ */

  sweepTarget() {
    const S = this.state;
    const auto = autoSweep(S.mach);
    let t;
    switch (S.sweepMode) {
      case 'manual':
        t = Math.max(clamp(S.manualSweep, SWEEP.min, SWEEP.max), auto);
        break;
      case 'bomb':
        t = Math.max(SWEEP.bomb, auto);
        break;
      case 'oversweep':
        t = S.gearDown && this.pos.gear > 0.99 && S.flaps === 'up' ? SWEEP.over : SWEEP.max;
        break;
      default:
        t = auto;
    }
    if (S.flaps === 'full') t = SWEEP.min;
    else if (S.flaps === 'maneuver') t = Math.min(t, 50);
    return t;
  }

  /**
   * Advance the simulation. dt in seconds; `instant` snaps everything to its target.
   */
  update(dt, instant = false) {
    const S = this.state;
    const P = this.pos;
    this.time += dt;
    const t = this.time;
    const step = (cur, target, rate) => (instant ? target : approach(cur, target, rate, dt));
    const notes = [];

    for (let pass = 0; pass < (instant ? 3 : 1); pass++) {
      // high-lift targets with sweep interlocks
      const want = this.sweepTarget();
      let flapT = S.flaps === 'full' ? 35 : S.flaps === 'maneuver' ? 10 : 0;
      let slatT = S.flaps === 'full' ? 17 : S.flaps === 'maneuver' ? 7 : 0;
      let auxT = S.flaps === 'full' ? 35 : 0;
      if (want > 21.5 || P.sweep > 21.6) {
        auxT = 0;
        flapT = Math.min(flapT, 10);
        slatT = Math.min(slatT, 7);
      }
      if (want > 50 || P.sweep > 50.1) {
        flapT = 0;
        slatT = 0;
      }
      P.aux = step(P.aux, auxT, 12);
      P.flap = step(P.flap, flapT, 12);
      P.slat = step(P.slat, slatT, 6);

      let maxSweep = SWEEP.over;
      if (P.aux > 0.2 || P.flap > 10.2 || P.slat > 7.2) maxSweep = 21.5;
      else if (P.flap > 0.2 || P.slat > 0.2) maxSweep = 50;
      const target = Math.min(want, maxSweep);
      if (target < want - 0.01) notes.push('Sweep held until flaps/slats retract');
      P.sweep = step(P.sweep, target, 10);
      this.info.sweepTarget = want;
      this.info.maxSweep = maxSweep;
    }
    if (S.sweepMode === 'oversweep' && P.sweep < SWEEP.over - 0.01 && this.sweepTarget() < SWEEP.over) {
      notes.push('Oversweep needs gear down & flaps up');
    }
    if (S.sweepMode === 'manual' && S.manualSweep < autoSweep(S.mach) - 0.5) notes.push('Manual sweep limited by Mach schedule');

    // gear / canopy / hook / speed brakes / engines
    P.gear = step(P.gear, S.gearDown ? 1 : 0, 0.22);
    P.canopy = step(P.canopy, S.canopyOpen ? 1 : 0, 0.18);
    P.hook = step(P.hook, S.hookDown ? 1 : 0, 0.9);
    P.speedBrake = step(P.speedBrake, S.speedBrake ? 1 : 0, 0.9);
    P.throttle = step(P.throttle, S.throttle, 0.6);
    P.ab = step(P.ab, S.afterburner, 0.9);

    // flight controls
    const pitchTEup = S.pitch >= 0 ? 24 * S.pitch : 10 * S.pitch;
    const spoilersActive = P.sweep < 57;
    const rollStab = (spoilersActive ? 9 : 15) * S.roll;
    const stabR = clamp(pitchTEup + rollStab, -12, 33);
    const stabL = clamp(pitchTEup - rollStab, -12, 33);
    P.stabR = step(P.stabR, stabR, 50);
    P.stabL = step(P.stabL, stabL, 50);
    P.rudder = step(P.rudder, 30 * S.yaw, 70);
    const spR = spoilersActive ? 55 * Math.max(S.roll, 0) : 0;
    const spL = spoilersActive ? 55 * Math.max(-S.roll, 0) : 0;
    P.spoilerR = step(P.spoilerR, spR, 110);
    P.spoilerL = step(P.spoilerL, spL, 110);
    if (!spoilersActive && Math.abs(S.roll) > 0.01) notes.push('Spoilers locked out above 57° sweep');
    this.info.notes = notes;

    this.apply(t);
  }

  apply(t) {
    const P = this.pos;
    const S = this.state;
    const d = (P.sweep - SWEEP.ref) * DEG;
    const [wR, wL] = this.wings;
    wR.group.rotation.y = -d;
    wL.group.rotation.y = d;
    for (const w of this.wings) {
      w.hinges.flaps[0].userData.set(P.aux * DEG);
      w.hinges.flaps[1].userData.set(P.flap * DEG);
      for (const s of w.hinges.slats) s.userData.set(-P.slat * DEG);
      const sp = w.side === 1 ? P.spoilerR : P.spoilerL;
      for (const h of w.hinges.spoilers) {
        h.userData.set(-sp * DEG);
        h.visible = sp > 0.3;
      }
    }
    this.stabs[0].userData.set(-P.stabR * DEG);
    this.stabs[1].userData.set(-P.stabL * DEG);
    this.fins[0].rudder.userData.set(P.rudder * DEG);
    this.fins[1].rudder.userData.set(-P.rudder * DEG);

    this.noseGear.set(P.gear);
    for (const g of this.mainGear) g.set(P.gear);
    this.cockpit.canopyHinge.userData.set(22 * DEG * sstep(0, 1, P.canopy));
    this.hook.rotation.z = 40 * DEG * sstep(0, 1, P.hook);
    for (const b of this.speedBrakes) b.obj.rotation.z = b.dir * b.max * sstep(0, 1, P.speedBrake);
    this.engines.update(P.throttle, P.ab, t);

    // lights
    const on = S.lights;
    const blink = on && (t * 1.1) % 1 < 0.09 ? 9 : 0;
    this.mats.beacon.emissiveIntensity = blink;
    this.mats.lamp.emissiveIntensity = on && P.gear > 0.98 ? 3 : 0;
    for (const m of [this.mats.navRed, this.mats.navGreen, this.mats.navWhite]) m.emissiveIntensity = on ? 2 : 0;
  }
}
