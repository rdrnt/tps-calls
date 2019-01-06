import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import {
  DrawerList,
  DrawerHeader,
  DrawerSortView,
  HeaderControls,
} from './Drawer';

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
      filteredIncidents: [],
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSortTypeChange = this.onSortTypeChange.bind(this);
    this.sortOrSearchIncidents = this.sortOrSearchIncidents.bind(this);
  }

  componentDidUpdate(prevProps) {
    // If we receive new incidents in the props, as long as the length changed
    // we need to re-sort it so the new incidents are in correct order
    const { incidents } = this.props;
    if (incidents.length !== prevProps.incidents.length) {
      this.sortOrSearchIncidents();
    }
  }

  // If our search value changes
  // connected to DrawerHeader
  onSearchChange(event) {
    this.setState(
      {
        searchValue: event.target.value,
      },
      () => this.sortOrSearchIncidents()
    );
  }

  // If our sort type changes
  // connected to DrawerHeader
  onSortTypeChange(event) {
    this.setState(
      {
        sortType: event.target.value,
      },
      () => this.sortOrSearchIncidents()
    );
  }

  // This function does our searching or sorting for us
  // So we don't have to modify in the render function
  sortOrSearchIncidents() {
    const { sortType, searchValue } = this.state;
    const { incidents } = this.props;

    // If we're searching
    if (searchValue.length > 0) {
      const incidentsWithSearchValue = incidents.filter(
        incident =>
          incident.type.toLowerCase().includes(searchValue.toLowerCase()) ||
          incident.street.toLowerCase().includes(searchValue.toLowerCase())
      );
      this.setState({
        filteredIncidents: incidentsWithSearchValue,
      });
    } else {
      // if we're not searching, then the only other way this function was called was if the sortType changed
      // so sort and then set the filteredIncidents
      const sortedIncidents = sorter.sortForType(incidents, sortType);
      this.setState({
        filteredIncidents: sortedIncidents,
      });
    }
  }

  render() {
    const { open, toggleDrawer, incidents, classes } = this.props;
    const { searchValue, sortType, filteredIncidents } = this.state;
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
          <HeaderControls />
          {/* Hide sorting if we're searching
          {searchValue.length > 0 ? null : (
            <DrawerSortView value={sortType} onChange={this.onSortTypeChange} />
          )}
          */}
        </DrawerHeader>
        {/* If we haven't filtered any incidents yet, sort through all the incidents */}
        <DrawerList incidents={filteredIncidents} />
      </Drawer>
    );
  }
}
DrawerContainer.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
  incidents: PropTypes.arrayOf(PropTypes.shape).isRequired,
  classes: PropTypes.objectOf(PropTypes.shape),
};

DrawerContainer.defaultProps = {
  open: false,
  classes: {},
};

export default withStyles(styles)(DrawerContainer);
