import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useAppDispatch } from '../store';
import { setSelectedIncident } from '../store/actions';
import { LocalIncident } from '../types';

interface MapHistoryState {
  // The entry behind this one is the plain map, so closing can go back to it.
  fromMap?: boolean;
}

/** Selects or clears an incident and keeps the URL in step with it. */
const useSelectIncident = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const fromMap = Boolean((state as MapHistoryState | null)?.fromMap);

  return useCallback(
    (incident?: LocalIncident) => {
      dispatch(setSelectedIncident(incident));

      if (incident) {
        if (pathname === `/${incident.id}`) return;
        const onMap = pathname === '/';
        // Switching incidents replaces the entry, so back always returns to the map.
        navigate(`/${incident.id}`, {
          replace: !onMap,
          state: { fromMap: onMap || fromMap } satisfies MapHistoryState,
        });
      } else if (pathname !== '/') {
        if (fromMap) {
          navigate(-1);
        } else {
          navigate('/', { replace: true });
        }
      }
    },
    [dispatch, navigate, pathname, fromMap]
  );
};

export default useSelectIncident;
