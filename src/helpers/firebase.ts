import firebaseApp from 'firebase/app';
import 'firebase/firestore';

import productionConfig from '../../config/firebase/production.json';

const firebase = {
  initialize: () => {
    // Initialize Firebase
    firebaseApp.initializeApp({ ...productionConfig });
  },
  getIncidents: async () => {
    try {
      const incidentDocs = await firebaseApp
        .firestore()
        .collection('incidents')
        .limit(100)
        .orderBy('date', 'desc')
        .get();
      const incidents = incidentDocs.docs.map(incident => {
        const incidentData = { ...incident.data() };
        const incidentDate = incidentData.date;
        return {
          ...incidentData,
          date: new Date(incidentData.date.seconds),
        };
      });
      return incidents;
    } catch (error) {
      console.log('Error fetching incidents!', error);
      return [];
    }
  },
};

export default firebase;
