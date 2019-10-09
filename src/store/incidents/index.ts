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
  oldestIncidentDate: Timestamp;
  newestIncidentDate: Timestamp;
}

export const INITIAL_STATE: IncidentsState = {
  list: [],
  selected: undefined,
  filter: {},
  oldestIncidentDate: Timestamp.now(),
  newestIncidentDate: Timestamp.now(),
};

export enum IncidentActions {
  SET_INCIDENT_LIST = 'SET_INCIDENT_LIST',
  SET_SELECTED_INCIDENT = 'SET_SELECTED_INCIDENT',
  SET_INCIDENT_FILTER = 'SET_INCIDENT_FILTER',
  SET_INCIDENT_FILTER_OLDEST_DATE = 'SET_INCIDENT_FILTER_OLDEST_DATE',
  SET_INCIDENT_FILTER_NEWEST_DATE = 'SET_INCIDENT_FILTER_NEWEST_DATE',
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
    startDate?: Timestamp;
    endDate?: Timestamp;
  };
}

export interface SetIncidentFilterOldestDateAction {
  type: IncidentActions.SET_INCIDENT_FILTER_OLDEST_DATE;
  payload: {
    oldestIncidentDate: Timestamp;
  };
}

export interface SetIncidentFilterNewestDateAction {
  type: IncidentActions.SET_INCIDENT_FILTER_NEWEST_DATE;
  payload: {
    newestIncidentDate: Timestamp;
  };
}

export type IncidentActionType =
  | SetIncidentListAction
  | SetSelectedIncidentAction
  | SetIncidentFilterAction
  | SetIncidentFilterOldestDateAction
  | SetIncidentFilterNewestDateAction;
