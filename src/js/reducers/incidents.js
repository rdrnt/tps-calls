function incidents(
  state = { isFetching: false, list: [], selectedIncident: { id: 0 } },
  action
) {
  switch (action.type) {
    case 'REQUEST_INCIDENTS': {
      return {
        ...state,
        isFetching: true,
      };
    }
    case 'RECEIVED_INCIDENTS': {
      return {
        ...state,
        isFetching: false,
        list: action.incidents,
      };
    }
    case 'SET_SELECTED_INCIDENT': {
      return {
        ...state,
        selectedIncident: action.incident,
      };
    }
    default: {
      return state;
    }
  }
}

export default incidents;
