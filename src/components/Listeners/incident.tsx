import { useEffect, FunctionComponent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Fuse from 'fuse.js';

import { LocalIncident } from '../../types';

import { setIncidentList } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store';

import * as FirebaseIncidents from '../../helpers/firebase/incident';

const IncidentListener: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const incidents = useAppSelector(state => state.incidents.list);
  const incidentFilter = useAppSelector(state => state.incidents.filter);

  // Store the default incidents
  const [defaultIncidentList, setDefaultIncidentList] = useState<
    LocalIncident[]
  >([]);

  // Sets the incidents in the store
  const [setIncidents] = useDebouncedCallback((incidents: LocalIncident[]) => {
    dispatch(setIncidentList(incidents));
  }, 300);

  // Set the listener
  useEffect(() => {
    const incidentListener = FirebaseIncidents.listener(newIncidents => {
      const convertedIncidents: LocalIncident[] = newIncidents.map(
        incident => ({
          ...incident,
          date: incident.date.toDate().valueOf(),
        })
      );
      // Set the incidents in the store
      setIncidents(convertedIncidents);
      // Set the default incidents
      setDefaultIncidentList(convertedIncidents);
    });

    return () => {
      // Remove the listener
      if (incidentListener) {
        incidentListener();
      }
    };
  }, []);

  useEffect(() => {
    if (incidentFilter.search) {
      const fuse = new Fuse(incidents, { keys: ['name', 'location'] });
      const results = fuse.search(incidentFilter.search);
      console.log('results', results);
      setIncidents(results.map(result => result.item));
    }

    return () => {
      setIncidents(defaultIncidentList);
    };
  }, [incidentFilter.search]);

  return null;
};

export default IncidentListener;
