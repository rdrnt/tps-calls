import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDrawerListItem = styled.li`
  padding: 20px;
  list-style-type: none;
  background-color: ${props => (props.selected ? 'blue' : 'red')};
`;

const DrawerListItem = ({ selected }) => (
  <StyledDrawerListItem onClick={() => console.log('Yo')}>
    Item
  </StyledDrawerListItem>
);

export default DrawerListItem;
