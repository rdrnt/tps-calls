import * as React from 'react';
import styled from 'styled-components';
import { Incident } from '@rdrnt/tps-calls-shared';

import DrawerListItem from './Item';
import { Colors, Sizes } from '../../../config';

export interface DrawerList {
  incidents: Incident<any>[];
  setSelectedIncident: (incident: Incident<any>) => void;
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.BACKGROUND_SECONDARY};
`;

const List = styled.ul`
  padding: ${Sizes.SPACING / 2}px;
  padding-top: 0;
  margin: 0;
  list-style: none;
  overflow-y: scroll;
  flex-grow: 1;

  > li {
    margin: ${Sizes.SPACING / 2}px 0;
  }
`;

const DrawerList: React.FunctionComponent<DrawerList> = ({
  incidents,
  setSelectedIncident,
}) => (
  <Container>
    <List>
      {incidents.map(incident => (
        <DrawerListItem
          key={incident.id}
          incident={incident}
          onClick={() => setSelectedIncident(incident)}
        />
      ))}
    </List>
  </Container>
);

export default DrawerList;
