import React from 'react';
import PlaceIcon from '@material-ui/icons/Place';

const MapPin = ({ onClick }) => (
  <div className="mappin" onClick={onClick}>
    <PlaceIcon />
  </div>
);

export default MapPin;
