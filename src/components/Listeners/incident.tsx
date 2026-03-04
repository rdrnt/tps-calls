/**
 * Manages the Firestore data-source lifecycle for incidents.
 *
 * - No date-range filter → real-time `onSnapshot` listener (latest 100).
 * - Date-range filter active → unsubscribes from real-time and dispatches
 *   `fetchFilteredIncidents` thunk for a one-shot Firestore query.
 *
 * All client-side filtering (distance, search) is handled by the
 * `selectFilteredIncidents` selector — this component only writes the
 * raw list to `state.incidents.list`.
 */

import { useEffect, useRef, useCallback, FunctionComponent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { LocalIncident } from '../../types';

import { setIncidentList, fetchFilteredIncidents } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store';

import * as FirebaseIncidents from '../../helpers/firebase/incident';

const IncidentListener: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const dateRange = useAppSelector(state => state.incidents.filter.dateRange);

  const listenerRef = useRef<ReturnType<typeof FirebaseIncidents.listener> | null>(null);

  const [setIncidents] = useDebouncedCallback((incidents: LocalIncident[]) => {
    dispatch(setIncidentList(incidents));
  }, 300);

  const subscribe = useCallback(() => {
    if (listenerRef.current) return;

    listenerRef.current = FirebaseIncidents.listener(newIncidents => {
      const convertedIncidents: LocalIncident[] = newIncidents.map(
        incident => ({
          ...incident,
          date: incident.date.toDate().valueOf(),
        })
      );
      setIncidents(convertedIncidents);
    });
  }, [setIncidents]);

  const unsubscribe = useCallback(() => {
    if (listenerRef.current) {
      listenerRef.current();
      listenerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (dateRange) {
      unsubscribe();
      dispatch(fetchFilteredIncidents(dateRange));
    } else {
      subscribe();
    }

    return () => unsubscribe();
  }, [dateRange, subscribe, unsubscribe, dispatch]);

  return null;
};

export default IncidentListener;
