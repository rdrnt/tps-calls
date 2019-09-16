import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import DrawerListItem from './Item';
import DrawerControls from '../Controls';

export interface DrawerList {
  incidents: Incident<any>[];
}

const Container = styled.ul`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const DrawerList: React.FunctionComponent<DrawerList> = ({ incidents }) => {
  return (
    <Container>
      <DrawerControls />
      {incidents.map(incident => (
        <DrawerListItem key={incident.id} incident={incident} />
      ))}
    </Container>
  );
};

export default DrawerList;
