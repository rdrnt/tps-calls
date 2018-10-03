import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import globals from '../../globals';

import { dateHelper } from '../../helpers';

// I know we should probably have this in the container, but I don't want to pass down props 4 levels
import { incidentActions } from '../../actions';
import store from '../../store';
import incidents from '../../reducers/incidents';

const StyledDrawerListItem = styled.li`
  padding: 20px;
  margin: ${props => (props.selected ? '20px 0px' : '0')};
  list-style-type: none;
  background-color: ${props =>
    props.selected
      ? globals.materialTheme.primary.main
      : globals.colors.materialWhite};
`;

const DrawerListItem = ({ selected, incident }) => (
  <StyledDrawerListItem
    selected={selected}
    onClick={() =>
      store.dispatch(incidentActions.setSelectedIncident(incident))
    }
  >
    <Typography variant="title" color="textPrimary">
      {incident.type}
    </Typography>
    <Typography variant="subheading" color="textPrimary">
      {incident.street}
    </Typography>
    <Typography variant="subheading" color="textPrimary">
      {dateHelper.tidyFormat(incident.date)}
    </Typography>
  </StyledDrawerListItem>
);

DrawerListItem.propTypes = {
  selected: PropTypes.bool,
  incident: PropTypes.objectOf(PropTypes.shape),
};

DrawerListItem.defaultProps = {
  selected: false,
  incident: {
    type: '',
    street: '',
    id: 0,
    date: new Date(),
  },
};

export default DrawerListItem;
