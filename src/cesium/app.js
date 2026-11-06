/**
 * Fly the procedural F-14 Tomcat over San Diego in CesiumJS.
 *
 * `startF14Flight(Cesium, viewer, opts)` works with any Cesium Viewer: the repo's cesium.html
 * page and Cesium Sandcastle both call it. The Cesium namespace is passed in rather than
 * imported so the module can share the page's (or Sandcastle's) Cesium build.
 */
import { buildF14Glb } from './gltf.js';
import { createSim, createDemoPilot, miramarRunways, miramarRoute, MIRAMAR_GEOID } from './sim.js';

const DEG = Math.PI / 180;
const FT = 0.3048;
const KT = 0.514444;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

const CAMERAS = ['chase', 'cockpit', 'flyby', 'free'];
const CAMERA_LABEL = { chase: 'Chase', cockpit: 'Cockpit', flyby: 'Fly-by', free: 'Free' };
// pilot's eye in the model frame (metres): forward of the origin and above the wheels
const EYE = { fwd: 4.3, up: 3.28 };

const HELP = [
  ['↑ ↓', 'pitch (↑ = nose down)'],
  ['← →', 'roll'],
  ['Q E', 'rudder / nosewheel'],
  ['W S', 'throttle'],
  ['A', 'afterburner'],
  ['Space', 'wheel brakes'],
  ['G F B H', 'gear · flaps · speed brake · hook'],
  ['M [ ]', 'sweep mode · manual sweep'],
  ['C', 'canopy (on the ground)'],
  ['V', 'camera'],
  ['P', 'demo ↔ manual'],
  ['T', 'time ×1/×2/×4'],
  ['R', 'reset'],
];

function css(el, styles) {
  Object.assign(el.style, styles);
  return el;
}

function createHud(container) {
  const root = css(document.createElement('div'), {
    position: 'absolute', inset: '0', pointerEvents: 'none', zIndex: 5,
    font: '12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: '#d8f5d8',
  });
  const panel = css(document.createElement('div'), {
    position: 'absolute', top: '10px', left: '10px', padding: '10px 12px', minWidth: '230px',
    background: 'rgba(8,14,10,0.62)', border: '1px solid rgba(140,255,160,0.25)', borderRadius: '8px',
    backdropFilter: 'blur(3px)', whiteSpace: 'pre',
  });
  const banner = css(document.createElement('div'), {
    position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', padding: '6px 14px',
    background: 'rgba(8,14,10,0.62)', border: '1px solid rgba(140,255,160,0.25)', borderRadius: '16px',
    font: '13px/1.3 system-ui, sans-serif', color: '#eaffea', whiteSpace: 'nowrap',
  });
  const help = css(document.createElement('div'), {
    position: 'absolute', bottom: '34px', left: '10px', padding: '8px 10px', background: 'rgba(8,14,10,0.55)',
    border: '1px solid rgba(140,255,160,0.2)', borderRadius: '8px', font: '11px/1.5 system-ui, sans-serif', color: '#cfe8cf',
  });
  help.innerHTML =
    HELP.map(([k, v]) => `<div><b style="display:inline-block;min-width:58px;color:#9f9">${k}</b>${v}</div>`).join('') +
    '<div style="margin-top:4px;opacity:.75">Drag to orbit · scroll to zoom · <b>?</b> hides this help</div>';
  root.append(panel, banner, help);
  container.appendChild(root);
  return { root, panel, banner, help };
}

/**
 * @param {typeof import('cesium')} Cesium
 * @param {import('cesium').Viewer} viewer
 * @param {object} [opts]
 * @param {'demo'|'manual'} [opts.mode]
 * @param {'lowvis'|'highvis'} [opts.livery]
 * @param {string} [opts.camera] chase | cockpit | flyby | free
 * @param {string} [opts.time] ISO date-time for sun lighting
 * @param {boolean} [opts.shadows]
 * @param {(msg: string) => void} [opts.onStatus]
 */
