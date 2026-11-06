/**
 * Entry point for cesium.html: loads the prebuilt CesiumJS bundle (served from /cesium/ by the
 * Vite plugin in vite.config.js), creates a Viewer over San Diego and starts the F-14 flight.
 *
 * URL options: ?mode=manual  ?camera=cockpit|flyby|free  ?livery=highvis  ?buildings=0  ?shadows=0
 */
import { startF14Flight } from './app.js';

const loading = document.getElementById('loading');
const setStatus = (msg) => {
  loading.textContent = msg;
  loading.style.display = msg ? '' : 'none';
};

function load(tag, attrs) {
  return new Promise((resolve, reject) => {
    const el = Object.assign(document.createElement(tag), attrs);
    el.onload = resolve;
    el.onerror = () => reject(new Error(`Failed to load ${attrs.src || attrs.href}`));
    document.head.appendChild(el);
  });
}

async function main() {
  const base = new URL('cesium/', document.baseURI).href;
  window.CESIUM_BASE_URL = base;
  await Promise.all([load('link', { rel: 'stylesheet', href: `${base}Widgets/widgets.css` }), load('script', { src: `${base}Cesium.js` })]);
  const Cesium = window.Cesium;

  const token = import.meta.env.VITE_CESIUM_ION_TOKEN;
  if (token) Cesium.Ion.defaultAccessToken = token;
  else console.warn('[F-14] VITE_CESIUM_ION_TOKEN not set: using CesiumJS\'s default ion token (fine for testing). See .env.example.');

  const params = new URLSearchParams(location.search);
  setStatus('Loading terrain…');
  const viewer = new Cesium.Viewer('cesium', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    animation: false,
    timeline: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    baseLayerPicker: true,
    infoBox: false,
    selectionIndicator: false,
    fullscreenButton: true,
  });
  window.__viewer = viewer;
  // start near the runway while terrain streams in
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-117.1225, 32.8705, 220),
    orientation: { heading: Cesium.Math.toRadians(255), pitch: Cesium.Math.toRadians(-12), roll: 0 },
  });

  if (params.get('buildings') !== '0') {
    try {
      viewer.scene.primitives.add(await Cesium.createOsmBuildingsAsync());
    } catch (e) {
      console.warn('[F-14] OSM Buildings unavailable', e);
    }
  }

  const flight = await startF14Flight(Cesium, viewer, {
    mode: params.get('mode') || 'demo',
    camera: params.get('camera') || 'chase',
    livery: params.get('livery') || 'lowvis',
    shadows: params.get('shadows') !== '0',
    onStatus: setStatus,
  });
  window.__flight = flight;
  setStatus('');
}

main().catch((e) => {
  console.error(e);
  loading.classList.add('error');
  setStatus(`Could not start the flight:\n${e.message}`);
});
