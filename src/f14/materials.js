import * as THREE from 'three';
import { RANGES, SCHEMES, paintLivery } from './livery.js';

/* ----------------------------- Livery shader ----------------------------- */

const VERT_PARS = /* glsl */ `
attribute vec3 aRef;
varying vec3 vRef;
varying vec3 vRefN;
`;

const VERT_MAIN = /* glsl */ `
vRef = aRef;
vRefN = vec3(-objectNormal.x, objectNormal.z, objectNormal.y);
`;

const FRAG_PARS_BODY = /* glsl */ `
uniform sampler2D tLivTop;
uniform sampler2D tLivBot;
uniform sampler2D tLivSide;
uniform vec4 uLivR;
uniform vec2 uLivW;
varying vec3 vRef;
varying vec3 vRefN;

vec3 liverySample() {
  vec3 n = normalize(vRefN);
  float u = (vRef.y - uLivR.z) / uLivR.w;
  float v = 1.0 - (vRef.x - uLivR.x) / uLivR.y;
  vec3 cT = texture(tLivTop, vec2(u, v)).rgb;
  vec3 cB = texture(tLivBot, vec2(1.0 - u, v)).rgb;
  float us = (vRef.x - uLivR.x) / uLivR.y;
  float vs = clamp(0.5 * (vRef.z - uLivW.x) / uLivW.y, 0.002, 0.498);
  vec2 gx = dFdx(vec2(us, vs));
  vec2 gy = dFdy(vec2(us, vs));
  float sideSel = n.y + 0.03 * sign(vRef.y);
  vec3 cS = sideSel >= 0.0
    ? textureGrad(tLivSide, vec2(1.0 - us, 0.5 + vs), gx * vec2(-1.0, 1.0), gy * vec2(-1.0, 1.0)).rgb
    : textureGrad(tLivSide, vec2(us, vs), gx, gy).rgb;
  float wT = pow(max(n.z, 0.0), 4.0);
  float wB = pow(max(-n.z, 0.0), 4.0);
  float wS = pow(abs(n.y), 4.0) + pow(abs(n.x), 4.0);
  return (cT * wT + cB * wB + cS * wS) / (wT + wB + wS + 1e-5);
}
`;

const FRAG_PARS_WING = /* glsl */ `
uniform sampler2D tLivTop;
uniform sampler2D tLivBot;
uniform vec4 uLivR;
varying vec3 vRef;
varying vec3 vRefN;

vec3 liverySample() {
  vec3 n = normalize(vRefN);
  float u = (vRef.y - uLivR.z) / uLivR.w;
  float v = 1.0 - (vRef.x - uLivR.x) / uLivR.y;
  vec3 cT = texture(tLivTop, vec2(u, v)).rgb;
  vec3 cB = texture(tLivBot, vec2(1.0 - u, v)).rgb;
  return mix(cB, cT, smoothstep(-0.25, 0.25, n.z));
}
`;

function liveryMaterial(kind, uniforms, params = {}) {
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.62, metalness: 0.08, ...params });
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${VERT_PARS}`)
      .replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>\n${VERT_MAIN}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${kind === 'wing' ? FRAG_PARS_WING : FRAG_PARS_BODY}`)
      .replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.rgb *= liverySample();');
  };
  mat.customProgramCacheKey = () => `f14-livery-${kind}`;
  mat.userData.livery = kind;
  return mat;
}

/* ---------------------------- Afterburner plume ---------------------------- */

