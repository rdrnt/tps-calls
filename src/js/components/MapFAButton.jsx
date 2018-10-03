import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Icon from './Icon';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const MapFloatingButton = ({ onClick, classes, hidden }) =>
  hidden ? null : (
    <Button
      variant="fab"
      color="primary"
      aria-label="Open Menu"
      onClick={onClick}
      className={classes.fab}
    >
      <Icon name="Menu" />
    </Button>
  );

MapFloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
  hidden: PropTypes.bool.isRequired, // For hiding or showing the component
};

export default withStyles(styles)(MapFloatingButton);
