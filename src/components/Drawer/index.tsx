import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 300px;
  background-color: white;
`;

const Drawer: React.FunctionComponent = ({}) => {
  return <Container />;
};

export default Drawer;
