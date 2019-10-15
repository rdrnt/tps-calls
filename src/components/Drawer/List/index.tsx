import * as React from 'react';
import styled from 'styled-components';
import { Incident } from '@rdrnt/tps-calls-shared';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

import DrawerListItem from './Item';
import DrawerHeader from './Header';
import { Colors, Sizes } from '../../../config';
import { IncidentFilterState } from '../../../store/incidents';
import {
  setIncidentFilter,
  setSelectedIncident,
  SetIncidentFilterParams,
} from '../../../store/incidents/actions';
import { toggleDrawer } from '../../../store/ui/actions';

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
  filter,
}) => {
  const dispatch = useDispatch();
  const listRef = React.useRef<HTMLUListElement>(null);

  const setFilter = ({ values, merge }: SetIncidentFilterParams) => {
    dispatch(setIncidentFilter({ values, merge }));
  };

  return (
    <Container>
      <DrawerHeader
        setFilter={setFilter}
        filters={filter}
        closeDrawer={() => dispatch(toggleDrawer(false))}
      />
      <List ref={listRef}>
        {incidents.map(incident => (
          <DrawerListItem
            key={incident.id}
            incident={incident}
            onClick={() => dispatch(setSelectedIncident(incident))}
          />
        ))}
      </List>
    </Container>
  );
};

export default DrawerList;
