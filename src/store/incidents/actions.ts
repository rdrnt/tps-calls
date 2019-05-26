import { IncidentActionsType, IncidentActions } from '.';

// TypeScript infers that this function is returning SendMessageAction
export function setIncidentList(list: any[]): IncidentActionsType {
  return {
    type: IncidentActions.SET_INCIDENT_LIST,
    payload: {
      list,
    },
  };
}