export async function startF14Flight(Cesium, viewer, opts = {}) {
  const {
    Cartesian3, Cartographic, Matrix3, Matrix4, Transforms, JulianDate, Model, Axis, ShadowMode, Math: CMath,
  } = Cesium;
  const scene = viewer.scene;
  const globe = scene.globe;
  const status = opts.onStatus || (() => {});

  // ---------- scene ----------
  globe.depthTestAgainstTerrain = true;
  globe.enableLighting = true;
  if (opts.shadows !== false) {
    viewer.shadows = true;
    viewer.terrainShadows = ShadowMode.RECEIVE_ONLY;
    scene.shadowMap.softShadows = true;
    scene.shadowMap.maximumDistance = 2500;
  }
  if (scene.fog) scene.fog.density *= 0.6;
  viewer.clock.currentTime = JulianDate.fromIso8601(opts.time || '2026-06-15T21:30:00Z');
  viewer.clock.shouldAnimate = true;
  viewer.clock.multiplier = 1;

  // ---------- runway heights from the terrain ----------
  status('Sampling runway terrain…');
  const { r06, r24 } = miramarRunways();
  let geoid = MIRAMAR_GEOID;
  try {
    // `terrain: Terrain.fromWorldTerrain()` resolves asynchronously; wait for it (max 15 s)
    if (!viewer.terrainProvider || !viewer.terrainProvider.availability) {
      await new Promise((resolve) => {
        const off = scene.terrainProviderChanged.addEventListener(() => {
          off();
          resolve();
        });
        setTimeout(resolve, 15000);
      });
    }
    const pts = r06.samplePoints(25).map(([la, lo]) => Cartographic.fromRadians(lo, la));
    const sampled = await Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, pts);
    const hs = sampled.map((c) => c.height);
    if (hs.every(Number.isFinite) && Math.max(...hs) - Math.min(...hs) < 60) {
      // terrain heights are ellipsoidal: the offset from the published 425 ft MSL gives the geoid
      if (Math.abs(hs[0]) > 1) geoid = hs[0] - 425 * FT;
      r06.setProfile(hs);
      r24.setProfile(hs.slice().reverse());
    }
  } catch (e) {
    console.warn('[F-14] terrain sampling failed, using published runway elevations', e);
  }

  // ---------- model ----------
  status('Building F-14 model…');
  const { glb, jet, nodes } = await buildF14Glb({ livery: opts.livery || 'lowvis' });
  const url = URL.createObjectURL(new Blob([glb], { type: 'model/gltf-binary' }));
  const model = await Model.fromGltfAsync({
    url,
    forwardAxis: Axis.X,
    upAxis: Axis.Y,
    minimumPixelSize: 40,
    shadows: ShadowMode.ENABLED,
  });
  scene.primitives.add(model);
  await new Promise((resolve, reject) => {
    if (model.ready) resolve();
    model.readyEvent.addEventListener(resolve);
    model.errorEvent.addEventListener(reject);
  });
  URL.revokeObjectURL(url);

  // pair three.js objects with Cesium model nodes
  const links = [];
  for (const [name, obj] of nodes) {
    const node = model.getNode(name);
    if (node) links.push({ node, obj, m: new Float64Array(16).fill(NaN), show: null });
  }
  const pilotObj = jet.cockpit.crew.children[0];
  const scratchM = new Matrix4();
  function syncNodes(hidePilot) {
    jet.root.updateMatrixWorld(true);
    for (const L of links) {
      const e = L.obj.matrix.elements;
      let changed = false;
      for (let i = 0; i < 16; i++) {
        if (L.m[i] !== e[i]) {
          changed = true;
          L.m[i] = e[i];
        }
      }
      if (changed) L.node.matrix = Matrix4.fromColumnMajorArray(e, scratchM);
      const show = L.obj.visible && !(hidePilot && L.obj === pilotObj);
      if (show !== L.show) {
        L.node.show = show;
        L.show = show;
      }
    }
  }

  // ---------- simulation ----------
  const groundCarto = new Cartographic();
  let lastGround = r06.h0;
  const ground = (lat, lon) => {
    groundCarto.longitude = lon;
    groundCarto.latitude = lat;
    const h = globe.getHeight(groundCarto);
    if (Number.isFinite(h)) lastGround = h;
    return lastGround;
  };
  const sim = createSim({ ground, runway: r06 });
  const route = miramarRoute(geoid);
  let pilot = null;
  let mode = opts.mode === 'manual' ? 'manual' : 'demo';
  let banner = '';
  let bannerUntil = 0;
  let crashTimer = 0;
  let timeScale = 1;
  const say = (msg, secs = 4) => {
    banner = msg;
    bannerUntil = performance.now() + secs * 1000;
  };

  function reset() {
    sim.reset({ runway: r24, along: 90 });
    jet.state.sweepMode = 'auto';
    jet.state.canopyOpen = false;
    crashTimer = 0;
    sim.events.length = 0;
    if (mode === 'demo') {
      pilot = createDemoPilot(sim, {
        route,
        landing: { runway: r06, departure: r24, vApp: 74, touchdown: 300 },
        onPhase: (_p, msg) => say(msg, 6),
      });
    } else {
      pilot = null;
      sim.cfg.flaps = 'full';
      sim.ctl.throttle = 0.25;
      say('Manual: runway 24R, flaps full. W for power, A for afterburner, ↓ to rotate at ~140 kt', 8);
    }
    jet.update(0, true);
  }
  function setMode(m) {
    mode = m;
    if (m === 'demo') reset();
    else {
      pilot = null;
      sim.ctl.pitch = sim.ctl.roll = sim.ctl.yaw = 0;
      say('You have control', 3);
    }
  }
  reset();

  // ---------- input ----------
  const keys = new Set();
  const flightKeys = new Set(['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'q', 'e', 'w', 's']);
  function onKeyDown(ev) {
    if (ev.target && /input|textarea|select/i.test(ev.target.tagName)) return;
    const k = ev.key.toLowerCase();
    if (k.startsWith('arrow') || k === ' ') ev.preventDefault();
    if (keys.has(k)) return;
    keys.add(k);
    const cfg = sim.cfg;
    const st = sim.s;
    if (mode === 'demo' && (flightKeys.has(k) || 'agfbh'.includes(k))) setMode('manual');
    switch (k) {
      case 'a':
        sim.ctl.ab = !sim.ctl.ab;
        if (sim.ctl.ab) sim.ctl.throttle = 1;
        break;
      case 'g':
        if (cfg.gearDown && st.onGround) say('Weight on wheels: gear stays down');
        else cfg.gearDown = !cfg.gearDown;
        break;
      case 'f':
        cfg.flaps = { up: 'maneuver', maneuver: 'full', full: 'up' }[cfg.flaps];
        break;
      case 'b':
        cfg.speedBrake = !cfg.speedBrake;
        break;
      case 'h':
        cfg.hookDown = !cfg.hookDown;
        break;
      case 'c':
        if (st.onGround && st.V < 5) cfg.canopyOpen = !cfg.canopyOpen;
        else say('Canopy only on the ground, stopped');
        break;
      case 'm': {
        const order = ['auto', 'manual', 'bomb', 'oversweep'];
        jet.state.sweepMode = order[(order.indexOf(jet.state.sweepMode) + 1) % order.length];
        if (jet.state.sweepMode === 'manual') jet.state.manualSweep = Math.round(jet.pos.sweep);
        say(`Sweep mode: ${jet.state.sweepMode}`, 2);
        break;
      }
      case '[':
      case ']':
        jet.state.sweepMode = 'manual';
        jet.state.manualSweep = clamp(jet.state.manualSweep + (k === ']' ? 5 : -5), 20, 68);
        break;
      case 'v':
        setCamera(CAMERAS[(CAMERAS.indexOf(camMode) + 1) % CAMERAS.length]);
        break;
      case 'p':
        setMode(mode === 'demo' ? 'manual' : 'demo');
        break;
      case 't':
        timeScale = timeScale === 1 ? 2 : timeScale === 2 ? 4 : 1;
        say(`Time ×${timeScale}`, 2);
        break;
      case 'r':
        reset();
        break;
      case '?':
        hud.help.style.display = hud.help.style.display === 'none' ? '' : 'none';
        break;
      default:
        break;
    }
  }
  const onKeyUp = (ev) => keys.delete(ev.key.toLowerCase());
  const onBlur = () => keys.clear();
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);

  function manualControls(dt) {
    const c = sim.ctl;
    const axis = (neg, pos) => (keys.has(pos) ? 1 : 0) - (keys.has(neg) ? 1 : 0);
    const ease = (cur, target, rate) => cur + clamp(target - cur, -rate * dt, rate * dt);
    c.pitch = ease(c.pitch, axis('arrowup', 'arrowdown') * 0.75, 3);
    c.roll = ease(c.roll, axis('arrowleft', 'arrowright'), 4);
    c.yaw = ease(c.yaw, axis('q', 'e'), 3);
    c.throttle = clamp(c.throttle + axis('s', 'w') * 0.5 * dt, 0, 1);
    if (keys.has('s') && c.ab) c.ab = false;
    c.brakes = keys.has(' ');
  }

  // ---------- camera ----------
  const camera = scene.camera;
  let camMode = CAMERAS.includes(opts.camera) ? opts.camera : 'chase';
  let chaseOffset = null;
  let flybyPos = null;
  let smoothHeading = sim.s.heading;
  function setCamera(m) {
    camMode = m;
    camera.lookAtTransform(Matrix4.IDENTITY);
    camera.frustum.near = m === 'cockpit' ? 0.2 : 1.0;
    chaseOffset = null;
    flybyPos = null;
    say(`Camera: ${CAMERA_LABEL[m]}`, 2);
  }
  setCamera(camMode);

  // ---------- per-frame ----------
  const enuM = new Matrix4();
  const rotM = new Matrix3();
  const localM = new Matrix4();
  const modelM = new Matrix4();
  const pos = new Cartesian3();
  const vec = (x, y, z) => new Cartesian3(x, y, z);
  const enuToWorld = (enu, v, out) => Matrix4.multiplyByPointAsVector(enu, vec(v[0], v[1], v[2]), out || new Cartesian3());
  let hud = createHud(viewer.container);
  let last = performance.now();
  let hudTimer = 0;

  function frame() {
    const now = performance.now();
    const realDt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const dt = realDt * timeScale;

    // simulation in fixed sub-steps
    if (mode === 'manual') manualControls(realDt);
    const n = Math.max(1, Math.ceil(dt / (1 / 120)));
    for (let i = 0; i < n; i++) {
      if (pilot) pilot.update(dt / n);
      sim.step(dt / n);
    }
    const s = sim.s;
    if (s.crashed) {
      if (!crashTimer) say(mode === 'demo' ? 'Crashed! Restarting…' : 'Crashed! Press R to reset', 5);
      crashTimer += realDt;
      if (mode === 'demo' && crashTimer > 3) reset();
    }
    if (pilot && pilot.done) reset();

    // mirror the sim into the 3D model's systems
    const S = jet.state;
    const cfg = sim.cfg;
    S.mach = s.V / 340;
    S.flaps = cfg.flaps;
    S.gearDown = cfg.gearDown;
    S.speedBrake = cfg.speedBrake;
    S.hookDown = cfg.hookDown;
    S.canopyOpen = cfg.canopyOpen;
    S.throttle = Math.max(0.12, sim.ctl.throttle);
    S.afterburner = sim.ctl.ab ? 1 : 0;
    S.pitch = clamp(sim.ctl.pitch, -1, 1) * 0.8;
    S.roll = clamp(sim.ctl.roll, -1, 1) * 0.6;
    S.yaw = clamp(sim.ctl.yaw, -1, 1) * 0.6;
    if (pilot && pilot.phase === 'parked' && pilot.timer > 5) S.sweepMode = 'oversweep';
    jet.update(dt);
    syncNodes(camMode === 'cockpit');

    // placement: model frame columns = forward, port (-right), up in ECEF
    Cartesian3.fromRadians(s.lon, s.lat, s.h, undefined, pos);
    Transforms.eastNorthUpToFixedFrame(pos, undefined, enuM);
    const { f, r, u } = sim.axes();
    Matrix3.fromColumnMajorArray([f[0], f[1], f[2], -r[0], -r[1], -r[2], u[0], u[1], u[2]], rotM);
    Matrix4.fromRotationTranslation(rotM, Cartesian3.ZERO, localM);
    Matrix4.multiply(enuM, localM, modelM);
    model.modelMatrix = modelM;

    updateCamera(realDt, s, f, u);

    hudTimer -= realDt;
    if (hudTimer <= 0) {
      hudTimer = 0.1;
      updateHud(s);
    }
  }

  function updateCamera(dt, s, f, u) {
    // centre of the airframe, ~2.3 m above the wheels
    const centre = Cartesian3.add(pos, enuToWorld(enuM, u.map((x) => x * 2.3)), new Cartesian3());
    if (camMode === 'chase') {
      // heading-aligned frame so orbit/zoom offsets persist as the jet turns
      const k = 1 - Math.exp(-dt * 3);
      smoothHeading += Math.atan2(Math.sin(s.heading - smoothHeading), Math.cos(s.heading - smoothHeading)) * k;
      const ch = Math.cos(smoothHeading);
      const sh = Math.sin(smoothHeading);
      const fr = Transforms.eastNorthUpToFixedFrame(centre);
      const rot = Matrix4.fromRotationTranslation(Matrix3.fromColumnMajorArray([ch, -sh, 0, sh, ch, 0, 0, 0, 1]));
      const frame = Matrix4.multiply(fr, rot, new Matrix4());
      if (!chaseOffset) chaseOffset = new Cartesian3(0, -42, 10);
      else Cartesian3.clone(camera.position, chaseOffset);
      camera.lookAtTransform(frame, chaseOffset);
    } else if (camMode === 'cockpit') {
      const eye = Cartesian3.add(pos, enuToWorld(enuM, f.map((x, i) => x * EYE.fwd + u[i] * EYE.up)), new Cartesian3());
      const dir = enuToWorld(enuM, f);
      const up = enuToWorld(enuM, u);
      // look slightly down over the nose
      const look = Cartesian3.normalize(Cartesian3.subtract(dir, Cartesian3.multiplyByScalar(up, 0.12, new Cartesian3()), new Cartesian3()), new Cartesian3());
      camera.setView({ destination: eye, orientation: { direction: look, up } });
    } else if (camMode === 'flyby') {
      const ahead = enuToWorld(enuM, [Math.sin(s.heading), Math.cos(s.heading), 0]);
      const right = enuToWorld(enuM, [Math.cos(s.heading), -Math.sin(s.heading), 0]);
      const toCam = flybyPos ? Cartesian3.subtract(flybyPos, centre, new Cartesian3()) : null;
      const dist = toCam ? Cartesian3.magnitude(toCam) : Infinity;
      const behind = toCam ? Cartesian3.dot(toCam, ahead) < 0 : true;
      if (!flybyPos || (behind && dist > Math.max(250, s.V * 3)) || dist > 6000) {
        const lead = clamp(s.V * 5, 60, 1500);
        flybyPos = Cartesian3.add(centre, Cartesian3.multiplyByScalar(ahead, lead, new Cartesian3()), new Cartesian3());
        Cartesian3.add(flybyPos, Cartesian3.multiplyByScalar(right, clamp(s.V * 0.3, 25, 90), new Cartesian3()), flybyPos);
        const c = Cartographic.fromCartesian(flybyPos);
        const gh = globe.getHeight(c);
        c.height = Math.max(c.height - 6, (Number.isFinite(gh) ? gh : s.h) + 4);
        flybyPos = Cartographic.toCartesian(c);
      }
      const dir = Cartesian3.normalize(Cartesian3.subtract(centre, flybyPos, new Cartesian3()), new Cartesian3());
      const surfUp = scene.globe.ellipsoid.geodeticSurfaceNormal(flybyPos, new Cartesian3());
      const right2 = Cartesian3.normalize(Cartesian3.cross(dir, surfUp, new Cartesian3()), new Cartesian3());
      const up2 = Cartesian3.cross(right2, dir, new Cartesian3());
      camera.setView({ destination: flybyPos, orientation: { direction: dir, up: up2 } });
    }
  }

  function updateHud(s) {
    const cfg = sim.cfg;
    const P = jet.pos;
    const hdg = ((s.heading / DEG) + 360) % 360;
    const altFt = (s.h - geoid) / FT;
    const gear = P.gear > 0.99 ? 'DOWN' : P.gear < 0.01 ? 'UP' : 'TRANSIT';
    const lines = [
      `F-14A TOMCAT    ${mode === 'demo' ? 'DEMO' : 'MANUAL'}  ${CAMERA_LABEL[camMode]}${timeScale > 1 ? `  ×${timeScale}` : ''}`,
      `IAS  ${(s.V / KT).toFixed(0).padStart(4)} kt   M ${(s.V / 340).toFixed(2)}`,
      `ALT  ${altFt.toFixed(0).padStart(5)} ft   AGL ${(s.agl / FT).toFixed(0)} ft`,
      `HDG  ${hdg.toFixed(0).padStart(3, '0')}°      VS ${((s.vs / FT) * 60).toFixed(0)} fpm`,
      `G    ${s.n.toFixed(1).padStart(4)}       BANK ${(s.bank / DEG).toFixed(0)}°`,
      `THR  ${(sim.ctl.throttle * 100).toFixed(0).padStart(3)}%${sim.ctl.ab ? '  AFTERBURNER' : ''}`,
      `WING ${P.sweep.toFixed(0).padStart(3)}°  (${jet.state.sweepMode})`,
      `GEAR ${gear}  FLAPS ${cfg.flaps.toUpperCase()}`,
      `SB ${cfg.speedBrake ? 'OUT' : 'IN'}  HOOK ${cfg.hookDown ? 'DN' : 'UP'}${sim.ctl.brakes && s.onGround ? '  BRAKES' : ''}`,
    ];
    hud.panel.textContent = lines.join('\n');
    const showBanner = performance.now() < bannerUntil || s.crashed;
    hud.banner.style.display = showBanner ? '' : 'none';
    hud.banner.textContent = banner;
  }

  const remove = scene.preUpdate.addEventListener(frame);
  status('');
  say(mode === 'demo' ? 'Demo flight: NAS Miramar → San Diego. Press P to fly it yourself' : banner, 6);

  return {
    sim,
    jet,
    model,
    get pilot() {
      return pilot;
    },
    get mode() {
      return mode;
    },
    setMode,
    setCamera,
    reset,
    setTimeScale: (x) => (timeScale = x),
    destroy() {
      remove();
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      scene.primitives.remove(model);
      hud.root.remove();
      hud = null;
    },
  };
}
