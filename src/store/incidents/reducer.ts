import {
  IncidentActions,
  IncidentActionsType,
  IncidentsState,
  INITIAL_STATE,
} from '.';

export function incidentReducer(
  state = INITIAL_STATE,
  action: IncidentActionsType
): IncidentsState {
  switch (action.type) {
    case IncidentActions.SET_INCIDENT_LIST:
      return {
        ...state,
        list: [...action.payload.list],
      };
    default:
      return state;
  }
}
