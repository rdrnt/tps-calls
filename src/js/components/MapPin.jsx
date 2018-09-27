import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

import Icon from './Icon';

const MapPin = ({ onClick, selected }) => (
  <IconButton
    className="MapPin__button"
    aria-label="Incident"
    onClick={onClick}
  >
    <Icon name="Place" />
  </IconButton>
);

MapPin.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

MapPin.defaultProps = {
  selected: false,
};

export default MapPin;
