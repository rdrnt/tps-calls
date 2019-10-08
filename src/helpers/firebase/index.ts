import firebaseApp from 'firebase/app';
import 'firebase/firestore';

import { Environment } from '..';

import * as incidents from './incident';

import productionConfig from '../../../config/firebase/production.json';
import developmentConfig from '../../../config/firebase/development.json';

export const initialize = () => {
  const configToUse = Environment.isDevelopment
    ? developmentConfig
    : productionConfig;
  firebaseApp.initializeApp({ ...configToUse });
};

export { incidents };
