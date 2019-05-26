/*
 INCIDENTS
*/
export interface IncidentsState {
  list: any[];
  selected: any;
}

export const INITIAL_STATE: IncidentsState = {
  list: [],
  selected: null,
};

export enum IncidentActions {
  SET_INCIDENT_LIST = 'SET_INCIDENT_LIST',
}

export interface SetIncidentListAction {
  type: IncidentActions;
  payload: {
    list: any[];
  };
}

export type IncidentActionsType = SetIncidentListAction;
