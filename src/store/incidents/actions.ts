import { IncidentActions, IncidentActionType, IncidentFilterState } from '.';
import { Incident } from '@rdrnt/tps-calls-shared';

import { DateHelper } from '../../helpers';

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

export function setFilterOldestDate(date: DateHelper.Timestamp) {
  return {
    type: IncidentActions.SET_INCIDENT_FILTER_OLDEST_DATE,
    payload: {
      date,
    },
  };
}

export function setFilterNewestDate(date: DateHelper.Timestamp) {
  return {
    type: IncidentActions.SET_INCIDENT_FILTER_NEWEST_DATE,
    payload: {
      date,
    },
  };
}
