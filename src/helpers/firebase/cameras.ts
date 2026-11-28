import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { FirestoreCollections } from '@rdrnt/tps-calls-shared';

import { firestore } from '.';
import {
  LocalTorontoTrafficCamera,
  ServerTorontoTrafficCamera,
} from '../../types';

// Firestore allows at most 30 values in an `in` filter.
const IN_LIMIT = 30;

export const getCamerasById = async (
  ids: string[]
): Promise<LocalTorontoTrafficCamera[]> => {
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += IN_LIMIT) {
    chunks.push(ids.slice(i, i + IN_LIMIT));
  }

  const snapshots = await Promise.all(
    chunks.map(chunk =>
      getDocs(
        query(
          collection(firestore, FirestoreCollections.TORONTO_TRAFFIC_CAMERAS),
          where(documentId(), 'in', chunk)
        )
      )
    )
  );

  return snapshots.flatMap(snapshot =>
    snapshot.docs.map(doc => {
      const camera = doc.data() as ServerTorontoTrafficCamera;
      // Keyed by document id, which is what incidents store in nearbyCameras.
      return { ...camera, id: doc.id, date: camera.date.toDate().valueOf() };
    })
  );
};
