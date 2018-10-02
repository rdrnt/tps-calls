import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import Icon from '../Icon';

import globals from '../../globals';

const StyledHeader = styled.div`
  padding: 20px;
  background-color: ${globals.colors.materialWhite};
`;

const StyledHeaderClose = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: flex-end;
`;

const styles = {
  button: {
    width: 25,
    height: 25,
    padding: 0,
  },
  icon: {
    fontSize: 20,
    color: '#fffff',
  },
};

const DrawerHeader = ({
  mobile,
  closeMobileDrawer,
  onSearchChange,
  searchValue,
}) => (
  <StyledHeader>
    <StyledHeaderClose show={mobile}>
      <IconButton
        aria-label="close"
        onClick={closeMobileDrawer}
        disableRipple
        style={styles.button}
        iconstyle={styles.icon}
      >
        <Icon name="Close" />
      </IconButton>
    </StyledHeaderClose>
    <TextField
      id="search-header"
      type="search"
      label="Search for Assualt, College St, etc..."
      margin="normal"
      onChange={onSearchChange}
      fullWidth
      value={searchValue}
    />
  </StyledHeader>
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
