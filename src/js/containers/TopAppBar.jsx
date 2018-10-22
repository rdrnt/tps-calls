import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Icon from '../components/Icon';

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
    this.setState({
      incidents: nextProps.incidents.list,
      selectedIncident: nextProps.incidents.selectedIncident,
      showDrawer: nextProps.UI.showDrawer,
    });
  }

  toggleDrawer() {
    const { dispatch } = this.props;
    const { showDrawer } = this.state;

    dispatch(uiActions.toggleDrawer(!showDrawer));
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <AppToolbar
          toggleDrawer={this.toggleDrawer}
          drawerOpen={this.state.showDrawer}
        />
        <DrawerContainer
          open={this.state.showDrawer}
          toggleDrawer={this.toggleDrawer}
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

const ConnectedTopAppBar = connect(mapStateToProps)(TopAppBar);
export default ConnectedTopAppBar;
