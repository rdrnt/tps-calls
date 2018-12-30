import api from '../helpers/api';

import uiActions from './ui';

const incidentActions = {
  requestIncidents: () => ({
    type: 'REQUEST_INCIDENTS',
  }),

  receivedIncidents: incidents => ({
    type: 'RECEIVED_INCIDENTS',
    incidents,
  }),

  fetchIncidents: () => dispatch => {
    dispatch(incidentActions.requestIncidents());
    api.getAllIncidents(incidents => {
      if (incidents.status === 200) {
        dispatch(incidentActions.receivedIncidents(incidents.values));
      } else {
        dispatch(uiActions.toggleModal(true, 'networkError'));
      }
    });
  },

  setSelectedIncident: incident => ({
    type: 'SET_SELECTED_INCIDENT',
    incident,
  }),
};

export default incidentActions;
