import * as React from 'react';
import { Firebase } from '../../helpers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setIncidentList } from '../../store/incidents/actions';

interface IncidentListenerProps {
  dispatch: Dispatch;
}

const IncidentListener: React.FunctionComponent<IncidentListenerProps> = ({
  dispatch,
}) => {
  React.useEffect(() => {
    const incidentListener = Firebase.incidents.listener(newIncidents => {
      dispatch(setIncidentList(newIncidents));
    });

    return () => {
      // Remove the listener
      if (incidentListener) {
        incidentListener();
      }
    };
  }, []);

  return null;
};

export default connect()(IncidentListener);
