import * as React from 'react';
import styled from 'styled-components';
import { Timestamp } from '@rdrnt/tps-calls-shared';

import DateFilter from './Date';
import FilterRow from './Row';

import { IncidentFilterState } from '../../../../store/incidents';
import {
  setIncidentFilter,
  SetIncidentFilterParams,
} from '../../../../store/incidents/actions';

interface DrawerFilter {
  filters: IncidentFilterState;
  setFilter: (params: SetIncidentFilterParams) => void;
}

const Container = styled.div`
  width: 100%;
  height: auto;
`;

export type clearFilters = ({
  ignoreFields,
}: {
  ignoreFields?: [keyof IncidentFilterState];
}) => void;

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

  const onDateRowChange = (open: boolean) => {
    // If we close the date filter, and we have filter dates, clear them
    if (!open && Boolean(filters.startDate || filters.endDate)) {
      clearFilters({ ignoreFields: ['search'] });
    }
  };

  return (
    <Container>
      <FilterRow
        title="Date"
        content={
          <DateFilter
            startDate={filters.startDate}
            endDate={filters.endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            clearFilters={clearFilters}
          />
        }
        onChange={onDateRowChange}
      />
    </Container>
  );
};

export default DrawerFilter;
