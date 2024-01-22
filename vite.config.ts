import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  resolve: {
    alias: {
      // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
      // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      console: 'rollup-plugin-node-polyfills/polyfills/console',
      constants: 'rollup-plugin-node-polyfills/polyfills/constants',
      domain: 'rollup-plugin-node-polyfills/polyfills/domain',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      http: 'rollup-plugin-node-polyfills/polyfills/http',
      https: 'rollup-plugin-node-polyfills/polyfills/http',
      os: 'rollup-plugin-node-polyfills/polyfills/os',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
      querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
      sys: 'util',
      timers: 'rollup-plugin-node-polyfills/polyfills/timers',
      tty: 'rollup-plugin-node-polyfills/polyfills/tty',
      url: 'rollup-plugin-node-polyfills/polyfills/url',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      vm: 'rollup-plugin-node-polyfills/polyfills/vm',
      zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
      _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
      _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
      _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
      _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
    },
  },
  optimizeDeps: {
    exclude: [],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      plugins: [
        // Enable esbuild polyfill plugins
        polyfillNode({
          globals: {
            global: false,
            __dirname: false,
            __filename: false,
            buffer: false,
            process: false,
            navigator: false,
          },
          polyfills: {
            _stream_duplex: true,
            _stream_passthrough: true,
            _stream_readable: true,
            _stream_transform: true,
            _stream_writable: true,
            assert: true,
            'assert/strict': false,
            async_hooks: false,
            buffer: true,
            child_process: 'empty',
            cluster: 'empty',
            console: false,
            constants: true,
            crypto: 'empty',
            dgram: 'empty',
            diagnostics_channel: false,
            dns: 'empty',
            domain: true,
            events: true,
            fs: 'empty',
            'fs/promises': false,
            http: true,
            http2: false,
            https: true,
            module: 'empty',
            net: 'empty',
            os: true,
            path: true,
            perf_hooks: false,
            process: true,
            punycode: true,
            querystring: true,
            readline: 'empty',
            repl: 'empty',
            stream: true,
            string_decoder: true,
            sys: true,
            timers: true,
            'timers/promises': false,
            tls: 'empty',
            tty: true,
            url: true,
            util: true,
            v8: false,
            vm: true,
            wasi: false,
            worker_threads: false,
            zlib: true,
          },
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
});
