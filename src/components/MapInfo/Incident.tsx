import * as React from 'react';
import styled from 'styled-components';

interface IncidentView {}

const Content = styled.div`
  width: 100%;
  height: 200px;
  background-color: red;
`;

const IncidentView: React.FunctionComponent<IncidentView> = ({}) => {
  return <Content />;
};

export default IncidentView;
