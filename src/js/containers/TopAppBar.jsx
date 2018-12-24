import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppToolbar from '../components/AppToolbar';

import DrawerContainer from '../components/DrawerContainer';

import { uiActions } from '../actions';

import { analyticsHelper } from '../helpers';

class TopAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incidents: [],
      showDrawer: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);

    this.openModal = this.openModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { incidents, UI } = nextProps;
    this.setState({
      incidents: incidents.list,
      showDrawer: UI.showDrawer,
    });
  }

  toggleDrawer() {
    const { dispatch } = this.props;
    const { showDrawer } = this.state;

    analyticsHelper.gaEvent({
      category: analyticsHelper.categories.UI,
      action: `Toggled drawer ${!showDrawer}`,
      label: 'TopAppBar',
    });

    dispatch(uiActions.toggleDrawer(!showDrawer));
  }

  openModal(modalName) {
    const { dispatch } = this.props;
    analyticsHelper.gaEvent({
      category: analyticsHelper.categories.UI,
      action: `Opened ${modalName} modal`,
      label: 'TopAppBar',
    });

    dispatch(uiActions.toggleModal(true, modalName));
  }

  render() {
    const { incidents, showDrawer } = this.state;
    return (
      <>
        <AppToolbar
          toggleDrawer={this.toggleDrawer}
          drawerOpen={showDrawer}
          openModal={this.openModal}
        />
        <DrawerContainer
          open={showDrawer}
          toggleDrawer={this.toggleDrawer}
          incidents={incidents}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

TopAppBar.propTypes = {
  dispatch: PropTypes.func,
  incidents: PropTypes.objectOf(PropTypes.shape),
  UI: PropTypes.objectOf(PropTypes.shape),
};

TopAppBar.defaultProps = {
  dispatch: () => {},
  incidents: [],
  UI: {},
};

const ConnectedTopAppBar = connect(mapStateToProps)(TopAppBar);
export default ConnectedTopAppBar;
