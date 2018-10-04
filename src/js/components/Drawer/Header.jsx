import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    padding: 20,
  },
});

const DrawerHeader = ({ onSearchChange, searchValue, classes }) => (
  <Paper className={classes.root} elevation={0}>
    <TextField
      id="search-header"
      type="search"
      label="Search for Assault, College St, etc..."
      margin="none"
      onChange={onSearchChange}
      fullWidth
      value={searchValue}
    />
  </Paper>
);

DrawerHeader.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

DrawerHeader.defaultProps = {
  closeDrawer: () => {},
  searchValue: '',
};

export default withStyles(styles)(DrawerHeader);
