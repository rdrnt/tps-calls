function policeApi(state = { isFetching: false, incidents: [] }, action) {
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
        incidents: action.incidents,
      };
    }
    default: {
      return state;
    }
  }
}

export default policeApi;
