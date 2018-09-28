import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDrawerListItem = styled.li`
  padding: 20px;
  list-style-type: none;
  background-color: ${props => (props.selected ? 'blue' : 'red')};
`;

const DrawerListItem = ({ selected, street, type, date }) => (
  <StyledDrawerListItem onClick={() => console.log('Yo')}>
    <h2>{type}</h2>
    <p>{street}</p>
    <p>{date}</p>
  </StyledDrawerListItem>
);

export default DrawerListItem;
