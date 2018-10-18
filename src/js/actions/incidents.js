import policeApi from '../helpers/policeApi';

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
    policeApi.getAllIncidents(incidents => {
      if (incidents.status !== 500) {
        dispatch(incidentActions.receivedIncidents(incidents.values));
      }
    });
  },

  setSelectedIncident: incident => ({
    type: 'SET_SELECTED_INCIDENT',
    incident,
  }),
};

export default incidentActions;
