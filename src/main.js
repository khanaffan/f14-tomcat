import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js';
import GUI from 'lil-gui';
import { F14, autoSweep } from './f14/F14.js';
import { WING, STAB, SWEEP, fromWingRef } from './f14/dims.js';
import { podParams, yEdge, duct } from './f14/body.js';

const params = new URLSearchParams(location.search);
const TEST = params.has('test');

/* ------------------------------ Renderer ------------------------------ */

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
  preserveDrawingBuffer: TEST,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 20000);
camera.position.set(13, 4.2, 14.5);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 2.5;
controls.maxDistance = 140;
controls.maxPolarAngle = Math.PI * 0.495;

/* ---------------------------- Sky & lighting ---------------------------- */

const view = {
  livery: 'lowvis',
  tanks: true,
  crew: true,
  environment: 'apron',
  sunElevation: 34,
  sunAzimuth: 50,
  clouds: 0.35,
  exposure: 1,
  shadows: true,
  autoRotate: false,
  sweepDemo: false,
  controlsDemo: false,
};

function makeSky(sunDisc) {
  const sky = new Sky();
  sky.scale.setScalar(10000);
  const U = sky.material.uniforms;
  U.turbidity.value = 3.2;
  U.rayleigh.value = 1.1;
  U.mieCoefficient.value = 0.004;
  U.mieDirectionalG.value = 0.82;
  U.cloudCoverage.value = view.clouds;
  U.cloudDensity.value = 0.55;
  U.cloudElevation.value = 0.55;
  U.showSunDisc.value = sunDisc ? 1 : 0;
  return sky;
}

const sky = makeSky(true);
scene.add(sky);
const envSky = makeSky(false);
const envScene = new THREE.Scene();
envScene.add(envSky);
const pmrem = new THREE.PMREMGenerator(renderer);
let envRT = null;

const sun = new THREE.DirectionalLight(0xffffff, 16);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
const sc = sun.shadow.camera;
sc.left = -14;
sc.right = 14;
sc.top = 14;
sc.bottom = -14;
sc.near = 1;
sc.far = 160;
sun.shadow.bias = -0.00025;
sun.shadow.normalBias = 0.025;
scene.add(sun, sun.target);

// Ground as seen by the environment map; without it the lower hemisphere is the bright horizon colour.
const envGround = new THREE.Mesh(new THREE.CircleGeometry(4000, 64), new THREE.MeshBasicMaterial());
envGround.rotation.x = -Math.PI / 2;
envGround.position.y = -3;
envScene.add(envGround);

/*
 * Direct sun irradiance (linear RGB) as implied by the Sky shader (Preetham extinction of its sun disc),
 * so the sun light and the sky background agree in colour and brightness.
 */
function sunIrradiance(elevDeg, U) {
  const y = Math.sin(THREE.MathUtils.degToRad(elevDeg));
  const zen = Math.acos(THREE.MathUtils.clamp(y, -1, 1));
  const sunE = 1000 * Math.max(0, 1 - Math.exp(-(1.6110731556870734 - zen) / 1.5));
  const zc = Math.acos(Math.max(0, y));
  const inv = 1 / (Math.cos(zc) + 0.15 * Math.pow(93.885 - THREE.MathUtils.radToDeg(zc), -1.253));
  const sR = 8.4e3 * inv;
  const sM = 1.25e3 * inv;
  const betaR = [5.804542996261093e-6, 1.3562911419845635e-5, 3.0265902468824876e-5];
  const mie = [1.8399918514433978e14, 2.7798023919660528e14, 4.0790479543861094e14];
  const c = 0.2 * U.turbidity.value * 10e-18;
  const omega = 2 * Math.PI * (1 - 0.999956676946448);
  return betaR.map((b, i) => {
    const fex = Math.exp(-(b * U.rayleigh.value * sR + 0.434 * c * mie[i] * U.mieCoefficient.value * sM));
    return 760 * Math.min(sunE * fex, 80) * omega;
  });
}