const FLAME_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vN;
varying vec3 vV;
void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const FLAME_FRAG = /* glsl */ `
uniform float uTime;
uniform float uAB;
uniform float uGain;
uniform float uDiamonds;
uniform float uPow;
uniform vec3 uHot;
uniform vec3 uCool;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vV;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  float x = vUv.y;
  float facing = abs(dot(normalize(vN), normalize(vV)));
  float body = pow(facing, uPow);
  float n = noise(vec2(vUv.x * 9.0, x * 7.0 - uTime * 14.0)) * 0.6 + noise(vec2(vUv.x * 23.0, x * 19.0 - uTime * 31.0)) * 0.4;
  float fall = pow(clamp(1.0 - x, 0.0, 1.0), 1.4) * smoothstep(0.0, 0.05, x + 0.01);
  float diamonds = uDiamonds > 0.0 ? 0.55 + 0.45 * pow(0.5 + 0.5 * cos(x * 6.2831 * uDiamonds), 3.0) * (1.0 - x) : 1.0;
  float k = fall * body * diamonds * (0.75 + 0.5 * n) * uAB * uGain;
  vec3 col = mix(uHot, uCool, smoothstep(0.0, 0.8, x));
  gl_FragColor = vec4(col * k, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

function flameMaterial(opts) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAB: { value: 0 },
      uGain: { value: opts.gain },
      uDiamonds: { value: opts.diamonds || 0 },
      uPow: { value: opts.pow || 1.5 },
      uHot: { value: new THREE.Color(opts.hot) },
      uCool: { value: new THREE.Color(opts.cool) },
    },
    vertexShader: FLAME_VERT,
    fragmentShader: FLAME_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

/** Yellow/black barber-pole stripes for ejection handles (wraps along a torus' sweep). */
function stripeTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 4;
  const x = c.getContext('2d');
  x.fillStyle = '#e0b51e';
  x.fillRect(0, 0, 64, 4);
  x.fillStyle = '#141414';
  for (let i = 0; i < 64; i += 16) x.fillRect(i, 0, 8, 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 1);
  return t;
}

/* -------------------------------- Factory -------------------------------- */

/** Build every material used by the model. Call `setLivery(key)` to repaint. */
export function createMaterials(renderer, schemeKey = 'lowvis') {
  const aniso = Math.min(16, renderer.capabilities.getMaxAnisotropy());
  const RB = RANGES.body;
  const RW = RANGES.wing;
  const bodyU = {
    tLivTop: { value: null },
    tLivBot: { value: null },
    tLivSide: { value: null },
    uLivR: { value: new THREE.Vector4(RB.s0, RB.S, RB.y0, RB.Y) },
    uLivW: { value: new THREE.Vector2(RB.w0, RB.Wr) },
  };
  const wingU = {
    tLivTop: { value: null },
    tLivBot: { value: null },
    uLivR: { value: new THREE.Vector4(RW.s0, RW.S, RW.y0, RW.Y) },
  };

  const std = (p) => new THREE.MeshStandardMaterial(p);
  const m = {
    body: liveryMaterial('body', bodyU),
    bodyDouble: liveryMaterial('body', bodyU, { side: THREE.DoubleSide }),
    wing: liveryMaterial('wing', wingU),

    metal: std({ color: 0x8b8e91, metalness: 0.85, roughness: 0.38 }),
    metalDark: std({ color: 0x3b3d40, metalness: 0.6, roughness: 0.55 }),
    chrome: std({ color: 0xe2e2e2, metalness: 1.0, roughness: 0.12 }),
    nozzle: std({ color: 0xffffff, vertexColors: true, metalness: 0.65, roughness: 0.52, envMapIntensity: 0.75 }),
    nozzleInner: std({ color: 0xffffff, vertexColors: true, metalness: 0.2, roughness: 0.85, envMapIntensity: 0.06 }),
    duct: std({ color: 0xffffff, vertexColors: true, metalness: 0.0, roughness: 0.7 }),

    gear: std({ color: 0xe8e8e3, metalness: 0.05, roughness: 0.5 }),
    rubber: std({ color: 0x1c1c1c, metalness: 0.0, roughness: 0.93, side: THREE.DoubleSide }),
    hub: std({ color: 0xcfcfca, metalness: 0.35, roughness: 0.45 }),
    well: std({ color: 0xd9d8d2, metalness: 0.05, roughness: 0.72, side: THREE.DoubleSide }),
    lamp: std({ color: 0xffffff, emissive: 0xfff3dc, emissiveIntensity: 0.0, metalness: 0.3, roughness: 0.08 }),

    navRed: std({ color: 0xff2a1f, emissive: 0xff1a10, emissiveIntensity: 2.0, roughness: 0.25 }),
    navGreen: std({ color: 0x2aff5a, emissive: 0x10ff40, emissiveIntensity: 2.0, roughness: 0.25 }),
    navWhite: std({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1.5, roughness: 0.25 }),
    beacon: std({ color: 0xff2010, emissive: 0xff1000, emissiveIntensity: 0.0, roughness: 0.2 }),

    frame: std({ color: 0x6b7279, metalness: 0.1, roughness: 0.6 }),
    cockpit: std({ color: 0x2c2f33, metalness: 0.05, roughness: 0.82 }),
    coaming: std({ color: 0x1b1c1e, metalness: 0.0, roughness: 0.95 }),
    hud: std({
      color: 0x9fffc0, emissive: 0x30ff70, emissiveIntensity: 0.35, transparent: true, opacity: 0.28,
      depthWrite: false, side: THREE.DoubleSide, roughness: 0.05,
    }),
    seat: std({ color: 0x2a2b2d, metalness: 0.1, roughness: 0.75 }),
    seatPad: std({ color: 0x5d5538, metalness: 0.0, roughness: 0.9 }),
    yellowBlack: std({ color: 0xffffff, map: stripeTexture(), metalness: 0.0, roughness: 0.5 }),
    display: std({ color: 0x07100b, emissive: 0x3ccf7a, emissiveIntensity: 0.18, metalness: 0.2, roughness: 0.12 }),
    gauge: std({ color: 0x0c0d0e, metalness: 0.1, roughness: 0.25 }),
    consoleTop: std({ color: 0x3a3e43, metalness: 0.05, roughness: 0.7 }),
    suit: std({ color: 0x55593c, metalness: 0.0, roughness: 0.92 }),
    harness: std({ color: 0x3b4029, metalness: 0.0, roughness: 0.85 }),
    helmet: std({ color: 0xd8d8d2, metalness: 0.0, roughness: 0.35 }),
    mask: std({ color: 0x262626, metalness: 0.0, roughness: 0.6 }),
    visorGold: std({ color: 0xd8a540, metalness: 1.0, roughness: 0.12 }),
    visorDark: std({ color: 0x121212, metalness: 0.6, roughness: 0.08 }),

    glassTint: new THREE.MeshBasicMaterial({
      color: 0x24313b, transparent: true, opacity: 0.2, depthWrite: false, side: THREE.DoubleSide,
    }),
    glassReflect: std({
      color: 0x000000, metalness: 0.0, roughness: 0.05, transparent: true, blending: THREE.AdditiveBlending,
      depthWrite: false, envMapIntensity: 1.6,
    }),
    sensorGlass: std({ color: 0x0b0f14, metalness: 0.4, roughness: 0.06 }),

    // plain lower-surface paint for parts without livery projection (stores, gear doors)
    paintLower: std({ color: 0x9ca3a9, metalness: 0.08, roughness: 0.62 }),
    missileWhite: std({ color: 0xeeeeea, metalness: 0.05, roughness: 0.45 }),
    missileGrey: std({ color: 0x9a9ea1, metalness: 0.1, roughness: 0.55 }),
    seeker: std({ color: 0x15181c, metalness: 0.2, roughness: 0.2 }),
    bandYellow: std({ color: 0xd9a81c, metalness: 0.0, roughness: 0.5 }),
    bandBrown: std({ color: 0x6b4a2b, metalness: 0.0, roughness: 0.6 }),

    flameHolder: std({ color: 0x1d1b1a, emissive: 0xff5d1c, emissiveIntensity: 0.1, metalness: 0.4, roughness: 0.6 }),
    flameOuter: flameMaterial({ hot: 0xff8a3c, cool: 0x7a2a8a, gain: 0.55, pow: 1.2 }),
    flameMid: flameMaterial({ hot: 0xffc070, cool: 0xff5520, gain: 0.9, pow: 1.6, diamonds: 4.0 }),
    flameCore: flameMaterial({ hot: 0xfff2d0, cool: 0xffa040, gain: 1.6, pow: 2.2, diamonds: 4.0 }),
  };

  m.store = m.paintLower;

  m.setFlame = (ab, t) => {
    for (const f of [m.flameOuter, m.flameMid, m.flameCore]) {
      f.uniforms.uAB.value = ab;
      f.uniforms.uTime.value = t;
    }
  };

  let current = null;
  m.setLivery = (key, opts = {}) => {
    const L = paintLivery(key, aniso, opts);
    if (current) {
      for (const t of [current.body.top, current.body.bottom, current.body.side, current.wing.top, current.wing.bottom]) t.dispose();
    }
    current = L;
    bodyU.tLivTop.value = L.body.top;
    bodyU.tLivBot.value = L.body.bottom;
    bodyU.tLivSide.value = L.body.side;
    wingU.tLivTop.value = L.wing.top;
    wingU.tLivBot.value = L.wing.bottom;
    const S = L.scheme;
    const rough = S.lowvis ? 0.66 : 0.4;
    for (const mat of [m.body, m.bodyDouble, m.wing, m.paintLower]) mat.roughness = rough;
    m.paintLower.color.set(S.lower);
    m.frame.color.set(S.upper);
    m.helmet.color.set(S.lowvis ? 0x8e9296 : 0xe2e2dc);
    return S;
  };
  m.setLivery(schemeKey);
  m.schemes = SCHEMES;
  return m;
}

export function isLiveryMaterial(mat) {
  return !!(mat && mat.userData && mat.userData.livery);
}
