import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Environment } from '..';

import productionConfig from '../../config/firebase/production.json';
import developmentConfig from '../../config/firebase/development.json';

import * as firebase from 'firebase';

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

export type Timestamp = firebase.firestore.Timestamp;

export default app;
