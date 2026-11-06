import * as THREE from 'three';
import { GEAR } from './dims.js';
import { T } from './geom.js';
import { lerp, sstep, clamp } from './util.js';

function tireGeo(r, w) {
  const rIn = r * 0.6;
  const pts = [];
  const N = 14;
  pts.push(new THREE.Vector2(rIn, -w * 0.46));
  for (let i = 0; i <= N; i++) {
    const a = -Math.PI / 2 + (i / N) * Math.PI;
    const ry = w * 0.5;
    const rx = w * 0.42;
    pts.push(new THREE.Vector2(r - rx + rx * Math.cos(a), ry * Math.sin(a)));
  }
  pts.push(new THREE.Vector2(rIn, w * 0.46));
  const g = new THREE.LatheGeometry(pts, 40);
  g.rotateX(Math.PI / 2);
  return g;
}

function hubGeo(r, w) {
  const pts = [
    new THREE.Vector2(0.001, -w * 0.4),
    new THREE.Vector2(r * 0.25, -w * 0.4),
    new THREE.Vector2(r * 0.3, -w * 0.3),
    new THREE.Vector2(r * 0.55, -w * 0.32),
    new THREE.Vector2(r * 0.62, -w * 0.44),
    new THREE.Vector2(r * 0.62, w * 0.44),
    new THREE.Vector2(r * 0.55, w * 0.32),
    new THREE.Vector2(r * 0.3, w * 0.3),
    new THREE.Vector2(r * 0.25, w * 0.4),
    new THREE.Vector2(0.001, w * 0.4),
  ];
  const g = new THREE.LatheGeometry(pts, 32);
  g.rotateX(Math.PI / 2);
  return g;
}

export function makeWheel(r, w, mats) {
  const g = new THREE.Group();
  const tire = new THREE.Mesh(tireGeo(r, w), mats.rubber);
  const hub = new THREE.Mesh(hubGeo(r, w), mats.hub);
  tire.castShadow = hub.castShadow = true;
  tire.receiveShadow = true;
  g.add(tire, hub);
  // bolt circle detail
  const bolts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.012, 0.012, w * 0.86, 6), mats.metal, 8);
  const m = new THREE.Matrix4();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    m.makeRotationX(Math.PI / 2).setPosition(Math.cos(a) * r * 0.2, Math.sin(a) * r * 0.2, 0);
    bolts.setMatrixAt(i, m);
  }
  g.add(bolts);
  return g;
}

/** Cylinder between two Three.js points. */
export function strut(a, b, r, mat, r2 = r, seg = 16) {
  const d = new THREE.Vector3().subVectors(b, a);
  const len = d.length();
  const geo = new THREE.CylinderGeometry(r2, r, len, seg);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(a).addScaledVector(d, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function plate(w, h, t, mat) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, t), mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/* -------------------------------- Nose gear -------------------------------- */

export function buildNoseGear(parent, mats) {
  const N = GEAR.nose;
  const pivot = new THREE.Group();
  const tr = T(...N.trunnion);
  pivot.position.copy(tr);
  parent.add(pivot);
  const loc = (s, y, w) => T(s, y, w).sub(tr);

  const axle = loc(...N.axle);
  const top = new THREE.Vector3(0, 0, 0);
  const mid = loc(4.21, 0, -1.55);
  pivot.add(strut(top, mid, 0.075, mats.gear));
  pivot.add(strut(mid.clone().add(new THREE.Vector3(0, 0.1, 0)), axle.clone().add(new THREE.Vector3(0, 0.05, 0)), 0.05, mats.chrome));
  // fork / axle housing
  const fork = plate(0.12, 0.16, 0.24, mats.gear);
  fork.position.copy(axle).add(new THREE.Vector3(0, 0.07, 0));
  pivot.add(fork);
  pivot.add(strut(axle.clone().add(new THREE.Vector3(0, 0, -0.24)), axle.clone().add(new THREE.Vector3(0, 0, 0.24)), 0.03, mats.metal));
  for (const sgn of [-1, 1]) {
    const wheel = makeWheel(N.wheelR, N.wheelW, mats);
    wheel.position.copy(axle).add(new THREE.Vector3(0, 0, sgn * 0.155));
    pivot.add(wheel);
  }
  // torque links
  pivot.add(strut(mid.clone().add(new THREE.Vector3(-0.09, 0, 0)), axle.clone().add(new THREE.Vector3(-0.1, 0.18, 0)), 0.02, mats.gear));
  // launch bar (stowed upward-forward) and holdback fitting
  const lbA = loc(4.3, 0, -1.72);
  const lbB = loc(3.55, 0, -1.48);
  pivot.add(strut(lbA, lbB, 0.035, mats.gear));
  // drag brace from strut to fuselage forward
  pivot.add(strut(loc(4.25, 0, -1.15), loc(3.55, 0, -0.78), 0.035, mats.gear));
  // taxi / landing light
  const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.05, 16), mats.lamp);
  lamp.rotation.z = Math.PI / 2;
  lamp.position.copy(loc(4.12, 0, -1.25));
  pivot.add(lamp);

  // doors (hinged along the bay's outer edges)
  const doors = [];
  for (const sgn of [-1, 1]) {
    const h = new THREE.Group();
    h.position.copy(T(4.0, sgn * 0.19, -0.93));
    const d = plate(1.05, 0.012, 0.3, mats.paintLower);
    d.position.set(0, 0, -sgn * 0.15);
    h.add(d);
    h.userData.sgn = sgn;
    parent.add(h);
    doors.push(h);
  }
  const well = plate(1.0, 0.02, 0.36, mats.well);
  well.position.copy(T(4.0, 0, -0.925));
  well.castShadow = false;
  parent.add(well);

  return {
    set(ext) {
      // ext: 1 = down & locked, 0 = retracted
      const a = (1 - ext) * 100 * (Math.PI / 180);
      pivot.rotation.z = a;
      pivot.visible = ext > 0.02;
      const door = sstep(0, 0.35, ext) * 85 * (Math.PI / 180);
      for (const d of doors) {
        d.rotation.x = -d.userData.sgn * door;
        d.visible = ext > 0.01;
      }
      well.visible = ext > 0.01;
    },
  };
}

