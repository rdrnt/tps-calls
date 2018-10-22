import React from 'react';

import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import Icon from './Icon';

import { AppBarLocale } from '../locale';

import globals from '../globals';

const DEFAULT_DRAWER_WIDTH = globals.DRAWER_WIDTH;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: DEFAULT_DRAWER_WIDTH,
      width: `calc(100% - ${DEFAULT_DRAWER_WIDTH}px)`,
    },
    marginLeft: 0,
    width: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

const AppToolbar = ({ toggleDrawer, drawerOpen, classes }) => (
  <AppBar
    position="fixed"
    className={classNames(classes.appBar, {
      [classes.appBarShift]: drawerOpen,
    })}
  >
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu" onClick={toggleDrawer}>
        <Icon name="Menu" />
      </IconButton>
      <Typography variant="h6" color="inherit">
        {AppBarLocale.title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(AppToolbar);
