import * as React from 'react';
import styled from 'styled-components';
import { Sizes } from '../../../config';

export interface DrawerControls {}

const Container = styled.div`
  width: 100%;
  background-color: purple;
  padding: ${Sizes.SPACING / 2}px;
  border-bottom: 1px solid black;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: green;
`;

const FilterContainer = styled.div`
  width: 100%;
  height: 25px;
  background-color: red;
`;

const DrawerControls: React.FunctionComponent<DrawerControls> = ({}) => {
  return (
    <Container>
      <SearchBarContainer />
      <FilterContainer />
    </Container>
  );
};

export default DrawerControls;
