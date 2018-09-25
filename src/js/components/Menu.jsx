import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';

import MenuItem from './Menu/MenuItem';

import { uiActions } from '../actions';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showIncidentTable: false,
    };

    this.toggleIncidentTable = this.toggleIncidentTable.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps only contains the UI key

    const { showIncidentTable } = this.state;
    // Check if we even need too update
    if (nextProps.showIncidentTable !== showIncidentTable) {
      this.setState({
        showIncidentTable: nextProps.showIncidentTable,
      });
    }
  }

  toggleIncidentTable() {
    const { dispatch } = this.props;
    const { showIncidentTable } = this.state;

    dispatch(uiActions.toggleIncidentTable(!showIncidentTable));
  }

  render() {
    const { isOpen, closeMenu } = this.props;
    const { showIncidentTable } = this.state;
    return (
      <Dialog
        open={isOpen}
        onClose={closeMenu}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Options</DialogTitle>
        <div tabIndex={0} role="button" style={{ width: 300 }}>
          <List>
            <MenuItem
              text="Show Incident Table"
              icon="ViewList"
              switchValues={{
                onCheck: this.toggleIncidentTable,
                checked: showIncidentTable,
                value: 'showIncidentTable',
              }}
            />
            <MenuItem text="Refresh" icon="Refresh" />
          </List>
        </div>
      </Dialog>
    );
  }
}

Menu.propTypes = {
  isOpen: PropTypes.bool,
  closeMenu: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  isOpen: false,
};

function mapStateToProps(state) {
  return {
    ...state.UI,
  };
}
export default connect(mapStateToProps)(Menu);
