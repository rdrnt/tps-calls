import { Incident } from 'tps-calls-shared';
import { Timestamp } from '@google-cloud/firestore';

/*
 INCIDENTS
*/

export interface IncidentFilterState {
  search?: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
}

export interface IncidentsState {
  list: Incident<any>[];
  selected?: Incident<any>;
  filter: IncidentFilterState;
}

export const INITIAL_STATE: IncidentsState = {
  list: [],
  selected: undefined,
  filter: {},
};

export enum IncidentActions {
  SET_INCIDENT_LIST = 'SET_INCIDENT_LIST',
  SET_SELECTED_INCIDENT = 'SET_SELECTED_INCIDENT',
  SET_INCIDENT_FILTER = 'SET_INCIDENT_FILTER',
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

export interface SetIncidentFilterAction {
  type: IncidentActions.SET_INCIDENT_FILTER;
  payload: {
    search?: string;
  };
}

export type IncidentActionType =
  | SetIncidentListAction
  | SetSelectedIncidentAction
  | SetIncidentFilterAction;
