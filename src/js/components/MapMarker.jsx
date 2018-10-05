import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';
import IconButton from '@material-ui/core/IconButton';

import Icon from './Icon';
import AnimatedDot from './AnimatedDot';

const ICON_DEFAULT_SIZE = 48;

const MapMarker = ({ incident, onClick, selected }) => (
  <Marker
    latitude={incident.coordinates.lat}
    longitude={incident.coordinates.lon}
    anchor="bottom-left"
    offsetLeft={-24}
    offsetTop={-24}
  >
    <IconButton aria-label="Incident" onClick={onClick} color="primary">
      {selected ? <AnimatedDot animating={selected} /> : <Icon name="Place" />}
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
