import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          mapbox: ['mapbox-gl'],
        },
      },
    },
  },
  plugins: [react()],
  server: {
    open: true, // Automatically open the app in the browser
    port: 3000, // Default port (optional)
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Set up path alias
    },
  },
});
