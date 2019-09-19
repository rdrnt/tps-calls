import { IncidentActions, IncidentActionType, IncidentFilterState } from '.';
import { Incident } from 'tps-calls-shared';

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
