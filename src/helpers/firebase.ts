import firebaseApp from 'firebase/app';
import 'firebase/firestore';

import productionConfig from '../../config/firebase/production.json';

export const initialize = () => {
  firebaseApp.initializeApp({ ...productionConfig });
};

export const incidentListener = ({
  onChange,
}: {
  onChange: (incidents: any[]) => void;
}) =>
  firebaseApp
    .firestore()
    .collection('incidents')
    .limit(100)
    .orderBy('date', 'desc')
    .onSnapshot(incidentsSnapshot => {
      const incidents: any[] = incidentsSnapshot.docs.map(incidentDoc => ({
        ...incidentDoc.data(),
      }));
      onChange(incidents);
    });
