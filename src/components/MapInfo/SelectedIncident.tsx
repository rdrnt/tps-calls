import * as React from 'react';
import styled from 'styled-components';

import { Sizes, Colors } from '../../config';
import IncidentCard from '../Card/Incident';
import { Incident } from 'tps-calls-shared';

export const HEIGHT = 100;

const Container = styled.div`
  height: 100%;
  width: 325px;
  background-color: ${Colors.BACKGROUND};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
`;

interface SelectedIncident {
  close: () => void;
  incident: Incident<any>;
}
const SelectedIncident: React.FunctionComponent<SelectedIncident> = ({
  close,
  incident,
}) => {
  return (
    <Container>
      <IncidentCard incident={incident} />
    </Container>
  );
};

export default SelectedIncident;
