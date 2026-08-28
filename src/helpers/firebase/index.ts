import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import * as Environment from '../environment';

import productionConfig from '../../config/firebase/production.json';
import developmentConfig from '../../config/firebase/development.json';

const getFirebaseConfigForEnvironment = () => {
  if (!Environment.isDevelopment) {
    return productionConfig;
  }
  console.warn('Using development Firebase project');
  return developmentConfig;
};

const app = initializeApp(getFirebaseConfigForEnvironment());

// Firebase services
export const firestore = getFirestore(app); // Firestore database

export type { Timestamp };

export default app;
