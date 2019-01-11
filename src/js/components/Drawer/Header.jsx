import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import HeaderSearch from './Header/Search';

import Icon from '../Icon';

import { DrawerLocale } from '../../locale';

const styles = theme => ({
  contents: {
    paddingBottom: theme.spacing.unit * 2,
  },
  headerClose: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  controls: {
    width: '100%',
  },
});

const DrawerHeader = ({
  toggleDrawer,
  onSearchChange,
  searchValue,
  classes,
  children,
}) => (
  <Paper elevation={0}>
    {/* This is the close button with divider */}
    <div className={classes.headerClose}>
      <IconButton onClick={toggleDrawer}>
        <Icon name="ChevronLeft" />
      </IconButton>
    </div>
    <Divider />
    {/* The actual contents of the header */}
    <div className={classes.contents}>
      <div className={classes.controls}>{children}</div>
      <HeaderSearch
        onChange={onSearchChange}
        value={searchValue}
        placeholder={DrawerLocale.header.searchPlaceholder}
      />
      <Divider />
    </div>
  </Paper>
);

DrawerHeader.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
  children: PropTypes.element,
  toggleDrawer: PropTypes.func.isRequired,
};

DrawerHeader.defaultProps = {
  searchValue: '',
  children: null,
};

export default withStyles(styles)(DrawerHeader);
