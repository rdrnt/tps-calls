import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import Icon from '../Icon';

import globals from '../../globals';

const StyledDrawerHeader = styled.div`
  padding: 20px;
  background-color: ${globals.colors.materialWhite};
`;

const DrawerHeader = ({ mobile, closeMobileDrawer }) => (
  <StyledDrawerHeader>
    {mobile && (
      <IconButton
        aria-label="close"
        onClick={closeMobileDrawer}
        color="secondary"
      >
        <Icon name="Close" />
      </IconButton>
    )}
    <TextField
      id="search-header"
      type="search"
      label="Search for Assualt, College St, etc..."
      margin="normal"
      fullWidth
    />
  </StyledDrawerHeader>
);

DrawerHeader.propTypes = {
  mobile: PropTypes.bool.isRequired,
  closeMobileDrawer: PropTypes.func,
};

DrawerHeader.defaultProps = {
  closeMobileDrawer: () => {},
};

export default DrawerHeader;
