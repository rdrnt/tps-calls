import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import { useDispatch } from 'react-redux';

import DrawerListItem from './Item';
import DrawerHeader from './Header';
import { Colors, Sizes } from '../../../config';
import { IncidentFilterState } from '../../../store/incidents';
import { setIncidentFilter } from '../../../store/incidents/actions';

export interface DrawerList {
  incidents: Incident<any>[];
  filter: IncidentFilterState;
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
  background-color: ${Colors.BACKGROUND_SECONDARY};
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: scroll;
`;

const DrawerList: React.FunctionComponent<DrawerList> = ({
  incidents,
  filter,
}) => {
  const dispatch = useDispatch();

  const setFilter = (newFilterOptions: IncidentFilterState) => {
    dispatch(setIncidentFilter({ ...filter, ...newFilterOptions }));
  };

  return (
    <Container>
      <DrawerHeader setFilter={setFilter} />
      <List>
        {incidents.map(incident => (
          <DrawerListItem key={incident.id} incident={incident} />
        ))}
      </List>
    </Container>
  );
};

export default DrawerList;
