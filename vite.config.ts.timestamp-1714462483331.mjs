// vite.config.ts
import preact from "file:///Users/torsten/Development/pendulum/portal/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import { defineConfig } from "file:///Users/torsten/Development/pendulum/portal/node_modules/vite/dist/node/index.js";
import { NodeGlobalsPolyfillPlugin } from "file:///Users/torsten/Development/pendulum/portal/node_modules/@esbuild-plugins/node-globals-polyfill/dist/index.js";
import { NodeModulesPolyfillPlugin } from "file:///Users/torsten/Development/pendulum/portal/node_modules/@esbuild-plugins/node-modules-polyfill/dist/index.js";
import rollupNodePolyFill from "file:///Users/torsten/Development/pendulum/portal/node_modules/rollup-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [preact()],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" }
  },
  resolve: {
    alias: {
      assert: "rollup-plugin-node-polyfills/polyfills/assert",
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      console: "rollup-plugin-node-polyfills/polyfills/console",
      constants: "rollup-plugin-node-polyfills/polyfills/constants",
      domain: "rollup-plugin-node-polyfills/polyfills/domain",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      http: "rollup-plugin-node-polyfills/polyfills/http",
      https: "rollup-plugin-node-polyfills/polyfills/http",
      os: "rollup-plugin-node-polyfills/polyfills/os",
      path: "rollup-plugin-node-polyfills/polyfills/path",
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
      punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
      querystring: "rollup-plugin-node-polyfills/polyfills/qs",
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      string_decoder: "rollup-plugin-node-polyfills/polyfills/string-decoder",
      sys: "util",
      timers: "rollup-plugin-node-polyfills/polyfills/timers",
      tty: "rollup-plugin-node-polyfills/polyfills/tty",
      url: "rollup-plugin-node-polyfills/polyfills/url",
      util: "rollup-plugin-node-polyfills/polyfills/util",
      vm: "rollup-plugin-node-polyfills/polyfills/vm",
      zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
      _stream_duplex: "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
      _stream_passthrough: "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
      _stream_readable: "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
      _stream_writable: "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
      _stream_transform: "rollup-plugin-node-polyfills/polyfills/readable-stream/transform"
    }
  },
  optimizeDeps: {
    exclude: [],
    esbuildOptions: {
      target: "esnext",
      define: {
        global: "globalThis"
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    target: ["esnext"],
    rollupOptions: {
      plugins: [
        rollupNodePolyFill()
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdG9yc3Rlbi9EZXZlbG9wbWVudC9wZW5kdWx1bS9wb3J0YWxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90b3JzdGVuL0RldmVsb3BtZW50L3BlbmR1bHVtL3BvcnRhbC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdG9yc3Rlbi9EZXZlbG9wbWVudC9wZW5kdWx1bS9wb3J0YWwvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcHJlYWN0IGZyb20gJ0BwcmVhY3QvcHJlc2V0LXZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5cbmltcG9ydCB7IE5vZGVHbG9iYWxzUG9seWZpbGxQbHVnaW4gfSBmcm9tICdAZXNidWlsZC1wbHVnaW5zL25vZGUtZ2xvYmFscy1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBOb2RlTW9kdWxlc1BvbHlmaWxsUGx1Z2luIH0gZnJvbSAnQGVzYnVpbGQtcGx1Z2lucy9ub2RlLW1vZHVsZXMtcG9seWZpbGwnO1xuaW1wb3J0IHJvbGx1cE5vZGVQb2x5RmlsbCBmcm9tICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtwcmVhY3QoKV0sXG4gIGVzYnVpbGQ6IHtcbiAgICBsb2dPdmVycmlkZTogeyAndGhpcy1pcy11bmRlZmluZWQtaW4tZXNtJzogJ3NpbGVudCcgfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAvLyBUaGlzIFJvbGx1cCBhbGlhc2VzIGFyZSBleHRyYWN0ZWQgZnJvbSBAZXNidWlsZC1wbHVnaW5zL25vZGUtbW9kdWxlcy1wb2x5ZmlsbCxcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVtb3JzZXMvZXNidWlsZC1wbHVnaW5zL2Jsb2IvbWFzdGVyL25vZGUtbW9kdWxlcy1wb2x5ZmlsbC9zcmMvcG9seWZpbGxzLnRzXG4gICAgICBhc3NlcnQ6ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy9hc3NlcnQnLFxuICAgICAgYnVmZmVyOiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvYnVmZmVyLWVzNicsXG4gICAgICBjb25zb2xlOiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvY29uc29sZScsXG4gICAgICBjb25zdGFudHM6ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy9jb25zdGFudHMnLFxuICAgICAgZG9tYWluOiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvZG9tYWluJyxcbiAgICAgIGV2ZW50czogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL2V2ZW50cycsXG4gICAgICBodHRwOiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvaHR0cCcsXG4gICAgICBodHRwczogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL2h0dHAnLFxuICAgICAgb3M6ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy9vcycsXG4gICAgICBwYXRoOiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvcGF0aCcsXG4gICAgICBwcm9jZXNzOiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvcHJvY2Vzcy1lczYnLFxuICAgICAgcHVueWNvZGU6ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy9wdW55Y29kZScsXG4gICAgICBxdWVyeXN0cmluZzogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3FzJyxcbiAgICAgIHN0cmVhbTogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3N0cmVhbScsXG4gICAgICBzdHJpbmdfZGVjb2RlcjogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3N0cmluZy1kZWNvZGVyJyxcbiAgICAgIHN5czogJ3V0aWwnLFxuICAgICAgdGltZXJzOiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvdGltZXJzJyxcbiAgICAgIHR0eTogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3R0eScsXG4gICAgICB1cmw6ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy91cmwnLFxuICAgICAgdXRpbDogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3V0aWwnLFxuICAgICAgdm06ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy92bScsXG4gICAgICB6bGliOiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvemxpYicsXG4gICAgICBfc3RyZWFtX2R1cGxleDogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3JlYWRhYmxlLXN0cmVhbS9kdXBsZXgnLFxuICAgICAgX3N0cmVhbV9wYXNzdGhyb3VnaDogJ3JvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3JlYWRhYmxlLXN0cmVhbS9wYXNzdGhyb3VnaCcsXG4gICAgICBfc3RyZWFtX3JlYWRhYmxlOiAncm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvcmVhZGFibGUtc3RyZWFtL3JlYWRhYmxlJyxcbiAgICAgIF9zdHJlYW1fd3JpdGFibGU6ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy9yZWFkYWJsZS1zdHJlYW0vd3JpdGFibGUnLFxuICAgICAgX3N0cmVhbV90cmFuc2Zvcm06ICdyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy9yZWFkYWJsZS1zdHJlYW0vdHJhbnNmb3JtJyxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbXSxcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICAgIC8vIE5vZGUuanMgZ2xvYmFsIHRvIGJyb3dzZXIgZ2xvYmFsVGhpc1xuICAgICAgZGVmaW5lOiB7XG4gICAgICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLFxuICAgICAgfSxcbiAgICAgIC8vIEVuYWJsZSBlc2J1aWxkIHBvbHlmaWxsIHBsdWdpbnNcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgTm9kZUdsb2JhbHNQb2x5ZmlsbFBsdWdpbih7XG4gICAgICAgICAgcHJvY2VzczogdHJ1ZSxcbiAgICAgICAgICBidWZmZXI6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICBOb2RlTW9kdWxlc1BvbHlmaWxsUGx1Z2luKCksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiBbJ2VzbmV4dCddLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgLy8gRW5hYmxlIHJvbGx1cCBwb2x5ZmlsbHMgcGx1Z2luXG4gICAgICAgIC8vIHVzZWQgZHVyaW5nIHByb2R1Y3Rpb24gYnVuZGxpbmdcbiAgICAgICAgcm9sbHVwTm9kZVBvbHlGaWxsKCksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1QsT0FBTyxZQUFZO0FBQ25VLFNBQVMsb0JBQW9CO0FBRTdCLFNBQVMsaUNBQWlDO0FBQzFDLFNBQVMsaUNBQWlDO0FBQzFDLE9BQU8sd0JBQXdCO0FBRy9CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxFQUNsQixTQUFTO0FBQUEsSUFDUCxhQUFhLEVBQUUsNEJBQTRCLFNBQVM7QUFBQSxFQUN0RDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BR0wsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLE1BQ2IsUUFBUTtBQUFBLE1BQ1IsZ0JBQWdCO0FBQUEsTUFDaEIsS0FBSztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sZ0JBQWdCO0FBQUEsTUFDaEIscUJBQXFCO0FBQUEsTUFDckIsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUM7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLE1BQ2QsUUFBUTtBQUFBLE1BRVIsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUVBLFNBQVM7QUFBQSxRQUNQLDBCQUEwQjtBQUFBLFVBQ3hCLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxRQUNWLENBQUM7QUFBQSxRQUNELDBCQUEwQjtBQUFBLE1BQzVCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVEsQ0FBQyxRQUFRO0FBQUEsSUFDakIsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBR1AsbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
