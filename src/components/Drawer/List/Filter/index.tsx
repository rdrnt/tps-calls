import * as React from 'react';
import styled from 'styled-components';

import DateFilter from './Date';

interface DrawerFilter {}

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const DrawerFilter: React.FunctionComponent<DrawerFilter> = ({}) => {
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());

  return (
    <Container>
      <DateFilter startDate={startDate} endDate={endDate} />
    </Container>
  );
};

export default DrawerFilter;
