import { IncidentActions, IncidentActionsType } from '.';
import { Incident } from 'tps-calls-shared';

// TypeScript infers that this function is returning SendMessageAction
export function setIncidentList(list: Incident<any>[]): IncidentActionsType {
  return {
    type: IncidentActions.SET_INCIDENT_LIST,
    payload: {
      list,
    },
  };
}
