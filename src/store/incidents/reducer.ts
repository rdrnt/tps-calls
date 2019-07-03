import {
  IncidentActions,
  IncidentActionType,
  IncidentsState,
  INITIAL_STATE,
} from '.';

export function incidentReducer(
  state = INITIAL_STATE,
  action: IncidentActionType
): IncidentsState {
  switch (action.type) {
    case IncidentActions.SET_INCIDENT_LIST:
      return {
        ...state,
        list: [...action.payload.list],
      };
    case IncidentActions.SET_SELECTED_INCIDENT:
      return {
        ...state,
        selected: action.payload.selected,
      };
    default:
      return state;
  }
}
