import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';
import IconButton from '@material-ui/core/IconButton';

import Icon from './Icon';

const MapMarker = ({ incident, onClick, selected }) => (
  <Marker
    latitude={incident.coordinates.lat}
    longitude={incident.coordinates.lon}
    offsetLeft={0}
    offsetTop={0}
  >
    <IconButton
      aria-label="Incident"
      onClick={onClick}
      style={{ height: 30, width: 30 }}
      color="primary"
    >
      <Icon name="Dot" />
    </IconButton>
  </Marker>
);

MapMarker.propTypes = {
  incident: PropTypes.objectOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

MapMarker.defaultProps = {
  onClick: () => {},
  selected: false,
};

export default MapMarker;
