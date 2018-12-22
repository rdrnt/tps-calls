const initialState = {
  showDrawer: false,
  modal: {
    show: false,
    type: '',
  },
  snackbar: {
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
    case 'OPEN_SNACKBAR': {
      return {
        ...state,
        snackbar: {
          open: action.open,
          message: action.message,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export default UI;
