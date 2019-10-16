import * as React from 'react';
import styled from 'styled-components';
import { Timestamp } from '@rdrnt/tps-calls-shared';
import { useDebouncedCallback } from 'use-debounce';

import DateFilter from './Date';
import FilterRow from './Row';

import { IncidentFilterState } from '../../../../store/incidents';
import { SetIncidentFilterParams } from '../../../../store/incidents/actions';
import DistanceFilter from './Distance';

interface DrawerFilter {
  filters: IncidentFilterState;
  setFilter: (params: SetIncidentFilterParams) => void;
}

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const DrawerFilter: React.FunctionComponent<DrawerFilter> = ({
  filters,
  setFilter,
}) => {
  const setStartDate = (value?: Timestamp) => {
    setFilter({ values: { startDate: value } });
  };

  const setEndDate = (value?: Timestamp) => {
    setFilter({ values: { endDate: value } });
  };

  const [setDistance] = useDebouncedCallback((distance?: number) => {
    setFilter({ values: { distance } });
  }, 200);

  const clearFilters = ({
    ignoreFields,
  }: {
    ignoreFields?: [keyof IncidentFilterState];
  }) => {
    const newFilters: { [key: string]: any } = {
      ...filters,
    };
    Object.keys(newFilters).forEach(key => {
      if (
        ignoreFields &&
        !ignoreFields.includes(key as keyof IncidentFilterState)
      ) {
        delete newFilters[key];
      } else {
        delete newFilters[key];
      }
    });
    console.log('Setting', newFilters);
    setFilter({ values: newFilters, merge: false });
  };

  const onDateRowOpenChange = (open: boolean) => {
    // If we close the date filter, and we have filter dates, clear them
    if (!open && Boolean(filters.startDate || filters.endDate)) {
      clearFilters({ ignoreFields: ['search'] });
    }
  };

  return (
    <Container>
      <FilterRow
        overrideOpen={Boolean(filters.startDate || filters.endDate)}
        title="Date"
        content={
          <DateFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        }
        onChange={onDateRowOpenChange}
      />
      <FilterRow
        overrideOpen={Boolean(filters.distance)}
        title="Nearby"
        content={
          <DistanceFilter
            distance={filters.distance}
            setDistance={setDistance}
          />
        }
      />
    </Container>
  );
};

export default DrawerFilter;
