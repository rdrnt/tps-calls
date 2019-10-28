import { firebase } from '.';
import {
  Incident,
  FirestoreCollections,
  Timestamp,
} from '@rdrnt/tps-calls-shared';
import { DateHelper } from '..';

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

export const getIncidentsAtDate = async ({
  startDate,
  endDate,
}: {
  startDate: DateHelper.Timestamp;
  endDate: DateHelper.Timestamp;
}): Promise<Incident<any>[]> => {
  try {
    const incidentDateDocs = await firebase
      .firestore()
      .collection(FirestoreCollections.INCIDENTS)
      .orderBy('date', 'desc')
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .get();

    const dateIncidents = incidentDateDocs.docs.map(incidentDoc => ({
      ...(incidentDoc.data() as Incident<any>),
    }));

    return dateIncidents;
  } catch (error) {
    return [];
  }
};
