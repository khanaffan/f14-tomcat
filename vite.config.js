import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { createReadStream, existsSync, statSync, cpSync } from 'node:fs';

const CESIUM_BUILD = resolve(import.meta.dirname, 'node_modules/cesium/Build/Cesium');
const MIME = { js: 'text/javascript', css: 'text/css', json: 'application/json', wasm: 'application/wasm', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml', xml: 'application/xml', glb: 'model/gltf-binary' };

/** Serve CesiumJS's prebuilt bundle at /cesium/ in dev and copy it into dist/cesium on build. */
function cesiumStatic() {
  let outDir = 'dist';
  return {
    name: 'cesium-static',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use('/cesium', (req, res, next) => {
        const file = resolve(CESIUM_BUILD, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, ''));
        if (!file.startsWith(CESIUM_BUILD) || !existsSync(file) || !statSync(file).isFile()) return next();
        res.setHeader('Content-Type', MIME[file.split('.').pop()] || 'application/octet-stream');
        createReadStream(file).pipe(res);
      });
    },
    closeBundle() {
      cpSync(CESIUM_BUILD, resolve(outDir, 'cesium'), { recursive: true });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [cesiumStatic()],
  build: {
    // three.js alone is ~700 kB minified; keep it in its own cacheable chunk
    chunkSizeWarningLimit: 900,
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        cesium: resolve(import.meta.dirname, 'cesium.html'),
      },
      output: {
        codeSplitting: {
          groups: [{ name: 'three', test: /node_modules[\\/]three[\\/]/ }],
        },
      },
    },
  },
});
