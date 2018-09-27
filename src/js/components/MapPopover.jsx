import React from 'react';
import PropTypes from 'prop-types';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const MapPopover = ({ incident, closePopper }) => (
  <Popper
    id="test"
    position="top"
    open={incident.show}
    anchorEl={incident.anchorEl}
    modifiers={{
      flip: {
        enabled: true,
      },
      preventOverflow: {
        enabled: true,
        boundariesElement: 'scrollParent',
      },
    }}
  >
    <Paper>
      <DialogTitle>{incident.type}</DialogTitle>
      <DialogContent>
        <DialogContentText>{incident.street}</DialogContentText>
        <DialogContentText>{incident.date}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopper} color="primary">
          Close
        </Button>
      </DialogActions>
    </Paper>
  </Popper>
);

export default MapPopover;
