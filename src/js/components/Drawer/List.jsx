import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DrawerListItem from './ListItem';

const StyledList = styled.ul`
  height: 100%:
  width: 100%;
  min-width: 100%;
  padding: 0;
  margin: 0;
`;
const DrawerList = ({ incidents, selectedIncident }) => (
  <StyledList>
    {/* Highlight the selected incident */}
    {selectedIncident ? (
      <DrawerListItem incident={selectedIncident} selected />
    ) : null}
    {/* List all of the incidents */}
    {incidents.map(incident => (
      <DrawerListItem incident={incident} key={incident.id} />
    ))}
  </StyledList>
);

DrawerList.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.shape),
  selectedIncident: PropTypes.objectOf(PropTypes.shape),
};

DrawerList.defaultProps = {
  incidents: [],
  selectedIncident: null,
};

export default DrawerList;
