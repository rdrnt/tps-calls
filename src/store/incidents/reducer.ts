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
      const clonedState: { [key: string]: any } = {
        ...state.filter,
        ...action.payload,
      };
      Object.keys(clonedState).forEach(key => {
        if (!clonedState[key]) {
          delete clonedState[key];
        }
      });
      return {
        ...state,
        filter: clonedState,
      };
    case IncidentActions.SET_INCIDENT_FILTER_OLDEST_DATE:
      return {
        ...state,
        oldestIncidentDate: action.payload.oldestIncidentDate,
      };
    case IncidentActions.SET_INCIDENT_FILTER_NEWEST_DATE:
      return {
        ...state,
        newestIncidentDate: action.payload.newestIncidentDate,
      };
    default:
      return state;
  }
}
