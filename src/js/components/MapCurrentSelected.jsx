import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AnimatedDot from './AnimatedDot';

import { dateHelper } from '../helpers';

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: 0,
    left: 0,
    'margin-left': 'auto',
    'margin-right': 'auto',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 325,
    maxHeight: 150,
    display: 'flex',
    'flex-direction': 'row',
  },
  pulseDot: {
    width: 24,
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'margin-left': 'auto',
  },
});

const MapCurrentlySelected = ({ hidden, selectedIncident, classes }) =>
  hidden || !selectedIncident ? null : (
    <Paper elevation={2} className={classes.root}>
      <div>
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
      <div className={classes.pulseDot}>
        <AnimatedDot animating />
      </div>
    </Paper>
  );

MapCurrentlySelected.propTypes = {
  hidden: PropTypes.bool.isRequired,
  selectedIncident: PropTypes.objectOf(PropTypes.shape),
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
};

MapCurrentlySelected.defaultProps = {
  selectedIncident: null,
};

export default withStyles(styles)(MapCurrentlySelected);
