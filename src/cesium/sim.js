/**
 * Lightweight F-14 flight model + scripted "demo pilot", independent of any renderer.
 *
 * Point-mass model on a spherical earth: the pilot commands roll rate and load factor, the
 * model integrates speed (thrust - drag - gravity), flight-path angle and heading, and derives
 * a plausible angle of attack for the visual attitude. Positions are geodetic radians and
 * heights are ellipsoid heights of the wheel-contact point (the 3D model's origin).
 */

const G = 9.80665;
const R_EARTH = 6371000;
const DEG = Math.PI / 180;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const sstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const wrapPi = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const approach = (x, target, rate, dt) => x + clamp(target - x, -rate * dt, rate * dt);

/** Great-circle helpers (radians). */
export function bearing(lat1, lon1, lat2, lon2) {
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  return Math.atan2(y, x);
}
export function distance(lat1, lon1, lat2, lon2) {
  const a = Math.sin((lat2 - lat1) / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2;
  return 2 * R_EARTH * Math.asin(Math.min(1, Math.sqrt(a)));
}
export function offset(lat, lon, brg, dist) {
  const d = dist / R_EARTH;
  const lat2 = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brg));
  const lon2 = lon + Math.atan2(Math.sin(brg) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(lat2));
  return [lat2, lon2];
}

/**
 * A runway described by its two thresholds. `h0`/`h1` are ellipsoid heights.
 * Provides along/cross-track coordinates and a smooth surface height along its length.
 */
export class Runway {
  constructor({ name, lat0, lon0, h0, lat1, lon1, h1, width = 61 }) {
    Object.assign(this, { name, lat0, lon0, h0, lat1, lon1, h1, width });
    this.heading = bearing(lat0, lon0, lat1, lon1);
    this.length = distance(lat0, lon0, lat1, lon1);
  }
  /** along-track distance from threshold 0 and signed cross-track (right of centerline +). */
  local(lat, lon) {
    const d = distance(this.lat0, this.lon0, lat, lon);
    const b = bearing(this.lat0, this.lon0, lat, lon) - this.heading;
    return { along: d * Math.cos(b), cross: d * Math.sin(b) };
  }
  /** surface height; uses a sampled profile (equally spaced heights) when one is set */
  height(along) {
    const t = clamp(along / this.length, 0, 1);
    const p = this.profile;
    if (!p || p.length < 2) return this.h0 + (this.h1 - this.h0) * t;
    const x = t * (p.length - 1);
    const i = Math.min(p.length - 2, Math.floor(x));
    return p[i] + (p[i + 1] - p[i]) * (x - i);
  }
  /** sample `n` equally spaced centerline points as [lat, lon] (radians) */
  samplePoints(n = 25) {
    return Array.from({ length: n }, (_, i) => this.point((i / (n - 1)) * this.length));
  }
  setProfile(heights) {
    this.profile = heights.slice();
    this.h0 = heights[0];
    this.h1 = heights[heights.length - 1];
  }
  contains(lat, lon, margin = 30) {
    const { along, cross } = this.local(lat, lon);
    return along > -margin && along < this.length + margin && Math.abs(cross) < this.width / 2 + margin;
  }
  /** point at `along` metres from threshold 0 and `cross` metres right of the centerline */
  point(along, cross = 0) {
    const [la, lo] = offset(this.lat0, this.lon0, this.heading, along);
    return cross ? offset(la, lo, this.heading + Math.PI / 2, cross) : [la, lo];
  }
}

/** Aerodynamic / performance constants, loosely F-14A at a light fighter weight. */
export const PERF = {
  thrustMil: 5.0, // m/s^2 at full military power
  thrustAB: 3.8, // extra m/s^2 in zone-5 afterburner
  cd0: 6.1e-5, // parasite drag per mass (1/m)
  cdi: 16000, // induced drag coefficient: a = cdi * n^2 / V^2
  vStallClean: 72,
  vStallFlaps: 58,
  nMax: 7.0,
  nMin: -3.0,
  rollRate: 150 * DEG,
  rotateSpeed: 70,
};

