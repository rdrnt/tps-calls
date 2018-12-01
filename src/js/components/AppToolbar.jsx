import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';

import { AppToolbarInformation } from './Toolbar';

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
  grow: {
    flexGrow: 1,
  },
});

class AppToolbar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      informationPopoverOpen: false,
    };

    this.toggleInformationPopover = this.toggleInformationPopover.bind(this);

    this.elementRef = React.createRef();
  }

  toggleInformationPopover() {
    const { informationPopoverOpen } = this.state;
    this.setState({
      informationPopoverOpen: !informationPopoverOpen,
    });
  }

  render() {
    const { classes, toggleDrawer, drawerOpen } = this.props;
    const { informationPopoverOpen } = this.state;
    return (
      <RootRef rootRef={this.elementRef}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar>
            {!drawerOpen && (
              <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={toggleDrawer}
              >
                <Icon name="Menu" />
              </IconButton>
            )}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {AppBarLocale.title}
            </Typography>
            <AppToolbarInformation
              open={informationPopoverOpen}
              parentAnchorEl={this.elementRef.current}
              toggleOpen={this.toggleInformationPopover}
            />
            {/*
      <div>
        <IconButton color="inherit" aria-label="Menu" onClick={toggleDrawer}>
          <Icon name="Place" />
        </IconButton>
      </div>
      */}
          </Toolbar>
        </AppBar>
      </RootRef>
    );
  }
}

AppToolbar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.shape),
};

AppToolbar.defaultProps = {
  drawerOpen: false,
  classes: {},
};

export default withStyles(styles)(AppToolbar);
