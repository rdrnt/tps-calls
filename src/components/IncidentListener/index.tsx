import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Incident, FirestoreCollections } from '@rdrnt/tps-calls-shared';
import { useDebouncedCallback } from 'use-debounce';
import { isPointWithinRadius } from 'geolib';

import { Firebase, DateHelper } from '../../helpers';
import {
  setIncidentList,
  setFilterNewestDate,
  setFilterOldestDate,
} from '../../store/incidents/actions';
import { AppState } from '../../store';
import { openLoader, closeLoader } from '../../store/ui/actions';
import { IncidentFilterState } from '../../store/incidents';

const IncidentListener: React.FunctionComponent = ({}) => {
  const dispatch = useDispatch();
  const { incidents, user } = useSelector((state: AppState) => state);
  const { filter, list } = incidents;

  // Store the default incidents
  const [defaultIncidentList, setDefaultIncidentList] = React.useState<
    Incident<any>[]
  >([]);

  // Sets the incidents in the store
  const [setIncidents] = useDebouncedCallback(incidents => {
    dispatch(setIncidentList(incidents));
  }, 300);

  // Store the previous filter options
  const [previousFilters, setPreviousFilters] = React.useState<
    IncidentFilterState
  >({});

  const loadOldestIncidentDate = async () => {
    const oldestIncident: Incident<
      any
    > = await Firebase.incidents.getOldestIncident();
    dispatch(setFilterOldestDate(oldestIncident.date));
  };

  // Set the listener
  React.useEffect(() => {
    const incidentListener = Firebase.incidents.listener(newIncidents => {
      setIncidents(newIncidents);
      setDefaultIncidentList(newIncidents);

      // Sets the newest incident for filtering
      const newestIncident = newIncidents.reduce((pre, current) => {
        const previousDate = DateHelper.convertTimestampToDate(pre.date);
        const currentDateToCompare = DateHelper.convertTimestampToDate(
          current.date
        );

        return previousDate > currentDateToCompare ? pre : current;
      });

      dispatch(setFilterNewestDate(newestIncident.date));
    });

    loadOldestIncidentDate();

    return () => {
      // Remove the listener
      if (incidentListener) {
        incidentListener();
      }
    };
  }, []);

  const applyFilters = async () => {
    try {
      let filteredIncidents: Incident<any>[] = [];
      let incidentsToFilter = [...defaultIncidentList];

      // If we have a start date & end date to filter, and its not the same as the previous filters
      if (
        (Boolean(filter.startDate && filter.endDate) &&
          previousFilters.startDate !== filter.startDate) ||
        previousFilters.endDate !== filter.endDate
      ) {
        dispatch(openLoader('Filtering...'));
        const incidentDateDocs = await Firebase.firebase
          .firestore()
          .collection(FirestoreCollections.INCIDENTS)
          .orderBy('date', 'desc')
          .where('date', '>=', filter.startDate)
          .where('date', '<=', filter.endDate)
          .get();

        const dateIncidents = incidentDateDocs.docs.map(incidentDoc => ({
          ...(incidentDoc.data() as Incident<any>),
        }));

        incidentsToFilter = [...dateIncidents];
        dispatch(closeLoader());
      }

      if (
        filter.distance &&
        filter.distance !== 0 &&
        user.location.coordinates
      ) {
        const withinPoint: Incident<any>[] = incidentsToFilter.filter(
          incident =>
            isPointWithinRadius(
              incident.coordinates,
              user.location.coordinates!,
              filter.distance! * 1000
            )
        );
        filteredIncidents.push(...withinPoint);
      }

      if (filter.search) {
        const matchingSearchIncidents = incidentsToFilter.filter(incident =>
          incident.name.toLowerCase().includes(filter.search!.toLowerCase())
        );
        filteredIncidents.push(...matchingSearchIncidents);
      }

      // if we have incidents to filter, remove the duplicates that may arise
      if (filteredIncidents.length) {
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
      }

      // Set the filters for comparison
      setPreviousFilters(filter);
    } catch (error) {
      console.log('Error filtering', error);
    }
  };

  // Filtering
  React.useEffect(() => {
    // if we have any filter options
    const doesHaveFilter = Object.keys(filter).length > 0;

    // if we don't have any filter options, and the lists aren't equal, set the default list
    if (!doesHaveFilter && list.length !== defaultIncidentList.length) {
      setIncidents(defaultIncidentList);
    } else {
      applyFilters();
    }
  }, [filter]);

  return null;
};

export default IncidentListener;
