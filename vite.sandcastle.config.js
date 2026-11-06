import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Self-contained ES module (three.js bundled) for Cesium Sandcastle; served via jsDelivr.
export default defineConfig({
  build: {
    outDir: 'sandcastle',
    emptyOutDir: false,
    minify: true,
    lib: {
      entry: resolve(import.meta.dirname, 'src/cesium/app.js'),
      formats: ['es'],
      fileName: () => 'f14-cesium.js',
    },
  },
});
