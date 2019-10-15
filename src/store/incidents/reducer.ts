import {
  IncidentActions,
  IncidentActionType,
  IncidentsState,
  INITIAL_STATE,
  IncidentFilterState,
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
      const { merge, values } = action.payload;
      // Remove keys without a value
      const modifiedState: { [key: string]: any } = {
        ...(merge && state.filter),
        ...values,
      };
      Object.keys(modifiedState).forEach(key => {
        if (!modifiedState[key]) {
          delete modifiedState[key];
        }
      });
      return {
        ...state,
        filter: modifiedState,
      };
    case IncidentActions.SET_INCIDENT_FILTER_OLDEST_DATE:
      return {
        ...state,
        oldestIncidentDate: action.payload.date,
      };
    case IncidentActions.SET_INCIDENT_FILTER_NEWEST_DATE:
      return {
        ...state,
        newestIncidentDate: action.payload.date,
      };
    default:
      return state;
  }
}
