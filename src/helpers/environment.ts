export enum ConfigKey {
  MAPBOX = 'MAPBOX_API_KEY',
}

export const getConfigKey = (key: ConfigKey): any => process.env[key];

export const isDevelopment: boolean = Boolean(process.env.NODE_ENV);
