import React from 'react';
import { connect } from 'react-redux';

import Hidden from '@material-ui/core/Hidden';

import DrawerContainer from '../components/DrawerContainer';

import { uiActions } from '../actions';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDrawer: false,
      incidents: [],
      selectedIncident: null,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Check if we're fetching and if we have any incidents
    this.setState({
      showDrawer: nextProps.UI.showDrawer,
      incidents: nextProps.incidents.list,
      selectedIncident: nextProps.incidents.selectedIncident,
    });
  }

  toggleDrawer(value) {
    const { dispatch } = this.props;
    dispatch(uiActions.toggleDrawer(value));
  }

  // TODO: Refactor all of this
  render() {
    const { showDrawer, incidents, selectedIncident } = this.state;
    return (
      <React.Fragment>
        {/* Mobile Drawer */}
        <Hidden mdUp>
          <DrawerContainer
            open={showDrawer}
            mobile
            toggleDrawer={value => this.toggleDrawer(value)}
            incidents={incidents}
            selectedIncident={selectedIncident}
          />
        </Hidden>
        {/* Desktop Drawer */}
        <Hidden smDown implementation="css">
          <DrawerContainer
            open={showDrawer}
            mobile={false}
            toggleDrawer={value => this.toggleDrawer(value)}
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
