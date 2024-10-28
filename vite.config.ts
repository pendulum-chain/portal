import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    //@todo: check if necessary
    exclude: [],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: ['esnext'],
  },
});
