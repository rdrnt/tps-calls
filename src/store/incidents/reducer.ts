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
    case IncidentActions.SET_INCIDENT_FILTER:
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };
    default:
      return state;
  }
}
