import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';

import NetworkErrorModal from './Modal/NetworkErrorModal';
import ProjectInfoModal from './Modal/ProjectInfoModal';

const modalReferenceTable = {
  networkError: NetworkErrorModal,
  projectInfo: ProjectInfoModal,
};

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    maxWidth: 400,
  },
});

const ModalManager = props => {
  const { open, type, classes } = props;

  // Get the inner Modal from the reference table
  const InnerModalComponent = modalReferenceTable[type];

  // If we have a type, or have InnerModalComponent, show the modal

  // TODO: Better accesibility
  if (type.length !== 0 || InnerModalComponent) {
    return (
      <Modal
        aria-labelledby="Modal"
        aria-describedby="Afocused box presenting info you cur"
        disableAutoFocus
        open={open}
      >
        <div className={classes.paper}>
          <InnerModalComponent />
        </div>
      </Modal>
    );
  }

  // return null if we don't have a type or modal for the provided type
  return null;
};

ModalManager.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.shape).isRequired,
};

ModalManager.defaultProps = {
  open: false,
  type: '',
};

function mapStateToProps(state) {
  return {
    ...state.UI.modal,
  };
}

const ConnectedModalManager = connect(mapStateToProps)(ModalManager);

export default withStyles(styles)(ConnectedModalManager);
