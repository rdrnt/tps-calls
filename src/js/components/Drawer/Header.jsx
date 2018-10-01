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

const DrawerHeader = ({
  mobile,
  closeMobileDrawer,
  onSearchChange,
  searchValue,
}) => (
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
      onChange={onSearchChange}
      fullWidth
      value={searchValue}
    />
  </StyledDrawerHeader>
);

DrawerHeader.propTypes = {
  mobile: PropTypes.bool.isRequired,
  closeMobileDrawer: PropTypes.func,
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

DrawerHeader.defaultProps = {
  closeMobileDrawer: () => {},
  searchValue: '',
};

export default DrawerHeader;
