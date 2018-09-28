import React from 'react';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import { DrawerList, DrawerBody } from '../components/Drawer';

class SideDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    // Check if we're fetching and if we have any incidents
    this.setState({
      open: nextProps.UI.showSideDrawer,
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        {/* Mobile Drawer */}
        <Hidden mdUp>
          <Drawer variant="temporary" open={open}>
            <DrawerBody mobile>
              <DrawerList />
            </DrawerBody>
          </Drawer>
        </Hidden>
        {/* Desktop Drawer */}
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open>
            <DrawerBody mobile={false}>
              <DrawerList />
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
