import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import IncidentTable from '../components/IncidentTable';
import Menu from '../components/Menu';

import { uiActions } from '../actions';

class Overlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incidents: [],
      showIncidentTable: false,
      showMenu: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('next', nextProps);
    this.setState({
      incidents: nextProps.policeApi.incidents,
      showMenu: nextProps.UI.showMenu,
      showIncidentTable: nextProps.UI.showIncidentTable,
    });
  }

  toggleMenu(value) {
    const { dispatch } = this.props;
    dispatch(uiActions.toggleMenu(value));
  }

  render() {
    const { children, dispatch } = this.props;
    const { incidents, showMenu, showIncidentTable } = this.state;

    return (
      <div className="overlay">
        <Menu closeMenu={() => this.toggleMenu(false)} isOpen={showMenu} />
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          style={{ position: 'absolute', bottom: 20, right: 20 }}
          onClick={() => this.toggleMenu(true)}
        >
          <MenuIcon />
        </Button>
        {showIncidentTable ? <IncidentTable incidents={incidents} /> : null}
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(Overlay);
