import React from 'react';
import { connect } from 'react-redux';

import Hidden from '@material-ui/core/Hidden';

import DrawerContainer from '../components/DrawerContainer';

import { uiActions, incidentActions } from '../actions';

import { sorter } from '../helpers';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
      incidents: [],
      selectedIncident: null,
    };

    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Check if we're fetching and if we have any incidents

    const sortedDates = sorter.sortIncidentsByDate(nextProps.incidents.list);
    this.setState({
      mobileOpen: nextProps.UI.showDrawer,
      incidents: sortedDates,
      selectedIncident: nextProps.incidents.selectedIncident,
    });
  }

  closeDrawer() {
    const { mobileOpen } = this.state;

    // Only close it if its open
    if (mobileOpen) {
      const { dispatch } = this.props;
      dispatch(uiActions.toggleDrawer(false));
    }
  }

  // TODO: Refactor all of this
  render() {
    const { mobileOpen, incidents, selectedIncident } = this.state;
    return (
      <React.Fragment>
        {/* Mobile Drawer */}
        <Hidden mdUp>
          <DrawerContainer
            open={mobileOpen}
            mobile
            closeDrawer={this.closeDrawer}
            incidents={incidents}
            selectedIncident={selectedIncident}
          />
        </Hidden>
        {/* Desktop Drawer */}
        <Hidden smDown implementation="css">
          <DrawerContainer
            open
            mobile={false}
            incidents={incidents}
            selectedIncident={selectedIncident}
          />
        </Hidden>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(Drawer);
