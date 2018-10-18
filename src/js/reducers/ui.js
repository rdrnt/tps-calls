const initialState = {
  showDrawer: false,
  modal: {
    show: false,
    type: '',
  },
};

function UI(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_DRAWER': {
      return {
        ...state,
        showDrawer: action.value,
      };
    }
    case 'TOGGLE_MODAL': {
      return {
        ...state,
        modal: {
          open: action.open,
          type: action.modalType,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export default UI;
