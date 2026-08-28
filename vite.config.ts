import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    react({
      // Include .tsx files
      include: '**/*.{jsx,tsx}',
    }),
    tailwindcss(),
    sentryVitePlugin({
      disable: process.env.NODE_ENV === 'development',
      org: 'rileyd',
      project: 'tps-calls',
      telemetry: false,
      sourcemaps: {
        // Rolldown emits this helper without a source map; ignore it rather than suppressing all SOURCEMAP_BROKEN warnings.
        ignore: ['**/rolldown-runtime-*.js'],
      },
    }),
  ],
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    rolldownOptions: {
      output: {
        // Vite 8 exposes Oxc compression options through Rolldown output configuration.
        minify: {
          compress: {
            dropConsole: true,
          },
        },
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules\/(react|react-dom)\//,
            },
            {
              name: 'redux',
              test: /node_modules\/(@reduxjs\/toolkit|react-redux)\//,
            },
            {
              name: 'mapbox',
              test: /node_modules\/(mapbox-gl|react-map-gl)\//,
            },
          ],
        },
      },
    },
    // Source maps are hidden in production but uploaded to Sentry
    sourcemap: 'hidden',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true,
    // Enable HMR
    hmr: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