export function createSim({ ground, runway, perf = PERF } = {}) {
  const sim = {
    perf,
    runway,
    ground: ground || (() => 0),
    /** pilot inputs */
    ctl: { pitch: 0, roll: 0, yaw: 0, throttle: 0.3, ab: false, brakes: false },
    /** configuration (mirrors the 3D model state) */
    cfg: { gearDown: true, flaps: 'up', speedBrake: false, hookDown: false, canopyOpen: false },
    s: null,
    events: [],
    reset(opts = {}) {
      const rw = opts.runway || runway;
      const along = opts.along ?? 120;
      const [lat, lon] = rw.point(along);
      const heading = opts.heading ?? rw.heading;
      sim.s = {
        lat, lon, h: rw.height(along), heading,
        gamma: 0, V: 0, bank: 0, alpha: 0, theta: 0, n: 1,
        onGround: true, crashed: false, agl: 0, vs: 0, t: 0,
      };
      Object.assign(sim.cfg, { gearDown: true, flaps: 'full', speedBrake: false, hookDown: false, canopyOpen: false });
      Object.assign(sim.ctl, { pitch: 0, roll: 0, yaw: 0, throttle: 0.2, ab: false, brakes: true });
      return sim;
    },
    /** place the jet in the air at a given state */
    place({ lat, lon, h, heading, V = 200, gamma = 0 }) {
      sim.s = { lat, lon, h, heading, gamma, V, bank: 0, alpha: 0, theta: 0, n: 1, onGround: false, crashed: false, agl: 100, vs: 0, t: 0 };
      Object.assign(sim.cfg, { gearDown: false, flaps: 'up', speedBrake: false, hookDown: false, canopyOpen: false });
      Object.assign(sim.ctl, { pitch: 0, roll: 0, yaw: 0, throttle: 0.75, ab: false, brakes: false });
      return sim;
    },
    flapFactor() {
      return { up: 0, maneuver: 0.35, full: 1 }[sim.cfg.flaps] ?? 0;
    },
    vStall() {
      return perf.vStallClean + (perf.vStallFlaps - perf.vStallClean) * sim.flapFactor();
    },
    groundHeight(lat = sim.s.lat, lon = sim.s.lon) {
      const rw = sim.runway;
      if (rw && rw.contains(lat, lon)) return rw.height(rw.local(lat, lon).along);
      const h = sim.ground(lat, lon);
      return Number.isFinite(h) ? h : rw ? rw.height(0) : 0;
    },
    /** load factor the pilot's stick asks for (1 g level-flight trim + stick) */
    stickToN(stick) {
      const s = sim.s;
      const trim = Math.cos(s.gamma) / Math.max(Math.cos(s.bank), 0.5);
      return stick >= 0 ? trim + stick * (perf.nMax - trim) : trim + -stick * (perf.nMin - trim);
    },
    step(dt) {
      const s = sim.s;
      if (s.crashed) return;
      const c = sim.ctl;
      const cfg = sim.cfg;
      s.t += dt;
      const mach = s.V / 340;
      const flap = sim.flapFactor();
      const dragMul =
        (1 + 0.4 * sstep(0.85, 1.15, mach)) *
        (1 + (cfg.gearDown ? 0.6 : 0) + 0.8 * flap + (cfg.speedBrake ? 1.0 : 0) + (cfg.hookDown ? 0.03 : 0));
      const thrust = perf.thrustMil * clamp(c.throttle, 0, 1) + (c.ab ? perf.thrustAB : 0);
      const parasite = perf.cd0 * dragMul * s.V * s.V;
      const vs1 = sim.vStall();

      if (s.onGround) {
        const mu = c.brakes ? 0.45 : 0.025;
        // aerodynamic lift unloads the wheels, so braking fades near rotation speed
        const lift = clamp((s.V / vs1) ** 2 * (0.15 + s.theta / (10 * DEG)), 0, 1.2);
        const fric = s.V > 0.05 ? mu * G * Math.max(0, 1 - lift) : 0;
        const slope = 0;
        s.V = Math.max(0, s.V + (thrust - parasite - fric - slope) * dt);
        // nosewheel steering at low speed, rudder authority at speed
        const steer = c.yaw * (s.V < 30 ? 0.35 * Math.min(1, s.V / 4) : 0.06 + 3 / Math.max(s.V, 1));
        s.heading = wrapPi(s.heading + steer * dt);
        // rotation: pulling raises the nose once there is enough airflow over the stabilators
        const canRotate = s.V > perf.rotateSpeed * 0.9;
        const thetaTarget = canRotate ? clamp(c.pitch, 0, 1) * 12 * DEG : 0;
        s.theta = approach(s.theta, thetaTarget, (canRotate ? 3.5 : 6) * DEG, dt);
        s.bank = approach(s.bank, 0, 20 * DEG, dt);
        s.alpha = s.theta;
        s.gamma = 0;
        s.n = 1;
        const [la, lo] = offset(s.lat, s.lon, s.heading, s.V * dt);
        s.lat = la;
        s.lon = lo;
        s.h = sim.groundHeight();
        s.agl = 0;
        s.vs = 0;
        if (lift >= 1.02 && s.theta > 5 * DEG && c.pitch > 0.2) {
          s.onGround = false;
          s.gamma = 1.0 * DEG;
          sim.events.push({ t: s.t, type: 'liftoff', V: s.V });
        }
        return;
      }

      // --- airborne ---
      const rollRate = perf.rollRate * clamp(s.V / 120, 0.3, 1);
      if (Math.abs(c.roll) > 0.02) s.bank = wrapPi(s.bank + c.roll * rollRate * dt);
      const nLift = Math.min(perf.nMax, (s.V / vs1) ** 2);
      const nCmd = clamp(sim.stickToN(c.pitch), Math.max(perf.nMin, -nLift), nLift);
      // a short lag stands in for pitch dynamics
      s.n = approach(s.n, nCmd, 12, dt);
      const induced = (perf.cdi * s.n * s.n) / Math.max(s.V * s.V, 400);
      s.V = Math.max(20, s.V + (thrust - parasite - induced - G * Math.sin(s.gamma)) * dt);
      const V = s.V;
      s.gamma = clamp(s.gamma + (G / V) * (s.n * Math.cos(s.bank) - Math.cos(s.gamma)) * dt, -89 * DEG, 89 * DEG);
      s.heading = wrapPi(s.heading + ((G * s.n * Math.sin(s.bank)) / (V * Math.max(Math.cos(s.gamma), 0.05))) * dt);
      // visual angle of attack: ~5 deg at 1 g / 100 m/s, flaps lower it
      s.alpha = clamp(5.5 * DEG * s.n * (100 / V) ** 2 * (1 - 0.25 * flap), -6 * DEG, 18 * DEG);
      s.theta = s.gamma + s.alpha * Math.cos(s.bank);
      const dist = V * Math.cos(s.gamma) * dt;
      const [la, lo] = offset(s.lat, s.lon, s.heading, dist);
      s.lat = la;
      s.lon = lo;
      s.vs = V * Math.sin(s.gamma);
      s.h += s.vs * dt;
      const gh = sim.groundHeight();
      s.agl = s.h - gh;
      if (s.agl <= 0) {
        const onRunway = sim.runway && sim.runway.contains(s.lat, s.lon, 5);
        const ok = cfg.gearDown && s.vs > -7 && Math.abs(s.bank) < 15 * DEG && s.theta > -2 * DEG && s.theta < 16 * DEG;
        s.h = gh;
        s.agl = 0;
        if (ok && onRunway) {
          s.onGround = true;
          s.gamma = 0;
          sim.events.push({ t: s.t, type: 'touchdown', V, vs: s.vs });
        } else {
          s.crashed = true;
          s.V = 0;
          sim.events.push({ t: s.t, type: 'crash', V, vs: s.vs, onRunway, gear: cfg.gearDown });
        }
      }
    },
    /** body axes in local East-North-Up: forward, right, up */
    axes() {
      const s = sim.s;
      const { heading: psi, gamma: g, bank: phi, alpha: a } = s;
      const v = [Math.sin(psi) * Math.cos(g), Math.cos(psi) * Math.cos(g), Math.sin(g)];
      const r0 = [Math.cos(psi), -Math.sin(psi), 0];
      const u0 = [r0[1] * v[2] - r0[2] * v[1], r0[2] * v[0] - r0[0] * v[2], r0[0] * v[1] - r0[1] * v[0]];
      const r = r0.map((x, i) => x * Math.cos(phi) - u0[i] * Math.sin(phi));
      const u = u0.map((x, i) => x * Math.cos(phi) + r0[i] * Math.sin(phi));
      // on the ground the airframe pitches about the wheels, not the flight path
      const aa = s.onGround ? s.theta : a;
      const f = v.map((x, i) => x * Math.cos(aa) + u[i] * Math.sin(aa));
      const u2 = u.map((x, i) => x * Math.cos(aa) - v[i] * Math.sin(aa));
      return { f, r, u: u2 };
    },
  };
  return sim;
}

