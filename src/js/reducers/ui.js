const initialState = {
  showMobileDrawer: false,
};

function UI(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MOBILE_DRAWER': {
      return {
        ...state,
        showMobileDrawer: action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export default UI;
