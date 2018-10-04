import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import Icon from '../Icon';

import { dateHelper } from '../../helpers';

// I know we should probably have this in the container, but I don't want to pass down props 4 levels
import { incidentActions } from '../../actions';
import store from '../../store';

// This component is responsible for rendering data in the drawer
const DrawerListItem = ({ selected, incident }) => (
  <ListItem
    button={!selected}
    selected={selected}
    onClick={() =>
      store.dispatch(incidentActions.setSelectedIncident(incident))
    }
  >
    <ListItemText
      primary={`${incident.type}`}
      secondary={`${incident.street} (${dateHelper.tidyFormat(incident.date)})`}
    />
    {selected && (
      <ListItemSecondaryAction>
        <IconButton aria-label="Selected" disabled>
          <Icon name="Dot" />
        </IconButton>
      </ListItemSecondaryAction>
    )}
  </ListItem>
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
