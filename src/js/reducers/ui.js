const initialState = {
  showMenu: false,
  showIncidentTable: false,
};

function UI(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU': {
      return {
        ...state,
        showMenu: action.value,
      };
    }
    case 'TOGGLE_INCIDENT_TABLE': {
      return {
        ...state,
        showIncidentTable: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export default UI;
