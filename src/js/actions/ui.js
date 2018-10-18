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
};

export default uiActions;
