import * as React from 'react';
import styled from 'styled-components';

import { Sizes, Colors } from '../../config';
import IncidentCard from '../Card/Incident';
import { Incident } from 'tps-calls-shared';

export const HEIGHT = 250;

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${Colors.BACKGROUND};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
`;

const CloseButton = styled.button`
  width: 100%;
  background-color: ${Colors.PRIMARY};
  color: white;
  height: 35px;
  border-radius: 3px;
  justify-self: flex-end;
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
      <CloseButton onClick={close}>Close</CloseButton>
    </Container>
  );
};

export default SelectedIncident;
