import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DrawerListItem from './ListItem';

const StyledDrawerList = styled.div`
  height: 100%:
  width: 100%;
`;

const DrawerList = ({ incidents }) => (
  <StyledDrawerList>
    {incidents.map(incident => (
      <DrawerListItem {...incident} key={incident.id} />
    ))}
    <DrawerListItem />
  </StyledDrawerList>
);

DrawerList.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.shape),
};

DrawerList.defaultProps = {
  incidents: [],
};

export default DrawerList;
