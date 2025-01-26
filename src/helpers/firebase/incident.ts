import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestore } from '.';
import { Incident, FirestoreCollections } from '@rdrnt/tps-calls-shared';
import { DateHelper } from '..';

export const listener = (
  onChange: (incidents: Incident<any>[]) => void
): ReturnType<typeof onSnapshot> => {
  const incidentsCollection = collection(firestore, 'incidents');
  const incidentsQuery = query(
    incidentsCollection,
    orderBy('date', 'desc'),
    limit(100)
  );

  return onSnapshot(incidentsQuery, incidentsSnapshot => {
    const incidents: Incident<any>[] = incidentsSnapshot.docs.map(
      incidentDoc => ({
        ...(incidentDoc.data() as Incident<any>),
      })
    );
    onChange(incidents);
  });
};

export const getOldestIncident = async (): Promise<Incident<any>> => {
  const incidentsCollection = collection(
    firestore,
    FirestoreCollections.INCIDENTS
  );
  const oldestQuery = query(
    incidentsCollection,
    orderBy('date', 'asc'),
    limit(1)
  );

  const querySnapshot = await getDocs(oldestQuery);
  const oldestIncident = querySnapshot.docs[0]?.data() as Incident<any>;

  return oldestIncident;
};

export const getIncidentsAtDate = async ({
  startDate,
  endDate,
}: {
  startDate: Timestamp;
  endDate: Timestamp;
}): Promise<Incident<any>[]> => {
  try {
    const incidentsCollection = collection(
      firestore,
      FirestoreCollections.INCIDENTS
    );
    const dateQuery = query(
      incidentsCollection,
      orderBy('date', 'desc'),
      where('date', '>=', startDate),
      where('date', '<=', endDate)
    );

    const querySnapshot = await getDocs(dateQuery);
    const dateIncidents = querySnapshot.docs.map(incidentDoc => ({
      ...(incidentDoc.data() as Incident<any>),
    }));

    return dateIncidents;
  } catch (error) {
    return [];
  }
};

export const getIncidentFromId = async (
  id: string
): Promise<Incident<any> | undefined> => {
  try {
    const incidentDocRef = doc(firestore, FirestoreCollections.INCIDENTS, id);
    const incidentDoc = await getDoc(incidentDocRef);

    return incidentDoc.exists()
      ? (incidentDoc.data() as Incident<any>)
      : undefined;
  } catch (error) {
    return undefined;
  }
};
