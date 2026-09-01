import mapboxgl from 'mapbox-gl';

/**
 * Mapbox GL v3 requires WebGL2. `supported()` allocates a throwaway canvas and
 * GL context, so call it once per mount rather than per render.
 */
export const isMapSupported = (): boolean => {
  try {
    return mapboxgl.supported();
  } catch {
    // Hardened/anti-fingerprinting browsers can throw out of canvas or GL APIs
    // rather than returning null. Treat a throw as unsupported, not a crash.
    return false;
  }
};
