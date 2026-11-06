/**
 * Builds the procedural F-14 and exports it as a binary glTF that other engines (Cesium) can load.
 *
 * The live model paints its livery with a projection shader and draws the afterburner with a
 * custom shader; neither survives glTF export, so this module bakes the livery into UV-mapped
 * atlas textures and swaps the plume / canopy-reflection materials for portable ones.
 * The returned `jet` keeps running its normal animation logic; `nodes` maps every exported
 * glTF node name to the three.js object whose local matrix / visibility it should mirror.
 */
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { F14 } from '../f14/F14.js';
import { RANGES } from '../f14/livery.js';

// three.js only needs the renderer for the anisotropy limit while painting textures
const RENDERER_STUB = { capabilities: { getMaxAnisotropy: () => 8 } };

/** Pack several textures into one canvas; returns the texture and a uv remapper per panel. */
function makeAtlas(panels, scale) {
  const W = Math.round(Math.max(...panels.map((p) => p.x + p.img.width)) * scale);
  const H = Math.round(Math.max(...panels.map((p) => p.y + p.img.height)) * scale);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const map = {};
  for (const p of panels) {
    const px = p.x * scale;
    const py = p.y * scale;
    const pw = p.img.width * scale;
    const ph = p.img.height * scale;
    ctx.drawImage(p.img, px, py, pw, ph);
    const eu = 1.5 / pw;
    const ev = 1.5 / ph;
    // (u, v) in the source texture (three.js convention, v up) -> atlas uv
    map[p.key] = (u, v) => {
      u = Math.min(1 - eu, Math.max(eu, u));
      v = Math.min(1 - ev, Math.max(ev, v));
      return [(px + u * pw) / W, 1 - (py + (1 - v) * ph) / H];
    };
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData.mimeType = 'image/jpeg';
  return { tex, map };
}

const PROJ = ['top', 'bottom', 'starboard', 'port'];

/** Re-index a livery mesh with a per-triangle projection choice and atlas uvs. */
function bakeLiveryGeometry(geo, kind, atlas) {
  const pos = geo.attributes.position;
  const nor = geo.attributes.normal;
  const ref = geo.attributes.aRef;
  const index = geo.index ? geo.index.array : Array.from({ length: pos.count }, (_, i) => i);
  const R = kind === 'wing' ? RANGES.wing : RANGES.body;

  const outPos = [];
  const outNor = [];
  const outUv = [];
  const outIdx = [];
  const seen = new Map();

  const uvFor = (i, proj) => {
    const s = ref.getX(i);
    const y = ref.getY(i);
    const w = ref.getZ(i);
    const u = (y - R.y0) / R.Y;
    const v = 1 - (s - R.s0) / R.S;
    if (proj === 'top') return atlas.map.top(u, v);
    if (proj === 'bottom') return atlas.map.bottom(1 - u, v);
    const us = (s - R.s0) / R.S;
    const vs = Math.min(0.498, Math.max(0.002, (0.5 * (w - R.w0)) / R.Wr));
    return proj === 'starboard' ? atlas.map.side(1 - us, 0.5 + vs) : atlas.map.side(us, vs);
  };

  for (let t = 0; t < index.length; t += 3) {
    const tri = [index[t], index[t + 1], index[t + 2]];
    // normal in the livery frame (s aft, y starboard, w up), as in the projection shader
    let nx = 0;
    let ny = 0;
    let nz = 0;
    let ySum = 0;
    for (const i of tri) {
      nx -= nor.getX(i);
      ny += nor.getZ(i);
      nz += nor.getY(i);
      ySum += ref.getY(i);
    }
    let proj;
    if (kind === 'wing') {
      proj = nz >= 0 ? 'top' : 'bottom';
    } else {
      // same weights as the shader's triplanar blend, but a hard choice per triangle
      const len = Math.hypot(nx, ny, nz) || 1;
      const wT = Math.max(nz / len, 0) ** 4;
      const wB = Math.max(-nz / len, 0) ** 4;
      const wS = Math.abs(ny / len) ** 4 + Math.abs(nx / len) ** 4;
      if (wS >= wT && wS >= wB) proj = ny / len + 0.03 * Math.sign(ySum) >= 0 ? 'starboard' : 'port';
      else proj = wT >= wB ? 'top' : 'bottom';
    }
    const pj = PROJ.indexOf(proj);
    for (const i of tri) {
      const key = i * 4 + pj;
      let k = seen.get(key);
      if (k === undefined) {
        k = outPos.length / 3;
        seen.set(key, k);
        outPos.push(pos.getX(i), pos.getY(i), pos.getZ(i));
        outNor.push(nor.getX(i), nor.getY(i), nor.getZ(i));
        outUv.push(...uvFor(i, proj));
      }
      outIdx.push(k);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(outPos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(outNor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(outUv, 2));
  g.setIndex(outIdx);
  return g;
}

/**
 * @param {object} [opts]
 * @param {'lowvis'|'highvis'} [opts.livery]
 * @param {boolean} [opts.tanks]
 * @param {boolean} [opts.crew]
 * @param {number} [opts.textureScale] atlas resolution relative to the live model's textures
 * @returns {Promise<{ glb: ArrayBuffer, jet: F14, nodes: Map<string, THREE.Object3D> }>}
 */
export async function buildF14Glb(opts = {}) {
  const { livery = 'lowvis', tanks = true, crew = true, textureScale = 0.5 } = opts;
  const jet = new F14(RENDERER_STUB, { livery });
  jet.setTanks(tanks);
  jet.cockpit.crew.visible = crew;
  const mats = jet.mats;

  const bodyU = mats.liveryUniforms.body;
  const wingU = mats.liveryUniforms.wing;
  const top = bodyU.tLivTop.value.image;
  const bodyAtlas = makeAtlas(
    [
      { key: 'top', img: top, x: 0, y: 0 },
      { key: 'bottom', img: bodyU.tLivBot.value.image, x: top.width, y: 0 },
      { key: 'side', img: bodyU.tLivSide.value.image, x: 0, y: top.height },
    ],
    textureScale,
  );
  const wTop = wingU.tLivTop.value.image;
  const wingAtlas = makeAtlas(
    [
      { key: 'top', img: wTop, x: 0, y: 0 },
      { key: 'bottom', img: wingU.tLivBot.value.image, x: 0, y: wTop.height },
    ],
    textureScale,
  );

  const flameLook = new Map([
    [mats.flameOuter, [0xff7a2e, 0.28]],
    [mats.flameMid, [0xffb050, 0.45]],
    [mats.flameCore, [0xfff0c8, 0.75]],
  ]);
  const portable = new Map();
  const convert = (mat) => {
    if (portable.has(mat)) return portable.get(mat);
    let out = mat;
    const kind = mat.userData && mat.userData.livery;
    if (kind) {
      out = new THREE.MeshStandardMaterial({
        map: (kind === 'wing' ? wingAtlas : bodyAtlas).tex,
        roughness: mat.roughness,
        metalness: mat.metalness,
        side: mat.side,
      });
    } else if (flameLook.has(mat)) {
      const [color, opacity] = flameLook.get(mat);
      out = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide });
    } else if (mat === mats.glassTint) {
      out = new THREE.MeshStandardMaterial({
        color: 0x2a3844, transparent: true, opacity: 0.28, metalness: 0.0, roughness: 0.05, side: THREE.DoubleSide, depthWrite: false,
      });
    } else if (mat.isMeshStandardMaterial && mat.emissiveIntensity > 1) {
      out = mat.clone();
      out.emissiveIntensity = 1;
    }
    portable.set(mat, out);
    return out;
  };

  const bakedGeo = new Map();
  const drop = [];
  jet.root.traverse((o) => {
    if (o.isLight) drop.push(o);
    if (!o.isMesh) return;
    if (o.material === mats.glassReflect) {
      drop.push(o);
      return;
    }
    const kind = o.material.userData && o.material.userData.livery;
    if (kind && o.geometry.attributes.aRef) {
      const key = o.geometry.uuid + kind;
      if (!bakedGeo.has(key)) bakedGeo.set(key, bakeLiveryGeometry(o.geometry, kind, kind === 'wing' ? wingAtlas : bodyAtlas));
      o.geometry = bakedGeo.get(key);
    } else if (o.geometry.attributes.aRef) {
      o.geometry = o.geometry.clone();
      o.geometry.deleteAttribute('aRef');
    }
    o.material = convert(o.material);
  });
  for (const o of drop) o.removeFromParent();

  // glTF nodes are looked up by name, so make every name unique
  const nodes = new Map();
  let i = 0;
  jet.root.traverse((o) => {
    o.name = `${(o.name || o.type).replace(/[^\w-]/g, '_')}_${i++}`;
    nodes.set(o.name, o);
  });

  jet.update(0, true);
  jet.root.updateMatrixWorld(true);
  const glb = await new GLTFExporter().parseAsync(jet.root, { binary: true, onlyVisible: false, maxTextureSize: 4096 });
  return { glb, jet, nodes };
}
