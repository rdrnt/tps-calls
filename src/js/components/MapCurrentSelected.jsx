import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import AnimatedDot from './AnimatedDot';
import Icon from './Icon';

import { dateHelper } from '../helpers';

// TODO: Refactor

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: 0,
    left: 0,
    'margin-left': 'auto',
    'margin-right': 'auto',
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    maxWidth: 325,
    maxHeight: 200,
  },
  closeContainer: {
    display: 'flex',
    'justify-content': 'flex-end',
    'align-items': 'center',
  },
  closeButton: {
    height: 25,
    width: 25,
  },
  infoContainer: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'flex-direction': 'row',
  },
  infoBlock: {
    display: 'flex',
    'justify-content': 'center',
    'flex-direction': 'column',
  },
});

const MapCurrentlySelected = ({
  hidden,
  selectedIncident,
  classes,
  setSelectedIncident,
}) =>
  hidden || !selectedIncident ? null : (
    <Paper elevation={2} className={classes.root}>
      <div className={classes.closeContainer}>
        <IconButton
          onClick={() => setSelectedIncident(null)}
          className={classes.closeButton}
        >
          <Icon name="Close" />
        </IconButton>
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.infoBlock}>
          <Typography variant="title" gutterBottom>
            {selectedIncident.type}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            {selectedIncident.street}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {dateHelper.tidyFormat(selectedIncident.date)}
          </Typography>
        </div>
        <AnimatedDot animating />
      </div>
    </Paper>
  );

MapCurrentlySelected.propTypes = {
  hidden: PropTypes.bool.isRequired,
  selectedIncident: PropTypes.objectOf(PropTypes.shape),
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
  setSelectedIncident: PropTypes.func.isRequired,
};

MapCurrentlySelected.defaultProps = {
  selectedIncident: null,
};

export default withStyles(styles)(MapCurrentlySelected);
