import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ModalLocale } from '../../locale';

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    maxWidth: 400,
  },
});

const NetworkErrorModal = ({ classes }) => (
  <div className={classes.paper}>
    <Typography gutterBottom variant="h6" id="modal-title">
      {ModalLocale.networkError.title}
    </Typography>
    <Typography variant="subtitle1" id="modal-description">
      {ModalLocale.networkError.description}
    </Typography>
  </div>
);

export default withStyles(styles)(NetworkErrorModal);
