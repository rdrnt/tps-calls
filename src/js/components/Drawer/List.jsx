import React from 'react';
import styled from 'styled-components';

import { DrawerListItem } from '.';

const StyledDrawerList = styled.div`
  height: 100%:
  width: 100%;
`;

const DrawerList = ({}) => (
  <StyledDrawerList>
    <DrawerListItem />
  </StyledDrawerList>
);

export default DrawerList;
