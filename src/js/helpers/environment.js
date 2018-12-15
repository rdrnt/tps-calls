import packageJson from '../../../package.json';

const environmentHelper = {
  isDevelopment: () => process.env.NODE_ENV === 'development',

  getCurrentVersion: () => packageJson.version,
};

export default environmentHelper;