/* ------------------------------------------------------------------------------------------ */
/* Demo pilot                                                                                   */
/* ------------------------------------------------------------------------------------------ */

/**
 * Flies a scripted sortie: takeoff, a scenic route, an ILS-style approach, landing and rollout.
 * `route` legs: { name, lat, lon (deg), alt (ellipsoid m), speed (m/s), ab?, sb? }.
 */
export function createDemoPilot(sim, { route, landing, onPhase } = {}) {
  const P = {
    phase: 'lineup',
    leg: 0,
    timer: 0,
    message: '',
    done: false,
  };
  const s = () => sim.s;
  const setPhase = (p, msg) => {
    P.phase = p;
    P.timer = 0;
    P.message = msg || p;
    if (onPhase) onPhase(p, P.message);
  };
  setPhase('lineup', 'Lining up on runway 24R, Miramar');

  // ---- inner loops ----
  const holdBank = (bankCmd) => {
    sim.ctl.roll = clamp((bankCmd - s().bank) * 2.2, -1, 1);
  };
  const holdGamma = (gammaCmd, nLimit = 4) => {
    const st = s();
    const trim = Math.cos(st.gamma) / Math.max(Math.cos(st.bank), 0.5);
    const nWant = clamp(trim + ((gammaCmd - st.gamma) * st.V) / G * 1.2, -1, nLimit);
    const nMax = sim.perf.nMax;
    const nMin = sim.perf.nMin;
    sim.ctl.pitch = nWant >= trim ? (nWant - trim) / (nMax - trim) : -(nWant - trim) / (nMin - trim);
  };
  const holdSpeed = (vCmd, allowAB = true, allowSB = true) => {
    const err = vCmd - s().V;
    sim.ctl.throttle = clamp(0.62 + err * 0.05, 0.08, 1);
    sim.ctl.ab = allowAB && err > 25;
    sim.cfg.speedBrake = allowSB && err < -25;
  };
  const altToGamma = (altCmd, maxDeg = 12) => {
    const st = s();
    return clamp(((altCmd - st.h) * 0.02 * 120) / Math.max(st.V, 60), -maxDeg * DEG, maxDeg * DEG);
  };
  const steerTo = (brg, maxBankDeg = 60) => {
    const err = wrapPi(brg - s().heading);
    holdBank(clamp(err * 2.5, -maxBankDeg * DEG, maxBankDeg * DEG));
  };
  /** steer towards a point, extending straight first if it lies inside our turn circle */
  const flyTo = (lat, lon, maxBankDeg = 60) => {
    const st = s();
    const brg = bearing(st.lat, st.lon, lat, lon);
    const err = wrapPi(brg - st.heading);
    const r = (st.V * st.V) / (G * Math.tan(maxBankDeg * DEG));
    if (distance(st.lat, st.lon, lat, lon) < 2.3 * r * Math.abs(Math.sin(err)) && Math.abs(err) > 20 * DEG) holdBank(0);
    else steerTo(brg, maxBankDeg);
    return err;
  };

  const rw = landing.runway;
  const tdAlong = landing.touchdown ?? 300;
  const gs = (landing.glideslope ?? 3) * DEG;

  P.update = (dt) => {
    const st = s();
    const cfg = sim.cfg;
    const ctl = sim.ctl;
    P.timer += dt;
    if (st.crashed) return;

    // automatic configuration management while airborne
    if (!st.onGround && P.phase !== 'final' && P.phase !== 'flare') {
      if (cfg.gearDown && st.agl > 15 && st.vs > 0) cfg.gearDown = false;
      if (cfg.flaps !== 'up' && st.V > 105 && st.agl > 120) cfg.flaps = 'up';
    }

    switch (P.phase) {
      case 'lineup': {
        ctl.brakes = true;
        ctl.throttle = Math.min(1, 0.2 + P.timer * 0.4);
        ctl.ab = P.timer > 2.5;
        if (P.timer > 3.5) setPhase('takeoff', 'Afterburner takeoff');
        break;
      }
      case 'takeoff': {
        ctl.brakes = false;
        ctl.throttle = 1;
        ctl.ab = true;
        // keep the centerline with nosewheel steering / rudder
        const { cross } = landing.departure.local(st.lat, st.lon);
        const hdgErr = wrapPi(landing.departure.heading - st.heading);
        ctl.yaw = clamp(hdgErr * 3 - cross * 0.02, -1, 1);
        ctl.pitch = st.V > sim.perf.rotateSpeed ? 0.7 : 0;
        if (!st.onGround) {
          ctl.yaw = 0;
          setPhase('climb', 'Gear up, climbing out');
        }
        break;
      }
      case 'climb': {
        holdBank(0);
        holdGamma(st.agl < 60 ? 6 * DEG : 10 * DEG);
        ctl.throttle = 1;
        ctl.ab = true;
        if (st.agl > 250) setPhase('route', route[0].label || route[0].name);
        break;
      }
      case 'route': {
        const wp = route[P.leg];
        const lat = wp.lat * DEG;
        const lon = wp.lon * DEG;
        const dist = distance(st.lat, st.lon, lat, lon);
        const err = flyTo(lat, lon, wp.maxBank ?? 70);
        holdGamma(altToGamma(wp.alt, wp.maxClimb ?? 15), 5);
        // slow down for big heading changes so the turn circle stays small, then accelerate
        const turning = Math.abs(err) > 35 * DEG;
        holdSpeed(turning ? Math.min(wp.speed, 165) : wp.speed, wp.ab !== false && !turning, wp.sb !== false);
        if (wp.flaps) cfg.flaps = wp.flaps;
        const capture = wp.capture ?? Math.max(600, st.V * 4);
        // close but abeam/behind counts as passed (avoids circling a point we just missed)
        if (dist < capture || (dist < 2.5 * capture && Math.abs(err) > 90 * DEG)) {
          P.leg++;
          if (P.leg >= route.length) setPhase('intercept', 'Intercepting the runway 06L approach');
          else P.message = route[P.leg].label || route[P.leg].name;
        }
        break;
      }
      case 'intercept':
      case 'final': {
        // track the extended centerline, flying a 3 degree glideslope to the touchdown zone
        const { along, cross } = rw.local(st.lat, st.lon);
        const toTd = tdAlong - along;
        const xtk = clamp(-cross * 0.004, -0.6, 0.6);
        if (!P.onCourse) {
          // fly to the intermediate fix first so the turn onto final is shallow
          const [ifLat, ifLon] = rw.point(-(landing.ifDistance ?? 15000) + tdAlong);
          flyTo(ifLat, ifLon, 45);
          const hdgOff = Math.abs(wrapPi(rw.heading - st.heading));
          if (distance(st.lat, st.lon, ifLat, ifLon) < 2500 || (Math.abs(cross) < 1500 && hdgOff < 60 * DEG && along < 0)) P.onCourse = true;
        } else {
          steerTo(rw.heading + xtk, P.phase === 'final' ? 25 : 45);
        }
        const tdH = rw.height(tdAlong);
        const gsH = tdH + toTd * Math.tan(gs);
        if (P.phase === 'intercept') {
          // hold altitude until the glideslope is captured from below, slowing down
          holdGamma(altToGamma(Math.min(st.h, gsH + 0) - 0, 8));
          holdSpeed(toTd > 15000 ? 140 : 100, false, true);
          if (toTd < 16000) cfg.flaps = 'maneuver';
          if (toTd < 12000 && Math.abs(cross) < 400 && st.h >= gsH - 30) {
            cfg.gearDown = true;
            cfg.flaps = 'full';
            cfg.hookDown = true;
            setPhase('final', 'On final 06L: gear, flaps, hook down');
          }
        } else {
          const gammaCmd = -gs + clamp((gsH - st.h) * 0.004, -3 * DEG, 3 * DEG);
          holdGamma(gammaCmd, 2);
          holdSpeed(landing.vApp ?? 74, false, false);
          ctl.ab = false;
          if (st.agl < 9) setPhase('flare', 'Flare');
        }
        break;
      }
      case 'flare': {
        const { cross } = rw.local(st.lat, st.lon);
        steerTo(rw.heading - cross * 0.004, 8);
        ctl.throttle = Math.max(0.0, ctl.throttle - dt * 0.15);
        holdGamma(-Math.max(0.6, Math.min(3, st.agl * 0.35)) * DEG, 1.6);
        if (st.onGround) setPhase('rollout', 'Touchdown! Braking');
        break;
      }
      case 'rollout': {
        const { cross } = rw.local(st.lat, st.lon);
        const hdgErr = wrapPi(rw.heading - st.heading);
        ctl.yaw = clamp(hdgErr * 3 - cross * 0.02, -1, 1);
        ctl.roll = 0;
        ctl.throttle = 0;
        ctl.ab = false;
        cfg.speedBrake = true;
        ctl.pitch = 0;
        ctl.brakes = P.timer > 1.5;
        if (st.V < 0.3) {
          setPhase('parked', 'Stopped: canopy open, flaps up, wings to oversweep');
          cfg.speedBrake = false;
          cfg.hookDown = false;
        }
        break;
      }
      case 'parked': {
        ctl.brakes = true;
        ctl.yaw = 0;
        cfg.flaps = 'up';
        if (P.timer > 1) cfg.canopyOpen = true;
        if (P.timer > 14) P.done = true;
        break;
      }
      default:
        break;
    }
  };
  return P;
}