// Cosine-weighted mean sky radiance on a horizontal surface, measured from the Sky shader per sun elevation.
const SKY_IRR = [[-2, 0.003], [0, 0.023], [2, 0.075], [5, 0.207], [10, 0.509], [15, 0.794], [20, 0.98], [30, 1.241], [45, 1.695], [60, 2.235], [75, 2.792], [90, 3.3]];
function skyIrradiance(elev) {
  for (let i = 1; i < SKY_IRR.length; i++) {
    const [e1, v1] = SKY_IRR[i];
    if (elev <= e1) {
      const [e0, v0] = SKY_IRR[i - 1];
      return THREE.MathUtils.lerp(v0, v1, THREE.MathUtils.clamp((elev - e0) / (e1 - e0), 0, 1));
    }
  }
  return SKY_IRR[SKY_IRR.length - 1][1];
}

const sunDir = new THREE.Vector3();
const lighting = { exposure: 0.2, sunLum: 0, skyLum: 0 };
function updateSun() {
  const phi = THREE.MathUtils.degToRad(90 - view.sunElevation);
  const theta = THREE.MathUtils.degToRad(view.sunAzimuth);
  sunDir.setFromSphericalCoords(1, phi, theta);
  for (const s of [sky, envSky]) {
    s.material.uniforms.sunPosition.value.copy(sunDir);
    s.material.uniforms.cloudCoverage.value = view.clouds;
  }
  const E = sunIrradiance(view.sunElevation, sky.material.uniforms);
  const m = Math.max(...E, 1e-6);
  sun.color.setRGB(E[0] / m, E[1] / m, E[2] / m);
  sun.intensity = m;
  const sinE = Math.max(0, Math.sin(THREE.MathUtils.degToRad(view.sunElevation)));
  const skyE = skyIrradiance(view.sunElevation);
  const flight = view.environment === 'flight';
  const albedo = flight ? [0.05, 0.075, 0.09] : [0.27, 0.262, 0.245];
  const skyTint = [0.84, 0.96, 1.18];
  envGround.material.color.setRGB(...albedo.map((a, i) => a * ((E[i] * sinE) / Math.PI + skyE * skyTint[i])));
  // partial auto-exposure keeps sunsets moody but visible
  const lum = (0.2126 * E[0] + 0.7152 * E[1] + 0.0722 * E[2]) * Math.max(sinE, 0.2) / Math.PI + skyE;
  lighting.exposure = 0.2 * Math.pow(4.3 / Math.max(lum, 0.02), 0.8);
  renderer.toneMappingExposure = lighting.exposure * view.exposure;
  if (envRT) envRT.dispose();
  envRT = pmrem.fromScene(envScene, 0.02, 0.1, 10000);
  scene.environment = envRT.texture;
}

/* -------------------------------- Ground -------------------------------- */

