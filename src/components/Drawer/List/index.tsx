import * as React from 'react';
import styled from 'styled-components';
import { Incident } from 'tps-calls-shared';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

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
  position: relative;
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
  const listRef = React.useRef<HTMLUListElement>(null);

  const [isScrolling, setIsScrolling] = React.useState<boolean>(false);

  const setFilter = (newFilterOptions: IncidentFilterState) => {
    dispatch(setIncidentFilter({ ...filter, ...newFilterOptions }));
  };

  const [onScroll] = useDebouncedCallback(() => {
    if (listRef.current && listRef.current.scrollTop >= 75) {
      setIsScrolling(true);
    } else if (isScrolling) {
      setIsScrolling(false);
    }
  }, 200);

  return (
    <Container>
      <DrawerHeader setFilter={setFilter} isScrolling={isScrolling} />
      <List ref={listRef} onScroll={onScroll}>
        {incidents.map(incident => (
          <DrawerListItem key={incident.id} incident={incident} />
        ))}
      </List>
    </Container>
  );
};

export default DrawerList;