/* ------------------------------------------------------------------------------------------ */
/* NAS Miramar scenario                                                                        */
/* ------------------------------------------------------------------------------------------ */

const FT = 0.3048;
/** approximate geoid undulation at San Diego (ellipsoid = MSL + N) */
export const MIRAMAR_GEOID = -35.6;

/** Runway 06L / 24R at NAS (MCAS) Miramar, 12,000 ft. Heights may be refined from terrain. */
export function miramarRunways(geoid = MIRAMAR_GEOID) {
  const ends = {
    lat06: 32.864566, lon06: -117.164848, h06: 425 * FT + geoid,
    lat24: 32.872875, lon24: -117.127031, h24: 475 * FT + geoid,
  };
  const r06 = new Runway({ name: '06L', lat0: ends.lat06 * DEG, lon0: ends.lon06 * DEG, h0: ends.h06, lat1: ends.lat24 * DEG, lon1: ends.lon24 * DEG, h1: ends.h24 });
  const r24 = new Runway({ name: '24R', lat0: ends.lat24 * DEG, lon0: ends.lon24 * DEG, h0: ends.h24, lat1: ends.lat06 * DEG, lon1: ends.lon06 * DEG, h1: ends.h06 });
  return { r06, r24 };
}

/** Scenic San Diego sortie. Altitudes are MSL metres, converted to ellipsoid heights here. */
export function miramarRoute(geoid = MIRAMAR_GEOID) {
  const leg = (label, lat, lon, altMsl, speed, extra = {}) => ({ label, lat, lon, alt: altMsl + geoid, speed, ...extra });
  return [
    leg('Departing west over the coast', 32.835, -117.245, 900, 220),
    leg('Pacific Beach and Mission Bay', 32.775, -117.262, 600, 230),
    leg('Down the coast past Point Loma', 32.680, -117.263, 300, 200),
    leg('Rounding Point Loma', 32.652, -117.253, 260, 170, { ab: false, maxBank: 70, capture: 500 }),
    leg('Rounding Point Loma', 32.644, -117.236, 250, 170, { ab: false, maxBank: 70, capture: 500 }),
    leg('Into San Diego Bay', 32.661, -117.223, 250, 300, { capture: 600 }),
    leg('High-speed pass: North Island', 32.700, -117.192, 280, 330, { capture: 1000 }),
    leg('High-speed pass: downtown San Diego', 32.716, -117.158, 330, 330, { capture: 1500 }),
    leg('Pulling up over Mission Valley', 32.752, -117.115, 1100, 250),
    leg('Out over La Jolla', 32.858, -117.275, 1100, 200, { maxBank: 45 }),
    leg('Offshore, turning back for Miramar', 32.880, -117.400, 900, 150, { maxBank: 40, ab: false }),
  ];
}
