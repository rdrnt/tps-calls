import policeApi from '../helpers/policeApi';

const policeApiActions = {
  requestIncidents: () => ({
    type: 'REQUEST_INCIDENTS',
  }),

  receivedIncidents: incidents => ({
    type: 'RECEIVED_INCIDENTS',
    incidents,
  }),

  fetchIncidents: () => dispatch => {
    dispatch(policeApiActions.receivedIncidents());
    policeApi.getAllIncidents(incidents => {
      dispatch(policeApiActions.receivedIncidents(incidents));
    });
  },
};

export default policeApiActions;
