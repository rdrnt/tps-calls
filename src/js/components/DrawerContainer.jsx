import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import { DrawerList, DrawerHeader, DrawerSortView } from './Drawer';

import { sorter } from '../helpers';

import globals from '../globals';

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: globals.DRAWER_WIDTH,
    },
    width: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    [theme.breakpoints.up('sm')]: {
      width: globals.DRAWER_WIDTH,
    },
    width: '100%',
  },
});

class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      sortType: sorter.types.DATE_ASC,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSortTypeChange = this.onSortTypeChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }

  onSortTypeChange(event) {
    this.setState({
      sortType: event.target.value,
    });
  }

  render() {
    const { open, toggleDrawer, incidents, classes } = this.props;
    const { searchValue, sortType } = this.state;
    return (
      <Drawer
        variant="persistent"
        open={open}
        className={classes.drawer}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <DrawerHeader
          closeDrawer={() => toggleDrawer(false)}
          onSearchChange={this.onSearchChange}
          searchValue={searchValue}
          toggleDrawer={toggleDrawer}
        >
          {/* Hide sorting if we're searching */}
          {searchValue.length > 0 ? null : (
            <DrawerSortView value={sortType} onChange={this.onSortTypeChange} />
          )}
        </DrawerHeader>
        {/* search through incidents if we have any */}
        <DrawerList
          incidents={
            searchValue.length > 0
              ? incidents.filter(
                  incident =>
                    incident.type
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    incident.street
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                )
              : sorter.sortForType(incidents, sortType)
          }
        />
      </Drawer>
    );
  }
}
DrawerContainer.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
  incidents: PropTypes.arrayOf(PropTypes.shape),
  classes: PropTypes.objectOf(PropTypes.shape),
};

DrawerContainer.defaultProps = {
  open: false,
  incidents: [],
  classes: {},
};

export default withStyles(styles)(DrawerContainer);
