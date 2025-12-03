import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { isPointWithinRadius } from 'geolib';

import { LocalIncident } from '../../types';

import { DateHelper } from '../../helpers';
import { setIncidentList } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store';

import * as FirebaseIncidents from '../../helpers/firebase/incident';

const IncidentListener: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const incidents = useAppSelector(state => state.incidents.list);
  const incidentFilter = useAppSelector(state => state.incidents.filter);
  const userLocation = useAppSelector(state => state.user.location);

  // Store the default incidents
  const [defaultIncidentList, setDefaultIncidentList] = React.useState<
    LocalIncident[]
  >([]);

  // Sets the incidents in the store
  const [setIncidents] = useDebouncedCallback((incidents: LocalIncident[]) => {
    dispatch(setIncidentList(incidents));
  }, 300);

  // Set the listener
  React.useEffect(() => {
    const incidentListener = FirebaseIncidents.listener(newIncidents => {
      const convertedIncidents: LocalIncident[] = newIncidents.map(
        incident => ({
          ...incident,
          date: DateHelper.convertTimestampToDate(incident.date),
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

  const applyFilters = () => {
    const filteredIncidents: LocalIncident[] = [];

    if (
      incidentFilter.distance &&
      incidentFilter.distance !== 0 &&
      userLocation.coordinates
    ) {
      const withinPoint: LocalIncident[] = incidents.filter(incident =>
        isPointWithinRadius(
          incident.coordinates,
          userLocation.coordinates!,
          incidentFilter.distance! * 1000
        )
      );
      filteredIncidents.push(...withinPoint);
    }

    if (incidentFilter.search) {
      const matchingSearchIncidents = filteredIncidents.filter(incident => {
        const nameMatch = incident.name
          .toLowerCase()
          .includes(incidentFilter.search!.toLowerCase());
        const locationMatch = incident.location
          .toLowerCase()
          .includes(incidentFilter.search!.toLowerCase());

        return nameMatch || locationMatch;
      });
      filteredIncidents.push(...matchingSearchIncidents);
    }

    // if we have incidents to filter, remove the duplicates that may arise
    if (filteredIncidents.length) {
      const filteredDuplicateIncidents = filteredIncidents.reduce(
        (acc: LocalIncident[], current) => {
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
    }
  };

  // Filtering
  React.useEffect(() => {
    // if we have any filter options
    const doesHaveFilter = Object.keys(incidentFilter).length > 0;

    // if we don't have any filter options, and the lists aren't equal, set the default list
    if (!doesHaveFilter && incidents.length !== defaultIncidentList.length) {
      setIncidents(defaultIncidentList);
    } else {
      applyFilters();
    }
  }, [incidentFilter]);

  return null;
};

export default IncidentListener;
