import React from 'react';
import PropTypes from 'prop-types';
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
    const { UI, incidents } = nextProps;
    this.setState({
      showDrawer: UI.showDrawer,
      incidents: incidents.list,
      selectedIncident: incidents.selectedIncident,
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

Drawer.propTypes = {
  dispatch: PropTypes.func,
  incidents: PropTypes.objectOf(PropTypes.shape),
  UI: PropTypes.objectOf(PropTypes.shape),
};

Drawer.defaultProps = {
  dispatch: () => {},
  incidents: {},
  UI: {},
};

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(Drawer);
