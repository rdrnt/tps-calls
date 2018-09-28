import React from 'react';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import { DrawerList, DrawerBody, DrawerHeader } from '../components/Drawer';

import { uiActions } from '../actions';

class SideDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
      incidents: [],
      selectedIncident: null,
    };

    this.closeMobileDrawer = this.closeMobileDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Check if we're fetching and if we have any incidents
    this.setState({
      mobileOpen: nextProps.UI.showMobileDrawer,
      incidents: nextProps.incidents.list,
      selectedIncident: nextProps.incidents.selectedIncident,
    });
  }

  closeMobileDrawer() {
    const { mobileOpen } = this.state;

    // Only close it if its open
    if (mobileOpen) {
      const { dispatch } = this.props;
      dispatch(uiActions.toggleMobileDrawer(false));
    }
  }

  // TODO: Refactor all of this
  render() {
    const { mobileOpen, incidents, selectedIncident } = this.state;
    return (
      <div>
        {/* Mobile Drawer */}
        <Hidden mdUp>
          <Drawer variant="temporary" open={mobileOpen}>
            <DrawerHeader mobile closeMobileDrawer={this.closeMobileDrawer} />
            <DrawerBody mobile>
              <DrawerList
                incidents={incidents}
                selectedIncident={selectedIncident}
              />
            </DrawerBody>
          </Drawer>
        </Hidden>
        {/* Desktop Drawer */}
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open>
            <DrawerHeader mobile={false} />
            <DrawerBody mobile={false}>
              <DrawerList
                incidents={incidents}
                selectedIncident={selectedIncident}
              />
            </DrawerBody>
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(SideDrawer);