/* -------------------------------- Main gear -------------------------------- */

export function buildMainGear(parent, side, mats) {
  const M = GEAR.main;
  const tr = T(M.trunnion[0], side * M.trunnion[1], -0.12);
  const pivot = new THREE.Group();
  pivot.position.copy(tr);
  parent.add(pivot);
  const loc = (s, y, w) => T(s, side * y, w).sub(tr);

  const axleC = loc(...M.axle);
  const strutBot = loc(M.axle[0], M.axle[1] - 0.22, M.axle[2] + 0.05);
  const knee = loc(11.13, 2.24, -1.15);
  pivot.add(strut(new THREE.Vector3(), knee, 0.1, mats.gear, 0.11));
  pivot.add(strut(knee, strutBot, 0.07, mats.chrome));
  // wheel assembly (rotates flat during retraction)
  const wheelPivot = new THREE.Group();
  wheelPivot.position.copy(strutBot);
  pivot.add(wheelPivot);
  const wheel = makeWheel(M.wheelR, M.wheelW, mats);
  wheel.position.copy(axleC).sub(strutBot);
  wheelPivot.add(wheel);
  wheelPivot.add(strut(new THREE.Vector3(), wheel.position.clone().setY(0), 0.045, mats.metal));
  const housing = plate(0.2, 0.22, 0.14, mats.gear);
  housing.position.set(0, 0.04, 0);
  wheelPivot.add(housing);
  // torque links and drag brace
  pivot.add(strut(knee.clone().add(new THREE.Vector3(0.12, -0.05, 0)), strutBot.clone().add(new THREE.Vector3(0.12, 0.12, 0)), 0.025, mats.gear));
  pivot.add(strut(knee.clone().add(new THREE.Vector3(0, 0.05, 0)), loc(10.15, 2.15, -0.2), 0.045, mats.gear));
  pivot.add(strut(loc(11.12, 2.25, -0.95), loc(11.05, 1.75, -0.35), 0.035, mats.gear));
  // strut-mounted door
  const sdoor = plate(0.75, 1.0, 0.012, mats.paintLower);
  const dc = loc(11.0, 2.4, -0.75);
  sdoor.position.copy(dc);
  sdoor.rotation.x = side * 0.12;
  pivot.add(sdoor);

  // well cover door, hinged along the inboard edge
  const door = new THREE.Group();
  door.position.copy(T(10.75, side * 2.15, -0.23));
  const dp = plate(1.25, 0.012, 0.5, mats.paintLower);
  dp.position.set(0, 0, side * 0.25);
  door.add(dp);
  parent.add(door);
  const well = plate(1.2, 0.02, 0.55, mats.well);
  well.position.copy(T(10.75, side * 2.42, -0.225));
  well.castShadow = false;
  parent.add(well);

  return {
    set(ext) {
      const a = (1 - ext) * 90 * (Math.PI / 180);
      pivot.rotation.z = a;
      wheelPivot.rotation.y = side * (1 - sstep(0.15, 0.85, ext)) * (Math.PI / 2);
      pivot.visible = ext > 0.02;
      door.rotation.x = side * sstep(0, 0.4, ext) * 1.45;
      door.visible = ext > 0.01;
      well.visible = ext > 0.01;
    },
  };
}

export { clamp, lerp };
