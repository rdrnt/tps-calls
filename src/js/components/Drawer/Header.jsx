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
  },
  button: {
    width: 15,
    height: 15,
  },
  icon: {
    width: 15,
    height: 15,
    fontSize: 10,
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
