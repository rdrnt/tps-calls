export const config = {
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN as string,
  MAPBOX_API_KEY: process.env.REACT_APP_MAPBOX_API_KEY as string,
  GOOGLEANALYTICS_KEY: process.env.REACT_APP_GANALYTICS_KEY as string,
};

export const isDevelopment: boolean = process.env.NODE_ENV === 'development';
