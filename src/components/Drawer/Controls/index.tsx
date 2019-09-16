import * as React from 'react';
import styled from 'styled-components';

export interface DrawerControls {}

const Container = styled.div`
  height: 250px;
  width: 100%;
  background-color: purple;
  border-bottom: 1px solid black;
`;

const DrawerControls: React.FunctionComponent<DrawerControls> = ({}) => {
  return <Container />;
};

export default DrawerControls;
