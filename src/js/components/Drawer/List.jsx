import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DrawerListItem from './ListItem';

const StyledDrawerList = styled.ul`
  height: 100%:
  width: 100%;
  padding: 0;
  margin: 0;
`;

const DrawerList = ({ incidents, selectedIncident }) => (
  <StyledDrawerList>
    {incidents.map(incident => (
      <DrawerListItem
        {...incident}
        selected={incident.id === selectedIncident.id}
        key={incident.id}
      />
    ))}
    <DrawerListItem />
  </StyledDrawerList>
);

DrawerList.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.shape),
  selectedIncident: PropTypes.objectOf(PropTypes.shape),
};

DrawerList.defaultProps = {
  incidents: [],
  selectedIncident: {},
};

export default DrawerList;
