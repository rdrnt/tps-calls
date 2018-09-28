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
      dispatch(incidentActions.receivedIncidents(incidents));
    });
  },
};

export default incidentActions;
