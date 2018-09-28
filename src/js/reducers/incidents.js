function incidents(state = { isFetching: false, list: [] }, action) {
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
    default: {
      return state;
    }
  }
}

export default incidents;
