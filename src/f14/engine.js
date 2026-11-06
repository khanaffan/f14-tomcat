import * as THREE from 'three';
import { NOZZLE } from './dims.js';
import { loft, mirrorY, T } from './geom.js';
import { lerp, sstep, clamp, curve } from './util.js';
import { duct } from './body.js';

const NSEG = 72;

/** Nozzle profile (s, r) from the shroud, along the petals, around the lip and back inside. */
function nozzleProfile(rExit) {
  const N = NOZZLE;
  const prof = [];
  const shroud = curve([[N.s0, N.r + 0.005], [N.s0 + 0.3, N.r - 0.002], [N.s1, N.r - 0.015]]);
  for (let i = 0; i <= 6; i++) {
    const s = lerp(N.s0, N.s1, i / 6);
    prof.push({ s, r: shroud(s), petal: 0 });
  }
  // step down onto the petals
  prof.push({ s: N.s1 + 0.002, r: N.r - 0.04, petal: 0 });
  const r0 = N.r - 0.04;
  for (let i = 1; i <= 10; i++) {
    const f = i / 10;
    const s = lerp(N.s1, N.s2, f);
    // convergent then slightly flared to the exit
    const r = lerp(r0, rExit, sstep(0, 1, f)) + 0.012 * Math.sin(Math.PI * f);
    prof.push({ s, r, petal: f });
  }
  // lip
  prof.push({ s: N.s2 + 0.004, r: rExit - 0.012, petal: 1, lip: true });
  prof.push({ s: N.s2, r: rExit - 0.024, petal: 1, lip: true });
  // inner surface back to the flame holder
  for (let i = 1; i <= 8; i++) {
    const f = i / 8;
    prof.push({ s: lerp(N.s2, 17.25, f), r: lerp(rExit - 0.024, N.r - 0.08, sstep(0, 0.6, f)), petal: 1 - f, inner: true });
  }
  return prof;
}

function nozzleRings(rExit) {
  const N = NOZZLE;
  const prof = nozzleProfile(rExit);
  return prof.map((p) => {
    const ring = [];
    for (let j = 0; j < NSEG; j++) {
      const th = (j / NSEG) * Math.PI * 2;
      const scal = Math.pow(Math.abs(Math.cos(9 * th)), 6);
      const notch = p.petal > 0 ? 0.08 * scal * sstep(0.6, 1, p.petal) : 0;
      const ridge = p.petal > 0 && !p.inner ? 0.006 * Math.cos(18 * th) * Math.sin(Math.PI * p.petal) : 0;
      const r = p.r + ridge;
      ring.push([p.s - notch, N.y + r * Math.cos(th), N.w + r * Math.sin(th)]);
    }
    return ring;
  });
}

function nozzleColors(prof) {
  const cols = [];
  prof.forEach((p) => {
    let c;
    if (p.inner) c = [0.035, 0.03, 0.026];
    else if (p.petal > 0) {
      // burnt titanium: straw/blue heat tint mid-petal, sooty towards the exit
      const t = Math.sin(Math.PI * Math.min(p.petal * 1.4, 1));
      c = [lerp(0.075, 0.04, p.petal) + 0.016 * t, lerp(0.072, 0.037, p.petal) + 0.007 * t, lerp(0.074, 0.036, p.petal) - 0.005 * t];
    } else c = [0.085, 0.082, 0.078];
    for (let j = 0; j < NSEG; j++) cols.push(c[0], c[1], c[2]);
  });
  return cols;
}

function toThree(geo) {
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setXYZ(i, -p.getX(i), p.getZ(i), p.getY(i));
  geo.computeVertexNormals();
  return geo;
}

