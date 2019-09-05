import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import { Incident } from 'tps-calls-shared';

export const listener = (onChange: (incidents: Incident<any>[]) => void) =>
  firebaseApp
    .firestore()
    .collection('incidents')
    .limit(100)
    .orderBy('date', 'desc')
    .onSnapshot(incidentsSnapshot => {
      const incidents: Incident<any>[] = incidentsSnapshot.docs.map(
        incidentDoc => ({
          ...(incidentDoc.data() as Incident<any>),
        })
      );
      onChange(incidents);
    });
