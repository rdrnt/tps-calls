import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';

const Container = styled.div`
  width: 100%;
  height: 75px;
  background-color: red;
  border-bottom: 1px solid purple;
  pointer-events: auto;
`;

const ImageContainer = styled.div`
  width: 35px;
  height: 35px;
  padding: 15px;
  border-radius: 17.5px;
`;

interface DrawerItemProps {
  incident: Incident<any>;
}

const Item: React.FunctionComponent<DrawerItemProps> = ({}) => (
  <Container>
    <ImageContainer />
  </Container>
);

export default Item;
