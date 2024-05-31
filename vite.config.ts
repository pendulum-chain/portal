import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  optimizeDeps: {
    exclude: [],
    esbuildOptions: {
      target: 'esnext',
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    target: ['esnext'],
  },
});
