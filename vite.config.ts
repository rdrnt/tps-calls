import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

/**
 * On map URLs, starts downloading the map page's code (and Mapbox) as soon as the HTML loads,
 * instead of after the main bundle has run and React has asked for the lazy route.
 */
const preloadMapRoute = (): Plugin => ({
  name: 'preload-map-route',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(html, { bundle }) {
      if (!bundle) return html;
      const mapChunk = Object.values(bundle).find(
        output =>
          output.type === 'chunk' &&
          output.facadeModuleId?.endsWith('/src/routes/Map.tsx')
      );
      if (!mapChunk || mapChunk.type !== 'chunk') return html;

      const files = new Set<string>();
      const visit = (fileName: string) => {
        if (files.has(fileName)) return;
        files.add(fileName);
        const output = bundle[fileName];
        if (output?.type === 'chunk') output.imports.forEach(visit);
      };
      visit(mapChunk.fileName);

      const urls = JSON.stringify([...files].map(file => `/${file}`));
      // index.html's earlier inline script has already marked map routes.
      const script = `<script>if(document.documentElement.classList.contains('map-route'))${urls}.forEach(function(href){var link=document.createElement('link');link.rel='modulepreload';link.crossOrigin='';link.href=href;document.head.appendChild(link)})</script>`;
      return html.replace('</head>', `${script}\n  </head>`);
    },
  },
});

export default defineConfig(() => {
  // Source-map publication is deliberately opt-in to prevent local and preview builds from creating Sentry releases.
  const uploadSentrySourceMaps =
    process.env.SENTRY_UPLOAD_SOURCEMAPS === 'true';

  return {
    plugins: [
      react({
        // Include .tsx files
        include: '**/*.{jsx,tsx}',
      }),
      tailwindcss(),
      preloadMapRoute(),
      ...(uploadSentrySourceMaps
        ? [
            sentryVitePlugin({
              org: 'rileyd',
              project: 'tps-calls',
              telemetry: false,
              sourcemaps: {
                // Rolldown emits this helper without a source map; ignore it rather than suppressing all SOURCEMAP_BROKEN warnings.
                ignore: ['**/rolldown-runtime-*.js'],
                // Keep maps in Sentry only, not on the public site.
                deleteSourcemapsAfterUpload: true,
              },
            }),
          ]
        : []),
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
      // iOS 15 can't parse the class static blocks Rolldown emits for es2022.
      target: ['es2022', 'safari15'],
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
      sourcemap: uploadSentrySourceMaps ? ('hidden' as const) : false,
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
  };
});
