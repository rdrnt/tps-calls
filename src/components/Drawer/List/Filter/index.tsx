import * as React from 'react';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import { Timestamp } from '@rdrnt/tps-calls-shared';

import DateFilter from './Date';
import { IncidentFilterState } from '../../../../store/incidents';

interface DrawerFilter {
  filters: IncidentFilterState;
  setFilter: (value: IncidentFilterState) => void;
}

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const DrawerFilter: React.FunctionComponent<DrawerFilter> = ({
  filters,
  setFilter,
}) => {
  const [updateFilter] = useDebouncedCallback((value: IncidentFilterState) => {
    setFilter(value);
  }, 200);

  React.useEffect(() => {}, []);

  const setStartDate = (value?: Timestamp) => {
    updateFilter({ startDate: value });
  };

  const setEndDate = (value?: Timestamp) => {
    updateFilter({ endDate: value });
  };

  return (
    <Container>
      <DateFilter
        startDate={filters.startDate}
        endDate={filters.endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </Container>
  );
};

export default DrawerFilter;
