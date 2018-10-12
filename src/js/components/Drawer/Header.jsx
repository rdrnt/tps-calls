import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { DrawerLocale } from '../../locale';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const DrawerHeader = ({ onSearchChange, searchValue, classes }) => (
  <Paper className={classes.root} elevation={0}>
    <TextField
      id="search-header"
      type="search"
      label={DrawerLocale.header.searchPlaceholder}
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
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
};

DrawerHeader.defaultProps = {
  searchValue: '',
};

export default withStyles(styles)(DrawerHeader);
