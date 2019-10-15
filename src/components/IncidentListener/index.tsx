import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Incident, FirestoreCollections } from '@rdrnt/tps-calls-shared';
import { useDebouncedCallback } from 'use-debounce';

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
  const { filter, list } = useSelector((state: AppState) => state.incidents);

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

      const applySearch = (value: string): Incident<any>[] => {
        // Whether we should search the filtered incidents, or the default list
        const incidentsToSearch =
          filteredIncidents.length > 0 ? filteredIncidents : list;
        const matchingIncidents = incidentsToSearch.filter(incident =>
          incident.name.toLowerCase().includes(value.toLowerCase())
        );

        return matchingIncidents;
      };

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

        filteredIncidents.push(...dateIncidents);
        dispatch(closeLoader());
      }

      if (filter.search) {
        const searchedIncidents = applySearch(filter.search);
        filteredIncidents.push(...searchedIncidents);
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
      const filterByDates = filter.startDate && filter.startDate;
      if (filter.search || filterByDates) {
        applyFilters();
      }
    }
  }, [filter]);

  return null;
};

export default IncidentListener;