function concreteTexture(aniso) {
  const N = 2048;
  const c = document.createElement('canvas');
  c.width = c.height = N;
  const ctx = c.getContext('2d');
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  ctx.fillStyle = '#8f8d88';
  ctx.fillRect(0, 0, N, N);
  const slabs = 4;
  const S = N / slabs;
  for (let i = 0; i < slabs; i++) {
    for (let j = 0; j < slabs; j++) {
      const v = rnd() < 0.5 ? 255 : 0;
      ctx.fillStyle = `rgba(${v},${v},${v},${0.012 + rnd() * 0.022})`;
      ctx.fillRect(i * S, j * S, S, S);
    }
  }
  for (let k = 0; k < 90000; k++) {
    const v = rnd() < 0.5 ? 255 : 30;
    ctx.fillStyle = `rgba(${v},${v},${v},${0.05 + rnd() * 0.08})`;
    const s = 1 + rnd() * 3;
    ctx.fillRect(rnd() * N, rnd() * N, s, s);
  }
  for (let k = 0; k < 60; k++) {
    const x = rnd() * N;
    const y = rnd() * N;
    const r = 10 + rnd() * 70;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(40,38,34,${0.08 + rnd() * 0.12})`);
    g.addColorStop(1, 'rgba(40,38,34,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  ctx.lineCap = 'round';
  for (let k = 0; k < 14; k++) {
    ctx.strokeStyle = `rgba(30,30,30,${0.05 + rnd() * 0.07})`;
    ctx.lineWidth = 6 + rnd() * 10;
    ctx.beginPath();
    const y0 = rnd() * N;
    ctx.moveTo(-50, y0);
    ctx.bezierCurveTo(N * 0.3, y0 + (rnd() - 0.5) * 300, N * 0.6, y0 + (rnd() - 0.5) * 300, N + 50, y0 + (rnd() - 0.5) * 200);
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(35,35,33,0.85)';
  for (let i = 0; i <= slabs; i++) {
    ctx.fillRect(i * S - 2, 0, 4, N);
    ctx.fillRect(0, i * S - 2, N, 4);
  }
  ctx.strokeStyle = 'rgba(60,60,58,0.9)';
  ctx.lineWidth = 3;
  for (let i = 0; i < slabs; i++) {
    for (let j = 0; j < slabs; j++) {
      ctx.beginPath();
      ctx.arc(i * S + S / 2, j * S + S / 2, 9, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = aniso;
  return t;
}

function radialAlpha() {
  const N = 512;
  const c = document.createElement('canvas');
  c.width = c.height = N;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(N / 2, N / 2, N * 0.16, N / 2, N / 2, N * 0.5);
  g.addColorStop(0, '#fff');
  g.addColorStop(1, '#000');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, N, N);
  return new THREE.CanvasTexture(c);
}

const ground = new THREE.Group();
scene.add(ground);
// open ocean far below for the in-flight scene; grazing reflections of the horizon read as haze
const sea = new THREE.Mesh(
  new THREE.CircleGeometry(18000, 96),
  new THREE.MeshStandardMaterial({ color: 0x0b1d2a, roughness: 0.3, metalness: 0 }),
);
sea.rotation.x = -Math.PI / 2;
sea.position.y = -1200;
sea.visible = false;
scene.add(sea);
{
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const map = concreteTexture(aniso);
  const size = 700;
  map.repeat.set(size / 20, size / 20);
  const mat = new THREE.MeshStandardMaterial({
    map,
    alphaMap: radialAlpha(),
    transparent: true,
    roughness: 0.92,
    metalness: 0,
    color: 0xffffff,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  plane.renderOrder = -1;
  ground.add(plane);
  // taxi lead-in line and stop bar
  const paint = new THREE.MeshStandardMaterial({
    color: 0xd9a91a, roughness: 0.8, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  const lead = new THREE.Mesh(new THREE.PlaneGeometry(90, 0.16), paint);
  lead.rotation.x = -Math.PI / 2;
  lead.position.set(5.4 + 45, 0.002, 0);
  lead.receiveShadow = true;
  const stop = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 2.4), paint);
  stop.rotation.x = -Math.PI / 2;
  stop.position.set(5.1, 0.002, 0);
  stop.receiveShadow = true;
  ground.add(lead, stop);
  // wheel chocks
  const chockMat = new THREE.MeshStandardMaterial({ color: 0xc9c02a, roughness: 0.7 });
  for (const z of [-2.5, 2.5]) {
    for (const dx of [-0.62, 0.62]) {
      const ch = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.36), chockMat);
      ch.position.set(9.55 - 11.2 + dx, 0.07, z);
      ch.castShadow = ch.receiveShadow = true;
      ground.add(ch);
    }
  }
}

/* -------------------------------- Aircraft -------------------------------- */

const t0 = performance.now();
const jet = new F14(renderer, { livery: view.livery });
scene.add(jet.root);
const buildMs = performance.now() - t0;
document.getElementById('loading')?.remove();
updateSun();

/* ------------------------------ Camera views ------------------------------ */

const VIEWS = {
  'Three-quarter': { pos: [13, 4.2, 14.5], target: [0, 1.5, 0] },
  Front: { pos: [26, 2.0, 0.01], target: [0, 1.7, 0] },
  Side: { pos: [0.01, 2.0, 27], target: [0, 1.7, 0] },
  Top: { pos: [0.01, 36, 0.02], target: [0, 1.5, 0] },
  Rear: { pos: [-16, 5.2, 10], target: [0, 1.6, 0] },
  Cockpit: { pos: [8.2, 4.6, 4.2], target: [3.6, 2.9, 0] },
  'Glove close-up': { pos: [3.5, 5.5, 9.5], target: [-1.6, 2.2, 2.5] },
};
let camAnim = null;
function setView(name, instant = false) {
  const v = VIEWS[name];
  if (!v) return;
  const off = jet.root.position;
  const to = { pos: new THREE.Vector3(...v.pos).add(off), target: new THREE.Vector3(...v.target).add(off) };
  if (instant) {
    camera.position.copy(to.pos);
    controls.target.copy(to.target);
    controls.update();
    camAnim = null;
    return;
  }
  camAnim = { t: 0, fromPos: camera.position.clone(), fromTarget: controls.target.clone(), ...to };
}

/* ---------------------------------- GUI ---------------------------------- */

const S = jet.state;
const P = jet.pos;
const gui = new GUI({ title: 'F-14 Tomcat' });

const fW = gui.addFolder('Wing sweep');
fW.add(S, 'sweepMode', { 'Auto (CADC)': 'auto', Manual: 'manual', 'Bomb (55°)': 'bomb', 'Oversweep (75°)': 'oversweep' }).name('Mode').listen();
fW.add(S, 'mach', 0.1, 2.34, 0.01).name('Mach').listen();
fW.add(S, 'manualSweep', SWEEP.min, SWEEP.max, 1).name('Manual sweep °').onChange(() => (S.sweepMode = 'manual')).listen();
fW.add(view, 'sweepDemo').name('Sweep demo (vary Mach)').listen();

const fH = gui.addFolder('Flaps & slats');
fH.add(S, 'flaps', { Up: 'up', 'Maneuver (10°/7°)': 'maneuver', 'Full (35°/17°)': 'full' }).name('Setting').listen();

const fC = gui.addFolder('Flight controls');
fC.add(S, 'pitch', -1, 1, 0.01).name('Pitch (stabilators)').listen();
fC.add(S, 'roll', -1, 1, 0.01).name('Roll (spoilers + stabs)').listen();
fC.add(S, 'yaw', -1, 1, 0.01).name('Yaw (rudders)').listen();
fC.add(view, 'controlsDemo').name('Exercise controls').listen();
fC.add({ center: () => Object.assign(S, { pitch: 0, roll: 0, yaw: 0 }) }, 'center').name('Centre controls');

const fS = gui.addFolder('Systems');
fS.add(S, 'gearDown').name('Landing gear down').listen();
fS.add(S, 'canopyOpen').name('Canopy open').listen();
fS.add(S, 'hookDown').name('Tail hook down').listen();
fS.add(S, 'speedBrake').name('Speed brakes').listen();
fS.add(S, 'throttle', 0, 1, 0.01).name('Throttle (MIL = 1)').listen();
fS.add(S, 'afterburner', 0, 1, 0.01).name('Afterburner').listen();
fS.add(S, 'lights').name('Lights').listen();

const fA = gui.addFolder('Appearance');
fA.add(view, 'livery', { 'Low-vis TPS grey': 'lowvis', 'Gull grey / white (70s)': 'highvis' }).name('Paint scheme').onChange((k) => jet.setLivery(k));
fA.add(view, 'tanks').name('Drop tanks').onChange((v) => jet.setTanks(v));
fA.add(view, 'crew').name('Crew').onChange((v) => (jet.cockpit.crew.visible = v));
fA.add(view, 'environment', { 'Apron (parked)': 'apron', 'In flight': 'flight' }).name('Scene').onChange(setEnvironment);
fA.add(view, 'sunElevation', -2, 85, 0.5).name('Sun elevation').onChange(updateSun);
fA.add(view, 'sunAzimuth', 0, 360, 1).name('Sun azimuth').onChange(updateSun);
fA.add(view, 'clouds', 0, 1, 0.01).name('Cloud cover').onChange(updateSun);
fA.add(view, 'exposure', 0.25, 4, 0.01).name('Exposure').onChange((v) => (renderer.toneMappingExposure = lighting.exposure * v));
fA.add(view, 'shadows').name('Shadows').onChange((v) => (sun.castShadow = v));
fA.close();

const fV = gui.addFolder('Camera');
for (const name of Object.keys(VIEWS)) fV.add({ go: () => setView(name) }, 'go').name(name);
fV.add(view, 'autoRotate').name('Auto-rotate').onChange((v) => (controls.autoRotate = v));
fV.close();

if (window.innerWidth < 900 || TEST) gui.close();

function setEnvironment(env) {
  view.environment = env;
  const flight = env === 'flight';
  ground.visible = !flight;
  sea.visible = flight;
  controls.maxPolarAngle = flight ? Math.PI : Math.PI * 0.495;
  if (flight) {
    S.gearDown = false;
    S.hookDown = false;
    S.canopyOpen = false;
    if (S.mach < 0.5) S.mach = 0.6;
  } else {
    S.gearDown = true;
    S.mach = Math.min(S.mach, 0.4);
    S.afterburner = 0;
  }
  updateSun();
}

/* ---------------------------------- HUD ---------------------------------- */

const plan = document.getElementById('planform');
const pctx = plan.getContext('2d');
const readout = document.getElementById('readout');

const bodyOutline = (() => {
  const pts = [];
  for (let s = 0; s <= 6.1; s += 0.15) pts.push([s, podParams(s).a]);
  for (let s = 6.1; s <= 17.0; s += 0.1) pts.push([s, yEdge(s)]);
  pts.push([17.0, duct.yc(17) + duct.ay(17)], [18.4, 2.0], [18.4, 0.9], [19.1, 0.06]);
  return pts;
})();

function drawPlanform() {
  const W = plan.width;
  const H = plan.height;
  pctx.clearRect(0, 0, W, H);
  const k = H / 21.5;
  const cx = W / 2;
  const tx = (s, y) => [cx + y * k, 12 + s * k];
  const path = (pts, close = true) => {
    pctx.beginPath();
    pts.forEach(([s, y], i) => {
      const [x, z] = tx(s, y);
      if (i === 0) pctx.moveTo(x, z);
      else pctx.lineTo(x, z);
    });
    if (close) pctx.closePath();
  };
  // sweep range arcs
  pctx.lineWidth = 1;
  for (const side of [1, -1]) {
    for (const a of [SWEEP.min, SWEEP.max, SWEEP.over]) {
      const tip = fromWingRef(WING.LT[0], WING.LT[1], a);
      const [x0, y0] = tx(WING.pivot[0], side * WING.pivot[1]);
      const [x1, y1] = tx(tip[0], side * tip[1]);
      pctx.strokeStyle = a === SWEEP.over ? 'rgba(255,120,80,0.35)' : 'rgba(255,255,255,0.18)';
      pctx.setLineDash([3, 4]);
      pctx.beginPath();
      pctx.moveTo(x0, y0);
      pctx.lineTo(x1, y1);
      pctx.stroke();
    }
  }
  pctx.setLineDash([]);
  // wings at the current sweep
  for (const side of [1, -1]) {
    const pts = [WING.L0, WING.LT, WING.TT, WING.T0].map(([s, y]) => {
      const p = fromWingRef(s, y, P.sweep);
      return [p[0], side * p[1]];
    });
    path(pts);
    pctx.fillStyle = 'rgba(120,200,255,0.35)';
    pctx.fill();
    pctx.strokeStyle = '#9fd8ff';
    pctx.lineWidth = 1.5;
    pctx.stroke();
    // stabilator
    path([
      [STAB.root.le, side * STAB.root.y], [STAB.tip.le, side * STAB.tip.y],
      [STAB.tip.te, side * STAB.tip.y], [STAB.root.te, side * STAB.root.y],
    ]);
    pctx.fillStyle = 'rgba(255,255,255,0.18)';
    pctx.fill();
  }
  // fuselage
  const outline = bodyOutline.concat(bodyOutline.slice().reverse().map(([s, y]) => [s, -y]));
  path(outline);
  pctx.fillStyle = 'rgba(230,236,242,0.85)';
  pctx.fill();
  pctx.strokeStyle = 'rgba(255,255,255,0.9)';
  pctx.lineWidth = 1;
  pctx.stroke();
  // pivots
  for (const side of [1, -1]) {
    const [x, y] = tx(WING.pivot[0], side * WING.pivot[1]);
    pctx.fillStyle = '#ff9b54';
    pctx.beginPath();
    pctx.arc(x, y, 3, 0, Math.PI * 2);
    pctx.fill();
  }
  pctx.fillStyle = '#fff';
  pctx.font = '600 26px system-ui, sans-serif';
  pctx.textAlign = 'left';
  pctx.fillText(`${P.sweep.toFixed(1)}°`, 10, H - 14);
}

const MODE_NAMES = { auto: 'AUTO', manual: 'MAN', bomb: 'BOMB', oversweep: 'OVSW' };
function updateReadout() {
  const gear = P.gear > 0.99 ? 'DOWN' : P.gear < 0.01 ? 'UP' : 'TRANSIT';
  const lines = [
    `<b>Wing sweep</b> ${P.sweep.toFixed(1)}° <span class="dim">(${MODE_NAMES[S.sweepMode]}, cmd ${jet.info.sweepTarget.toFixed(0)}°)</span>`,
    `<b>Mach</b> ${S.mach.toFixed(2)} <span class="dim">auto schedule ${autoSweep(S.mach).toFixed(0)}°</span>`,
    `<b>Flaps</b> ${P.flap.toFixed(0)}° <b>Aux</b> ${P.aux.toFixed(0)}° <b>Slats</b> ${P.slat.toFixed(0)}°`,
    `<b>Gear</b> ${gear} <b>Hook</b> ${S.hookDown ? 'DN' : 'UP'} <b>SB</b> ${S.speedBrake ? 'OUT' : 'IN'}`,
    `<b>Engines</b> ${(P.throttle * 100).toFixed(0)}%${P.ab > 0.01 ? ` + AB ${(P.ab * 100).toFixed(0)}%` : ''}`,
  ];
  for (const n of jet.info.notes) lines.push(`<span class="warn">${n}</span>`);
  readout.innerHTML = lines.join('<br>');
}

/* ------------------------------- Keyboard ------------------------------- */

const keys = new Set();
const FLAP_ORDER = ['up', 'maneuver', 'full'];
const MODE_ORDER = ['auto', 'manual', 'bomb', 'oversweep'];
window.addEventListener('keydown', (e) => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
  const k = e.key.toLowerCase();
  keys.add(k);
  if (e.repeat) return;
  switch (k) {
    case 'g': S.gearDown = !S.gearDown; break;
    case 'c': S.canopyOpen = !S.canopyOpen; break;
    case 'h': S.hookDown = !S.hookDown; break;
    case 'b': S.speedBrake = !S.speedBrake; break;
    case 'f': S.flaps = FLAP_ORDER[(FLAP_ORDER.indexOf(S.flaps) + 1) % 3]; break;
    case 'm': S.sweepMode = MODE_ORDER[(MODE_ORDER.indexOf(S.sweepMode) + 1) % 4]; break;
    case 'a': S.afterburner = S.afterburner > 0 ? 0 : 1; if (S.afterburner) S.throttle = 1; break;
    case 'l': S.lights = !S.lights; break;
    case 'r': view.autoRotate = controls.autoRotate = !controls.autoRotate; break;
    case '[':
    case ']': {
      // step from the pending command so repeated presses accumulate while the wings are moving
      const from = S.sweepMode === 'manual' ? S.manualSweep : Math.round(P.sweep);
      S.sweepMode = 'manual';
      S.manualSweep = Math.min(SWEEP.max, Math.max(SWEEP.min, from + (k === ']' ? 4 : -4)));
      break;
    }
    default: {
      const n = parseInt(k, 10);
      const names = Object.keys(VIEWS);
      if (n >= 1 && n <= names.length) setView(names[n - 1]);
    }
  }
});
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
window.addEventListener('blur', () => keys.clear());

const keyAxes = { pitch: false, roll: false, yaw: false };
function keyControls(dt) {
  const rate = 3 * dt;
  for (const [name, neg, pos] of [['pitch', 'arrowup', 'arrowdown'], ['roll', 'arrowleft', 'arrowright'], ['yaw', 'q', 'e']]) {
    const active = keys.has(neg) || keys.has(pos);
    if (active) keyAxes[name] = true;
    if (!keyAxes[name]) continue;
    // spring back to centre once the key is released
    const target = active ? (keys.has(pos) ? 1 : 0) - (keys.has(neg) ? 1 : 0) : 0;
    S[name] += THREE.MathUtils.clamp(target - S[name], -rate, rate);
    if (!active && S[name] === 0) keyAxes[name] = false;
  }
}

/* ------------------------------- Main loop ------------------------------- */

const timer = new THREE.Timer();
timer.connect(document);
let elapsed = 0;
let running = true;
function frame(now) {
  if (!running) return;
  timer.update(now);
  const dt = Math.min(timer.getDelta(), 0.05);
  elapsed += dt;
  if (view.sweepDemo) {
    S.sweepMode = 'auto';
    S.flaps = 'up';
    S.mach = 0.75 + 0.45 * Math.sin(elapsed * 0.35 - 1.2);
  }
  if (view.controlsDemo) {
    S.pitch = 0.7 * Math.sin(elapsed * 1.3);
    S.roll = 0.8 * Math.sin(elapsed * 0.9 + 1);
    S.yaw = 0.6 * Math.sin(elapsed * 0.7 + 2);
  }
  keyControls(dt);
  jet.update(dt);

  // gentle motion in flight
  if (view.environment === 'flight') {
    jet.root.position.y = 0.25 * Math.sin(elapsed * 0.6);
    jet.root.rotation.x = 0.03 * Math.sin(elapsed * 0.45);
    jet.root.rotation.z = 0.02 * Math.sin(elapsed * 0.3);
  } else {
    jet.root.position.y = 0;
    jet.root.rotation.set(0, 0, 0);
  }

  if (camAnim) {
    camAnim.t = Math.min(1, camAnim.t + dt / 0.9);
    const e = camAnim.t * camAnim.t * (3 - 2 * camAnim.t);
    camera.position.lerpVectors(camAnim.fromPos, camAnim.pos, e);
    controls.target.lerpVectors(camAnim.fromTarget, camAnim.target, e);
    if (camAnim.t >= 1) camAnim = null;
  }
  controls.update(dt);

  // keep the shadow frustum on the aircraft
  sun.target.position.copy(jet.root.position);
  sun.position.copy(jet.root.position).addScaledVector(sunDir, 60);
  sky.material.uniforms.time.value = elapsed;

  renderer.render(scene, camera);
  drawPlanform();
  updateReadout();
  requestAnimationFrame(frame);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setView('Three-quarter', true);
requestAnimationFrame(frame);

// handle for automated checks / console tinkering
window.__f14 = {
  jet, scene, camera, controls, renderer, setView, setEnvironment, view, updateSun, buildMs, THREE, sky, sun,
  pause: () => (running = false),
  resume: () => {
    if (running) return;
    running = true;
    timer.reset();
    requestAnimationFrame(frame);
  },
  /** Snap all systems to the current state and render one frame (optionally with another camera). */
  renderNow: (cam = camera) => {
    jet.update(0, true);
    sun.target.position.copy(jet.root.position);
    sun.position.copy(jet.root.position).addScaledVector(sunDir, 60);
    controls.update();
    renderer.render(scene, cam);
    drawPlanform();
    updateReadout();
  },
  ready: true,
};
