import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '../Icon';

import { DrawerLocale } from '../../locale';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const DrawerHeader = ({ onSearchChange, searchValue, classes, children }) => (
  <Paper className={classes.root} elevation={0}>
    <TextField
      id="search-header"
      type="search"
      label={DrawerLocale.header.searchPlaceholder}
      margin="none"
      onChange={onSearchChange}
      fullWidth
      value={searchValue}
      InputProps={{
        endAdornment:
          // Only return the search icon if they have nothing typed in
          // Set the search icon color to the primary color since the TextField color changes color in focus
          searchValue.length === 0 ? (
            <InputAdornment position="end">
              <Icon name="Search" color="action" />
            </InputAdornment>
          ) : null,
      }}
    />
    {children}
  </Paper>
);

DrawerHeader.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
  children: PropTypes.element,
};

DrawerHeader.defaultProps = {
  searchValue: '',
  children: null,
};

export default withStyles(styles)(DrawerHeader);
