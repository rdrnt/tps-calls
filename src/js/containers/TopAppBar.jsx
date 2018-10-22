import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppToolbar from '../components/AppToolbar';

import DrawerContainer from '../components/DrawerContainer';

import { uiActions } from '../actions';

class TopAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incidents: [],
      showDrawer: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
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

    dispatch(uiActions.toggleDrawer(!showDrawer));
  }

  render() {
    const { incidents, showDrawer } = this.state;
    return (
      <>
        <AppToolbar toggleDrawer={this.toggleDrawer} drawerOpen={showDrawer} />
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
