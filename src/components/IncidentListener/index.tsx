import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Firebase } from '../../helpers';
import { setIncidentList } from '../../store/incidents/actions';
import { AppState } from 'store';
import { Incident } from 'tps-calls-shared';
import { useDebouncedCallback } from 'use-debounce/lib';

const IncidentListener: React.FunctionComponent = ({}) => {
  const dispatch = useDispatch();
  const { filter, list } = useSelector((state: AppState) => state.incidents);

  // Store the default incidents
  const [originalIncidentList, setOriginalIncidentList] = React.useState<
    Incident<any>[]
  >([]);

  const [setIncidents] = useDebouncedCallback(incidents => {
    dispatch(setIncidentList(incidents));
  }, 300);

  // Set the listener
  React.useEffect(() => {
    const incidentListener = Firebase.incidents.listener(newIncidents => {
      setIncidents(newIncidents);
      setOriginalIncidentList(newIncidents);
    });

    return () => {
      // Remove the listener
      if (incidentListener) {
        incidentListener();
      }
    };
  }, []);

  // Filtering
  React.useEffect(() => {
    let filteredIncidents: Incident<any>[] = [];
    if (filter.search) {
      const matchingIncidents = list.filter(incident =>
        incident.name.toLowerCase().includes(filter.search!.toLowerCase())
      );
      filteredIncidents.push(...matchingIncidents);
    }

    // if we have incidents to filter, remove the duplicates that may arise
    if (filteredIncidents.length > 0) {
      const filteredDuplicateIncidents = filteredIncidents.reduce(
        (acc: Incident<any>[], current) => {
          const x = acc.find(item => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        },
        []
      );

      setIncidents(filteredDuplicateIncidents);
    } else {
      setIncidents(originalIncidentList);
    }
  }, [filter]);

  return null;
};

export default IncidentListener;
