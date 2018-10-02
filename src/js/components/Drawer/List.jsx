import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Icon from '../Icon';

import DrawerListItem from './ListItem';

import globals from '../../globals';

const StyledList = styled.ul`
  height: 100%:
  width: 100%;
  min-width: 100%;
  padding: 0;
  margin: 0;
`;

const StyledBackToTop = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: ${globals.colors.materialWhite};
`;

const DrawerList = ({ incidents, selectedIncident }) => (
  <StyledList>
    {/* Highlight the selected incident */}
    {selectedIncident ? (
      <DrawerListItem {...selectedIncident} selected />
    ) : null}
    {/* List all of the incidents */}
    {incidents.map(incident => (
      <DrawerListItem {...incident} key={incident.id} />
    ))}
    <StyledBackToTop>
      <Button aria-label="Back To Top" variant="fab" color="primary">
        <Icon name="ArrowUpward" />
      </Button>
    </StyledBackToTop>
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
