import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { dateHelper, createShareUrl } from '../helpers';

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
  openSnackbar,
}) =>
  hidden || !selectedIncident ? null : (
    <div className={classes.card}>
      <Card raised>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Currently selected
          </Typography>
          <Typography variant="h5" component="h2">
            {selectedIncident.type}
          </Typography>
          <Typography variant="subtitle1">{selectedIncident.street}</Typography>
          <Typography variant="caption">
            {dateHelper.tidyFormat(selectedIncident.date)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setSelectedIncident(null)}>
            Close
          </Button>
          <CopyToClipboard text={createShareUrl(selectedIncident.id)}>
            <Button
              size="small"
              onClick={() => openSnackbar({ message: 'Copied to clipboard' })}
            >
              Share
            </Button>
          </CopyToClipboard>
        </CardActions>
      </Card>
    </div>
  );

MapCurrentlySelected.propTypes = {
  hidden: PropTypes.bool.isRequired,
  selectedIncident: PropTypes.objectOf(PropTypes.shape),
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
  setSelectedIncident: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

MapCurrentlySelected.defaultProps = {
  selectedIncident: null,
};

export default withStyles(styles)(MapCurrentlySelected);
