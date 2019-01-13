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

  fetchIncidents: () => async (dispatch, getStore) => {
    dispatch(incidentActions.requestIncidents());

    const incidents = await api.getAllIncidents();

    if (incidents.status === 200) {
      // We'll need these to check if we're refreshing
      // Thats why received is below
      const numberOfcurrentIncidents = getStore().incidents.list.length;
      const numberOfNewIncidents = incidents.values.length;

      // Update the incidents in the store
      dispatch(incidentActions.receivedIncidents(incidents.values));

      // If we have 0 current incidents, it's out first fetch, so we're not refreshing
      if (numberOfcurrentIncidents !== 0) {
        // Show the refresh snackbar
        dispatch(
          uiActions.openSnackbar({
            message: `Refreshed`,
          })
        );
        // If we have more new incidents than the current incidents, we got new incidents!
        // Probably should do a better comparison since it's not 100% correct
        if (numberOfNewIncidents > numberOfcurrentIncidents) {
          dispatch(
            uiActions.openSnackbar({
              message: `${numberOfNewIncidents -
                numberOfcurrentIncidents} New incidents `,
            })
          );
        }
      }
    } else {
      dispatch(uiActions.toggleModal(true, 'networkError'));
    }
  },

  setSelectedIncident: incident => ({
    type: 'SET_SELECTED_INCIDENT',
    incident,
  }),
};

export default incidentActions;
