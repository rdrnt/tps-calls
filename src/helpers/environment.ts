export const config = {
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN as string,
  MAPBOX_API_KEY: import.meta.env.VITE_MAPBOX_API_KEY as string,
  GOOGLEANALYTICS_KEY: import.meta.env.VITE_GANALYTICS_KEY as string,
};

export const isDevelopment: boolean = import.meta.env.DEV;
