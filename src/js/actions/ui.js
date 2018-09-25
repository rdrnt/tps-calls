const uiActions = {
  toggleMenu: value => ({
    type: 'TOGGLE_MENU',
    value,
  }),

  toggleIncidentTable: value => ({
    type: 'TOGGLE_INCIDENT_TABLE',
    value,
  }),
};

export default uiActions;
