import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import DrawerListItem from './Item';
import DrawerControls from '../Controls';
import { Colors } from '../../../config';

export interface DrawerList {
  incidents: Incident<any>[];
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: scroll;
`;

const DrawerList: React.FunctionComponent<DrawerList> = ({ incidents }) => {
  return (
    <Container>
      <List>
        {incidents.map(incident => (
          <DrawerListItem key={incident.id} incident={incident} />
        ))}
      </List>
    </Container>
  );
};

export default DrawerList;
