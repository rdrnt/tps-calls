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
}

export interface SetIncidentListAction {
  type: IncidentActions;
  payload: {
    list: Incident<any>[];
  };
}

export type IncidentActionsType = SetIncidentListAction;
