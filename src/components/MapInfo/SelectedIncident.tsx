import * as React from 'react';
import styled from 'styled-components';

import { Sizes, Colors } from '../../config';

export const HEIGHT = 250;

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${Colors.BACKGROUND};
  display: flex;
  justify-content: center;
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
}
const SelectedIncident: React.FunctionComponent<SelectedIncident> = ({
  close,
}) => {
  return (
    <Container>
      <CloseButton onClick={close}>Close</CloseButton>
    </Container>
  );
};

export default SelectedIncident;
