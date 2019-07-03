import { Incident } from 'tps-calls-shared';

/*
 INCIDENTS
*/
export interface IncidentsState {
  list: Incident<any>[];
  selected?: Incident<any>;
}

export const INITIAL_STATE: IncidentsState = {
  list: [],
  selected: undefined,
};

export enum IncidentActions {
  SET_INCIDENT_LIST = 'SET_INCIDENT_LIST',
  SET_SELECTED_INCIDENT = 'SET_SELECTED_INCIDENT',
}

export interface SetIncidentListAction {
  type: IncidentActions.SET_INCIDENT_LIST;
  payload: {
    list: Incident<any>[];
  };
}

export interface SetSelectedIncidentAction {
  type: IncidentActions.SET_SELECTED_INCIDENT;
  payload: {
    selected?: Incident<any>;
  };
}

export type IncidentActionType =
  | SetIncidentListAction
  | SetSelectedIncidentAction;
