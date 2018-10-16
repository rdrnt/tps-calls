import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { dateHelper } from '../helpers';

// TODO: Refactor

const styles = theme => ({
  card: {
    position: 'absolute',
    bottom: theme.spacing.unit * 4,
    right: 0,
    left: 0,
    'margin-left': 'auto',
    'margin-right': 'auto',
    maxWidth: 350,
  },
});

const MapCurrentlySelected = ({
  hidden,
  selectedIncident,
  classes,
  setSelectedIncident,
}) =>
  hidden || !selectedIncident ? null : (
    <div className={classes.card}>
      <Card raised>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Currently selected
          </Typography>
          <Typography variant="title">{selectedIncident.type}</Typography>
          <Typography variant="subheading">
            {selectedIncident.street}
          </Typography>
          <Typography variant="body1">
            {dateHelper.tidyFormat(selectedIncident.date)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setSelectedIncident(null)}>
            Close
          </Button>
        </CardActions>
      </Card>
    </div>
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