export function buildEngines(parent, mats) {
  const N = NOZZLE;
  const prof = nozzleProfile(N.exitDry);
  const base = loft(nozzleRings(N.exitDry), { closed: true });
  base.setAttribute('color', new THREE.Float32BufferAttribute(nozzleColors(prof), 3));
  const geoR = toThree(base.clone());
  const geoL = toThree(mirrorY(base));
  // inner wall gets its own material: the sky can't be seen from inside the nozzle
  const innerStart = (prof.findIndex((p) => p.inner) - 1) * NSEG * 6;
  for (const g of [geoR, geoL]) {
    g.clearGroups();
    g.addGroup(0, innerStart, 0);
    g.addGroup(innerStart, g.index.count - innerStart, 1);
  }
  const nozR = new THREE.Mesh(geoR, [mats.nozzle, mats.nozzleInner]);
  const nozL = new THREE.Mesh(geoL, [mats.nozzle, mats.nozzleInner]);
  for (const m of [nozR, nozL]) {
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
  }

  // turbine face / afterburner liner with glow, fronted by the flame-holder gutters and spray bars
  const holderGeo = new THREE.CircleGeometry(N.r - 0.075, 48);
  const gutterGeos = [0.2, 0.36].map((r) => new THREE.TorusGeometry(r, 0.018, 6, 48));
  const sprayGeo = new THREE.BoxGeometry(0.02, N.r - 0.12, 0.03);
  sprayGeo.translate(0, (N.r - 0.12) / 2 + 0.05, 0);
  const holders = [];
  const glowLights = [];
  for (const side of [1, -1]) {
    const h = new THREE.Mesh(holderGeo, mats.flameHolder);
    h.position.copy(T(17.25, side * N.y, N.w));
    h.rotation.y = -Math.PI / 2;
    parent.add(h);
    holders.push(h);
    const gutters = new THREE.Group();
    gutters.position.copy(T(17.33, side * N.y, N.w));
    gutters.rotation.y = -Math.PI / 2;
    for (const g of gutterGeos) gutters.add(new THREE.Mesh(g, mats.metalDark));
    for (let k = 0; k < 10; k++) {
      const bar = new THREE.Mesh(sprayGeo, mats.metalDark);
      bar.rotation.z = (k / 10) * Math.PI * 2;
      gutters.add(bar);
    }
    parent.add(gutters);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.35, 24), mats.metalDark);
    cone.rotation.z = Math.PI / 2;
    cone.position.copy(T(17.4, side * N.y, N.w));
    parent.add(cone);
    const pl = new THREE.PointLight(0xff8a3a, 0, 9, 1.6);
    pl.position.copy(T(19.6, side * N.y, N.w));
    parent.add(pl);
    glowLights.push(pl);
  }

  // afterburner plumes
  const flames = [];
  for (const side of [1, -1]) {
    const g = new THREE.Group();
    g.position.copy(T(N.s2 - 0.05, side * N.y, N.w));
    g.rotation.z = Math.PI / 2; // cone axis (+Y) -> aft (-X)
    const layers = [
      { len: 4.2, r0: 0.5, r1: 0.12, mat: mats.flameOuter },
      { len: 3.0, r0: 0.4, r1: 0.08, mat: mats.flameMid },
      { len: 1.7, r0: 0.3, r1: 0.04, mat: mats.flameCore },
    ];
    for (const L of layers) {
      const geo = new THREE.CylinderGeometry(L.r1, L.r0, L.len, 40, 24, true);
      geo.translate(0, L.len / 2, 0); // wide end at the nozzle, extends along +Y (aft after group rotation)
      const m = new THREE.Mesh(geo, L.mat);
      m.userData.len = L.len;
      m.renderOrder = 5;
      m.frustumCulled = false;
      g.add(m);
    }
    g.visible = false;
    parent.add(g);
    flames.push(g);
  }

  // intake spinners / fan faces
  for (const side of [1, -1]) {
    const s = 10.15;
    const sp = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.32, 24), mats.metalDark);
    sp.rotation.z = -Math.PI / 2;
    sp.position.copy(T(s - 0.12, side * duct.yc(s), duct.wc(s)));
    parent.add(sp);
  }

  let lastExit = N.exitDry;
  const setExit = (rExit) => {
    if (Math.abs(rExit - lastExit) < 1e-4) return;
    lastExit = rExit;
    const rings = nozzleRings(rExit);
    const pr = geoR.attributes.position;
    const pl = geoL.attributes.position;
    let k = 0;
    for (const ring of rings) {
      for (const p of ring) {
        pr.setXYZ(k, -p[0], p[2], p[1]);
        pl.setXYZ(k, -p[0], p[2], -p[1]);
        k++;
      }
    }
    pr.needsUpdate = pl.needsUpdate = true;
    geoR.computeVertexNormals();
    geoL.computeVertexNormals();
  };

  return {
    flames,
    update(throttle, ab, t) {
      // throttle 0..1 (military), ab 0..1 (zone)
      setExit(lerp(N.exitDry, N.exitAB, sstep(0, 0.3, ab)) - 0.04 * clamp(throttle, 0, 1) * (1 - ab));
      // no visible glow at idle in daylight; a dull red at military power, white-hot in reheat
      const heat = clamp(0.3 * throttle * throttle + 1.8 * ab, 0, 2.5);
      mats.flameHolder.emissiveIntensity = heat;
      for (const f of flames) {
        f.visible = ab > 0.01;
        const flick = 1 + 0.05 * Math.sin(t * 37) + 0.04 * Math.sin(t * 23.7);
        f.scale.set(1, lerp(0.5, 1, ab) * flick, 1);
      }
      mats.setFlame(ab, t);
      for (const l of glowLights) l.intensity = ab * 40 * (1 + 0.1 * Math.sin(t * 30));
    },
  };
}
