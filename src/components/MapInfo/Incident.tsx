import * as React from 'react';
import styled from 'styled-components';

export const WIDTH = 350;

interface IncidentView {
  onOpen: () => void;
}

const Content = styled.div`
  width: 350px;
  height: 200px;
  background-color: red;
`;

const IncidentView: React.FunctionComponent<IncidentView> = ({ onOpen }) => {
  React.useEffect(() => {
    onOpen();
  }, []);

  return <Content />;
};

export default IncidentView;
