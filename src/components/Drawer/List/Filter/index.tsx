import * as React from 'react';
import styled from 'styled-components';

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
  const setStartDate = () => {
    setFilter({ startDate: undefined });
  };

  const setEndDate = () => {
    setFilter({ endDate: undefined });
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
