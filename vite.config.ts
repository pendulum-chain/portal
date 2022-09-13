import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.match(/react|preact|daisyui|tailwind/g)) {
              return "vendor_ui";
            } else if (id.includes("@polkadot")) {
              return "vendor_crypto";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
