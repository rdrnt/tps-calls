import * as firebaseApp from 'firebase/app';
import 'firebase/firestore';

import { Environment } from '..';

import * as incidents from './incident';

import productionConfig from '../../config/firebase/production.json';
import developmentConfig from '../../config/firebase/development.json';

export const initialize = () => {
  let configToUse;

  if (Environment.isDevelopment) {
    console.warn('Using development Firebase project');
    configToUse = developmentConfig;
  } else {
    configToUse = productionConfig;
  }

  firebaseApp.initializeApp({ ...configToUse });
};

export { firebaseApp as firebase };

export { incidents };
