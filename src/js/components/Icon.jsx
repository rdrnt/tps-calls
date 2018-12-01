import React from 'react';
import PropTypes from 'prop-types';

import Brightness1 from '@material-ui/icons/Brightness1';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewListIcon from '@material-ui/icons/ViewList';
import PlaceIcon from '@material-ui/icons/Place';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InfoIcon from '@material-ui/icons/Info';

/*
 The purpose of this component is so we don't have a million icon imports in each file
 Just import them once into here, and pass the icon name as a prop
*/

const Icon = ({ name, ...other }) => {
  switch (name) {
    case 'ArrowUpward': {
      return <ArrowUpward />;
    }
    case 'Close': {
      return <CloseIcon {...other} />;
    }
    case 'ChevronLeft': {
      return <ChevronLeftIcon {...other} />;
    }
    case 'Dot': {
      return <Brightness1 {...other} />;
    }
    case 'Menu': {
      return <MenuIcon />;
    }
    case 'Place': {
      return <PlaceIcon />;
    }
    case 'Info': {
      return <InfoIcon {...other} />;
    }
    case 'Refresh': {
      return <RefreshIcon />;
    }
    case 'Search': {
      return <SearchIcon {...other} />;
    }
    case 'ViewList': {
      return <ViewListIcon />;
    }
    default: {
      return null;
    }
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
