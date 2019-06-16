import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';

const Container = styled.li`
  height: 75px;
  width: 100%;
  background-color: red;
  border-bottom: 1px solid purple;
  margin: 0;
  padding: 0;
`;

interface DrawerItemProps {
  incident: Incident<any>;
}

const Item: React.FunctionComponent<DrawerItemProps> = ({}) => <Container />;

export default Item;
