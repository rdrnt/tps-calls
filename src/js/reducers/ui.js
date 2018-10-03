const initialState = {
  showDrawer: false,
};

function UI(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_DRAWER': {
      return {
        ...state,
        showDrawer: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export default UI;
