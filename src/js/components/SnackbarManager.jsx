import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

import Icon from './Icon';

import { uiActions } from '../actions';

const SnackbarManager = ({ open, message, dispatch }) =>
  open ? (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={() => dispatch(uiActions.openSnackbar({ open: false }))}
      message={<span>{message}</span>}
      action={
        <IconButton
          onClick={() => dispatch(uiActions.openSnackbar({ open: false }))}
          color="inherit"
        >
          <Icon name="Close" />
        </IconButton>
      }
    />
  ) : null;

SnackbarManager.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

SnackbarManager.defaultProps = {
  open: false,
  message: '',
};

function mapStateToProps(state) {
  return {
    ...state.UI.snackbar,
  };
}

export default connect(mapStateToProps)(SnackbarManager);
