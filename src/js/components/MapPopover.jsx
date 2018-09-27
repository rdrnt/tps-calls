import React from 'react';
import PropTypes from 'prop-types';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

import createStreetviewUrl from '../helpers/createStreetviewUrl';

const MapPopover = ({ incident }) => (
  <Popper
    id="test"
    position="top"
    open={incident.id !== 0}
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
      <img
        src={createStreetviewUrl(
          incident.coordinates.lat,
          incident.coordinates.lon
        )}
        alt="StreetView"
      />
    </Paper>
  </Popper>
);

export default MapPopover;
