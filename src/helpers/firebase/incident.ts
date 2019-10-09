import { firebase } from '.';
import { Incident, FirestoreCollections } from '@rdrnt/tps-calls-shared';

export const listener = (onChange: (incidents: Incident<any>[]) => void) =>
  firebase
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

export const getOldestIncident = async (): Promise<Incident<any>> => {
  const queryDoc = await firebase
    .firestore()
    .collection(FirestoreCollections.INCIDENTS)
    .orderBy('date', 'asc')
    .limit(1)
    .get();
  const oldestIncident = queryDoc.docs[0].data() as Incident<any>;
  return oldestIncident;
};
