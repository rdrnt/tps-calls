const uiActions = {
  toggleDrawer: value => ({
    type: 'TOGGLE_DRAWER',
    value,
  }),

  toggleModal: (value, type) => ({
    type: 'TOGGLE_MODAL',
    open: value,
    modalType: type,
  }),

  openSnackbar: ({ message = '', open = true }) => ({
    type: 'OPEN_SNACKBAR',
    open,
    message,
  }),
};

export default uiActions;
