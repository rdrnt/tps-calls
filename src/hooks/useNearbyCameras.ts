import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { fetchCameras } from '../store/slices/cameras';
import { LocalTorontoTrafficCamera } from '../types';

/** Loads an incident's nearby cameras on demand; `loading` stays true until each id resolves. */
const useNearbyCameras = (ids: string[]) => {
  const dispatch = useAppDispatch();
  const byId = useAppSelector(state => state.cameras.byId);
  const key = ids.join(',');

  useEffect(() => {
    if (key) dispatch(fetchCameras(key.split(',')));
  }, [key, dispatch]);

  return useMemo(() => {
    const ready = key ? key.split(',') : [];
    return {
      cameras: ready
        .map(id => byId[id])
        .filter((camera): camera is LocalTorontoTrafficCamera =>
          Boolean(camera)
        ),
      loading: ready.some(id => !(id in byId)),
    };
  }, [key, byId]);
};

export default useNearbyCameras;
