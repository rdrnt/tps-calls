import * as React from 'react';
import { Incident } from 'tps-calls-shared';

interface IncidentView {
  incident: Incident<any>;
}

const IncidentView: React.FunctionComponent<IncidentView> = ({ incident }) => {
  return <p>hello</p>;
};

export default IncidentView;
