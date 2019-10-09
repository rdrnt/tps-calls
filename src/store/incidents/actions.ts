import { IncidentActions, IncidentActionType, IncidentFilterState } from '.';
import { Incident } from 'tps-calls-shared';
import { Timestamp } from '@google-cloud/firestore';

export function setIncidentList(list: Incident<any>[]): IncidentActionType {
  return {
    type: IncidentActions.SET_INCIDENT_LIST,
    payload: {
      list,
    },
  };
}

export function setSelectedIncident(
  selected?: Incident<any>
): IncidentActionType {
  return {
    type: IncidentActions.SET_SELECTED_INCIDENT,
    payload: {
      selected,
    },
  };
}

export function setIncidentFilter({ ...options }: IncidentFilterState) {
  return {
    type: IncidentActions.SET_INCIDENT_FILTER,
    payload: options,
  };
}

export function setFilterOldestDate(value: Timestamp) {
  return {
    type: IncidentActions.SET_INCIDENT_FILTER_OLDEST_DATE,
    payload: value,
  };
}

export function setFilterNewestDate(value: Timestamp) {
  return {
    type: IncidentActions.SET_INCIDENT_FILTER_NEWEST_DATE,
    payload: value,
  };
}
