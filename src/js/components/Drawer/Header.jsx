import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import Icon from '../Icon';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    'z-index': 1000,
  },
  button: {
    width: 25,
    height: 25,
    padding: 0,
  },
  icon: {
    fontSize: 20,
    color: '#fffff',
  },
});

const StyledHeaderClose = styled.div`
  display: 'flex';
  justify-content: flex-end;
`;

const DrawerHeader = ({
  closeDrawer,
  onSearchChange,
  searchValue,
  classes,
}) => (
  <Paper className={classes.root} elevation={0}>
    <StyledHeaderClose>
      <IconButton
        aria-label="close"
        onClick={closeDrawer}
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
      label="Search for Assault, College St, etc..."
      margin="normal"
      onChange={onSearchChange}
      fullWidth
      value={searchValue}
    />
  </Paper>
);

DrawerHeader.propTypes = {
  closeDrawer: PropTypes.func,
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

DrawerHeader.defaultProps = {
  closeDrawer: () => {},
  searchValue: '',
};

export default withStyles(styles)(DrawerHeader);
