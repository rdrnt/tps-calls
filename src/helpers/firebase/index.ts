import firebaseApp from 'firebase/app';
import 'firebase/firestore';

import * as incidents from './incident';

import productionConfig from '../../../config/firebase/production.json';

export const initialize = () => {
  firebaseApp.initializeApp({ ...productionConfig });
};

export { incidents };
