import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Icon from './Icon';

const styles = theme => ({
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const MapFloatingButton = ({ onClick, classes, drawerOpen }) => (
  <Button
    variant="fab"
    color="primary"
    aria-label="Open Drawer"
    onClick={onClick}
    className={classes.fab}
  >
    {drawerOpen ? <Icon name="Close" /> : <Icon name="Menu" />}
  </Button>
);

MapFloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
  drawerOpen: PropTypes.bool.isRequired, // For hiding or showing the component
};

export default withStyles(styles)(MapFloatingButton);
