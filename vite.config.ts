import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

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
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rolldownOptions: {
      output: {
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
  // Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
