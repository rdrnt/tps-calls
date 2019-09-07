import * as React from 'react';
import { Incident } from 'tps-calls-shared';
import { useDispatch } from 'react-redux';

import { setSelectedIncident } from '../../../store/incidents/actions';

interface IncidentView {
  incident: Incident<any>;
}

const IncidentView: React.FunctionComponent<IncidentView> = ({ incident }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      dispatch(setSelectedIncident(undefined));
    };
  }, []);
  return <p>hello</p>;
};

export default IncidentView;
