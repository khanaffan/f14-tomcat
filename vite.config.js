import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // three.js alone is ~700 kB minified; keep it in its own cacheable chunk
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'three', test: /node_modules[\\/]three[\\/]/ }],
        },
      },
    },
  },
});
