import * as firebaseApp from 'firebase/app';
import 'firebase/firestore';
import 'firebase/remote-config';

import { Environment } from '..';

import * as incidents from './incident';

import productionConfig from '../../config/firebase/production.json';
import developmentConfig from '../../config/firebase/development.json';
import { isDevelopment } from '../environment';

export const initialize = () => {
  let configToUse;

  if (Environment.isDevelopment) {
    console.warn('Using development Firebase project');
    configToUse = developmentConfig;
  } else {
    configToUse = productionConfig;
  }

  firebaseApp.initializeApp({ ...configToUse });

  // loads remote config
  const remoteConfig = firebaseApp.remoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = isDevelopment
    ? 1000
    : 360000;
  remoteConfig.defaultConfig = {
    tps_api_status: 'online',
  };
  remoteConfig
    .fetchAndActivate()
    .then(() => firebaseApp.remoteConfig().fetch());
};

export const getRemoteConfigStringValue = (key: string): string =>
  firebaseApp
    .remoteConfig()
    .getValue(key)
    .asString();

export type Timestamp = firebaseApp.firestore.Timestamp;

export { firebaseApp as firebase };

export { incidents };
