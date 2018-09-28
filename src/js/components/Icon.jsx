import React from 'react';
import PropTypes from 'prop-types';

import Brightness1 from '@material-ui/icons/Brightness1';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewListIcon from '@material-ui/icons/ViewList';
import PlaceIcon from '@material-ui/icons/Place';

/*
 The purpose of this component is so we don't have a million icon imports in each file
 Just import them once into here, and pass the icon name as a prop
*/

const Icon = ({ name }) => {
  switch (name) {
    case 'Close': {
      return <CloseIcon />;
    }
    case 'Dot': {
      return <Brightness1 />;
    }
    case 'Menu': {
      return <MenuIcon />;
    }
    case 'Place': {
      return <PlaceIcon />;
    }
    case 'Refresh': {
      return <RefreshIcon />;
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
