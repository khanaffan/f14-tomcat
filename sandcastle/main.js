// F-14 Tomcat over San Diego — paste into Cesium Sandcastle (https://sandcastle.cesium.com)
// Scripted demo: Miramar takeoff → coast → Point Loma → high-speed pass → landing on 06L.
// Press P for manual flight, V to cycle cameras, ? for all controls.
import * as Cesium from "cesium";

const { startF14Flight } = await import(
  "https://cdn.jsdelivr.net/gh/khanaffan/f14-tomcat@v1.1.0/sandcastle/f14-cesium.js"
);

const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
  animation: false,
  timeline: false,
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  infoBox: false,
  selectionIndicator: false,
});
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-117.1225, 32.8705, 220),
  orientation: { heading: Cesium.Math.toRadians(255), pitch: Cesium.Math.toRadians(-12), roll: 0 },
});

try {
  viewer.scene.primitives.add(await Cesium.createOsmBuildingsAsync());
} catch (e) {
  console.warn("OSM Buildings unavailable", e);
}

// mode: "demo" | "manual"; livery: "lowvis" | "highvis"; camera: "chase" | "cockpit" | "flyby" | "free"
await startF14Flight(Cesium, viewer, { mode: "demo", livery: "lowvis", camera: "chase" });
