const initialState = {
  showSideDrawer: false,
};

function UI(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDE_DRAWER': {
      return {
        ...state,
        showSideDrawer: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export default UI;
